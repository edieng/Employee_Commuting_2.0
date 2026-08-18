import React from 'react';
import { Users, Leaf, Calendar, Navigation, Building2 } from 'lucide-react';
import { TotalSummary } from '../types';

interface SummaryCardsProps {
  summary: TotalSummary;
  activeSitesCount: number;
  showAnnualTotal?: boolean;
  setShowAnnualTotal?: React.Dispatch<React.SetStateAction<boolean>>;
  onOpenSiteManagement?: () => void;
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({ 
  summary, 
  activeSitesCount,
  showAnnualTotal: externalShowAnnual,
  setShowAnnualTotal: externalSetShowAnnual,
  onOpenSiteManagement
}) => {
  const [internalShowAnnual, setInternalShowAnnual] = React.useState(false);

  const showAnnual = externalShowAnnual !== undefined ? externalShowAnnual : internalShowAnnual;
  const toggleAnnual = () => {
    if (externalSetShowAnnual) {
      externalSetShowAnnual(prev => !prev);
    } else {
      setInternalShowAnnual(prev => !prev);
    }
  };

  const isFullYear = summary.selectedMonthNames?.length === 12;
  const cardTitle = (showAnnual || isFullYear) ? 'Annual Total Emissions' : 'Selected Period Emissions';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* 1. Total Employees */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
        <div>
          <div className="flex items-center justify-between text-slate-500 h-6">
            <span className="text-xs font-normal text-slate-500">
              {summary.selectedMonthNames && summary.selectedMonthNames.length > 1 ? 'Avg Monthly Employees' : 'Total Employees'}
            </span>
            <div className="h-6" />
          </div>
          <div className="mt-3">
            <div className="text-3xl font-bold text-slate-900 font-sans tracking-tight">
              {summary.totalEmployees.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Carbon Emissions */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
        <div>
          <div className="flex items-center justify-between text-slate-500 h-6">
            <span className="text-xs font-normal text-slate-500">
              {cardTitle}
            </span>
            <div className="flex items-center gap-1.5 shrink-0 bg-slate-50 px-2 py-0.5 rounded-full border border-slate-200/80">
              <span className="text-[10px] font-semibold text-slate-600 uppercase">Annual</span>
              <button
                type="button"
                role="switch"
                aria-checked={showAnnual}
                onClick={toggleAnnual}
                className={`relative inline-flex h-3.5 w-6 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                  showAnnual ? 'bg-slate-900' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-2.5 w-2.5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                    showAnnual ? 'translate-x-2.5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-bold text-slate-900 font-sans tracking-tight flex items-baseline gap-1.5">
              {(showAnnual ? summary.totalAnnualCO2Tons : summary.selectedMonthsCO2Tons).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              <span className="text-xs font-normal text-slate-400">tCO₂e</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Average Commute Distance */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
        <div>
          <div className="flex items-center justify-between text-slate-500 h-6">
            <span className="text-xs font-normal text-slate-500">Avg Commute Distance</span>
            <div className="h-6" />
          </div>
          <div className="mt-3">
            <div className="text-3xl font-bold text-slate-900 font-sans tracking-tight flex items-baseline gap-1.5">
              {summary.averageDistanceKm}
              <span className="text-xs font-normal text-slate-400">km / trip</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Active Work Sites */}
      <div 
        onClick={onOpenSiteManagement}
        role={onOpenSiteManagement ? "button" : undefined}
        tabIndex={onOpenSiteManagement ? 0 : undefined}
        className={`bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between transition-all ${
          onOpenSiteManagement ? 'cursor-pointer hover:border-slate-300 hover:shadow-sm group' : 'hover:border-slate-300'
        }`}
      >
        <div>
          <div className="flex items-center justify-between text-slate-500 h-6">
            <span className="text-xs font-normal text-slate-500">Active Work Sites</span>
            {onOpenSiteManagement ? (
              <span className="text-[11px] font-semibold text-slate-700 bg-slate-50 border border-slate-200/80 px-2 py-0.5 rounded-full flex items-center gap-1 group-hover:bg-slate-100 transition-colors">
                <Building2 className="w-3 h-3 text-slate-500" />
                Manage →
              </span>
            ) : (
              <div className="h-6" />
            )}
          </div>
          <div className="mt-3">
            <div className="text-3xl font-bold text-slate-900 font-sans tracking-tight">
              {activeSitesCount}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
