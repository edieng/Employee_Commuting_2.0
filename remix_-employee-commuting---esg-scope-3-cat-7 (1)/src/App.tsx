import React, { useState, useMemo, useRef } from 'react';
import { 
  ActiveTab, 
  CommuteRosterItem, 
  CustomWorkSite 
} from './types';
import { 
  DEFAULT_CUSTOM_SITES, 
  DEFAULT_WORKING_DAYS_OFFICE, 
  DEFAULT_WORKING_DAYS_FRONTLINE, 
  DEFAULT_EMISSION_FACTORS 
} from './utils/constants';
import { calculateDistrictAndTotalEmissions } from './services/emissionCalculator';
import { parseExcelOrCsvFile, exportToCsv } from './utils/fileParser';

// UI Components
import { Header } from './components/Header';
import { DashboardTab } from './components/DashboardTab';
import { RosterTab } from './components/RosterTab';
import { SamplerTab } from './components/SamplerTab';
import { GeocoderTab } from './components/GeocoderTab';
import { WorkingDaysModal } from './components/WorkingDaysModal';
import { SiteManagementModal } from './components/SiteManagementModal';
import { SitePreviewModal } from './components/SitePreviewModal';
import { CsvPreviewModal } from './components/CsvPreviewModal';
import { ExportModal } from './components/ExportModal';

export function App() {
  // Navigation & Active View State
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');

  // Custom Work Sites State
  const [customSites, setCustomSites] = useState<CustomWorkSite[]>(DEFAULT_CUSTOM_SITES);

  // Employee Roster State
  const [employeeRoster, setEmployeeRoster] = useState<CommuteRosterItem[]>([]);

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

  // Bulk File Upload Modal States
  const [rawSiteData, setRawSiteData] = useState<Record<string, any>[] | null>(null);
  const [rawRosterData, setRawRosterData] = useState<Record<string, any>[] | null>(null);

  // Hidden File Input Refs
  const siteFileInputRef = useRef<HTMLInputElement>(null);
  const rosterFileInputRef = useRef<HTMLInputElement>(null);

  // Primary Calculation Service Call
  const { districtCalcs, summary, rosterCalcs } = useMemo(() => {
    return calculateDistrictAndTotalEmissions(
      employeeRoster,
      customSites,
      selectedMonths,
      workingDaysOffice,
      workingDaysFrontline,
      emissionFactors,
      roundTripMultiplier
    );
  }, [
    employeeRoster,
    customSites,
    selectedMonths,
    workingDaysOffice,
    workingDaysFrontline,
    emissionFactors,
    roundTripMultiplier
  ]);

  // Site Management Handlers
  const handleAddSite = (newSite: Omit<CustomWorkSite, 'id'>) => {
    const created: CustomWorkSite = {
      ...newSite,
      id: newSite.siteCode || `SITE-${Date.now().toString().slice(-4)}`
    };
    setCustomSites(prev => [created, ...prev]);
  };

  const handleToggleSiteVisibility = (id: string) => {
    setCustomSites(prev => prev.map(s => 
      s.id === id ? { ...s, visible: s.visible === false ? true : false } : s
    ));
  };

  const handleDeleteSite = (id: string) => {
    setCustomSites(prev => prev.filter(s => s.id !== id));
  };

  const handleConfirmBulkSiteUpload = (sites: CustomWorkSite[]) => {
    setCustomSites(prev => [...sites, ...prev]);
    setRawSiteData(null);
  };

  // Roster Management Handlers
  const handleAddEmployee = (newEmp: Omit<CommuteRosterItem, 'id'> & { segment?: string }) => {
    const created: CommuteRosterItem = {
      ...newEmp,
      id: `EMP-${(employeeRoster.length + 1).toString().padStart(4, '0')}`
    };
    setEmployeeRoster(prev => [created, ...prev]);
  };

  const handleDeleteEmployee = (id: string) => {
    setEmployeeRoster(prev => prev.filter(e => e.id !== id));
  };

  const handleClearRoster = () => {
    if (window.confirm("Are you sure you want to clear all imported employee records?")) {
      setEmployeeRoster([]);
    }
  };

  const handleConfirmBulkRosterUpload = (roster: CommuteRosterItem[]) => {
    setEmployeeRoster(roster);
    setRawRosterData(null);
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

  // File Upload File Pickers
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

  const handleRosterFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const data = await parseExcelOrCsvFile(file);
      setRawRosterData(data);
    } catch (err) {
      alert("Failed to parse roster file. Please check file format.");
    }
    e.target.value = '';
  };

  // Export Data Handler
  const handleExportData = () => {
    const exportRows = rosterCalcs.map(r => ({
      'Employee ID': r.id,
      'Segment': (r as any).segment || 'P&C',
      'Residential District': r.district,
      'Transport Mode': r.mode,
      'Work Site': r.siteMatchedName,
      'Worker Role': r.workerType,
      'Commute Distance (km)': r.distance,
      'Monthly CO2 (kg)': r.monthlyCO2Kg,
      'Annual CO2 (kg)': r.annualCO2Kg
    }));
    exportToCsv('Hong_Kong_Commute_Emissions_Report.csv', exportRows);
  };

  // Reset Application Data
  const handleResetAllData = () => {
    if (window.confirm("Reset application to default configuration and sites?")) {
      setCustomSites(DEFAULT_CUSTOM_SITES);
      setEmployeeRoster([]);
      setSelectedMonths(["September"]);
      setWorkingDaysOffice(DEFAULT_WORKING_DAYS_OFFICE);
      setWorkingDaysFrontline(DEFAULT_WORKING_DAYS_FRONTLINE);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col">
      
      {/* Hidden File Upload Inputs */}
      <input 
        type="file" 
        ref={siteFileInputRef} 
        accept=".xlsx,.xls,.csv" 
        onChange={handleSiteFileSelect} 
        className="hidden" 
      />
      <input 
        type="file" 
        ref={rosterFileInputRef} 
        accept=".xlsx,.xls,.csv" 
        onChange={handleRosterFileSelect} 
        className="hidden" 
      />

      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedMonths={selectedMonths}
        onChangeSelectedMonths={setSelectedMonths}
        workingDaysOfficeMap={workingDaysOffice}
        onOpenWorkingDaysModal={() => setShowWorkingDaysModal(true)}
        onOpenSiteManagement={() => setShowSiteManagementModal(true)}
        onImportClick={() => rosterFileInputRef.current?.click()}
        onExportClick={() => setShowExportModal(true)}
        onResetClick={handleResetAllData}
        rosterLength={employeeRoster.length}
      />

      {/* Main Container */}
      <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Tab Views */}
        {activeTab === 'dashboard' && (
          <DashboardTab
            summary={summary}
            districtCalcs={districtCalcs}
            customSites={customSites}
            selectedMonths={selectedMonths}
          />
        )}

        {activeTab === 'roster' && (
          <RosterTab
            rosterCalcs={rosterCalcs}
            customSites={customSites}
            onAddEmployee={handleAddEmployee}
            onDeleteEmployee={handleDeleteEmployee}
            onClearRoster={handleClearRoster}
            onOpenImportModal={() => rosterFileInputRef.current?.click()}
          />
        )}

        {activeTab === 'sampler' && (
          <SamplerTab districtCalcs={districtCalcs} customSites={customSites} />
        )}

        {activeTab === 'geocoder' && (
          <GeocoderTab />
        )}

      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-500">
        <div className="w-full px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Hong Kong Employee Commuting ESG Scope 3 Category 7 Calculator</span>
          <span>Methodology: 12-Month Aggregation & LandsD Geodata GIS Engine</span>
        </div>
      </footer>

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
        onAddSite={handleAddSite}
        onToggleSiteVisibility={handleToggleSiteVisibility}
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

      <CsvPreviewModal
        isOpen={!!rawRosterData}
        onClose={() => setRawRosterData(null)}
        rawRosterData={rawRosterData || []}
        onConfirmUpload={handleConfirmBulkRosterUpload}
      />

      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        rosterCalcs={rosterCalcs}
        selectedMonths={selectedMonths}
      />

    </div>
  );
}

export default App;
