import { 
  CommuteRosterItem, 
  CustomWorkSite, 
  DistrictCalculation, 
  RosterCalculationItem, 
  TotalSummary 
} from '../types';
import { 
  DISTRICT_DATA, 
  DEFAULT_WORKING_DAYS_OFFICE, 
  DEFAULT_WORKING_DAYS_FRONTLINE, 
  DEFAULT_EMISSION_FACTORS 
} from '../utils/constants';

/**
 * Haversine formula to compute great-circle distance between two GPS coordinates (in km)
 */
export function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Hong Kong road winding factor (adjusts straight-line distance to estimated road commute distance)
 */
export function getHKRoadFactor(linearDist: number): number {
  if (linearDist < 1.5) return 1.15;
  if (linearDist < 5.0) return 1.25;
  if (linearDist < 15.0) return 1.35;
  return 1.30;
}

/**
 * Get total working days for a set of months
 */
export function getTotalWorkingDaysForMonths(
  months: string[], 
  daysMap: Record<string, number>
): number {
  return months.reduce((sum, m) => sum + (daysMap[m] ?? 21), 0);
}

/**
 * Get annual (12 months) total working days
 */
export function getAnnualWorkingDays(daysMap: Record<string, number>): number {
  return Object.values(daysMap).reduce((sum, val) => sum + val, 0);
}

/**
 * Calculate distance & CO2 emissions for an individual employee roster item
 */
export function calculateRosterItemEmissions(
  item: CommuteRosterItem,
  customSites: CustomWorkSite[],
  selectedMonths: string[],
  workingDaysOfficeMap: Record<string, number> = DEFAULT_WORKING_DAYS_OFFICE,
  workingDaysFrontlineMap: Record<string, number> = DEFAULT_WORKING_DAYS_FRONTLINE,
  emissionFactors: Record<string, number> = DEFAULT_EMISSION_FACTORS,
  roundTripMultiplier: number = 2.0
): RosterCalculationItem {
  const districtInfo = DISTRICT_DATA[item.district];
  const originLat = districtInfo ? districtInfo.lat : 22.3;
  const originLng = districtInfo ? districtInfo.lng : 114.15;

  // Find target work site
  let targetSite = customSites.find(s => 
    s.id === item.site || 
    (s.siteCode && s.siteCode.toLowerCase() === item.site?.toLowerCase()) ||
    (item.site && s.name.toLowerCase().includes(item.site.toLowerCase())) ||
    (item.site && item.site.toLowerCase().includes(s.name.toLowerCase()))
  );
  if (!targetSite) {
    targetSite = customSites[0] || { id: "SITE-QB", name: "Quarry Bay Hub", district: "Quarry Bay / Taikoo", lat: 22.2854, lng: 114.2128, staffCount: 100 };
  }

  const rawDist = haversineDistance(originLat, originLng, targetSite.lat, targetSite.lng);
  const adjustedDist = Number((rawDist * getHKRoadFactor(rawDist)).toFixed(2));

  // Determine effective mode: If distance is within 1.2 km, assume Walk
  const effectiveMode: 'MTR' | 'Bus' | 'Private Car' | 'Walk' = adjustedDist <= 1.2 ? 'Walk' : (item.mode || 'MTR');

  // Determine factor & worker type
  const factor = emissionFactors[effectiveMode] ?? (effectiveMode === 'Private Car' ? 143.2 : effectiveMode === 'MTR' ? 12.4 : effectiveMode === 'Bus' ? 18.5 : 0.0);
  const workerType = item.workerType || 'Office';
  const daysMap = workerType === 'Frontline' ? workingDaysFrontlineMap : workingDaysOfficeMap;

  // Working days calculations
  const selectedWorkingDays = getTotalWorkingDaysForMonths(selectedMonths, daysMap);
  const annualWorkingDays = getAnnualWorkingDays(daysMap);

  // Daily emission in kg CO2 (factor is in grams CO2 per passenger-km)
  // dailyCO2 (kg) = (dist_km * roundTripMultiplier * factor_g/km) / 1000
  const dailyCO2Kg = (adjustedDist * roundTripMultiplier * factor) / 1000;
  const monthlyCO2Kg = dailyCO2Kg * selectedWorkingDays;
  const annualCO2Kg = dailyCO2Kg * annualWorkingDays;

  return {
    ...item,
    mode: effectiveMode,
    distance: adjustedDist,
    dailyCO2Kg,
    monthlyCO2Kg,
    annualCO2Kg,
    siteMatchedName: targetSite.name
  };
}

/**
 * Primary calculation engine for aggregated district and total company emissions
 */
export function calculateDistrictAndTotalEmissions(
  roster: CommuteRosterItem[],
  customSites: CustomWorkSite[],
  selectedMonths: string[],
  workingDaysOfficeMap: Record<string, number> = DEFAULT_WORKING_DAYS_OFFICE,
  workingDaysFrontlineMap: Record<string, number> = DEFAULT_WORKING_DAYS_FRONTLINE,
  emissionFactors: Record<string, number> = DEFAULT_EMISSION_FACTORS,
  roundTripMultiplier: number = 2.0
): {
  districtCalcs: DistrictCalculation[];
  summary: TotalSummary;
  rosterCalcs: RosterCalculationItem[];
} {
  // If roster exists, calculate from roster
  const activeSites = customSites.filter(s => s.visible !== false);
  const targetSiteList = activeSites.length > 0 ? activeSites : customSites;

  const rosterCalcs = roster.map(item => 
    calculateRosterItemEmissions(
      item, 
      targetSiteList, 
      selectedMonths, 
      workingDaysOfficeMap, 
      workingDaysFrontlineMap, 
      emissionFactors, 
      roundTripMultiplier
    )
  );

  // District breakdown maps
  const districtMap: Record<string, {
    employees: number;
    totalDist: number;
    pubCount: number;
    priCount: number;
    pubDistSum: number;
    priDistSum: number;
    pubDistQBSum: number;
    priDistQBSum: number;
    pubDistKTSum: number;
    priDistKTSum: number;
    modesCount: Record<string, number>;
    selectedMonthsCO2Kg: number;
    annualCO2Kg: number;
    walkingCount: number;
    localCount: number;
  }> = {};

  // Initialize all known 18/34 districts
  Object.keys(DISTRICT_DATA).forEach(dKey => {
    districtMap[dKey] = {
      employees: 0,
      totalDist: 0,
      pubCount: 0,
      priCount: 0,
      pubDistSum: 0,
      priDistSum: 0,
      pubDistQBSum: 0,
      priDistQBSum: 0,
      pubDistKTSum: 0,
      priDistKTSum: 0,
      modesCount: { MTR: 0, Bus: 0, 'Private Car': 0, Walk: 0 },
      selectedMonthsCO2Kg: 0,
      annualCO2Kg: 0,
      walkingCount: 0,
      localCount: 0
    };
  });

  if (rosterCalcs.length > 0) {
    // Populate from actual employee roster
    rosterCalcs.forEach(r => {
      if (!districtMap[r.district]) {
        districtMap[r.district] = {
          employees: 0,
          totalDist: 0,
          pubCount: 0,
          priCount: 0,
          pubDistSum: 0,
          priDistSum: 0,
          pubDistQBSum: 0,
          priDistQBSum: 0,
          pubDistKTSum: 0,
          priDistKTSum: 0,
          modesCount: { MTR: 0, Bus: 0, 'Private Car': 0, Walk: 0 },
          selectedMonthsCO2Kg: 0,
          annualCO2Kg: 0,
          walkingCount: 0,
          localCount: 0
        };
      }

      const dEntry = districtMap[r.district];
      dEntry.employees += 1;
      dEntry.totalDist += r.distance;
      if (r.housingType === 'Public') {
        dEntry.pubCount += 1;
        dEntry.pubDistSum += r.distance;
      } else {
        dEntry.priCount += 1;
        dEntry.priDistSum += r.distance;
      }

      // Track Quarry Bay / Kwun Tong specific distances
      if (r.siteMatchedName.toLowerCase().includes('quarry bay')) {
        if (r.housingType === 'Public') dEntry.pubDistQBSum += r.distance;
        else dEntry.priDistQBSum += r.distance;
      } else if (r.siteMatchedName.toLowerCase().includes('kwun tong')) {
        if (r.housingType === 'Public') dEntry.pubDistKTSum += r.distance;
        else dEntry.priDistKTSum += r.distance;
      }

      dEntry.modesCount[r.mode] = (dEntry.modesCount[r.mode] || 0) + 1;
      dEntry.selectedMonthsCO2Kg += r.monthlyCO2Kg;
      dEntry.annualCO2Kg += r.annualCO2Kg;

      if (r.mode === 'Walk') dEntry.walkingCount += 1;
      if (r.distance < 2.0) dEntry.localCount += 1;
    });
  }

  // Format final district calculations
  const districtCalcs: DistrictCalculation[] = Object.entries(districtMap)
    .filter(([_, data]) => data.employees > 0)
    .map(([dKey, data]) => {
      const dConfig = DISTRICT_DATA[dKey] || { nameZH: dKey };
      const emp = data.employees || 1;
      const pubCount = data.pubCount || 1;
      const priCount = data.priCount || 1;

      // Mode percentages
      const splits: Record<string, number> = {};
      Object.entries(data.modesCount).forEach(([mode, count]) => {
        splits[mode] = Number(((count / emp) * 100).toFixed(1));
      });

      return {
        name: dKey,
        nameZH: dConfig.nameZH,
        employees: data.employees,
        avgDistance: Number((data.totalDist / emp).toFixed(1)),
        pubRatio: Number((pubCount / emp).toFixed(2)),
        avgPubDist: Number((data.pubDistSum / pubCount).toFixed(1)),
        avgPriDist: Number((data.priDistSum / priCount).toFixed(1)),
        avgPubDistQB: Number((data.pubDistQBSum / pubCount).toFixed(1)),
        avgPriDistQB: Number((data.priDistQBSum / priCount).toFixed(1)),
        avgPubDistKT: Number((data.pubDistKTSum / pubCount).toFixed(1)),
        avgPriDistKT: Number((data.priDistKTSum / priCount).toFixed(1)),
        splits,
        tCO2eSelectedMonths: Number((data.selectedMonthsCO2Kg / 1000).toFixed(2)),
        tCO2eYear: Number((data.annualCO2Kg / 1000).toFixed(2)),
        employeesWalking: data.walkingCount,
        employeesLocal: data.localCount
      };
    });

  // Calculate totals
  const totalEmployees = districtCalcs.reduce((acc, curr) => acc + curr.employees, 0);
  const selectedMonthsCO2Tons = Number(
    districtCalcs.reduce((acc, curr) => acc + curr.tCO2eSelectedMonths, 0).toFixed(2)
  );
  const totalAnnualCO2Tons = Number(
    districtCalcs.reduce((acc, curr) => acc + curr.tCO2eYear, 0).toFixed(2)
  );

  const weightedDistSum = districtCalcs.reduce((acc, curr) => acc + (curr.avgDistance * curr.employees), 0);
  const averageDistanceKm = totalEmployees > 0 ? Number((weightedDistSum / totalEmployees).toFixed(1)) : 0;
  const walkingEmployeesCount = districtCalcs.reduce((acc, curr) => acc + curr.employeesWalking, 0);

  const summary: TotalSummary = {
    totalEmployees,
    totalAnnualCO2Tons,
    selectedMonthsCO2Tons,
    averageDistanceKm,
    walkingEmployeesCount,
    selectedMonthNames: selectedMonths
  };

  return { districtCalcs, summary, rosterCalcs };
}
