import React, { useState, useMemo, useRef } from 'react';
import { 
  ActiveTab, 
  CommuteRosterItem, 
  CustomWorkSite,
  MonthlyRosterMap
} from './types';
import { 
  DEFAULT_CUSTOM_SITES, 
  DEFAULT_WORKING_DAYS_OFFICE, 
  DEFAULT_WORKING_DAYS_FRONTLINE, 
  DEFAULT_EMISSION_FACTORS,
  MONTHS_LIST
} from './utils/constants';
import { calculateDistrictAndTotalEmissions } from './services/emissionCalculator';
import { parseExcelOrCsvFile, exportToCsv } from './utils/fileParser';

// UI Components
import { Header } from './components/Header';
import { Sidebar, SidebarBody } from './components/sidebar';
import { DashboardTab } from './components/DashboardTab';
import { RosterTab } from './components/RosterTab';
import { SamplerTab } from './components/SamplerTab';
import { WorkingDaysModal } from './components/WorkingDaysModal';
import { SiteManagementModal } from './components/SiteManagementModal';
import { SitePreviewModal } from './components/SitePreviewModal';
import { MultiMonthRosterModal } from './components/MultiMonthRosterModal';
import { ExportModal } from './components/ExportModal';

import { 
  Users, 
  Building2, 
  Upload, 
  Download, 
  Calendar,
  Sparkles,
  LayoutDashboard,
  ChevronDown
} from 'lucide-react';

// Route Map Icon matching custom design (two pins with dashed connecting route)
const RouteMapIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    {/* Bottom Left Pin */}
    <path d="M4.5 13.5C4.5 11.57 6.07 10 8 10s3.5 1.57 3.5 3.5c0 2.5-3.5 5.5-3.5 5.5S4.5 16 4.5 13.5zm3.5-1.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
    {/* Top Right Pin */}
    <path d="M12.5 5.5C12.5 3.57 14.07 2 16 2s3.5 1.57 3.5 3.5c0 2.5-3.5 5.5-3.5 5.5S12.5 8 12.5 5.5zm3.5-1.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
    {/* Route Line Dashed */}
    <path d="M8 19.5c2 0 3.5-.8 4.2-2.2.8-1.5 1.5-2.8 3.3-2.8 1.5 0 2.5.8 3 1.8" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="2 2" strokeLinecap="round" />
  </svg>
);

export function App() {
  // Navigation & Active View State
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [quickActionsOpen, setQuickActionsOpen] = useState(true);

  // Custom Work Sites State
  const [customSites, setCustomSites] = useState<CustomWorkSite[]>(DEFAULT_CUSTOM_SITES);

  // 12-Month Employee Roster Map State
  const [monthlyRosters, setMonthlyRosters] = useState<MonthlyRosterMap>({});

  // Selected Reporting Months Filter (Default to September)
  const [selectedMonths, setSelectedMonths] = useState<string[]>(["September"]);

  // Working Days Configuration Maps
  const [workingDaysOffice, setWorkingDaysOffice] = useState<Record<string, number>>(DEFAULT_WORKING_DAYS_OFFICE);
  const [workingDaysFrontline, setWorkingDaysFrontline] = useState<Record<string, number>>(DEFAULT_WORKING_DAYS_FRONTLINE);

  // Emission Factors & Parameters
  const [emissionFactors] = useState<Record<string, number>>(DEFAULT_EMISSION_FACTORS);
  const [roundTripMultiplier] = useState<number>(2.0);

  // Modals Visibility
  const [showWorkingDaysModal, setShowWorkingDaysModal] = useState(false);
  const [showSiteManagementModal, setShowSiteManagementModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showMultiMonthModal, setShowMultiMonthModal] = useState(false);

  // Bulk File Upload Modal States for Sites
  const [rawSiteData, setRawSiteData] = useState<Record<string, any>[] | null>(null);

  // Hidden File Input Refs
  const siteFileInputRef = useRef<HTMLInputElement>(null);

  // Primary Calculation Service Call
  const { districtCalcs, summary, rosterCalcs } = useMemo(() => {
    return calculateDistrictAndTotalEmissions(
      monthlyRosters,
      customSites,
      selectedMonths,
      workingDaysOffice,
      workingDaysFrontline,
      emissionFactors,
      roundTripMultiplier
    );
  }, [
    monthlyRosters,
    customSites,
    selectedMonths,
    workingDaysOffice,
    workingDaysFrontline,
    emissionFactors,
    roundTripMultiplier
  ]);

  // Total records across all 12 months for sidebar display
  const totalRosterCount = useMemo(() => {
    return Object.values(monthlyRosters).reduce((sum, list) => sum + list.length, 0);
  }, [monthlyRosters]);

  // Site Management Handlers
  const handleUpdateSite = (updatedSite: CustomWorkSite) => {
    setCustomSites(prev => prev.map(s => s.id === updatedSite.id ? updatedSite : s));
  };

  const handleDeleteSite = (id: string) => {
    setCustomSites(prev => prev.filter(s => s.id !== id));
  };

  const handleConfirmBulkSiteUpload = (sites: CustomWorkSite[]) => {
    setCustomSites(prev => [...sites, ...prev]);
    setRawSiteData(null);
  };

  // Month-Aware Roster Management Handlers
  const handleAddEmployee = (newEmp: CommuteRosterItem, targetMonth?: string) => {
    const m = targetMonth || selectedMonths[0] || 'September';
    setMonthlyRosters(prev => ({
      ...prev,
      [m]: [{ ...newEmp, month: m }, ...(prev[m] || [])]
    }));
  };

  const handleEditEmployee = (updatedEmp: CommuteRosterItem, originalId?: string, targetMonth?: string) => {
    const m = targetMonth || updatedEmp.month || selectedMonths[0] || 'September';
    setMonthlyRosters(prev => {
      const list = prev[m] || [];
      const updated = list.map(e => (e.id === (originalId || updatedEmp.id) ? { ...updatedEmp, month: m } : e));
      return { ...prev, [m]: updated };
    });
  };

  const handleDeleteEmployee = (id: string, targetMonth?: string) => {
    if (targetMonth) {
      setMonthlyRosters(prev => ({
        ...prev,
        [targetMonth]: (prev[targetMonth] || []).filter(e => e.id !== id)
      }));
    } else {
      setMonthlyRosters(prev => {
        const next: MonthlyRosterMap = {};
        for (const [m, list] of Object.entries(prev)) {
          next[m] = list.filter(e => e.id !== id);
        }
        return next;
      });
    }
  };

  const handleClearRoster = (targetMonth?: string) => {
    if (targetMonth) {
      setMonthlyRosters(prev => ({
        ...prev,
        [targetMonth]: []
      }));
    } else {
      setMonthlyRosters({});
    }
  };

  const handleConfirmMultiMonthUpload = (newRosters: MonthlyRosterMap) => {
    setMonthlyRosters(newRosters);
    setShowMultiMonthModal(false);
  };

  // Working Days Handlers
  const handleUpdateOfficeDays = (month: string, days: number) => {
    setWorkingDaysOffice(prev => ({ ...prev, [month]: days }));
  };

  const handleUpdateFrontlineDays = (month: string, days: number) => {
    setWorkingDaysFrontline(prev => ({ ...prev, [month]: days }));
  };

  const handleResetDaysDefaults = () => {
    setWorkingDaysOffice(DEFAULT_WORKING_DAYS_OFFICE);
    setWorkingDaysFrontline(DEFAULT_WORKING_DAYS_FRONTLINE);
  };

  // File Upload File Picker for Sites
  const handleSiteFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const data = await parseExcelOrCsvFile(file);
      setRawSiteData(data);
    } catch (err) {
      alert("Failed to parse site file. Please check file format.");
    }
    e.target.value = '';
  };

  // Reset Application Data
  const handleResetAllData = () => {
    if (window.confirm("Reset application to default configuration and sites?")) {
      setCustomSites(DEFAULT_CUSTOM_SITES);
      setMonthlyRosters({});
      setSelectedMonths(["September"]);
      setWorkingDaysOffice(DEFAULT_WORKING_DAYS_OFFICE);
      setWorkingDaysFrontline(DEFAULT_WORKING_DAYS_FRONTLINE);
    }
  };

  // Nav links for sidebar
  const navLinks = [
    {
      id: 'dashboard',
      label: 'Overview',
      icon: (
        <span className="shrink-0 flex items-center justify-center w-5 h-5 text-slate-700">
          <i className="fi fi-rr-overview text-base leading-none">
            <LayoutDashboard className="w-5 h-5" />
          </i>
        </span>
      ),
      onClick: () => setActiveTab('dashboard')
    },
    {
      id: 'roster',
      label: 'Employee List',
      icon: <Users className="w-5 h-5 shrink-0 text-slate-700" />,
      onClick: () => setActiveTab('roster')
    },
    {
      id: 'sampler',
      label: 'Area-to-Site Commute Reference',
      icon: <RouteMapIcon className="w-5 h-5 shrink-0 text-slate-700" />,
      onClick: () => setActiveTab('sampler')
    }
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row transition-colors font-sans bg-slate-50 text-slate-900">
      
      {/* Collapsible Sidebar Component - Spans full height from top to bottom */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen}>
        <SidebarBody className="border-r border-slate-200 bg-slate-100 text-slate-800 transition-colors min-h-screen self-stretch h-auto">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden sticky top-0 max-h-screen">
            
            {/* Sidebar Branding */}
            <div className="flex items-center gap-2.5 py-3 px-1 border-b border-slate-200/80 mb-4">
              <div className="w-7 h-7 bg-slate-900 text-white rounded-full flex items-center justify-center shrink-0 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-slate-200" />
              </div>
              {sidebarOpen && (
                <div className="flex flex-col min-w-0">
                  <span className="font-bold text-sm tracking-tight text-slate-900 truncate">ESG Commute</span>
                </div>
              )}
            </div>

            {/* Home Section Title */}
            {sidebarOpen && (
              <span className="text-xs font-normal text-slate-400 px-2 mb-1.5 block">
                Home
              </span>
            )}

            {/* Navigation Tabs */}
            <div className="flex flex-col gap-1">
              {navLinks.map((item) => (
                <button
                  key={item.id}
                  onClick={item.onClick}
                  className={`flex items-center gap-2.5 px-3 py-2 text-xs transition-all rounded-lg text-left w-full cursor-pointer ${
                    activeTab === item.id
                      ? 'bg-slate-200/70 text-slate-900 font-semibold shadow-2xs'
                      : 'bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-200/40 font-normal'
                  }`}
                >
                  <div className="shrink-0 flex items-center justify-center w-4 h-4 text-slate-700">
                    {item.icon}
                  </div>
                  {sidebarOpen && <span className="truncate text-xs">{item.label}</span>}
                </button>
              ))}
            </div>

            {/* Quick Actions in Sidebar */}
            {sidebarOpen && (
              <div className="mt-6 pt-4 border-t border-slate-200/80 flex flex-col gap-1">
                <button
                  type="button"
                  onClick={() => setQuickActionsOpen(!quickActionsOpen)}
                  className="flex items-center justify-between text-xs font-normal text-slate-400 px-2 py-1 w-full hover:text-slate-600 transition-colors cursor-pointer"
                >
                  <span>Quick Actions</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${quickActionsOpen ? "" : "-rotate-90"}`}/>
                </button>

                {quickActionsOpen && (
                  <div className="flex flex-col gap-1 mt-0.5">
                    <button
                      onClick={() => setShowSiteManagementModal(true)}
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-normal text-slate-700 hover:bg-slate-200/40 rounded-lg transition-colors text-left cursor-pointer"
                    >
                      <Building2 className="w-4 h-4 text-slate-500 shrink-0" />
                      <span>Work Sites ({customSites.length})</span>
                    </button>

                    <button
                      onClick={() => setShowMultiMonthModal(true)}
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-normal text-slate-700 hover:bg-slate-200/40 rounded-lg transition-colors text-left cursor-pointer"
                    >
                      <Upload className="w-4 h-4 text-slate-500 shrink-0" />
                      <span>Upload 12 Months (.xlsx/csv)</span>
                    </button>

                    <button
                      onClick={() => setShowWorkingDaysModal(true)}
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-normal text-slate-700 hover:bg-slate-200/40 rounded-lg transition-colors text-left cursor-pointer"
                    >
                      <Calendar className="w-4 h-4 text-slate-500 shrink-0" />
                      <span>Working Days Settings</span>
                    </button>

                    <button
                      onClick={() => setShowExportModal(true)}
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-normal text-slate-700 hover:bg-slate-200/40 rounded-lg transition-colors text-left cursor-pointer"
                    >
                      <Download className="w-4 h-4 text-slate-500 shrink-0" />
                      <span>Export Report</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar Footer Info */}
          {sidebarOpen && (
            <div className="pt-4 border-t border-slate-200/80 text-[11px] text-slate-500 flex flex-col gap-1">
              <div className="flex items-center justify-between font-mono">
                <span>Active Employees:</span>
                <span className="font-bold text-slate-800">{summary.totalEmployees}</span>
              </div>
              <div className="flex items-center justify-between font-mono">
                <span>Total Stored:</span>
                <span className="font-bold text-slate-800">{totalRosterCount}</span>
              </div>
              <div className="flex items-center justify-between font-mono">
                <span>Total CO₂e:</span>
                <span className="font-bold text-emerald-600">{summary.selectedMonthsCO2Tons.toFixed(1)}t</span>
              </div>
            </div>
          )}
        </SidebarBody>
      </Sidebar>

      {/* Main Content View */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Hidden File Upload Input for Sites */}
        <input 
          type="file" 
          ref={siteFileInputRef} 
          accept=".xlsx,.xls,.csv" 
          onChange={handleSiteFileSelect} 
          className="hidden" 
        />

        {/* Header */}
        <Header
          selectedMonths={selectedMonths}
          onChangeSelectedMonths={setSelectedMonths}
          workingDaysOfficeMap={workingDaysOffice}
          workingDaysFrontlineMap={workingDaysFrontline}
          onOpenWorkingDaysModal={() => setShowWorkingDaysModal(true)}
        />

        {/* Main Container */}
        <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-6">
          
          {/* Tab Views */}
          {activeTab === 'dashboard' && (
            <DashboardTab
              summary={summary}
              districtCalcs={districtCalcs}
              customSites={customSites}
              rosterCalcs={rosterCalcs}
              selectedMonths={selectedMonths}
              onExportClick={() => setShowExportModal(true)}
              onOpenSiteManagement={() => setShowSiteManagementModal(true)}
            />
          )}

          {activeTab === 'roster' && (
            <RosterTab
              rosterCalcs={rosterCalcs}
              customSites={customSites}
              monthlyRosters={monthlyRosters}
              selectedMonths={selectedMonths}
              onDeleteEmployee={handleDeleteEmployee}
              onEditEmployee={handleEditEmployee}
              onAddEmployee={handleAddEmployee}
              onClearRoster={handleClearRoster}
              onOpenImportModal={() => setShowMultiMonthModal(true)}
            />
          )}

          {activeTab === 'sampler' && (
            <SamplerTab districtCalcs={districtCalcs} customSites={customSites} />
          )}

        </main>

        {/* Footer */}
        <footer className="border-t border-slate-200 py-4 text-center text-xs transition-colors bg-white text-slate-500">
          <div className="w-full px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>Hong Kong Employee Commuting Scope 3 Category 7 Calculator</span>
            <span>Methodology: 12-Month Multi-Excel Import & Hong Kong Area Commute Engine</span>
          </div>
        </footer>

      </div>

      {/* Modals */}
      <WorkingDaysModal
        isOpen={showWorkingDaysModal}
        onClose={() => setShowWorkingDaysModal(false)}
        workingDaysOffice={workingDaysOffice}
        workingDaysFrontline={workingDaysFrontline}
        onUpdateOfficeDays={handleUpdateOfficeDays}
        onUpdateFrontlineDays={handleUpdateFrontlineDays}
        onResetDefaults={handleResetDaysDefaults}
      />

      <SiteManagementModal
        isOpen={showSiteManagementModal}
        onClose={() => setShowSiteManagementModal(false)}
        customSites={customSites}
        onUpdateSite={handleUpdateSite}
        onDeleteSite={handleDeleteSite}
        onOpenBulkSiteUpload={() => siteFileInputRef.current?.click()}
      />

      <SitePreviewModal
        isOpen={!!rawSiteData}
        onClose={() => setRawSiteData(null)}
        rawSiteData={rawSiteData || []}
        customSites={customSites}
        onConfirmUpload={handleConfirmBulkSiteUpload}
      />

      {/* 12-Month Multi-Excel Roster Import Modal with Preview */}
      <MultiMonthRosterModal
        isOpen={showMultiMonthModal}
        onClose={() => setShowMultiMonthModal(false)}
        currentMonthlyRoster={monthlyRosters}
        onConfirmUpload={handleConfirmMultiMonthUpload}
      />

      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        rosterCalcs={rosterCalcs}
        selectedMonths={selectedMonths}
        monthlyRosters={monthlyRosters}
        customSites={customSites}
        districtCalcs={districtCalcs}
        summary={summary}
        workingDaysOffice={workingDaysOffice}
        workingDaysFrontline={workingDaysFrontline}
      />

    </div>
  );
}

export default App;
