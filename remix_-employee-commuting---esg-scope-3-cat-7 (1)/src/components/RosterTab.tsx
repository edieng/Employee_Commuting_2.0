import React, { useState, useRef, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Trash2, 
  Pencil, 
  Upload, 
  ChevronLeft, 
  ChevronRight,
  ChevronDown,
  Info,
  X,
  Check,
  Plus,
  Calendar
} from 'lucide-react';
import { CustomWorkSite, RosterCalculationItem, CommuteRosterItem, MonthlyRosterMap } from '../types';
import { DISTRICT_DATA, renderAreaSelectOptions, MONTHS_LIST, MONTH_ABBRS } from '../utils/constants';

interface RosterTabProps {
  rosterCalcs: RosterCalculationItem[];
  customSites: CustomWorkSite[];
  monthlyRosters?: MonthlyRosterMap;
  selectedMonths?: string[];
  onDeleteEmployee: (id: string, month?: string) => void;
  onEditEmployee?: (updatedItem: CommuteRosterItem, originalId?: string, month?: string) => void;
  onAddEmployee?: (newItem: CommuteRosterItem, month?: string) => void;
  onClearRoster: (month?: string) => void;
  onOpenImportModal: () => void;
}

export const RosterTab: React.FC<RosterTabProps> = ({
  rosterCalcs,
  customSites,
  monthlyRosters,
  selectedMonths = ["September"],
  onDeleteEmployee,
  onEditEmployee,
  onAddEmployee,
  onClearRoster,
  onOpenImportModal
}) => {
  const [activeMonthFilter, setActiveMonthFilter] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [districtFilter, setDistrictFilter] = useState('ALL');
  const [modeFilter, setModeFilter] = useState('ALL');
  const [siteFilter, setSiteFilter] = useState('ALL');
  const [workerTypeFilter, setWorkerTypeFilter] = useState('ALL');
  const [showInfoPopover, setShowInfoPopover] = useState(false);
  const [showModeRatioPopover, setShowModeRatioPopover] = useState(false);

  // Edit / Add Employee Modal State
  const [editingEmp, setEditingEmp] = useState<CommuteRosterItem | null>(null);
  const [editingMonth, setEditingMonth] = useState<string | undefined>(undefined);
  const [originalEmpId, setOriginalEmpId] = useState<string>('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newEmpData, setNewEmpData] = useState<CommuteRosterItem>({
    id: '',
    district: 'Sha Tin',
    site: customSites[0]?.id || 'SITE-QB',
    workerType: 'Office',
    mode: 'MTR'
  });

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
  const [itemsPerPage, setItemsPerPage] = useState(15);

  // Filtered Roster
  const filteredRoster = rosterCalcs.filter(emp => {
    const matchesMonth = activeMonthFilter === 'ALL' || emp.month === activeMonthFilter;
    const matchesSearch = emp.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          emp.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          emp.siteMatchedName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (emp.workerType && emp.workerType.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesDistrict = districtFilter === 'ALL' || emp.district === districtFilter;
    const matchesMode = modeFilter === 'ALL' || emp.mode === modeFilter;
    const matchesSite = siteFilter === 'ALL' || emp.site === siteFilter;
    const matchesWorkerType = workerTypeFilter === 'ALL' || emp.workerType === workerTypeFilter;

    return matchesMonth && matchesSearch && matchesDistrict && matchesMode && matchesSite && matchesWorkerType;
  });

  const totalPages = Math.ceil(filteredRoster.length / itemsPerPage) || 1;
  const paginatedRoster = filteredRoster.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  );

  const handleStartEdit = (emp: RosterCalculationItem) => {
    setOriginalEmpId(emp.id);
    setEditingMonth(emp.month);
    setEditingEmp({
      id: emp.id,
      district: emp.district,
      site: emp.site || customSites[0]?.id || 'SITE-QB',
      workerType: emp.workerType || 'Office',
      mode: emp.mode
    });
  };

  const handleSaveEdit = () => {
    if (!editingEmp || !onEditEmployee) return;
    if (!editingEmp.id.trim()) {
      alert("Employee ID cannot be empty.");
      return;
    }
    onEditEmployee(editingEmp, originalEmpId, editingMonth);
    setEditingEmp(null);
  };

  const handleSaveNew = () => {
    if (!onAddEmployee) return;
    if (!newEmpData.id.trim()) {
      alert("Employee ID is required.");
      return;
    }
    onAddEmployee(newEmpData, activeMonthFilter !== 'ALL' ? activeMonthFilter : undefined);
    setIsAddModalOpen(false);
    setNewEmpData({
      id: '',
      district: 'Sha Tin',
      site: customSites[0]?.id || 'SITE-QB',
      workerType: 'Office',
      mode: 'MTR'
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Top Action Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-slate-700" />
            <span>Employee List</span>
            <span className="text-xs bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full font-medium border border-slate-200 font-mono">
              {filteredRoster.length} Records
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
                  Displays employee commute records across reporting months. You can inspect month-by-month or view the aggregate reporting period.
                </div>
              )}
            </div>
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenImportModal}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 text-xs font-semibold rounded-lg shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5 text-slate-600" />
            Upload 12 Months Data (.xlsx/csv)
          </button>

          {filteredRoster.length > 0 && (
            <button
              onClick={() => onClearRoster(activeMonthFilter !== 'ALL' ? activeMonthFilter : undefined)}
              className="px-3.5 py-2 bg-transparent hover:bg-rose-50 text-slate-700 hover:text-rose-700 border border-slate-200 hover:border-rose-200 text-xs font-semibold rounded-lg shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5 text-slate-500" />
              Clear {activeMonthFilter !== 'ALL' ? MONTH_ABBRS[activeMonthFilter] : 'List'}
            </button>
          )}
        </div>
      </div>

      {/* 12-Month Quick Tab Selector */}
      {monthlyRosters && (
        <div className="bg-white rounded-xl border border-slate-200 p-2 shadow-2xs overflow-x-auto">
          <div className="flex items-center gap-1.5 min-w-max">
            <span className="text-[11px] font-semibold text-slate-400 px-2 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>Month:</span>
            </span>

            <button
              onClick={() => { setActiveMonthFilter('ALL'); setCurrentPage(1); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeMonthFilter === 'ALL'
                  ? 'bg-slate-200 text-slate-900 border border-slate-300 font-bold shadow-2xs'
                  : 'bg-transparent hover:bg-slate-100 text-slate-700 border border-slate-200/80'
              }`}
            >
              All Selected ({rosterCalcs.length})
            </button>

            {MONTHS_LIST.map(month => {
              const count = monthlyRosters[month]?.length || 0;
              const isSelected = activeMonthFilter === month;
              const isReportingSelected = selectedMonths.includes(month);

              return (
                <button
                  key={month}
                  onClick={() => { setActiveMonthFilter(month); setCurrentPage(1); }}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-slate-200 text-slate-900 border border-slate-300 font-bold shadow-2xs'
                      : count > 0
                        ? isReportingSelected 
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 font-semibold'
                          : 'bg-transparent text-slate-700 border border-slate-200 hover:bg-slate-50'
                        : 'bg-transparent text-slate-400 border border-dashed border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span>{MONTH_ABBRS[month]}</span>
                  {count > 0 ? (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                      isSelected ? 'bg-slate-300 text-slate-900' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {count}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Search & Filters Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Left: Search input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
          <input
            type="text"
            placeholder="Search employee ID, home area, work site, role..."
            value={searchTerm}
            onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200/90 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-slate-900 bg-white text-slate-800 placeholder-slate-400 shadow-2xs transition-all"
          />
        </div>

        {/* Right: Filter Dropdowns */}
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

          {/* Worker Type Filter */}
          <div className="relative">
            <select
              value={workerTypeFilter}
              onChange={e => { setWorkerTypeFilter(e.target.value); setCurrentPage(1); }}
              className="appearance-none px-3.5 py-2 pr-8 text-xs border border-slate-200/90 rounded-xl bg-white font-medium text-slate-700 shadow-2xs hover:bg-slate-50 focus:ring-2 focus:ring-slate-900 transition-all cursor-pointer"
            >
              <option value="ALL">All Worker Types</option>
              <option value="Office">Office</option>
              <option value="Frontline">Frontline</option>
            </select>
            <div className="pointer-events-none absolute right-2.5 top-2.5 text-slate-400">
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Employee List Table with Columns */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white text-slate-500 text-xs font-medium border-b border-slate-200/80">
                <th className="px-6 py-4 font-semibold text-slate-900">Employee ID</th>
                {activeMonthFilter === 'ALL' && (
                  <th className="px-4 py-4 font-semibold text-slate-900">Month</th>
                )}
                <th className="px-6 py-4 font-semibold text-slate-900">Home Area</th>
                <th className="px-6 py-4 font-semibold text-slate-900">Work Site</th>
                <th className="px-6 py-4 font-semibold text-slate-900">Worker Type</th>
                <th className="px-6 py-4 font-semibold text-slate-900">
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
                <th className="px-6 py-4 text-right font-semibold text-slate-900">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-800 font-sans">
              {paginatedRoster.length > 0 ? (
                paginatedRoster.map((emp) => {
                  return (
                    <tr key={`${emp.id}-${emp.month || 'default'}`} className="hover:bg-slate-50/60 transition-colors">
                      {/* 1. Employee ID */}
                      <td className="px-6 py-4 font-semibold text-slate-900 font-mono text-xs">{emp.id}</td>
                      
                      {/* Optional Month Column */}
                      {activeMonthFilter === 'ALL' && (
                        <td className="px-4 py-4 font-medium text-slate-500 text-xs">
                          {emp.month ? (
                            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-semibold">
                              {MONTH_ABBRS[emp.month] || emp.month}
                            </span>
                          ) : '-'}
                        </td>
                      )}

                      {/* 2. Home Area */}
                      <td className="px-6 py-4 text-slate-700 font-medium text-xs">{emp.district}</td>
                      
                      {/* 3. Work Site */}
                      <td className="px-6 py-4 text-slate-800 font-medium text-xs">{emp.siteMatchedName}</td>
                      
                      {/* 4. Worker Type */}
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md font-medium text-[11px] bg-slate-100 text-slate-700 border border-slate-200">
                          {emp.workerType || 'Office'}
                        </span>
                      </td>

                      {/* 5. Transport Mode */}
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-medium border ${
                          emp.mode === 'MTR' ? 'bg-emerald-50 text-emerald-800 border-emerald-200/90' :
                          emp.mode === 'Bus' ? 'bg-amber-50 text-amber-800 border-amber-200/90' :
                          emp.mode === 'Private Car' ? 'bg-blue-50 text-blue-800 border-blue-200/90' :
                          emp.mode === 'Walk' ? 'bg-teal-50 text-teal-800 border-teal-200/90' :
                          'bg-slate-50 text-slate-700 border-slate-200'
                        }`}>
                          {emp.mode}
                        </span>
                      </td>

                      {/* 6. Action */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => handleStartEdit(emp)}
                            title="Edit Employee"
                            className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onDeleteEmployee(emp.id, emp.month)}
                            title="Delete Employee"
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={activeMonthFilter === 'ALL' ? 7 : 6} className="px-6 py-12 text-center text-slate-400 text-xs">
                    {rosterCalcs.length === 0 ? (
                      <div>
                        <p className="font-semibold text-slate-700 mb-1">Employee list is currently empty.</p>
                        <p className="text-slate-400 text-[11px]">Click "Upload 12 Months Data" above to upload your monthly Excel files.</p>
                      </div>
                    ) : (
                      <p>No employees found matching the current filters.</p>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="px-6 py-3.5 bg-slate-50/50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex flex-wrap items-center gap-3">
            <span>
              Showing <strong className="text-slate-800 font-semibold">{paginatedRoster.length}</strong> of <strong className="text-slate-800 font-semibold">{filteredRoster.length}</strong> filtered employees
            </span>

            <div className="flex items-center gap-1.5 pl-3 border-l border-slate-200">
              <span className="text-slate-500 font-medium">Rows per page:</span>
              <div className="relative">
                <select
                  value={itemsPerPage}
                  onChange={e => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="appearance-none pl-2.5 pr-7 py-1 text-xs border border-slate-200/90 rounded-lg bg-white font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 focus:ring-2 focus:ring-slate-900 transition-all cursor-pointer"
                >
                  <option value={15}>15</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                  <option value={250}>250</option>
                  <option value={Math.max(filteredRoster.length, 1)}>All ({filteredRoster.length})</option>
                </select>
                <div className="pointer-events-none absolute right-1.5 top-1.5 text-slate-400">
                  <ChevronDown className="h-3.5 w-3.5" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-medium text-slate-600">
              Page <strong className="font-semibold text-slate-900">{currentPage}</strong> of <strong className="font-semibold text-slate-900">{totalPages}</strong>
            </span>
            <div className="flex items-center gap-1">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                className="p-1 rounded-lg border border-slate-200 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 text-slate-700" />
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                className="p-1 rounded-lg border border-slate-200 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4 text-slate-700" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Employee Modal */}
      {editingEmp && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Edit Employee Record</h3>
              <button 
                onClick={() => setEditingEmp(null)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Employee ID</label>
                <input
                  type="text"
                  value={editingEmp.id}
                  onChange={e => setEditingEmp({ ...editingEmp, id: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl font-mono focus:ring-2 focus:ring-slate-900 bg-slate-50 text-slate-900 font-bold"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Home Area</label>
                <div className="relative">
                  <select
                    value={editingEmp.district}
                    onChange={e => setEditingEmp({ ...editingEmp, district: e.target.value })}
                    className="w-full appearance-none px-3 py-2 pr-8 border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-slate-900 text-slate-800"
                  >
                    {renderAreaSelectOptions(false)}
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-2.5 top-2.5 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Assigned Work Site</label>
                <div className="relative">
                  <select
                    value={editingEmp.site || customSites[0]?.id}
                    onChange={e => setEditingEmp({ ...editingEmp, site: e.target.value })}
                    className="w-full appearance-none px-3 py-2 pr-8 border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-slate-900 text-slate-800"
                  >
                    {customSites.map(s => (
                      <option key={s.id} value={s.id}>{s.name} ({s.siteCode || s.id})</option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-2.5 top-2.5 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Worker Type</label>
                  <div className="relative">
                    <select
                      value={editingEmp.workerType || 'Office'}
                      onChange={e => setEditingEmp({ ...editingEmp, workerType: e.target.value as any })}
                      className="w-full appearance-none px-3 py-2 pr-8 border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-slate-900 text-slate-800"
                    >
                      <option value="Office">Office</option>
                      <option value="Frontline">Frontline</option>
                    </select>
                    <ChevronDown className="w-4 h-4 absolute right-2.5 top-2.5 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Transport Mode</label>
                  <div className="relative">
                    <select
                      value={editingEmp.mode}
                      onChange={e => setEditingEmp({ ...editingEmp, mode: e.target.value as any })}
                      className="w-full appearance-none px-3 py-2 pr-8 border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-slate-900 text-slate-800"
                    >
                      <option value="MTR">MTR</option>
                      <option value="Bus">Bus</option>
                      <option value="Private Car">Private Car</option>
                      <option value="Walk">Walk</option>
                    </select>
                    <ChevronDown className="w-4 h-4 absolute right-2.5 top-2.5 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => setEditingEmp(null)}
                className="px-4 py-2 bg-transparent hover:bg-slate-100 text-slate-700 border border-transparent hover:border-slate-200 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Employee Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Plus className="w-4 h-4 text-emerald-600" />
                <span>Add Employee</span>
              </h3>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Employee ID *</label>
                <input
                  type="text"
                  placeholder="e.g. EMP-001"
                  value={newEmpData.id}
                  onChange={e => setNewEmpData({ ...newEmpData, id: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl font-mono focus:ring-2 focus:ring-slate-900 bg-white text-slate-900 font-bold"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Home Area</label>
                <div className="relative">
                  <select
                    value={newEmpData.district}
                    onChange={e => setNewEmpData({ ...newEmpData, district: e.target.value })}
                    className="w-full appearance-none px-3 py-2 pr-8 border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-slate-900 text-slate-800"
                  >
                    {renderAreaSelectOptions(false)}
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-2.5 top-2.5 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Assigned Work Site</label>
                <div className="relative">
                  <select
                    value={newEmpData.site || customSites[0]?.id}
                    onChange={e => setNewEmpData({ ...newEmpData, site: e.target.value })}
                    className="w-full appearance-none px-3 py-2 pr-8 border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-slate-900 text-slate-800"
                  >
                    {customSites.map(s => (
                      <option key={s.id} value={s.id}>{s.name} ({s.siteCode || s.id})</option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-2.5 top-2.5 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Worker Type</label>
                  <div className="relative">
                    <select
                      value={newEmpData.workerType || 'Office'}
                      onChange={e => setNewEmpData({ ...newEmpData, workerType: e.target.value as any })}
                      className="w-full appearance-none px-3 py-2 pr-8 border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-slate-900 text-slate-800"
                    >
                      <option value="Office">Office</option>
                      <option value="Frontline">Frontline</option>
                    </select>
                    <ChevronDown className="w-4 h-4 absolute right-2.5 top-2.5 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Transport Mode</label>
                  <div className="relative">
                    <select
                      value={newEmpData.mode}
                      onChange={e => setNewEmpData({ ...newEmpData, mode: e.target.value as any })}
                      className="w-full appearance-none px-3 py-2 pr-8 border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-slate-900 text-slate-800"
                    >
                      <option value="MTR">MTR</option>
                      <option value="Bus">Bus</option>
                      <option value="Private Car">Private Car</option>
                      <option value="Walk">Walk</option>
                    </select>
                    <ChevronDown className="w-4 h-4 absolute right-2.5 top-2.5 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 bg-transparent hover:bg-slate-100 text-slate-700 border border-transparent hover:border-slate-200 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNew}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Add Employee
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
