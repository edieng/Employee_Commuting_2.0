import React, { useState, useRef, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Trash2, 
  Upload, 
  ChevronLeft, 
  ChevronRight,
  ChevronDown,
  Info
} from 'lucide-react';
import { CustomWorkSite, RosterCalculationItem } from '../types';
import { DISTRICT_DATA, renderAreaSelectOptions } from '../utils/constants';

interface RosterTabProps {
  rosterCalcs: RosterCalculationItem[];
  customSites: CustomWorkSite[];
  onDeleteEmployee: (id: string) => void;
  onClearRoster: () => void;
  onOpenImportModal: () => void;
}

export const SEGMENT_OPTIONS = [
  "CEO Office", 
  "Finance", 
  "Legal", 
  "OP", 
  "P&C", 
  "IT", 
  "OBFITS", 
  "OBREDS", 
  "HTS SEC", 
  "PAM", 
  "EME"
];

export const RosterTab: React.FC<RosterTabProps> = ({
  rosterCalcs,
  customSites,
  onDeleteEmployee,
  onClearRoster,
  onOpenImportModal
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [districtFilter, setDistrictFilter] = useState('ALL');
  const [modeFilter, setModeFilter] = useState('ALL');
  const [siteFilter, setSiteFilter] = useState('ALL');
  const [showInfoPopover, setShowInfoPopover] = useState(false);
  const [showModeRatioPopover, setShowModeRatioPopover] = useState(false);

  const infoPopoverRef = useRef<HTMLDivElement>(null);
  const modeRatioPopoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (infoPopoverRef.current && !infoPopoverRef.current.contains(event.target as Node)) {
        setShowInfoPopover(false);
      }
      if (modeRatioPopoverRef.current && !modeRatioPopoverRef.current.contains(event.target as Node)) {
        setShowModeRatioPopover(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  // Filtered Roster
  const filteredRoster = rosterCalcs.filter(emp => {
    const matchesSearch = emp.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          emp.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          emp.siteMatchedName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDistrict = districtFilter === 'ALL' || emp.district === districtFilter;
    const matchesMode = modeFilter === 'ALL' || emp.mode === modeFilter;
    const matchesSite = siteFilter === 'ALL' || emp.site === siteFilter;

    return matchesSearch && matchesDistrict && matchesMode && matchesSite;
  });

  const totalPages = Math.ceil(filteredRoster.length / itemsPerPage) || 1;
  const paginatedRoster = filteredRoster.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      
      {/* Top Action Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-slate-700" />
            <span>Employee List</span>
            <span className="text-xs bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full font-medium border border-slate-200">
              {rosterCalcs.length} Total Records
            </span>
            <div className="relative inline-flex items-center ml-1" ref={infoPopoverRef}>
              <button
                type="button"
                onClick={() => setShowInfoPopover(!showInfoPopover)}
                title="Employee List Info"
                className="p-1 text-slate-400 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <Info className="w-4 h-4 text-emerald-600" />
              </button>
              {showInfoPopover && (
                <div className="absolute left-0 top-7 z-50 w-72 p-3.5 bg-white text-slate-800 text-xs rounded-xl shadow-xl border border-slate-200/90 leading-relaxed font-normal">
                  <div className="font-bold text-emerald-700 mb-1.5 flex items-center gap-1.5 border-b border-slate-100 pb-1.5">
                    <Info className="w-4 h-4 text-emerald-600" /> Employee List
                  </div>
                  Displays employee records including Employee ID, Area and Work Site.
                </div>
              )}
            </div>
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenImportModal}
            className="px-3.5 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 text-xs font-semibold rounded-lg shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5 text-slate-500" />
            Upload File (.xlsx/csv)
          </button>

          {rosterCalcs.length > 0 && (
            <button
              onClick={onClearRoster}
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors border border-slate-200 cursor-pointer"
            >
              Clear Roster
            </button>
          )}
        </div>
      </div>

      {/* Search & Filters Bar styled like reference image */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Left: Search input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
          <input
            type="text"
            placeholder="Search employee ID, area, work site..."
            value={searchTerm}
            onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200/90 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-slate-900 bg-white text-slate-800 placeholder-slate-400 shadow-2xs transition-all"
          />
        </div>

        {/* Right: Filter Dropdowns styled as clean control buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Area Filter */}
          <div className="relative">
            <select
              value={districtFilter}
              onChange={e => { setDistrictFilter(e.target.value); setCurrentPage(1); }}
              className="appearance-none px-3.5 py-2 pr-8 text-xs border border-slate-200/90 rounded-xl bg-white font-medium text-slate-700 shadow-2xs hover:bg-slate-50 focus:ring-2 focus:ring-slate-900 transition-all cursor-pointer"
            >
              {renderAreaSelectOptions(true, "All Areas")}
            </select>
            <div className="pointer-events-none absolute right-2.5 top-2.5 text-slate-400">
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>

          {/* Mode Filter */}
          <div className="relative">
            <select
              value={modeFilter}
              onChange={e => { setModeFilter(e.target.value); setCurrentPage(1); }}
              className="appearance-none px-3.5 py-2 pr-8 text-xs border border-slate-200/90 rounded-xl bg-white font-medium text-slate-700 shadow-2xs hover:bg-slate-50 focus:ring-2 focus:ring-slate-900 transition-all cursor-pointer"
            >
              <option value="ALL">All Transport Modes</option>
              <option value="MTR">MTR</option>
              <option value="Bus">Bus</option>
              <option value="Private Car">Private Car</option>
              <option value="Walk">Walk</option>
            </select>
            <div className="pointer-events-none absolute right-2.5 top-2.5 text-slate-400">
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>

          {/* Work Site Filter */}
          <div className="relative">
            <select
              value={siteFilter}
              onChange={e => { setSiteFilter(e.target.value); setCurrentPage(1); }}
              className="appearance-none px-3.5 py-2 pr-8 text-xs border border-slate-200/90 rounded-xl bg-white font-medium text-slate-700 shadow-2xs hover:bg-slate-50 focus:ring-2 focus:ring-slate-900 transition-all cursor-pointer"
            >
              <option value="ALL">All Work Sites</option>
              {customSites.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-2.5 top-2.5 text-slate-400">
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Roster Table styled exactly like reference image */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white text-slate-500 text-xs font-medium border-b border-slate-200/80">
                <th className="px-6 py-4">Employee ID</th>
                <th className="px-6 py-4">Area</th>
                <th className="px-6 py-4">Work Site</th>
                <th className="px-6 py-4">
                  <div className="flex items-center gap-1.5 relative" ref={modeRatioPopoverRef}>
                    <span>Transport Mode</span>
                    <button
                      type="button"
                      onClick={() => setShowModeRatioPopover(!showModeRatioPopover)}
                      className="p-1 text-slate-400 hover:text-slate-900 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
                      title="Regional Transport Allocation Info"
                    >
                      <Info className="w-3.5 h-3.5 text-emerald-600" />
                    </button>

                    {showModeRatioPopover && (
                      <div className="absolute left-0 top-8 z-50 w-80 max-h-80 overflow-y-auto p-4 bg-white text-slate-800 text-xs rounded-xl shadow-xl border border-slate-200/90 leading-relaxed font-normal normal-case space-y-3">
                        <div className="font-bold text-emerald-700 flex items-center justify-between border-b border-slate-100 pb-2">
                          <span className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold">
                            <Info className="w-4 h-4 text-emerald-600" />
                            HK Regional Transport Allocation Ratios
                          </span>
                          <span className="text-[10px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-md font-bold">
                            Rule Engine
                          </span>
                        </div>

                        <p className="text-[11px] text-slate-600">
                          Mode split allocation ratios by region for unassigned employee records:
                        </p>

                        <div className="space-y-2 text-[11px]">
                          <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                            <span className="font-bold text-slate-900 block mb-1">Hong Kong Island</span>
                            <div className="font-mono text-slate-700 space-y-0.5">
                              <div className="flex justify-between"><span>MTR:</span> <strong className="text-emerald-700 font-bold">70% (0.70)</strong></div>
                              <div className="flex justify-between"><span>Bus:</span> <strong className="text-emerald-700 font-bold">27% (0.27)</strong></div>
                              <div className="flex justify-between"><span>Private Car:</span> <strong className="text-emerald-700 font-bold">3% (0.03)</strong></div>
                            </div>
                          </div>

                          <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                            <span className="font-bold text-slate-900 block mb-1">New Territories (NT)</span>
                            <div className="font-mono text-slate-700 space-y-0.5">
                              <div className="flex justify-between"><span>MTR:</span> <strong className="text-emerald-700 font-bold">40% (0.40)</strong></div>
                              <div className="flex justify-between"><span>Bus:</span> <strong className="text-emerald-700 font-bold">57% (0.57)</strong></div>
                              <div className="flex justify-between"><span>Private Car:</span> <strong className="text-emerald-700 font-bold">3% (0.03)</strong></div>
                            </div>
                          </div>

                          <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                            <span className="font-bold text-slate-900 block mb-1">Kowloon</span>
                            <div className="font-mono text-slate-700 space-y-0.5">
                              <div className="flex justify-between"><span>MTR:</span> <strong className="text-emerald-700 font-bold">60% (0.60)</strong></div>
                              <div className="flex justify-between"><span>Bus:</span> <strong className="text-emerald-700 font-bold">37% (0.37)</strong></div>
                              <div className="flex justify-between"><span>Private Car:</span> <strong className="text-emerald-700 font-bold">3% (0.03)</strong></div>
                            </div>
                          </div>
                        </div>

                        <div className="p-2.5 bg-emerald-50 rounded-lg border border-emerald-200 text-[11px] text-emerald-900">
                          <strong className="text-emerald-800 font-bold">Walk Rule:</strong> Distance ≤ 1.2 km is automatically assigned as <strong>Walk</strong> (100%).
                        </div>
                      </div>
                    )}
                  </div>
                </th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-800 font-sans">
              {paginatedRoster.length > 0 ? (
                paginatedRoster.map((emp) => {
                  return (
                    <tr key={emp.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="px-6 py-4 font-semibold text-slate-900 text-sm">{emp.id}</td>
                      <td className="px-6 py-4 text-slate-600 font-normal text-xs">{emp.district}</td>
                      <td className="px-6 py-4 text-slate-800 font-medium">{emp.siteMatchedName}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-[11px] font-medium shadow-2xs ${
                          emp.mode === 'MTR' ? 'bg-emerald-500 text-white' :
                          emp.mode === 'Bus' ? 'bg-amber-500 text-white' :
                          emp.mode === 'Private Car' ? 'bg-blue-600 text-white' :
                          'bg-slate-700 text-white'
                        }`}>
                          {emp.mode}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => onDeleteEmployee(emp.id)}
                          title="Delete Employee"
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400 text-xs">
                    No employees found matching the filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="px-6 py-3.5 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>
            Showing <strong className="text-slate-800 font-semibold">{paginatedRoster.length}</strong> of <strong className="text-slate-800 font-semibold">{filteredRoster.length}</strong> filtered employees
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 border border-slate-200 rounded-lg hover:bg-white disabled:opacity-40 transition-colors cursor-pointer bg-white"
            >
              <ChevronLeft className="w-4 h-4 text-slate-600" />
            </button>
            <span className="text-slate-600 font-medium px-1">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 border border-slate-200 rounded-lg hover:bg-white disabled:opacity-40 transition-colors cursor-pointer bg-white"
            >
              <ChevronRight className="w-4 h-4 text-slate-600" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
