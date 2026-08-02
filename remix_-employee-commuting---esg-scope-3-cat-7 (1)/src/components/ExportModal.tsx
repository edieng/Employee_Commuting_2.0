import React, { useState } from 'react';
import { X, Download, FileSpreadsheet, Check, CheckSquare, Square, Eye } from 'lucide-react';
import { exportToCsv } from '../utils/fileParser';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  rosterCalcs: any[];
  selectedMonths: string[];
}

interface ColumnOption {
  key: string;
  label: string;
  getValue: (row: any) => any;
  defaultChecked: boolean;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  rosterCalcs,
  selectedMonths
}) => {
  if (!isOpen) return null;

  const monthLabel = selectedMonths.length > 0 ? selectedMonths.join(', ') : 'Selected Months';

  const ALL_COLUMNS: ColumnOption[] = [
    { key: 'id', label: 'Employee ID', getValue: (r) => r.id, defaultChecked: true },
    { key: 'segment', label: 'Business Segment', getValue: (r) => r.segment || 'P&C', defaultChecked: true },
    { key: 'district', label: 'Residential District', getValue: (r) => r.district, defaultChecked: true },
    { key: 'mode', label: 'Transport Mode', getValue: (r) => r.mode, defaultChecked: true },
    { key: 'siteMatchedName', label: 'Work Site Name', getValue: (r) => r.siteMatchedName, defaultChecked: true },
    { key: 'site', label: 'Work Site Code', getValue: (r) => r.site, defaultChecked: false },
    { key: 'workerType', label: 'Worker Role', getValue: (r) => r.workerType, defaultChecked: true },
    { key: 'distance', label: 'Commute Distance (km)', getValue: (r) => r.distance, defaultChecked: true },
    { key: 'workingDaysPerMonth', label: 'Monthly Working Days', getValue: (r) => r.workingDaysPerMonth, defaultChecked: false },
    { key: 'monthlyCO2Tonnes', label: `Emissions (${monthLabel}) (tCO₂e)`, getValue: (r) => Number((r.monthlyCO2Kg / 1000).toFixed(4)), defaultChecked: true },
    { key: 'annualCO2Tonnes', label: 'Annual Emissions (tCO₂e)', getValue: (r) => Number((r.annualCO2Kg / 1000).toFixed(4)), defaultChecked: true },
  ];

  const [selectedKeys, setSelectedKeys] = useState<string[]>(
    ALL_COLUMNS.filter(c => c.defaultChecked).map(c => c.key)
  );
  const [fileFormat, setFileFormat] = useState<'xlsx' | 'csv'>('xlsx');

  const toggleColumn = (key: string) => {
    setSelectedKeys(prev => 
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  const selectAll = () => setSelectedKeys(ALL_COLUMNS.map(c => c.key));
  const deselectAll = () => setSelectedKeys([]);

  const activeColumns = ALL_COLUMNS.filter(c => selectedKeys.includes(c.key));

  // Build preview dataset
  const formattedExportData = rosterCalcs.map(r => {
    const rowObj: Record<string, any> = {};
    activeColumns.forEach(col => {
      rowObj[col.label] = col.getValue(r);
    });
    return rowObj;
  });

  const handleConfirmExport = () => {
    if (activeColumns.length === 0) {
      alert("Please select at least one column to export.");
      return;
    }
    const ext = fileFormat === 'xlsx' ? 'xlsx' : 'csv';
    const filename = `Hong_Kong_Commute_Emissions_${new Date().toISOString().split('T')[0]}.${ext}`;
    exportToCsv(filename, formattedExportData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold">Export ESG Commute Emissions Data</h2>
              <p className="text-xs text-slate-300">
                Customize parameters and select specific columns to include in your exported report
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          
          {/* Format & Quick Actions Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Select Export Format
              </label>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-1.5 text-xs font-semibold cursor-pointer text-slate-800">
                  <input
                    type="radio"
                    name="format"
                    checked={fileFormat === 'xlsx'}
                    onChange={() => setFileFormat('xlsx')}
                    className="text-emerald-600 focus:ring-emerald-500"
                  />
                  Excel (.xlsx)
                </label>
                <label className="flex items-center gap-1.5 text-xs font-semibold cursor-pointer text-slate-800">
                  <input
                    type="radio"
                    name="format"
                    checked={fileFormat === 'csv'}
                    onChange={() => setFileFormat('csv')}
                    className="text-emerald-600 focus:ring-emerald-500"
                  />
                  CSV (.csv)
                </label>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={selectAll}
                className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors"
              >
                Select All
              </button>
              <button
                type="button"
                onClick={deselectAll}
                className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors"
              >
                Deselect All
              </button>
            </div>
          </div>

          {/* Column Checkboxes Grid */}
          <div>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-tight mb-2.5">
              Select Columns to Include ({selectedKeys.length} of {ALL_COLUMNS.length} selected)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {ALL_COLUMNS.map(col => {
                const isChecked = selectedKeys.includes(col.key);
                return (
                  <button
                    key={col.key}
                    type="button"
                    onClick={() => toggleColumn(col.key)}
                    className={`flex items-center gap-2.5 p-2.5 rounded-xl text-left border text-xs font-medium transition-all ${
                      isChecked
                        ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950 font-semibold'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {isChecked ? (
                      <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                    <span className="truncate">{col.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Data Preview Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <div className="bg-slate-100 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-slate-600" />
                <span className="text-xs font-bold text-slate-800">
                  Export Data Preview (Showing 10 of {rosterCalcs.length} records)
                </span>
              </div>
              <span className="text-[11px] font-mono text-slate-500">
                {activeColumns.length} Columns Selected
              </span>
            </div>

            {activeColumns.length > 0 ? (
              <div className="overflow-x-auto max-h-56">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-600 text-[10px] uppercase font-bold tracking-tight border-b border-slate-200">
                      {activeColumns.map(c => (
                        <th key={c.key} className="px-3 py-2 whitespace-nowrap">{c.label}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-xs text-slate-800">
                    {formattedExportData.slice(0, 10).map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                        {activeColumns.map(c => (
                          <td key={c.key} className="px-3 py-2 whitespace-nowrap font-mono text-[11px]">
                            {row[c.label]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-8 text-center bg-slate-50 text-xs text-slate-500">
                No columns selected. Please select at least one column above to view preview.
              </div>
            )}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-100 border-t border-slate-200 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-500 font-medium">
            Total Rows to Export: <strong className="text-slate-800 font-bold">{rosterCalcs.length}</strong>
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirmExport}
              disabled={activeColumns.length === 0 || rosterCalcs.length === 0}
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download {fileFormat.toUpperCase()} ({rosterCalcs.length} Rows)
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
