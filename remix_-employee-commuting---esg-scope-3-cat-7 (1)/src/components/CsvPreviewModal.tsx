import React, { useState } from 'react';
import { X, Check, Users, FileSpreadsheet } from 'lucide-react';
import { CommuteRosterItem } from '../types';

interface CsvPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  rawRosterData: Record<string, any>[];
  onConfirmUpload: (roster: CommuteRosterItem[]) => void;
}

export const CsvPreviewModal: React.FC<CsvPreviewModalProps> = ({
  isOpen,
  onClose,
  rawRosterData,
  onConfirmUpload
}) => {
  if (!isOpen || !rawRosterData || rawRosterData.length === 0) return null;

  const availableHeaders = Object.keys(rawRosterData[0] || {});

  const findBestHeader = (keywords: string[]) => {
    return availableHeaders.find(h => 
      keywords.some(k => h.toLowerCase().trim().includes(k))
    ) || availableHeaders[0] || '';
  };

  const [districtCol, setDistrictCol] = useState(findBestHeader(['district', 'area', 'home', 'residential']));
  const [modeCol, setModeCol] = useState(findBestHeader(['mode', 'transport', 'commute', 'method']));
  const [siteCol, setSiteCol] = useState(findBestHeader(['site', 'workplace', 'office', 'destination']));
  const [workerTypeCol, setWorkerTypeCol] = useState(findBestHeader(['worker', 'category', 'role', 'type']));
  const [segmentCol, setSegmentCol] = useState(findBestHeader(['segment', 'department', 'unit', 'team', 'division']));

  const parsedRoster: CommuteRosterItem[] = rawRosterData.map((row, idx) => {
    const district = String(row[districtCol] || 'Tsuen Wan Town').trim();
    const modeRaw = String(row[modeCol] || 'MTR').trim().toLowerCase();
    
    let mode: 'MTR' | 'Bus' | 'Private Car' | 'Walk' = 'MTR';
    if (modeRaw.includes('bus') || modeRaw.includes('minibus')) mode = 'Bus';
    else if (modeRaw.includes('car') || modeRaw.includes('drive') || modeRaw.includes('private')) mode = 'Private Car';
    else if (modeRaw.includes('walk') || modeRaw.includes('foot')) mode = 'Walk';

    const site = String(row[siteCol] || 'SITE-QB').trim();
    const workerTypeRaw = String(row[workerTypeCol] || 'Office').trim().toLowerCase();
    const workerType: 'Office' | 'Frontline' = workerTypeRaw.includes('front') ? 'Frontline' : 'Office';

    const segment = String(row[segmentCol] || 'IT').trim();

    return {
      id: `EMP-${(idx + 1).toString().padStart(4, '0')}`,
      district,
      mode,
      site,
      workerType,
      segment
    } as CommuteRosterItem & { segment?: string };
  });

  const handleConfirm = () => {
    onConfirmUpload(parsedRoster);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-blue-400" />
            <div>
              <h2 className="text-base font-bold">Import Employee Commute Roster ({rawRosterData.length} Records)</h2>
              <p className="text-xs text-slate-300">
                Match CSV/Excel column headers to populate district and transport data
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* Header selectors */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-tight block">
              Match Header Mapping
            </span>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              <div>
                <label className="text-[10px] font-semibold text-slate-600 block mb-1">Segment</label>
                <select
                  value={segmentCol}
                  onChange={e => setSegmentCol(e.target.value)}
                  className="w-full px-2 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-semibold"
                >
                  {availableHeaders.map(h => <option key={h} value={h}>{h}</option>)}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-semibold text-slate-600 block mb-1">District *</label>
                <select
                  value={districtCol}
                  onChange={e => setDistrictCol(e.target.value)}
                  className="w-full px-2 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-semibold"
                >
                  {availableHeaders.map(h => <option key={h} value={h}>{h}</option>)}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-semibold text-slate-600 block mb-1">Transport Mode</label>
                <select
                  value={modeCol}
                  onChange={e => setModeCol(e.target.value)}
                  className="w-full px-2 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {availableHeaders.map(h => <option key={h} value={h}>{h}</option>)}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-semibold text-slate-600 block mb-1">Work Site</label>
                <select
                  value={siteCol}
                  onChange={e => setSiteCol(e.target.value)}
                  className="w-full px-2 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {availableHeaders.map(h => <option key={h} value={h}>{h}</option>)}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-semibold text-slate-600 block mb-1">Worker Type</label>
                <select
                  value={workerTypeCol}
                  onChange={e => setWorkerTypeCol(e.target.value)}
                  className="w-full px-2 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {availableHeaders.map(h => <option key={h} value={h}>{h}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Table Preview */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 font-bold text-xs text-slate-700">
              Parsed Preview (First {Math.min(10, parsedRoster.length)} rows)
            </div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-600 text-[11px] uppercase font-bold tracking-tight border-b border-slate-200">
                  <th className="px-4 py-2">Emp ID</th>
                  <th className="px-4 py-2">Segment</th>
                  <th className="px-4 py-2">District</th>
                  <th className="px-4 py-2">Mode</th>
                  <th className="px-4 py-2">Worker Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-xs text-slate-700">
                {parsedRoster.slice(0, 10).map((r, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 font-mono">
                    <td className="px-4 py-2 font-bold text-slate-500">{r.id}</td>
                    <td className="px-4 py-2 font-sans font-bold text-slate-800">{(r as any).segment || 'P&C'}</td>
                    <td className="px-4 py-2 font-sans text-slate-900">{r.district}</td>
                    <td className="px-4 py-2 font-semibold text-emerald-700">{r.mode}</td>
                    <td className="px-4 py-2 font-sans text-slate-600">{r.workerType}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white border border-slate-300 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            Import {parsedRoster.length} Employees
          </button>
        </div>

      </div>
    </div>
  );
};
