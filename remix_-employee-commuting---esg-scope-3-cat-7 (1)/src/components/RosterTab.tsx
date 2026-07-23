import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Plus, 
  Trash2, 
  Upload, 
  ChevronLeft, 
  ChevronRight, 
  Building2, 
  Briefcase 
} from 'lucide-react';
import { CommuteRosterItem, CustomWorkSite, RosterCalculationItem } from '../types';
import { DISTRICT_DATA } from '../utils/constants';

interface RosterTabProps {
  rosterCalcs: RosterCalculationItem[];
  customSites: CustomWorkSite[];
  onAddEmployee: (employee: Omit<CommuteRosterItem, 'id'> & { segment?: string }) => void;
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
  onAddEmployee,
  onDeleteEmployee,
  onClearRoster,
  onOpenImportModal
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [segmentFilter, setSegmentFilter] = useState('ALL');
  const [districtFilter, setDistrictFilter] = useState('ALL');
  const [modeFilter, setModeFilter] = useState('ALL');
  const [siteFilter, setSiteFilter] = useState('ALL');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  // Single Add Employee Modal / Form
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSegment, setNewSegment] = useState(SEGMENT_OPTIONS[5]); // default IT
  const [newDistrict, setNewDistrict] = useState(Object.keys(DISTRICT_DATA)[0] || 'Tsuen Wan Town');
  const [newMode, setNewMode] = useState<'MTR' | 'Bus' | 'Private Car' | 'Walk'>('MTR');
  const [newSite, setNewSite] = useState(customSites[0]?.id || 'SITE-QB');
  const [newWorkerType, setNewWorkerType] = useState<'Office' | 'Frontline'>('Office');

  // Filtered Roster
  const filteredRoster = rosterCalcs.filter(emp => {
    const segment = (emp as any).segment || 'P&C';
    const matchesSearch = emp.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          emp.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          segment.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSegment = segmentFilter === 'ALL' || segment === segmentFilter;
    const matchesDistrict = districtFilter === 'ALL' || emp.district === districtFilter;
    const matchesMode = modeFilter === 'ALL' || emp.mode === modeFilter;
    const matchesSite = siteFilter === 'ALL' || emp.site === siteFilter;

    return matchesSearch && matchesSegment && matchesDistrict && matchesMode && matchesSite;
  });

  const totalPages = Math.ceil(filteredRoster.length / itemsPerPage) || 1;
  const paginatedRoster = filteredRoster.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  );

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddEmployee({
      segment: newSegment,
      district: newDistrict,
      mode: newMode,
      site: newSite,
      workerType: newWorkerType
    });
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Action Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            Employee Commute Roster Database
            <span className="text-xs bg-blue-100 text-blue-800 font-mono px-2 py-0.5 rounded-full font-bold">
              {rosterCalcs.length} Total Records
            </span>
          </h2>
          <p className="text-xs text-slate-500">
            Individual employee commute distance and carbon emission calculations
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenImportModal}
            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Upload className="w-3.5 h-3.5" />
            Import CSV / Excel
          </button>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            {showAddForm ? 'Cancel' : 'Add Employee'}
          </button>

          {rosterCalcs.length > 0 && (
            <button
              onClick={onClearRoster}
              className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold rounded-xl transition-colors border border-rose-200"
            >
              Clear Roster
            </button>
          )}
        </div>
      </div>

      {/* Add Employee Form */}
      {showAddForm && (
        <form onSubmit={handleAddSubmit} className="p-5 bg-blue-50/50 rounded-2xl border border-blue-200 shadow-xs space-y-4 animate-in fade-in duration-150">
          <h3 className="text-xs font-bold text-blue-900 uppercase tracking-tight flex items-center gap-1.5">
            <Plus className="w-4 h-4 text-blue-600" />
            Add Single Employee Record
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {/* Segment */}
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Segment *</label>
              <select
                value={newSegment}
                onChange={e => setNewSegment(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-semibold"
              >
                {SEGMENT_OPTIONS.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* District */}
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Residential District *</label>
              <select
                value={newDistrict}
                onChange={e => setNewDistrict(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {Object.keys(DISTRICT_DATA).map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            {/* Transport Mode */}
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Transport Mode *</label>
              <select
                value={newMode}
                onChange={e => setNewMode(e.target.value as any)}
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="MTR">MTR</option>
                <option value="Bus">Bus</option>
                <option value="Private Car">Private Car</option>
                <option value="Walk">Walk</option>
              </select>
            </div>

            {/* Work Site */}
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Assigned Work Site</label>
              <select
                value={newSite}
                onChange={e => setNewSite(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {customSites.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>

            {/* Worker Type */}
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Worker Role</label>
              <select
                value={newWorkerType}
                onChange={e => setNewWorkerType(e.target.value as any)}
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="Office">Office Staff</option>
                <option value="Frontline">Frontline Operations</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
            >
              Add to Roster
            </button>
          </div>
        </form>
      )}

      {/* Search & Filters */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search ID, district, segment..."
            value={searchTerm}
            onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>

        {/* Segment Filter */}
        <div>
          <select
            value={segmentFilter}
            onChange={e => { setSegmentFilter(e.target.value); setCurrentPage(1); }}
            className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white font-semibold text-slate-800"
          >
            <option value="ALL">All Segments ({SEGMENT_OPTIONS.length})</option>
            {SEGMENT_OPTIONS.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* District Filter */}
        <div>
          <select
            value={districtFilter}
            onChange={e => { setDistrictFilter(e.target.value); setCurrentPage(1); }}
            className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="ALL">All Districts</option>
            {Object.keys(DISTRICT_DATA).map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        {/* Mode Filter */}
        <div>
          <select
            value={modeFilter}
            onChange={e => { setModeFilter(e.target.value); setCurrentPage(1); }}
            className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="ALL">All Modes</option>
            <option value="MTR">MTR</option>
            <option value="Bus">Bus</option>
            <option value="Private Car">Private Car</option>
            <option value="Walk">Walk</option>
          </select>
        </div>

        {/* Work Site Filter */}
        <div>
          <select
            value={siteFilter}
            onChange={e => { setSiteFilter(e.target.value); setCurrentPage(1); }}
            className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="ALL">All Work Sites</option>
            {customSites.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Roster Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 text-[11px] uppercase font-bold tracking-tight border-b border-slate-200">
                <th className="px-4 py-3">Emp ID</th>
                <th className="px-4 py-3">Segment</th>
                <th className="px-4 py-3">District</th>
                <th className="px-4 py-3">Workplace</th>
                <th className="px-4 py-3">Mode</th>
                <th className="px-4 py-3 text-right">Distance</th>
                <th className="px-4 py-3 text-right">Selected Months (kg CO₂)</th>
                <th className="px-4 py-3 text-right">Annual (kg CO₂)</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-xs text-slate-800 font-sans">
              {paginatedRoster.length > 0 ? (
                paginatedRoster.map((emp) => {
                  const segment = (emp as any).segment || 'P&C';
                  return (
                    <tr key={emp.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 font-mono font-bold text-slate-500">{emp.id}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-800 font-semibold border border-purple-200 text-[11px]">
                          {segment}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-medium text-slate-900">{emp.district}</td>
                      <td className="px-4 py-3 text-slate-600">{emp.siteMatchedName}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          emp.mode === 'MTR' ? 'bg-emerald-100 text-emerald-800' :
                          emp.mode === 'Bus' ? 'bg-blue-100 text-blue-800' :
                          emp.mode === 'Private Car' ? 'bg-amber-100 text-amber-800' :
                          'bg-slate-100 text-slate-800'
                        }`}>
                          {emp.mode}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-mono font-semibold text-slate-700">
                        {emp.distance} km
                      </td>
                      <td className="px-4 py-3 text-right font-mono font-bold text-emerald-700">
                        {emp.monthlyCO2Kg.toFixed(1)}
                      </td>
                      <td className="px-4 py-3 text-right font-mono font-bold text-slate-900">
                        {emp.annualCO2Kg.toFixed(1)}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => onDeleteEmployee(emp.id)}
                          title="Delete Employee"
                          className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={9} className="px-4 py-8 text-center text-slate-400 text-xs">
                    No employees found matching the filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <span>
            Showing <strong className="text-slate-800">{paginatedRoster.length}</strong> of <strong className="text-slate-800">{filteredRoster.length}</strong> filtered employees
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 border border-slate-300 rounded-lg hover:bg-white disabled:opacity-40 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-mono text-slate-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 border border-slate-300 rounded-lg hover:bg-white disabled:opacity-40 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
