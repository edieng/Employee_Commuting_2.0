import * as XLSX from 'xlsx';
import { CommuteRosterItem } from '../types';
import { getAllocatedTransportMode, MONTHS_LIST } from './constants';

export function parseExcelOrCsvFile(file: File): Promise<Record<string, any>[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const json = XLSX.utils.sheet_to_json<Record<string, any>>(worksheet, { defval: '' });
        resolve(json);
      } catch (err) {
        reject(err);
      }
    };

    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
}

/**
 * Detect month name from filename
 */
export function detectMonthFromFileName(fileName: string): string | null {
  const lower = fileName.toLowerCase();

  const monthMap: [string[], string][] = [
    [['january', 'jan', '01', 'm01', 'm1', '1月', '一月'], 'January'],
    [['february', 'feb', '02', 'm02', 'm2', '2月', '二月'], 'February'],
    [['march', 'mar', '03', 'm03', 'm3', '3月', '三月'], 'March'],
    [['april', 'apr', '04', 'm04', 'm4', '4月', '四月'], 'April'],
    [['may', '05', 'm05', 'm5', '5月', '五月'], 'May'],
    [['june', 'jun', '06', 'm06', 'm6', '6月', '六月'], 'June'],
    [['july', 'jul', '07', 'm07', 'm7', '7月', '七月'], 'July'],
    [['august', 'aug', '08', 'm08', 'm8', '8月', '八月'], 'August'],
    [['september', 'sept', 'sep', '09', 'm09', 'm9', '9月', '九月'], 'September'],
    [['october', 'oct', '10', 'm10', '10月', '十月'], 'October'],
    [['november', 'nov', '11', 'm11', '11月', '十一月'], 'November'],
    [['december', 'dec', '12', 'm12', '12月', '十二月'], 'December'],
  ];

  for (const [patterns, month] of monthMap) {
    for (const pattern of patterns) {
      // Regex check for word boundary or isolated token
      const regex = new RegExp(`(^|[^a-z0-9])${pattern}([^a-z0-9]|$)`, 'i');
      if (regex.test(lower) || lower.includes(pattern)) {
        return month;
      }
    }
  }

  return null;
}

/**
 * Parse raw row objects into structured CommuteRosterItem
 */
export function parseRawRowsToRoster(rawRows: Record<string, any>[]): CommuteRosterItem[] {
  if (!rawRows || rawRows.length === 0) return [];

  const availableHeaders = Object.keys(rawRows[0] || {});

  const findBestHeader = (keywords: string[]) => {
    return availableHeaders.find(h => 
      keywords.some(k => h.toLowerCase().trim().includes(k))
    ) || availableHeaders[0] || '';
  };

  const empIdCol = findBestHeader(['employee id', 'empid', 'emp id', 'employee_id', 'staff id', 'staff_id', 'emp_no', 'emp', 'id']);
  const districtCol = findBestHeader(['district', 'area', 'home area', 'home', 'residential', 'origin']);
  const siteCol = findBestHeader(['site code', 'sitecode', 'work site', 'worksite', 'workplace code', 'site_code', 'site', 'workplace', 'office', 'destination', 'location']);
  const workerTypeCol = findBestHeader(['worker type', 'workertype', 'worker', 'category', 'role', 'type']);
  const modeCol = findBestHeader(['mode', 'transport mode', 'transport', 'commute', 'method']);

  return rawRows.map((row, idx) => {
    const rawId = String(row[empIdCol] || '').trim();
    const id = rawId ? rawId : `EMP-${(idx + 1).toString().padStart(4, '0')}`;
    
    const district = String(row[districtCol] || 'Tsuen Wan Town').trim();
    const modeRaw = String(row[modeCol] || '').trim().toLowerCase();
    
    let mode: 'MTR' | 'Bus' | 'Private Car' | 'Walk';
    if (modeRaw.includes('bus') || modeRaw.includes('minibus')) {
      mode = 'Bus';
    } else if (modeRaw.includes('car') || modeRaw.includes('drive') || modeRaw.includes('private')) {
      mode = 'Private Car';
    } else if (modeRaw.includes('walk') || modeRaw.includes('foot')) {
      mode = 'Walk';
    } else if (modeRaw.includes('mtr') || modeRaw.includes('train') || modeRaw.includes('subway')) {
      mode = 'MTR';
    } else {
      mode = getAllocatedTransportMode(5.0, district);
    }

    const site = String(row[siteCol] || 'SITE-QB').trim();
    const workerTypeRaw = String(row[workerTypeCol] || 'Office').trim().toLowerCase();
    const workerType: 'Office' | 'Frontline' = workerTypeRaw.includes('front') ? 'Frontline' : 'Office';

    return {
      id,
      district,
      mode,
      site,
      workerType
    };
  });
}

/**
 * Generate a 12-Month Sample Excel template workbook
 */
export function generateSampleMultiMonthTemplate() {
  const workbook = XLSX.utils.book_new();

  const sampleRows = [
    { 'Employee ID': '00001', 'Home Area': 'Sha Tin (沙田)', 'Work Site': 'SITE-QB', 'Worker Type': 'Office', 'Transport Mode': 'MTR' },
    { 'Employee ID': '00002', 'Home Area': 'Tsuen Wan (荃灣)', 'Work Site': 'SITE-QB', 'Worker Type': 'Office', 'Transport Mode': 'MTR' },
    { 'Employee ID': '00003', 'Home Area': 'Kwun Tong (觀塘)', 'Work Site': 'SITE-KT', 'Worker Type': 'Frontline', 'Transport Mode': 'Bus' },
    { 'Employee ID': '00004', 'Home Area': 'Wan Chai (灣仔)', 'Work Site': 'SITE-QB', 'Worker Type': 'Office', 'Transport Mode': 'Walk' },
    { 'Employee ID': '00005', 'Home Area': 'Tuen Mun (屯門)', 'Work Site': 'SITE-QB', 'Worker Type': 'Office', 'Transport Mode': 'Bus' },
    { 'Employee ID': '00006', 'Home Area': 'Yuen Long (元朗)', 'Work Site': 'SITE-KT', 'Worker Type': 'Frontline', 'Transport Mode': 'Private Car' },
    { 'Employee ID': '00007', 'Home Area': 'Quarry Bay (鰂魚涌)', 'Work Site': 'SITE-QB', 'Worker Type': 'Office', 'Transport Mode': 'Walk' },
    { 'Employee ID': '00008', 'Home Area': 'Central (中環)', 'Work Site': 'SITE-QB', 'Worker Type': 'Office', 'Transport Mode': 'MTR' },
  ];

  MONTHS_LIST.forEach(month => {
    const worksheet = XLSX.utils.json_to_sheet(sampleRows);
    XLSX.utils.book_append_sheet(workbook, worksheet, month.substring(0, 3));
  });

  XLSX.writeFile(workbook, '12_Months_Employee_Commute_Template.xlsx');
}

export function exportToCsv(filename: string, rows: Record<string, any>[]) {
  if (!rows || rows.length === 0) return;
  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
  XLSX.writeFile(workbook, filename);
}

