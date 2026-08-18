import React, { useState, useMemo } from 'react';
import { 
  X, 
  Download, 
  FileSpreadsheet, 
  Check, 
  Eye, 
  Calendar
} from 'lucide-react';
import * as XLSX from 'xlsx';
import { 
  RosterCalculationItem, 
  MonthlyRosterMap, 
  CustomWorkSite, 
  DistrictCalculation, 
  TotalSummary 
} from '../types';
import { MONTHS_LIST, MONTH_ABBRS } from '../utils/constants';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  rosterCalcs: RosterCalculationItem[];
  selectedMonths: string[];
  monthlyRosters?: MonthlyRosterMap;
  customSites?: CustomWorkSite[];
  districtCalcs?: DistrictCalculation[];
  summary?: TotalSummary;
  workingDaysOffice?: Record<string, number>;
  workingDaysFrontline?: Record<string, number>;
}

interface ColumnOption {
  key: string;
  label: string;
  getValue: (row: RosterCalculationItem) => any;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  rosterCalcs,
  selectedMonths,
  monthlyRosters,
  customSites = [],
  districtCalcs = [],
  summary,
  workingDaysOffice,
  workingDaysFrontline
}) => {
  if (!isOpen) return null;

  // Scope filter: 'selected' | 'all' | specific month name
  const [exportScope, setExportScope] = useState<string>('selected');
  const [fileFormat, setFileFormat] = useState<'xlsx' | 'csv'>('xlsx');
  const [isExporting, setIsExporting] = useState(false);
  const [exportedSuccess, setExportedSuccess] = useState(false);

  // Helper to resolve site code following the work site list code (e.g., SITE-01, SITE-05) rather than the name
  const resolveSiteCode = (r: RosterCalculationItem): string => {
    if (r.siteMatchedCode && /^SITE-\d+$/i.test(r.siteMatchedCode)) {
      return r.siteMatchedCode;
    }
    const matched = customSites.find(s => 
      s.id === r.site || 
      s.siteCode === r.site ||
      (s.siteCode && r.siteMatchedCode === s.siteCode) ||
      (s.id && r.siteMatchedCode === s.id) ||
      (s.name && r.siteMatchedName && s.name.toLowerCase() === r.siteMatchedName.toLowerCase()) ||
      (r.site && s.name.toLowerCase() === r.site.toLowerCase()) ||
      (r.site && s.name.toLowerCase().includes(r.site.toLowerCase()))
    );
    if (matched?.siteCode) return matched.siteCode;
    if (matched?.id && /^SITE-\d+$/i.test(matched.id)) return matched.id;
    if (r.site && /^SITE-\d+$/i.test(r.site)) return r.site;
    if (r.siteMatchedCode) return r.siteMatchedCode;
    return matched?.id || 'SITE-01';
  };

  const resolveSiteName = (r: RosterCalculationItem): string => {
    if (r.siteMatchedName) return r.siteMatchedName;
    const matched = customSites.find(s => s.id === r.site || s.siteCode === r.site);
    return matched?.name || r.site || 'Quarry Bay Office';
  };

  // Available Column Definitions
  const ALL_COLUMNS: ColumnOption[] = [
    { key: 'id', label: 'Employee ID', getValue: (r) => r.id },
    { key: 'month', label: 'Reporting Month', getValue: (r) => r.month || (selectedMonths[0] || 'September') },
    { key: 'district', label: 'Home Area', getValue: (r) => r.district },
    { key: 'siteMatchedName', label: 'Work Site', getValue: (r) => resolveSiteName(r) },
    { key: 'siteCode', label: 'Work Site Code', getValue: (r) => resolveSiteCode(r) },
    { key: 'workerType', label: 'Worker Role', getValue: (r) => r.workerType || 'Office' },
    { key: 'mode', label: 'Transport Mode', getValue: (r) => r.mode },
    { key: 'distance', label: 'One-Way Distance (km)', getValue: (r) => Number(r.distance.toFixed(2)) },
    { key: 'dailyCO2Kg', label: 'Daily CO₂ (kg)', getValue: (r) => Number(r.dailyCO2Kg.toFixed(4)) },
    { key: 'monthlyCO2Tonnes', label: 'Monthly Emissions (tCO₂e)', getValue: (r) => Number((r.monthlyCO2Kg / 1000).toFixed(4)) },
    { key: 'annualCO2Tonnes', label: 'Annual Emissions (tCO₂e)', getValue: (r) => Number((r.annualCO2Kg / 1000).toFixed(4)) },
  ];

  // Filter list according to selected export scope
  const targetRosterData = useMemo(() => {
    if (exportScope === 'selected') {
      return rosterCalcs.filter(r => !r.month || selectedMonths.includes(r.month));
    }
    if (exportScope === 'all') {
      return rosterCalcs;
    }
    // Specific month
    return rosterCalcs.filter(r => r.month === exportScope);
  }, [rosterCalcs, exportScope, selectedMonths]);

  // Total summary calculations for the export scope
  const totalScopeEmissionsTonnes = useMemo(() => {
    return targetRosterData.reduce((sum, r) => sum + (r.monthlyCO2Kg / 1000), 0);
  }, [targetRosterData]);

  // Formatted preview dataset for the table
  const formattedPreviewData = useMemo(() => {
    return targetRosterData.map(r => {
      const rowObj: Record<string, any> = {};
      ALL_COLUMNS.forEach(col => {
        rowObj[col.label] = col.getValue(r);
      });
      return rowObj;
    });
  }, [targetRosterData]);

  // Execute export with multi-tab Excel or single CSV
  const handleConfirmExport = () => {
    setIsExporting(true);

    try {
      const now = new Date();
      const dateStamp = now.toISOString().split('T')[0];
      const scopeLabel = exportScope === 'selected' 
        ? selectedMonths.join('_') 
        : exportScope === 'all' 
          ? '12Months_FullYear' 
          : exportScope;

      if (fileFormat === 'xlsx') {
        const workbook = XLSX.utils.book_new();

        // Sheet 1: Executive Summary & Calculation Parameters
        const summaryRows: any[] = [
          { 'Parameter': 'Report Title', 'Value': 'Hong Kong Scope 3 Category 7 Employee Commuting GHG Report' },
          { 'Parameter': 'Generated Date', 'Value': now.toLocaleString() },
          { 'Parameter': 'Reporting Scope', 'Value': exportScope === 'selected' ? `Selected Months (${selectedMonths.join(', ')})` : exportScope === 'all' ? 'All 12 Months (Full Annual Reporting Cycle)' : `${exportScope} Single Month` },
          { 'Parameter': 'Total Employee Commute Records', 'Value': targetRosterData.length },
          { 'Parameter': 'Total Scope Emissions (tCO₂e)', 'Value': Number(totalScopeEmissionsTonnes.toFixed(4)) },
          { 'Parameter': 'Methodology Reference', 'Value': 'GHG Protocol Scope 3 Cat 7 / HK HKEPD & MTR ESG Emission Factors' },
          { 'Parameter': 'Round-Trip Commute Multiplier', 'Value': '2.0 (Daily Inbound & Outbound)' },
          { 'Parameter': '', 'Value': '' },
          { 'Parameter': '--- Emission Factors (kg CO₂e/p-km) ---', 'Value': '' },
          { 'Parameter': 'MTR (Mass Transit Railway)', 'Value': 0.055 },
          { 'Parameter': 'Franchised Bus / Minibus', 'Value': 0.089 },
          { 'Parameter': 'Private Car (Gasoline / ICE)', 'Value': 0.170 },
          { 'Parameter': 'Active Walking / Non-motorized', 'Value': 0.000 },
        ];

        // Add working days parameters if available
        if (workingDaysOffice) {
          summaryRows.push({ 'Parameter': '', 'Value': '' });
          summaryRows.push({ 'Parameter': '--- Working Days Settings (Office Grade) ---', 'Value': '' });
          Object.entries(workingDaysOffice).forEach(([m, d]) => {
            summaryRows.push({ 'Parameter': `${m} Office Working Days`, 'Value': `${d} days` });
          });
        }

        const summarySheet = XLSX.utils.json_to_sheet(summaryRows);
        summarySheet['!cols'] = [{ wch: 45 }, { wch: 45 }];
        XLSX.utils.book_append_sheet(workbook, summarySheet, 'Executive Summary');

        // Sheet 2: Detailed Employee Commute Records
        const employeeDataSheet = XLSX.utils.json_to_sheet(formattedPreviewData);
        employeeDataSheet['!cols'] = ALL_COLUMNS.map(c => ({ wch: Math.max(c.label.length + 4, 16) }));
        XLSX.utils.book_append_sheet(workbook, employeeDataSheet, 'Commute Records');

        // Sheet 3: Work Site Distribution Breakdown
        if (customSites.length > 0) {
          const siteRows = customSites.map(site => {
            const siteEmps = targetRosterData.filter(r => 
              resolveSiteCode(r) === (site.siteCode || site.id) ||
              r.siteMatchedName.toLowerCase() === site.name.toLowerCase() ||
              r.site === site.id ||
              (site.siteCode && r.site?.toLowerCase() === site.siteCode.toLowerCase())
            );

            const siteEmissions = siteEmps.reduce((sum, r) => sum + (r.monthlyCO2Kg / 1000), 0);
            const siteAnnualEmissions = siteEmps.reduce((sum, r) => sum + (r.annualCO2Kg / 1000), 0);
            const sharePct = targetRosterData.length > 0 ? (siteEmps.length / targetRosterData.length) * 100 : 0;

            return {
              'Work Site Code': site.siteCode || site.id,
              'Work Site': site.name,
              'District Location': site.district,
              'Assigned Employees': siteEmps.length,
              'Staff Share (%)': Number(sharePct.toFixed(1)),
              'Scope Emissions (tCO₂e)': Number(siteEmissions.toFixed(4)),
              'Annualized Emissions (tCO₂e)': Number(siteAnnualEmissions.toFixed(4))
            };
          });

          const siteSheet = XLSX.utils.json_to_sheet(siteRows);
          siteSheet['!cols'] = [{ wch: 18 }, { wch: 28 }, { wch: 20 }, { wch: 18 }, { wch: 16 }, { wch: 22 }, { wch: 26 }];
          XLSX.utils.book_append_sheet(workbook, siteSheet, 'Work Sites Breakdown');
        }

        // Sheet 4: Home Area Distribution
        if (districtCalcs.length > 0) {
          const districtRows = districtCalcs.map(d => {
            const matchedRoster = targetRosterData.filter(r => r.district.toLowerCase().includes(d.name.toLowerCase()) || d.name.toLowerCase().includes(r.district.toLowerCase()));
            const count = matchedRoster.length;
            const distEmissions = matchedRoster.reduce((sum, r) => sum + (r.monthlyCO2Kg / 1000), 0);

            return {
              'Home Area (EN)': d.name,
              'Home Area (ZH)': d.nameZH,
              'Resident Employees': count,
              'Avg One-Way Distance (km)': Number(d.avgDistance.toFixed(2)),
              'Emissions (tCO₂e)': Number(distEmissions.toFixed(4))
            };
          }).filter(d => d['Resident Employees'] > 0);

          if (districtRows.length > 0) {
            const districtSheet = XLSX.utils.json_to_sheet(districtRows);
            districtSheet['!cols'] = [{ wch: 24 }, { wch: 16 }, { wch: 20 }, { wch: 24 }, { wch: 20 }];
            XLSX.utils.book_append_sheet(workbook, districtSheet, 'Home Area Breakdown');
          }
        }

        XLSX.writeFile(workbook, `HK_Commute_Emissions_${scopeLabel}_${dateStamp}.xlsx`);
      } else {
        // CSV Export
        const worksheet = XLSX.utils.json_to_sheet(formattedPreviewData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Commute_Data');
        XLSX.writeFile(workbook, `HK_Commute_Emissions_${scopeLabel}_${dateStamp}.csv`);
      }

      setExportedSuccess(true);
      setTimeout(() => {
        setExportedSuccess(false);
        onClose();
      }, 1200);
    } catch (err) {
      console.error(err);
      alert("Failed to export file. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-white border-b border-slate-200 text-slate-900 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-slate-100 rounded-lg text-slate-700">
              <Download className="w-5 h-5 text-slate-700" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Export Report</h2>
              <p className="text-xs text-slate-500">
                Export Scope 3 Category 7 employee commuting GHG emission records.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          
          {/* Top Summary Scope Banner */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Export Scope Summary ({exportScope === 'selected' ? selectedMonths.join(', ') : exportScope === 'all' ? 'All 12 Months' : exportScope})
            </span>
            <div className="flex flex-wrap items-center gap-4 mt-1 text-sm font-bold font-mono text-slate-800">
              <span>Records: <strong className="text-emerald-700 font-bold">{targetRosterData.length} rows</strong></span>
              <span>Total Scope Emissions: <strong className="text-blue-700 font-bold">{totalScopeEmissionsTonnes.toFixed(2)} tCO₂e</strong></span>
              <span>Work Sites: <strong className="text-slate-700 font-bold">{customSites.length}</strong></span>
            </div>
          </div>

          {/* Section: Choose Export Format */}
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <FileSpreadsheet className="w-4 h-4 text-slate-500" />
                <span>Choose Export Format</span>
              </label>
              <span className="text-[11px] text-slate-500">
                {fileFormat === 'xlsx' ? 'Multi-sheet audit workbook' : 'Single flat CSV file'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setFileFormat('xlsx')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                  fileFormat === 'xlsx'
                    ? 'bg-slate-100 text-slate-900 border-slate-400 font-bold shadow-2xs ring-1 ring-slate-300'
                    : 'bg-transparent hover:bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                <span className="text-xs font-bold">Excel (.xlsx)</span>
                <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  Recommended
                </span>
              </button>

              <button
                type="button"
                onClick={() => setFileFormat('csv')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center ${
                  fileFormat === 'csv'
                    ? 'bg-slate-100 text-slate-900 border-slate-400 font-bold shadow-2xs ring-1 ring-slate-300'
                    : 'bg-transparent hover:bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                <span className="text-xs font-bold">CSV (.csv)</span>
              </button>
            </div>
          </div>

          {/* Excel Multi-Sheet Notice when Excel is chosen */}
          {fileFormat === 'xlsx' && (
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 flex items-start gap-2.5">
              <FileSpreadsheet className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block text-slate-900 mb-0.5">Multi-Sheet Excel Report:</span>
                <span className="text-[11px] text-slate-600 leading-relaxed block">
                  The generated workbook contains 4 structured tabs:<br />
                  <strong className="text-slate-800">Executive Summary</strong>, <strong className="text-slate-800">Commute Records</strong>, <strong className="text-slate-800">Work Sites Breakdown</strong>, and <strong className="text-slate-800">Home Area Breakdown</strong>.
                </span>
              </div>
            </div>
          )}

          {/* Section: Select Reporting Period */}
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-slate-500" />
                <span>Select Reporting Period</span>
              </label>
              <span className="text-[11px] text-slate-500">
                {targetRosterData.length} records in this scope
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setExportScope('selected')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  exportScope === 'selected'
                    ? 'bg-slate-100 text-slate-900 border-slate-400 font-bold shadow-2xs ring-1 ring-slate-300'
                    : 'bg-transparent hover:bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                <div className="text-xs font-bold truncate">
                  Selected Reporting Months
                </div>
                <div className={`text-[11px] mt-0.5 truncate ${exportScope === 'selected' ? 'text-slate-600 font-medium' : 'text-slate-500'}`}>
                  {selectedMonths.join(', ')}
                </div>
              </button>

              <button
                type="button"
                onClick={() => setExportScope('all')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  exportScope === 'all'
                    ? 'bg-slate-100 text-slate-900 border-slate-400 font-bold shadow-2xs ring-1 ring-slate-300'
                    : 'bg-transparent hover:bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                <div className="text-xs font-bold">
                  All 12 Months (Full Year)
                </div>
                <div className={`text-[11px] mt-0.5 ${exportScope === 'all' ? 'text-slate-600 font-medium' : 'text-slate-500'}`}>
                  Complete annual cycle dataset
                </div>
              </button>
            </div>
          </div>

          {/* Section: Live Data Preview */}
          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
            <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-slate-600" />
                <span className="text-xs font-bold text-slate-800">
                  Data Preview (Showing first {Math.min(targetRosterData.length, 8)} of {targetRosterData.length} records)
                </span>
              </div>
              <span className="text-[11px] font-mono text-slate-500">
                {ALL_COLUMNS.length} Columns
              </span>
            </div>

            {targetRosterData.length > 0 ? (
              <div className="overflow-x-auto max-h-52">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white text-slate-500 text-[10px] uppercase font-bold tracking-tight border-b border-slate-200">
                      {ALL_COLUMNS.map(c => (
                        <th key={c.key} className="px-3 py-2 whitespace-nowrap">{c.label}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs text-slate-800">
                    {formattedPreviewData.slice(0, 8).map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                        {ALL_COLUMNS.map(c => (
                          <td key={c.key} className="px-3 py-2 whitespace-nowrap font-mono text-[11px]">
                            {row[c.label]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-8 text-center bg-white text-xs text-slate-500">
                No employee records found in the selected scope.
              </div>
            )}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <div className="text-xs text-slate-500">
            Exporting: <strong className="text-slate-800 font-bold">{targetRosterData.length} records</strong> ({totalScopeEmissionsTonnes.toFixed(2)} tCO₂e)
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-transparent hover:bg-slate-100 border border-transparent hover:border-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirmExport}
              disabled={isExporting || targetRosterData.length === 0}
              className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 disabled:opacity-40 text-xs font-bold rounded-xl shadow-2xs transition-colors flex items-center gap-2 cursor-pointer"
            >
              {exportedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Report Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 text-slate-600" />
                  <span>Download {fileFormat.toUpperCase()}</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
