import React, { useState, useRef, useEffect } from 'react';
import { Download, Info, MapPin, Users } from 'lucide-react';
import { DistrictCalculation, TotalSummary, CustomWorkSite, RosterCalculationItem } from '../types';
import { SummaryCards } from './SummaryCards';

interface DashboardTabProps {
  summary: TotalSummary;
  districtCalcs: DistrictCalculation[];
  customSites: CustomWorkSite[];
  rosterCalcs?: RosterCalculationItem[];
  selectedMonths: string[];
  onExportClick?: () => void;
  onOpenSiteManagement?: () => void;
}

export const DashboardTab: React.FC<DashboardTabProps> = ({
  summary,
  districtCalcs,
  customSites,
  rosterCalcs = [],
  selectedMonths,
  onExportClick,
  onOpenSiteManagement
}) => {
  const [showAnnualTotal, setShowAnnualTotal] = useState(false);
  const [showInfoPopover, setShowInfoPopover] = useState(false);
  const infoPopoverRef = useRef<HTMLDivElement>(null);
  const activeSites = customSites.filter(s => s.visible !== false);
  const activeSitesCount = activeSites.length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (infoPopoverRef.current && !infoPopoverRef.current.contains(event.target as Node)) {
        setShowInfoPopover(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Compute employee count per work site (average per month when multiple months are selected)
  const numSelectedMonths = Math.max(selectedMonths.length, 1);
  const siteBreakdown = activeSites.map(site => {
    const siteRecords = rosterCalcs.filter(r => 
      r.siteMatchedName.toLowerCase() === site.name.toLowerCase() ||
      r.site === site.id ||
      (site.siteCode && r.site?.toLowerCase() === site.siteCode.toLowerCase()) ||
      (r.site && site.name.toLowerCase().includes(r.site.toLowerCase()))
    );

    const empCount = Math.round(siteRecords.length / numSelectedMonths);

    const siteEmissionsSelected = siteRecords
      .reduce((sum, r) => sum + (r.monthlyCO2Kg / 1000), 0);

    const siteEmissionsAnnual = rosterCalcs
      .filter(r => 
        r.siteMatchedName.toLowerCase() === site.name.toLowerCase() ||
        r.site === site.id ||
        (site.siteCode && r.site?.toLowerCase() === site.siteCode.toLowerCase()) ||
        (r.site && site.name.toLowerCase().includes(r.site.toLowerCase()))
      )
      .reduce((sum, r) => sum + (r.annualCO2Kg / 1000), 0);

    const sharePct = summary.totalEmployees > 0 
      ? Math.round((empCount / summary.totalEmployees) * 100) 
      : 0;

    return {
      ...site,
      empCount,
      sharePct,
      emissionsSelected: siteEmissionsSelected,
      emissionsAnnual: siteEmissionsAnnual
    };
  });

  return (
    <div className="space-y-6">
      
      {/* KPI Cards */}
      <SummaryCards 
        summary={summary} 
        activeSitesCount={activeSitesCount} 
        showAnnualTotal={showAnnualTotal}
        setShowAnnualTotal={setShowAnnualTotal}
        onOpenSiteManagement={onOpenSiteManagement}
      />

      {/* Overview Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="px-6 py-4 bg-white border-b border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div>
              <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                Overview
              </h3>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Info Button */}
            <div className="relative" ref={infoPopoverRef}>
              <button
                type="button"
                onClick={() => setShowInfoPopover(!showInfoPopover)}
                title="List Sync Status"
                className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors flex items-center justify-center cursor-pointer border border-slate-200"
              >
                <Info className="w-4 h-4 text-emerald-600" />
              </button>

              {/* Info Tooltip Popover */}
              {showInfoPopover && (
                <div className="absolute right-0 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 top-9 z-50 w-72 p-3.5 bg-white text-slate-800 text-xs rounded-xl shadow-xl border border-slate-200/90 leading-relaxed animate-in fade-in zoom-in-95 duration-150">
                  <div className="font-bold text-emerald-700 mb-1.5 flex items-center gap-1.5 border-b border-slate-100 pb-1.5">
                    <Info className="w-4 h-4 text-emerald-600" /> 
                    List Sync Status
                  </div>
                  Workplace employee count, transport mode distribution, and carbon emissions are automatically synchronized with the Employee List.
                </div>
              )}
            </div>

            <span className="text-xs font-medium bg-slate-100 text-slate-700 px-3 py-1 rounded-full border border-slate-200/80">
              {siteBreakdown.length} Active Sites
            </span>

            {/* Export Report Button */}
            {onExportClick && (
              <button
                type="button"
                onClick={onExportClick}
                className="px-3.5 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 text-xs font-semibold rounded-lg shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-slate-500" />
                <span>Export Report</span>
              </button>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          {siteBreakdown.length > 0 ? (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 text-slate-500 text-xs font-medium border-b border-slate-200/80">
                  <th className="px-5 py-3">Active Work Site</th>
                  <th className="px-5 py-3 text-right">Employees (percentage)</th>
                  <th className="px-5 py-3 text-right">Selected Month(s) (tCO₂e)</th>
                  {showAnnualTotal && (
                    <th className="px-5 py-3 text-right">Annual 12-Month (tCO₂e)</th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-800">
                {siteBreakdown.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-5 py-3.5">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-900">{s.name}</span>
                          <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                            {s.siteCode || s.id}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          <span>{s.district}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-right font-medium text-slate-800">
                      <span className="font-bold text-slate-900 font-mono text-sm">{s.empCount.toLocaleString()}</span>
                      <span className="text-slate-500 text-xs ml-1.5">({s.sharePct}%)</span>
                    </td>
                    <td className="px-5 py-3.5 text-right font-semibold text-emerald-700 bg-emerald-50/20 font-mono text-sm">
                      {s.emissionsSelected.toFixed(2)}
                    </td>
                    {showAnnualTotal && (
                      <td className="px-5 py-3.5 text-right font-medium text-slate-900 font-mono text-sm">
                        {s.emissionsAnnual.toFixed(2)}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-8 text-center bg-slate-50">
              <p className="text-xs font-semibold text-slate-600">Employee list is currently empty.</p>
              <p className="text-[11px] text-slate-400 mt-1">
                Import your employee dataset or configure work sites to populate the overview.
              </p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

