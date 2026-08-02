import React from 'react';
import { 
  BarChart3, 
  MapPin, 
  Users, 
  Search, 
  Building2, 
  Download,
  Sparkles
} from 'lucide-react';
import { ActiveTab } from '../types';
import { MonthMultiSelect } from './MonthMultiSelect';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  selectedMonths: string[];
  onChangeSelectedMonths: (months: string[]) => void;
  workingDaysOfficeMap: Record<string, number>;
  onOpenWorkingDaysModal: () => void;
  onOpenSiteManagement: () => void;
  onImportClick: () => void;
  onExportClick: () => void;
  onResetClick: () => void;
  rosterLength: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  selectedMonths,
  onChangeSelectedMonths,
  workingDaysOfficeMap,
  onOpenWorkingDaysModal,
  onOpenSiteManagement,
  onImportClick,
  onExportClick,
  onResetClick,
  rosterLength
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-2xs">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        
        {/* Top Row */}
        <div className="py-3 flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100">
          
          {/* App Title & Subtitle */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-600 text-white rounded-xl shadow-xs shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
                Employee Commuting ESG Dashboard
                <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-mono">
                  Scope 3 Category 7
                </span>
              </h1>
              <p className="text-xs text-slate-500">
                Carbon Emission Quantification & Geodata Analytics for Hong Kong Operations
              </p>
            </div>
          </div>

          {/* Month Selector & Controls */}
          <div className="flex flex-wrap items-center gap-2">
            
            {/* Multi-Month Selector */}
            <MonthMultiSelect
              selectedMonths={selectedMonths}
              onChangeSelectedMonths={onChangeSelectedMonths}
              workingDaysOfficeMap={workingDaysOfficeMap}
              onOpenWorkingDaysModal={onOpenWorkingDaysModal}
            />

            {/* Manage Work Sites Button */}
            <button
              onClick={onOpenSiteManagement}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 border border-slate-200"
            >
              <Building2 className="w-3.5 h-3.5 text-purple-600" />
              Work Sites
            </button>

            {/* Export Data Button */}
            <button
              onClick={onExportClick}
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Data</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs - Full screen width aligned */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 py-1.5 w-full">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full px-4 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 whitespace-nowrap ${
              activeTab === 'dashboard'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/60'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Emissions Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('roster')}
            className={`w-full px-4 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 whitespace-nowrap ${
              activeTab === 'roster'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/60'
            }`}
          >
            <Users className="w-4 h-4 text-blue-400 shrink-0" />
            <span>Employee Roster</span>
            <span className="text-[10px] px-1.5 py-0.2 bg-slate-800 text-slate-200 rounded-full font-mono">
              {rosterLength}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('sampler')}
            className={`w-full px-4 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 whitespace-nowrap ${
              activeTab === 'sampler'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/60'
            }`}
          >
            <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
            <span>18 Districts Sampler</span>
          </button>

          <button
            onClick={() => setActiveTab('geocoder')}
            className={`w-full px-4 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 whitespace-nowrap ${
              activeTab === 'geocoder'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/60'
            }`}
          >
            <Search className="w-4 h-4 text-purple-400 shrink-0" />
            <span>Address Lookup</span>
          </button>
        </div>

      </div>
    </header>
  );
};
