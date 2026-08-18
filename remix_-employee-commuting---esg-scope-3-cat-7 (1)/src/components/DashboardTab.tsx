import React, { useState, useRef, useEffect } from 'react';
import { Download, Info } from 'lucide-react';
import { DistrictCalculation, TotalSummary, CustomWorkSite } from '../types';
import { SummaryCards } from './SummaryCards';

interface DashboardTabProps {
  summary: TotalSummary;
  districtCalcs: DistrictCalculation[];
  customSites: CustomWorkSite[];
  selectedMonths: string[];
  onExportClick?: () => void;
  onOpenSiteManagement?: () => void;
}

export const DashboardTab: React.FC<DashboardTabProps> = ({
  summary,
  districtCalcs,
  customSites,
  selectedMonths,
  onExportClick,
  onOpenSiteManagement
}) => {
  const [showAnnualTotal, setShowAnnualTotal] = useState(false);
  const [showInfoPopover, setShowInfoPopover] = useState(false);
  const infoPopoverRef = useRef<HTMLDivElement>(null);
  const activeSitesCount = customSites.filter(s => s.visible !== false).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (infoPopoverRef.current && !infoPopoverRef.current.contains(event.target as Node)) {
        setShowInfoPopover(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

      {/* District Emissions Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="px-6 py-4 bg-white border-b border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div>
              <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                Hong Kong Area Commute Breakdown
              </h3>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Info Button */}
            <div className="relative" ref={infoPopoverRef}>
              <button
                type="button"
                onClick={() => setShowInfoPopover(!showInfoPopover)}
                title="Roster Sync Status"
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
                  Employee count, commuting distance, transport mode distribution, and carbon emissions are automatically synchronized with the Employee List.
                </div>
              )}
            </div>

            <span className="text-xs font-medium bg-slate-100 text-slate-700 px-3 py-1 rounded-full border border-slate-200/80">
              {districtCalcs.length} Active Areas
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
          {districtCalcs.length > 0 ? (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 text-slate-500 text-xs font-medium border-b border-slate-200/80">
                  <th className="px-5 py-3">Area (EN / ZH)</th>
                  <th className="px-5 py-3 text-right">Employees</th>
                  <th className="px-5 py-3 text-right">Selected Month(s) (tCO₂e)</th>
                  {showAnnualTotal && (
                    <th className="px-5 py-3 text-right">Annual 12-Month (tCO₂e)</th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-800">
                {districtCalcs.map((d) => (
                  <tr key={d.name} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-5 py-3 font-semibold text-slate-900">
                      {d.name} <span className="text-slate-400 text-[11px] font-normal ml-1">({d.nameZH})</span>
                    </td>
                    <td className="px-5 py-3 text-right font-medium text-slate-800">
                      {d.employees}
                    </td>
                    <td className="px-5 py-3 text-right text-slate-500">
                      {d.avgDistance} km
                    </td>
                    <td className="px-5 py-3 text-right font-semibold text-emerald-700 bg-emerald-50/20">
                      {d.tCO2eSelectedMonths.toFixed(2)}
                    </td>
                    {showAnnualTotal && (
                      <td className="px-5 py-3 text-right font-medium text-slate-900">
                        {d.tCO2eYear.toFixed(2)}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-8 text-center bg-slate-50">
              <p className="text-xs font-semibold text-slate-600">Employee Roster is currently empty.</p>
              <p className="text-[11px] text-slate-400 mt-1">
                Import your employee dataset to populate district breakdowns aligned with real employee residency.
              </p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

