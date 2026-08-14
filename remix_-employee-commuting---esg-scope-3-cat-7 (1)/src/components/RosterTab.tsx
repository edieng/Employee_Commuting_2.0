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
  Plus
} from 'lucide-react';
import { CustomWorkSite, RosterCalculationItem, CommuteRosterItem } from '../types';
import { DISTRICT_DATA, renderAreaSelectOptions } from '../utils/constants';

interface RosterTabProps {
  rosterCalcs: RosterCalculationItem[];
  customSites: CustomWorkSite[];
  onDeleteEmployee: (id: string) => void;
  onEditEmployee?: (updatedItem: CommuteRosterItem, originalId?: string) => void;
  onAddEmployee?: (newItem: CommuteRosterItem) => void;
  onClearRoster: () => void;
  onOpenImportModal: () => void;
}

export const RosterTab: React.FC<RosterTabProps> = ({
  rosterCalcs,
  customSites,
  onDeleteEmployee,
  onEditEmployee,
  onAddEmployee,
  onClearRoster,
  onOpenImportModal
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [districtFilter, setDistrictFilter] = useState('ALL');
  const [modeFilter, setModeFilter] = useState('ALL');
  const [siteFilter, setSiteFilter] = useState('ALL');
  const [workerTypeFilter, setWorkerTypeFilter] = useState('ALL');
  const [showInfoPopover, setShowInfoPopover] = useState(false);
  const [showModeRatioPopover, setShowModeRatioPopover] = useState(false);

  // Edit / Add Employee Modal State
  const [editingEmp, setEditingEmp] = useState<CommuteRosterItem | null>(null);
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
    const matchesSearch = emp.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          emp.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          emp.siteMatchedName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (emp.workerType && emp.workerType.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesDistrict = districtFilter === 'ALL' || emp.district === districtFilter;
    const matchesMode = modeFilter === 'ALL' || emp.mode === modeFilter;
    const matchesSite = siteFilter === 'ALL' || emp.site === siteFilter;
    const matchesWorkerType = workerTypeFilter === 'ALL' || emp.workerType === workerTypeFilter;

    return matchesSearch && matchesDistrict && matchesMode && matchesSite && matchesWorkerType;
  });

  const totalPages = Math.ceil(filteredRoster.length / itemsPerPage) || 1;
  const paginatedRoster = filteredRoster.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  );

  const handleStartEdit = (emp: RosterCalculationItem) => {
    setOriginalEmpId(emp.id);
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
    onEditEmployee(editingEmp, originalEmpId);
    setEditingEmp(null);
  };

  const handleSaveNew = () => {
    if (!onAddEmployee) return;
    if (!newEmpData.id.trim()) {
      alert("Employee ID is required.");
      return;
    }
    onAddEmployee(newEmpData);
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
                  Displays employee records including Employee ID, Home Area, Work Site, Worker Type, and Transport Mode.
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
              className="px-3.5 py-2 bg-slate-50 hover:bg-rose-50 text-slate-700 hover:text-rose-700 border border-slate-200 hover:border-rose-200 text-xs font-semibold rounded-lg shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5 text-slate-500" />
              Clear List
            </button>
          )}
        </div>
      </div>

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

      {/* Roster Table with 6 Columns */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white text-slate-500 text-xs font-medium border-b border-slate-200/80">
                <th className="px-6 py-4 font-semibold text-slate-900">Employee ID</th>
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
                    <tr key={emp.id} className="hover:bg-slate-50/60 transition-colors">
                      {/* 1. Employee ID */}
                      <td className="px-6 py-4 font-semibold text-slate-900 font-mono text-xs">{emp.id}</td>
                      
                      {/* 2. Home Area */}
                      <td className="px-6 py-4 text-slate-700 font-medium text-xs">{emp.district}</td>
                      
                      {/* 3. Work Site */}
                      <td className="px-6 py-4 text-slate-800 font-medium text-xs">{emp.siteMatchedName}</td>
                      
                      {/* 4. Worker Type */}
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md font-medium text-[11px] border ${
                          emp.workerType === 'Frontline' 
                            ? 'bg-amber-50 text-amber-800 border-amber-200/90' 
                            : 'bg-slate-100 text-slate-700 border-slate-200/80'
                        }`}>
                          {emp.workerType || 'Office'}
                        </span>
                      </td>

                      {/* 5. Transport Mode */}
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
                            onClick={() => onDeleteEmployee(emp.id)}
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
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400 text-xs">
                    No employees found matching the filters.
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

      {/* Edit Employee Modal */}
      {editingEmp && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Pencil className="w-4 h-4 text-blue-400" />
                <h3 className="text-sm font-bold">Edit Employee Record</h3>
              </div>
              <button
                onClick={() => setEditingEmp(null)}
                className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Employee ID</label>
                <input
                  type="text"
                  value={editingEmp.id}
                  onChange={e => setEditingEmp({ ...editingEmp, id: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono focus:ring-2 focus:ring-blue-500 font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Home Area</label>
                <select
                  value={editingEmp.district}
                  onChange={e => setEditingEmp({ ...editingEmp, district: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 font-medium"
                >
                  {renderAreaSelectOptions(false)}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Work Site</label>
                <select
                  value={editingEmp.site || ''}
                  onChange={e => setEditingEmp({ ...editingEmp, site: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 font-medium"
                >
                  {customSites.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Worker Type</label>
                <select
                  value={editingEmp.workerType || 'Office'}
                  onChange={e => setEditingEmp({ ...editingEmp, workerType: e.target.value as 'Office' | 'Frontline' })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 font-medium"
                >
                  <option value="Office">Office</option>
                  <option value="Frontline">Frontline</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Transport Mode</label>
                <select
                  value={editingEmp.mode}
                  onChange={e => setEditingEmp({ ...editingEmp, mode: e.target.value as any })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 font-medium"
                >
                  <option value="MTR">MTR</option>
                  <option value="Bus">Bus</option>
                  <option value="Private Car">Private Car</option>
                  <option value="Walk">Walk</option>
                </select>
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-2">
              <button
                onClick={() => setEditingEmp(null)}
                className="px-4 py-2 border border-slate-300 text-slate-700 font-semibold rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Employee Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Plus className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold">Add New Employee</h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Employee ID *</label>
                <input
                  type="text"
                  placeholder="e.g. EMP-1001"
                  value={newEmpData.id}
                  onChange={e => setNewEmpData({ ...newEmpData, id: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono focus:ring-2 focus:ring-emerald-500 font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Home Area</label>
                <select
                  value={newEmpData.district}
                  onChange={e => setNewEmpData({ ...newEmpData, district: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 font-medium"
                >
                  {renderAreaSelectOptions(false)}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Work Site</label>
                <select
                  value={newEmpData.site || ''}
                  onChange={e => setNewEmpData({ ...newEmpData, site: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 font-medium"
                >
                  {customSites.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Worker Type</label>
                <select
                  value={newEmpData.workerType || 'Office'}
                  onChange={e => setNewEmpData({ ...newEmpData, workerType: e.target.value as 'Office' | 'Frontline' })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 font-medium"
                >
                  <option value="Office">Office</option>
                  <option value="Frontline">Frontline</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Transport Mode</label>
                <select
                  value={newEmpData.mode}
                  onChange={e => setNewEmpData({ ...newEmpData, mode: e.target.value as any })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 font-medium"
                >
                  <option value="MTR">MTR</option>
                  <option value="Bus">Bus</option>
                  <option value="Private Car">Private Car</option>
                  <option value="Walk">Walk</option>
                </select>
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-2">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 border border-slate-300 text-slate-700 font-semibold rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNew}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                Add Employee
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
 