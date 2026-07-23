import React from 'react';
import { Users, Leaf, Calendar, Navigation, Building2 } from 'lucide-react';
import { TotalSummary } from '../types';

interface SummaryCardsProps {
  summary: TotalSummary;
  activeSitesCount: number;
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({ summary, activeSitesCount }) => {
  const selectedMonthsCount = summary.selectedMonthNames.length;
  const monthSubtitle = selectedMonthsCount === 12
    ? "Full Year (12 Months)"
    : selectedMonthsCount === 1
    ? summary.selectedMonthNames[0]
    : `${selectedMonthsCount} Months Selected`;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      {/* 1. Total Employees */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-colors">
        <div className="flex items-center justify-between text-slate-500 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider">Total Employees</span>
          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
            <Users className="w-4 h-4" />
          </div>
        </div>
        <div>
          <div className="text-2xl font-bold text-slate-900 font-mono">
            {summary.totalEmployees.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Across 18 Hong Kong Districts
          </p>
        </div>
      </div>

      {/* 2. Selected Month(s) Carbon Emission */}
      <div className="bg-white rounded-xl p-4 border border-emerald-200 bg-emerald-50/20 shadow-xs flex flex-col justify-between hover:border-emerald-300 transition-colors">
        <div className="flex items-center justify-between text-slate-500 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
            Selected Month Emissions
          </span>
          <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg">
            <Calendar className="w-4 h-4" />
          </div>
        </div>
        <div>
          <div className="text-2xl font-bold text-emerald-700 font-mono">
            {summary.selectedMonthsCO2Tons.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            <span className="text-xs font-sans font-normal text-slate-500 ml-1">tCO₂e</span>
          </div>
          <p className="text-[11px] text-emerald-600 font-medium mt-1 truncate" title={summary.selectedMonthNames.join(', ')}>
            {monthSubtitle}
          </p>
        </div>
      </div>

      {/* 3. 12-Month Annual Carbon Emission (FIXED METRICS) */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-colors">
        <div className="flex items-center justify-between text-slate-500 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-700">
            Annual Total Emission
          </span>
          <div className="p-2 bg-teal-50 text-teal-600 rounded-lg">
            <Leaf className="w-4 h-4" />
          </div>
        </div>
        <div>
          <div className="text-2xl font-bold text-slate-900 font-mono">
            {summary.totalAnnualCO2Tons.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            <span className="text-xs font-sans font-normal text-slate-500 ml-1">tCO₂e</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Sum of 12 Months (Jan - Dec)
          </p>
        </div>
      </div>

      {/* 4. Average Commute Distance */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-colors">
        <div className="flex items-center justify-between text-slate-500 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider">Avg Commute Distance</span>
          <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
            <Navigation className="w-4 h-4" />
          </div>
        </div>
        <div>
          <div className="text-2xl font-bold text-slate-900 font-mono">
            {summary.averageDistanceKm}
            <span className="text-xs font-sans font-normal text-slate-500 ml-1">km / trip</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            {summary.walkingEmployeesCount} employees walk to work
          </p>
        </div>
      </div>

      {/* 5. Active Work Sites */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-colors">
        <div className="flex items-center justify-between text-slate-500 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider">Active Work Sites</span>
          <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
            <Building2 className="w-4 h-4" />
          </div>
        </div>
        <div>
          <div className="text-2xl font-bold text-slate-900 font-mono">
            {activeSitesCount}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Configured Workplaces
          </p>
        </div>
      </div>
    </div>
  );
};
