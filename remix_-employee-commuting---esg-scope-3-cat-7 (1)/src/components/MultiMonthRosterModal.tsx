import React, { useState, useRef } from 'react';
import { 
  X, 
  Check, 
  FileSpreadsheet, 
  Upload, 
  Calendar, 
  Trash2, 
  Copy, 
  Download, 
  AlertCircle,
  Users,
  Search,
  CheckCircle2,
  FolderUp,
  FilePlus,
  ArrowRight
} from 'lucide-react';
import * as XLSX from 'xlsx';
import { CommuteRosterItem, MonthlyRosterMap } from '../types';
import { MONTHS_LIST, MONTH_ABBRS } from '../utils/constants';
import { 
  parseExcelOrCsvFile, 
  detectMonthFromFileName, 
  parseRawRowsToRoster, 
  generateSampleMultiMonthTemplate 
} from '../utils/fileParser';

interface MultiMonthRosterModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentMonthlyRoster?: MonthlyRosterMap;
  onConfirmUpload: (monthlyRosters: MonthlyRosterMap) => void;
}

interface MonthFileRecord {
  fileName: string;
  rawRows: Record<string, any>[];
  parsed: CommuteRosterItem[];
}

export const MultiMonthRosterModal: React.FC<MultiMonthRosterModalProps> = ({
  isOpen,
  onClose,
  currentMonthlyRoster,
  onConfirmUpload
}) => {
  if (!isOpen) return null;

  // Initialize internal state from existing monthly roster
  const [monthlyRecords, setMonthlyRecords] = useState<Record<string, MonthFileRecord>>(() => {
    const initial: Record<string, MonthFileRecord> = {};
    if (currentMonthlyRoster) {
      MONTHS_LIST.forEach(month => {
        const items = currentMonthlyRoster[month] || [];
        if (items.length > 0) {
          initial[month] = {
            fileName: `${month}_List.xlsx`,
            rawRows: items.map(item => ({
              'Employee ID': item.id,
              'Home Area': item.district,
              'Work Site': item.site,
              'Worker Type': item.workerType,
              'Transport Mode': item.mode
            })),
            parsed: items
          };
        }
      });
    }
    return initial;
  });

  const [activePreviewMonth, setActivePreviewMonth] = useState<string>(() => {
    // Select first month with data or January
    const firstWithData = MONTHS_LIST.find(m => currentMonthlyRoster && currentMonthlyRoster[m]?.length > 0);
    return firstWithData || 'January';
  });

  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewSearch, setPreviewSearch] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const bulkFileInputRef = useRef<HTMLInputElement>(null);
  const singleMonthFileInputRef = useRef<HTMLInputElement>(null);
  const [targetSingleMonth, setTargetSingleMonth] = useState<string>('January');

  // Total statistics across all 12 months
  const monthsWithData = MONTHS_LIST.filter(m => monthlyRecords[m] && monthlyRecords[m].parsed.length > 0);
  const totalRecordsLoaded = monthsWithData.reduce((sum, m) => sum + (monthlyRecords[m]?.parsed.length || 0), 0);
  const avgEmployeesPerMonth = monthsWithData.length > 0 ? Math.round(totalRecordsLoaded / monthsWithData.length) : 0;

  // Process a batch of dropped/selected files
  const handleBatchFiles = async (files: FileList | File[]) => {
    if (!files || files.length === 0) return;
    setIsProcessing(true);
    setStatusMessage(null);

    const newRecords = { ...monthlyRecords };
    let processedCount = 0;
    const assignedMonths: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const arrayBuffer = await file.arrayBuffer();
        const workbook = XLSX.read(new Uint8Array(arrayBuffer), { type: 'array' });

        // Check if workbook contains multiple sheets named after months
        const sheetMonthMatches: { sheetName: string; month: string }[] = [];
        workbook.SheetNames.forEach(sheetName => {
          const detected = detectMonthFromFileName(sheetName);
          if (detected) {
            sheetMonthMatches.push({ sheetName, month: detected });
          }
        });

        if (sheetMonthMatches.length > 1) {
          // Multi-sheet monthly workbook
          sheetMonthMatches.forEach(({ sheetName, month }) => {
            const worksheet = workbook.Sheets[sheetName];
            const rawRows = XLSX.utils.sheet_to_json<Record<string, any>>(worksheet, { defval: '' });
            const parsed = parseRawRowsToRoster(rawRows);
            if (parsed.length > 0) {
              newRecords[month] = {
                fileName: `${file.name} [${sheetName}]`,
                rawRows,
                parsed
              };
              assignedMonths.push(month);
              processedCount++;
            }
          });
        } else {
          // Single file processing
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const rawRows = XLSX.utils.sheet_to_json<Record<string, any>>(worksheet, { defval: '' });
          const parsed = parseRawRowsToRoster(rawRows);

          if (parsed.length > 0) {
            let targetMonth = detectMonthFromFileName(file.name);
            if (!targetMonth) {
              // Find first empty month
              targetMonth = MONTHS_LIST.find(m => !newRecords[m]) || MONTHS_LIST[i % 12];
            }

            newRecords[targetMonth] = {
              fileName: file.name,
              rawRows,
              parsed
            };
            assignedMonths.push(targetMonth);
            processedCount++;
          }
        }
      } catch (err) {
        console.error('Error parsing file:', file.name, err);
      }
    }

    setMonthlyRecords(newRecords);
    setIsProcessing(false);

    if (assignedMonths.length > 0) {
      setActivePreviewMonth(assignedMonths[0]);
      setStatusMessage(`Successfully imported ${processedCount} file(s) for ${assignedMonths.length} month(s)!`);
    } else {
      setStatusMessage('No valid employee records found in uploaded file(s). Please verify column formats.');
    }
  };

  // Upload for a single specific month
  const handleSingleMonthFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsProcessing(true);
      const rawRows = await parseExcelOrCsvFile(file);
      const parsed = parseRawRowsToRoster(rawRows);

      if (parsed.length > 0) {
        setMonthlyRecords(prev => ({
          ...prev,
          [targetSingleMonth]: {
            fileName: file.name,
            rawRows,
            parsed
          }
        }));
        setActivePreviewMonth(targetSingleMonth);
        setStatusMessage(`Successfully loaded ${parsed.length} employees for ${targetSingleMonth}!`);
      }
    } catch (err) {
      console.error(err);
      setStatusMessage(`Failed to parse file for ${targetSingleMonth}.`);
    } finally {
      setIsProcessing(false);
      if (singleMonthFileInputRef.current) singleMonthFileInputRef.current.value = '';
    }
  };

  // Duplicate active month's data to all empty months
  const handleCopyMonthToAllEmpty = (sourceMonth: string) => {
    const source = monthlyRecords[sourceMonth];
    if (!source || source.parsed.length === 0) return;

    const updated = { ...monthlyRecords };
    let copiedCount = 0;

    MONTHS_LIST.forEach(month => {
      if (!updated[month] || updated[month].parsed.length === 0) {
        updated[month] = {
          fileName: `${source.fileName} (Copied from ${MONTH_ABBRS[sourceMonth]})`,
          rawRows: source.rawRows,
          parsed: source.parsed
        };
        copiedCount++;
      }
    });

    setMonthlyRecords(updated);
    setStatusMessage(`Copied ${sourceMonth} list (${source.parsed.length} employees) to ${copiedCount} empty month(s).`);
  };

  // Clear single month
  const handleClearMonth = (month: string) => {
    setMonthlyRecords(prev => {
      const copy = { ...prev };
      delete copy[month];
      return copy;
    });
    if (singleMonthFileInputRef.current) singleMonthFileInputRef.current.value = '';
    if (bulkFileInputRef.current) bulkFileInputRef.current.value = '';
    setStatusMessage(`Cleared ${month} list data.`);
  };

  // Clear all months immediately
  const handleClearAll = () => {
    setMonthlyRecords({});
    setPreviewSearch('');
    if (singleMonthFileInputRef.current) singleMonthFileInputRef.current.value = '';
    if (bulkFileInputRef.current) bulkFileInputRef.current.value = '';
    setStatusMessage('All monthly list data cleared.');
  };

  // Final Confirmation
  const handleConfirm = () => {
    const finalMap: MonthlyRosterMap = {};
    MONTHS_LIST.forEach(m => {
      finalMap[m] = monthlyRecords[m]?.parsed || [];
    });

    onConfirmUpload(finalMap);
    onClose();
  };

  const activeRecord = monthlyRecords[activePreviewMonth];
  const activeParsedList = activeRecord?.parsed || [];

  // Filter preview records
  const filteredPreviewList = activeParsedList.filter(item => {
    if (!previewSearch) return true;
    const term = previewSearch.toLowerCase();
    return (
      item.id.toLowerCase().includes(term) ||
      item.district.toLowerCase().includes(term) ||
      (item.site && item.site.toLowerCase().includes(term)) ||
      item.mode.toLowerCase().includes(term)
    );
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-slate-200">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-white border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900">
                  12-Month Employee Commute Data Management
                </h2>
                <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                  {monthsWithData.length} / 12 Months Loaded
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Upload separate Excel / CSV files for each of the 12 months (or batch upload all 12 at once).
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={generateSampleMultiMonthTemplate}
              title="Download 12-Month Sample Excel Template"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Sample Template</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5 bg-slate-50/40">
          
          {/* Status Alert */}
          {statusMessage && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{statusMessage}</span>
              </div>
              <button 
                onClick={() => setStatusMessage(null)}
                className="text-emerald-700 hover:text-emerald-900 font-bold ml-2 cursor-pointer"
              >
                ✕
              </button>
            </div>
          )}

          {/* Bulk Dropzone */}
          <div
            onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={e => {
              e.preventDefault();
              setIsDragging(false);
              if (e.dataTransfer.files) {
                handleBatchFiles(e.dataTransfer.files);
              }
            }}
            className={`border-2 border-dashed rounded-2xl p-5 text-center transition-all ${
              isDragging 
                ? 'border-emerald-500 bg-emerald-50/60 ring-4 ring-emerald-100' 
                : 'border-slate-300 hover:border-slate-400 bg-white shadow-2xs'
            }`}
          >
            <input
              type="file"
              ref={bulkFileInputRef}
              multiple
              accept=".xlsx, .xls, .csv"
              onChange={e => {
                if (e.target.files) handleBatchFiles(e.target.files);
              }}
              className="hidden"
            />
            <input
              type="file"
              ref={singleMonthFileInputRef}
              accept=".xlsx, .xls, .csv"
              onChange={handleSingleMonthFileSelect}
              className="hidden"
            />

            <div className="flex flex-col items-center justify-center max-w-lg mx-auto">
              <div className="w-11 h-11 bg-emerald-100 text-emerald-800 rounded-2xl flex items-center justify-center mb-3 shadow-2xs">
                <FolderUp className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-800">
                Drag & drop all 12 monthly Excel / CSV files here
              </h3>
              <p className="text-xs text-slate-500 mt-1 mb-3">
                Supports multiple files (e.g. <code className="font-mono bg-slate-100 px-1 py-0.5 rounded text-slate-700">Jan.xlsx</code>, <code className="font-mono bg-slate-100 px-1 py-0.5 rounded text-slate-700">Feb.xlsx</code> ... <code className="font-mono bg-slate-100 px-1 py-0.5 rounded text-slate-700">Dec.xlsx</code>) or a single multi-sheet workbook.
              </p>

              <button
                type="button"
                disabled={isProcessing}
                onClick={() => bulkFileInputRef.current?.click()}
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 text-xs font-semibold rounded-xl transition-all cursor-pointer disabled:opacity-50"
              >
                <Upload className="w-4 h-4 text-slate-600" />
                <span>{isProcessing ? 'Processing files...' : 'Select 12 Excel / CSV Files'}</span>
              </button>
            </div>
          </div>

          {/* 12-Month Status Grid */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                <span>12 Calendar Months Dataset</span>
                <span className="text-[11px] font-normal text-slate-400">
                  (Click any month to inspect or replace)
                </span>
              </h3>

              <div className="flex items-center gap-2">
                {monthsWithData.length > 0 && (
                  <button
                    onClick={handleClearAll}
                    className="text-xs font-medium text-rose-600 hover:text-rose-700 hover:underline cursor-pointer"
                  >
                    Clear All Months
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
              {MONTHS_LIST.map((month) => {
                const rec = monthlyRecords[month];
                const hasData = rec && rec.parsed.length > 0;
                const isSelected = activePreviewMonth === month;

                return (
                  <div
                    key={month}
                    onClick={() => setActivePreviewMonth(month)}
                    className={`relative p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      isSelected
                        ? 'border-slate-900 bg-white ring-2 ring-slate-900/10 shadow-xs'
                        : hasData
                          ? 'border-emerald-200 bg-white hover:border-emerald-300 shadow-2xs'
                          : 'border-dashed border-slate-200 bg-white/70 hover:bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-slate-800">
                        {MONTH_ABBRS[month]}
                      </span>
                      {hasData ? (
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-slate-300" />
                      )}
                    </div>

                    <div className="text-[11px]">
                      {hasData ? (
                        <div>
                          <span className="font-bold text-slate-900 block font-mono">
                            {rec.parsed.length} <span className="text-[10px] font-sans font-normal text-slate-500">emps</span>
                          </span>
                          <span className="text-[10px] text-slate-400 truncate block mt-0.5" title={rec.fileName}>
                            {rec.fileName}
                          </span>
                        </div>
                      ) : (
                        <span className="text-slate-400 italic">Empty</span>
                      )}
                    </div>

                    {/* Quick Month Actions */}
                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between gap-1 text-[10px]">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setTargetSingleMonth(month);
                          singleMonthFileInputRef.current?.click();
                        }}
                        className="text-slate-600 hover:text-slate-900 font-semibold cursor-pointer"
                      >
                        {hasData ? 'Replace' : '+ Upload'}
                      </button>

                      {hasData && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleClearMonth(month);
                          }}
                          className="text-slate-400 hover:text-rose-600 cursor-pointer"
                          title="Clear month"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Month Preview Section */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
            {/* Preview Section Header */}
            <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-slate-500" />
                  <span>Previewing {activePreviewMonth} List</span>
                </span>
                {activeParsedList.length > 0 ? (
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    {activeParsedList.length} Employees Loaded
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-200 text-slate-600">
                    No data uploaded for this month
                  </span>
                )}
              </div>

              {/* Action Buttons for active month */}
              <div className="flex items-center gap-2">
                {activeParsedList.length > 0 && (
                  <button
                    type="button"
                    onClick={() => handleCopyMonthToAllEmpty(activePreviewMonth)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
                    title="Copy this month's data to all empty months"
                  >
                    <Copy className="w-3 h-3 text-slate-500" />
                    <span>Apply to Empty Months</span>
                  </button>
                )}
              </div>
            </div>

            {/* Table or Empty Placeholder */}
            {activeParsedList.length > 0 ? (
              <div>
                {/* Search Bar */}
                <div className="px-5 py-2.5 border-b border-slate-100 flex items-center justify-between gap-3 bg-white">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder={`Search ${activePreviewMonth} records...`}
                      value={previewSearch}
                      onChange={e => setPreviewSearch(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
                    />
                  </div>
                  <span className="text-xs text-slate-500">
                    Showing {Math.min(filteredPreviewList.length, 100)} of {activeParsedList.length} rows
                  </span>
                </div>

                <div className="max-h-60 overflow-y-auto">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50/80 text-[11px] uppercase tracking-wider text-slate-600 sticky top-0 border-b border-slate-100">
                      <tr>
                        <th className="px-5 py-2.5 font-semibold">Employee ID</th>
                        <th className="px-5 py-2.5 font-semibold">Home Area</th>
                        <th className="px-5 py-2.5 font-semibold">Work Site</th>
                        <th className="px-5 py-2.5 font-semibold">Worker Type</th>
                        <th className="px-5 py-2.5 font-semibold">Transport Mode</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                      {filteredPreviewList.slice(0, 50).map((emp, idx) => (
                        <tr key={`${emp.id}-${idx}`} className="hover:bg-slate-50/80">
                          <td className="px-5 py-2 font-mono font-medium text-slate-900">{emp.id}</td>
                          <td className="px-5 py-2">{emp.district}</td>
                          <td className="px-5 py-2 font-mono text-slate-800">{emp.site || 'SITE-QB'}</td>
                          <td className="px-5 py-2">
                            <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
                              {emp.workerType || 'Office'}
                            </span>
                          </td>
                          <td className="px-5 py-2">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium border ${
                              emp.mode === 'MTR' ? 'bg-emerald-50 text-emerald-800 border-emerald-200/90' :
                              emp.mode === 'Bus' ? 'bg-amber-50 text-amber-800 border-amber-200/90' :
                              emp.mode === 'Private Car' ? 'bg-blue-50 text-blue-800 border-blue-200/90' :
                              emp.mode === 'Walk' ? 'bg-teal-50 text-teal-800 border-teal-200/90' :
                              'bg-slate-50 text-slate-700 border-slate-200'
                            }`}>
                              {emp.mode}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center bg-white">
                <FileSpreadsheet className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-xs font-semibold text-slate-700">
                  No Excel data uploaded for {activePreviewMonth} yet.
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Use the bulk upload section above or copy employee data from another uploaded month.
                </p>
              </div>
            )}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-600">
            <span>Summary: </span>
            <strong className="text-slate-900 font-bold">{monthsWithData.length}</strong> month(s) configured with{' '}
            <strong className="text-slate-900 font-bold">{totalRecordsLoaded.toLocaleString()}</strong> total commute records
            {monthsWithData.length > 0 && ` (~${avgEmployeesPerMonth} employees/month)`}.
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-transparent hover:bg-slate-100 border border-transparent hover:border-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={monthsWithData.length === 0}
              className="inline-flex items-center gap-2 px-5 py-2 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl shadow-2xs transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Confirm & Apply 12 Months Data</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
