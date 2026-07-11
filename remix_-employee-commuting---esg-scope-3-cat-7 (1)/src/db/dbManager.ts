import fs from 'fs';
import path from 'path';
import pg from 'pg';

// Core structural interfaces
export interface ChatHistoryItem {
  id?: number | string;
  user_input: string;
  ai_response: string;
  created_at: string;
}

export interface CustomWorkSite {
  id: string;
  name: string;
  district: string;
  lat: number;
  lng: number;
  staffCount: number;
  visible?: boolean;
  siteCode?: string;
}

export interface CommuteRosterItem {
  id: string;
  district: string;
  mode: 'MTR' | 'Bus' | 'Minibus' | 'Private Car' | 'Walk';
  housingType: 'Public' | 'Private';
  site?: string;
  workerType?: 'Office' | 'Frontline';
}

const LOCAL_DB_PATH = path.join(process.cwd(), 'data', 'local_db.json');

// Memory storage for fallback JSON database
interface LocalDbSchema {
  history: ChatHistoryItem[];
  configs: Record<string, any>;
  customSites: CustomWorkSite[];
  employeeRoster: CommuteRosterItem[];
}

let pgPool: pg.Pool | null = null;
let isPostgres = false;

// Check if we should use PostgreSQL
const databaseUrl = process.env.DATABASE_URL;

export async function initializeDb() {
  if (databaseUrl) {
    console.log('Connecting to PostgreSQL database...');
    try {
      pgPool = new pg.Pool({
        connectionString: databaseUrl,
        ssl: databaseUrl.includes('localhost') || databaseUrl.includes('127.0.0.1') ? false : { rejectUnauthorized: false }
      });
      
      // Test the pool connection
      const client = await pgPool.connect();
      console.log('PostgreSQL connection successful.');
      client.release();
      isPostgres = true;

      // Create Tables if not exist
      await createPostgresTables();
    } catch (err) {
      console.error('Failed to connect to PostgreSQL database. Falling back to file storage.', err);
      isPostgres = false;
      pgPool = null;
      ensureLocalDbFile();
    }
  } else {
    console.log('No DATABASE_URL found. Initializing local JSON-file-based database.');
    isPostgres = false;
    ensureLocalDbFile();
  }
}

function ensureLocalDbFile() {
  const dir = path.dirname(LOCAL_DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!fs.existsSync(LOCAL_DB_PATH)) {
    const defaultData: LocalDbSchema = {
      history: [],
      configs: {},
      customSites: [
        { id: "SITE-QB", name: "Quarry Bay Hub (Taikoo Place)", district: "Quarry Bay / Taikoo", lat: 22.2854, lng: 114.2128, staffCount: 200, visible: true, siteCode: "SITE-01" },
        { id: "SITE-KT", name: "Kwun Tong Office (Millennium City)", district: "Kwun Tong Town", lat: 22.3134, lng: 114.2238, staffCount: 100, visible: true, siteCode: "SITE-02" }
      ],
      employeeRoster: []
    };
    fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(defaultData, null, 2), 'utf-8');
  }
}

function readLocalDb(): LocalDbSchema {
  ensureLocalDbFile();
  try {
    const raw = fs.readFileSync(LOCAL_DB_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to read local database file, returning default structure', e);
    return {
      history: [],
      configs: {},
      customSites: [],
      employeeRoster: []
    };
  }
}

function writeLocalDb(data: LocalDbSchema) {
  try {
    fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (e) {
    console.error('Failed to write local database file', e);
  }
}

async function createPostgresTables() {
  if (!pgPool) return;
  const client = await pgPool.connect();
  try {
    // 1. history
    await client.query(`
      CREATE TABLE IF NOT EXISTS history (
        id SERIAL PRIMARY KEY,
        user_input TEXT NOT NULL,
        ai_response TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 2. configs
    await client.query(`
      CREATE TABLE IF NOT EXISTS configs (
        key VARCHAR(255) PRIMARY KEY,
        value TEXT NOT NULL
      )
    `);

    // 3. custom_sites
    await client.query(`
      CREATE TABLE IF NOT EXISTS custom_sites (
        id VARCHAR(255) PRIMARY KEY,
        name TEXT NOT NULL,
        district TEXT NOT NULL,
        lat DOUBLE PRECISION NOT NULL,
        lng DOUBLE PRECISION NOT NULL,
        staff_count INTEGER NOT NULL,
        visible BOOLEAN DEFAULT TRUE,
        site_code VARCHAR(255)
      )
    `);

    // 4. employee_roster
    await client.query(`
      CREATE TABLE IF NOT EXISTS employee_roster (
        id VARCHAR(255) PRIMARY KEY,
        district TEXT NOT NULL,
        mode VARCHAR(50) NOT NULL,
        housing_type VARCHAR(50) NOT NULL,
        site TEXT,
        worker_type VARCHAR(50)
      )
    `);

    console.log('All PostgreSQL database tables initialized successfully.');
  } catch (err) {
    console.error('Error creating PostgreSQL tables:', err);
    throw err;
  } finally {
    client.release();
  }
}

// --- API METHODS ---

// 1. History (Chat Logs)
export async function getChatHistory(): Promise<ChatHistoryItem[]> {
  if (isPostgres && pgPool) {
    try {
      const res = await pgPool.query('SELECT * FROM history ORDER BY created_at ASC');
      return res.rows.map(row => ({
        id: row.id,
        user_input: row.user_input,
        ai_response: row.ai_response,
        created_at: new Date(row.created_at).toISOString()
      }));
    } catch (e) {
      console.error('Error getting history from Postgres:', e);
      return [];
    }
  } else {
    const db = readLocalDb();
    return db.history;
  }
}

export async function addChatHistory(userInput: string, aiResponse: string): Promise<ChatHistoryItem> {
  const newItem: ChatHistoryItem = {
    user_input: userInput,
    ai_response: aiResponse,
    created_at: new Date().toISOString()
  };

  if (isPostgres && pgPool) {
    try {
      const res = await pgPool.query(
        'INSERT INTO history (user_input, ai_response, created_at) VALUES ($1, $2, $3) RETURNING id',
        [userInput, aiResponse, newItem.created_at]
      );
      newItem.id = res.rows[0].id;
    } catch (e) {
      console.error('Error adding history to Postgres:', e);
    }
  } else {
    const db = readLocalDb();
    newItem.id = `HIST-${Date.now()}`;
    db.history.push(newItem);
    writeLocalDb(db);
  }
  return newItem;
}

// 2. Configs
export async function getConfigs(): Promise<Record<string, any>> {
  if (isPostgres && pgPool) {
    try {
      const res = await pgPool.query('SELECT * FROM configs');
      const configMap: Record<string, any> = {};
      res.rows.forEach(row => {
        try {
          configMap[row.key] = JSON.parse(row.value);
        } catch {
          configMap[row.key] = row.value;
        }
      });
      return configMap;
    } catch (e) {
      console.error('Error getting configs from Postgres:', e);
      return {};
    }
  } else {
    const db = readLocalDb();
    return db.configs;
  }
}

export async function setConfig(key: string, value: any): Promise<void> {
  const strValue = JSON.stringify(value);
  if (isPostgres && pgPool) {
    try {
      await pgPool.query(
        'INSERT INTO configs (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value',
        [key, strValue]
      );
    } catch (e) {
      console.error(`Error setting config for key ${key} in Postgres:`, e);
    }
  } else {
    const db = readLocalDb();
    db.configs[key] = value;
    writeLocalDb(db);
  }
}

// 3. Custom Sites
export async function getCustomSites(): Promise<CustomWorkSite[]> {
  if (isPostgres && pgPool) {
    try {
      const res = await pgPool.query('SELECT * FROM custom_sites');
      const sites = res.rows.map(row => ({
        id: row.id,
        name: row.name,
        district: row.district,
        lat: row.lat,
        lng: row.lng,
        staffCount: row.staff_count,
        visible: row.visible,
        siteCode: row.site_code
      }));
      if (sites.length === 0) {
        // Seed default sites
        const defaultSites: CustomWorkSite[] = [
          { id: "SITE-QB", name: "Quarry Bay Hub (Taikoo Place)", district: "Quarry Bay / Taikoo", lat: 22.2854, lng: 114.2128, staffCount: 200, visible: true, siteCode: "SITE-01" },
          { id: "SITE-KT", name: "Kwun Tong Office (Millennium City)", district: "Kwun Tong Town", lat: 22.3134, lng: 114.2238, staffCount: 100, visible: true, siteCode: "SITE-02" }
        ];
        await setCustomSites(defaultSites);
        return defaultSites;
      }
      return sites;
    } catch (e) {
      console.error('Error getting custom sites from Postgres:', e);
      return [];
    }
  } else {
    const db = readLocalDb();
    return db.customSites;
  }
}

export async function setCustomSites(sites: CustomWorkSite[]): Promise<void> {
  if (isPostgres && pgPool) {
    const client = await pgPool.connect();
    try {
      await client.query('BEGIN');
      await client.query('DELETE FROM custom_sites');
      for (const site of sites) {
        await client.query(
          `INSERT INTO custom_sites (id, name, district, lat, lng, staff_count, visible, site_code) 
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
          [site.id, site.name, site.district, site.lat, site.lng, site.staffCount, site.visible !== false, site.siteCode || '']
        );
      }
      await client.query('COMMIT');
    } catch (e) {
      await client.query('ROLLBACK');
      console.error('Error setting custom sites in Postgres:', e);
    } finally {
      client.release();
    }
  } else {
    const db = readLocalDb();
    db.customSites = sites;
    writeLocalDb(db);
  }
}

// 4. Employee Roster
export async function getEmployeeRoster(): Promise<CommuteRosterItem[]> {
  if (isPostgres && pgPool) {
    try {
      const res = await pgPool.query('SELECT * FROM employee_roster');
      return res.rows.map(row => ({
        id: row.id,
        district: row.district,
        mode: row.mode,
        housingType: row.housing_type,
        site: row.site || undefined,
        workerType: row.worker_type || undefined
      }));
    } catch (e) {
      console.error('Error getting employee roster from Postgres:', e);
      return [];
    }
  } else {
    const db = readLocalDb();
    return db.employeeRoster;
  }
}

export async function setEmployeeRoster(roster: CommuteRosterItem[]): Promise<void> {
  if (isPostgres && pgPool) {
    const client = await pgPool.connect();
    try {
      await client.query('BEGIN');
      await client.query('DELETE FROM employee_roster');
      for (const emp of roster) {
        await client.query(
          `INSERT INTO employee_roster (id, district, mode, housing_type, site, worker_type) 
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [emp.id, emp.district, emp.mode, emp.housingType, emp.site || '', emp.workerType || '']
        );
      }
      await client.query('COMMIT');
    } catch (e) {
      await client.query('ROLLBACK');
      console.error('Error setting employee roster in Postgres:', e);
    } finally {
      client.release();
    }
  } else {
    const db = readLocalDb();
    db.employeeRoster = roster;
    writeLocalDb(db);
  }
}
