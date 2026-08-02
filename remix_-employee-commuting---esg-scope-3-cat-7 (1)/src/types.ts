export interface DistrictConfig {
  name: string;
  nameZH: string;
  lat: number;
  lng: number;
  radius: number; // geographical spread radius in km
  estatesPub: string[];
  estatesPri: string[];
  employees?: number; // Default employee distribution
  pubRatio: number;  // Public vs Private housing split
}

export interface GeodataItem {
  name: string;
  nameZH: string;
  area: string;
  type: "Public" | "Private";
  lat: number;
  lng: number;
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
  mode: 'MTR' | 'Bus' | 'Private Car' | 'Walk';
  housingType?: 'Public' | 'Private';
  site?: string;
  workerType?: 'Office' | 'Frontline';
}

export interface RosterCalculationItem extends CommuteRosterItem {
  distance: number; // in km
  dailyCO2Kg: number;
  monthlyCO2Kg: number; // for currently selected month(s) average or selected month
  annualCO2Kg: number;  // 12-month exact sum
  siteMatchedName: string;
}

export interface DistrictCalculation {
  name: string;
  nameZH: string;
  employees: number;
  avgDistance: number;
  pubRatio: number;
  avgPubDist: number;
  avgPriDist: number;
  avgPubDistQB: number;
  avgPriDistQB: number;
  avgPubDistKT: number;
  avgPriDistKT: number;
  splits: Record<string, number>;
  tCO2eSelectedMonths: number; // emission for selected month(s)
  tCO2eYear: number;           // 12-month total emission
  employeesWalking: number;
  employeesLocal: number;
}

export interface TotalSummary {
  totalEmployees: number;
  totalAnnualCO2Tons: number;      // Fixed 12-month sum
  selectedMonthsCO2Tons: number;  // Sum for selected months
  averageDistanceKm: number;
  walkingEmployeesCount: number;
  selectedMonthNames: string[];
}

export type ActiveTab = 'dashboard' | 'sampler' | 'roster';
