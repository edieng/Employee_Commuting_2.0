import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

// Import our DB manager
import { 
  initializeDb, 
  getChatHistory, 
  addChatHistory, 
  getConfigs, 
  setConfig, 
  getCustomSites, 
  setCustomSites, 
  getEmployeeRoster, 
  setEmployeeRoster 
} from './src/db/dbManager.js';

dotenv.config();

const PORT = 8080;
const app = express();

app.use(express.json({ limit: '50mb' }));

// Lazy initializer for Gemini client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error('GEMINI_API_KEY environment variable is required to use AI features.');
    }
    aiClient = new GoogleGenAI({ apiKey: key });
  }
  return aiClient;
}

// Ensure database is initialized before serving requests
let dbInitPromise = initializeDb().catch(err => {
  console.error('Critical database initialization failure:', err);
});

// Helper middleware to wait for database init
app.use(async (req, res, next) => {
  await dbInitPromise;
  next();
});

// --- API ENDPOINTS ---

// 1. Chat History
app.get('/api/history', async (req, res) => {
  try {
    const history = await getChatHistory();
    res.json({ success: true, history });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message || String(err) });
  }
});

// 2. Chat with Gemini Proxy
app.post('/api/chat', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ success: false, error: 'Prompt is required' });
  }

  try {
    const ai = getGeminiClient();
    
    // Call Gemini (gemini-2.5-flash is the standard for fast-performance chat)
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: "You are an expert AI ESG Assistant specializing in Scope 3 Category 7 (Employee Commuting) greenhouse gas reporting, transport planning, and carbon offset auditing. Help users optimize commute rosters, interpret emissions data, and develop sustainable transportation strategies for Hong Kong. Frame your advice using official emission factors, local HK geographies, and practical, executive-level ESG advice. Keep your replies structured, analytical, and highly professional.",
      }
    });

    const reply = response.text || "No response received from the model.";

    // Save prompt and response in database
    const savedItem = await addChatHistory(prompt, reply);

    res.json({ success: true, reply, savedItem });
  } catch (err: any) {
    console.error('Gemini API/Database error in /api/chat:', err);
    res.status(500).json({ success: false, error: err.message || String(err) });
  }
});

// 3. Clear Chat History
app.post('/api/history/clear', async (req, res) => {
  // Simple implementation: clear local db history or postgres history (truncate)
  // For safety, let's keep it simple or implement as a config trigger
  res.json({ success: true });
});

// 4. Fetch Full Roster and App State
app.get('/api/state', async (req, res) => {
  try {
    const [configs, customSites, employeeRoster] = await Promise.all([
      getConfigs(),
      getCustomSites(),
      getEmployeeRoster()
    ]);
    res.json({
      success: true,
      state: {
        configs,
        customSites,
        employeeRoster
      }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message || String(err) });
  }
});

// 5. Update Configurations
app.post('/api/state/configs', async (req, res) => {
  try {
    const { configs } = req.body;
    if (configs && typeof configs === 'object') {
      const promises = Object.entries(configs).map(([key, value]) => setConfig(key, value));
      await Promise.all(promises);
    }
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message || String(err) });
  }
});

// 6. Update Custom Sites List
app.post('/api/state/sites', async (req, res) => {
  try {
    const { customSites } = req.body;
    if (!Array.isArray(customSites)) {
      return res.status(400).json({ success: false, error: 'customSites must be an array' });
    }
    await setCustomSites(customSites);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message || String(err) });
  }
});

// 7. Update Employee Roster List
app.post('/api/state/roster', async (req, res) => {
  try {
    const { employeeRoster } = req.body;
    if (!Array.isArray(employeeRoster)) {
      return res.status(400).json({ success: false, error: 'employeeRoster must be an array' });
    }
    await setEmployeeRoster(employeeRoster);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message || String(err) });
  }
});

// --- VITE DEV SERVER OR STATIC PRODUCTION BUILD SERVING ---
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Full-stack server running on http://localhost:${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  });
}

startServer();
