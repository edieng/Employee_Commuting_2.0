import React from 'react';
import { X, Check, FileSpreadsheet } from 'lucide-react';
import { CommuteRosterItem } from '../types';
import { getAllocatedTransportMode } from '../utils/constants';

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

  const empIdCol = findBestHeader(['employee id', 'empid', 'emp id', 'employee_id', 'staff id', 'staff_id', 'emp_no', 'emp', 'id']);
  const districtCol = findBestHeader(['district', 'area', 'home area', 'home', 'residential', 'origin']);
  const siteCol = findBestHeader(['site code', 'sitecode', 'work site', 'worksite', 'workplace code', 'site_code', 'site', 'workplace', 'office', 'destination', 'location']);
  const workerTypeCol = findBestHeader(['worker type', 'workertype', 'worker', 'category', 'role', 'type']);
  const modeCol = findBestHeader(['mode', 'transport mode', 'transport', 'commute', 'method']);

  const parsedRoster: CommuteRosterItem[] = rawRosterData.map((row, idx) => {
    const rawId = String(row[empIdCol] || '').trim();
    const id = rawId ? rawId : `EMP-${(idx + 1).toString().padStart(4, '0')}`;
    
    const district = String(row[districtCol] || 'Tsuen Wan Town').trim();
    const modeRaw = String(row[modeCol] || '').trim().toLowerCase();
    
    let mode: 'MTR' | 'Bus' | 'Private Car' | 'Walk';
    if (modeRaw.includes('bus') || modeRaw.includes('minibus')) {
      mode = 'Bus';
    } else if (modeRaw.includes('car') || modeRaw.includes('drive') || modeRaw.includes('private')) {
      mode = 'Private Car';
    } else if (modeRaw.includes('walk') || modeRaw.includes('foot')) {
      mode = 'Walk';
    } else if (modeRaw.includes('mtr') || modeRaw.includes('train') || modeRaw.includes('subway')) {
      mode = 'MTR';
    } else {
      // Auto-assign transport mode according to HK region ratio & walk rule
      mode = getAllocatedTransportMode(5.0, district);
    }

    const site = String(row[siteCol] || 'SITE-QB').trim();
    const workerTypeRaw = String(row[workerTypeCol] || 'Office').trim().toLowerCase();
    const workerType: 'Office' | 'Frontline' = workerTypeRaw.includes('front') ? 'Frontline' : 'Office';

    return {
      id,
      district,
      mode,
      site,
      workerType
    };
  });

  const handleConfirm = () => {
    onConfirmUpload(parsedRoster);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="px-6 py-4 bg-white border-b border-slate-200 text-slate-900 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-slate-100 rounded-lg text-slate-700">
              <FileSpreadsheet className="w-5 h-5 text-slate-700" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Import Employee Commute List ({rawRosterData.length} Records)
              </h2>
              <p className="text-xs text-slate-500">
                Preview employee list data imported from Excel / CSV file before confirming
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          
          {/* Table Preview */}
          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs">
            <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200 font-bold text-xs text-slate-700 flex items-center justify-between">
              <span>Parsed Preview (First {Math.min(10, parsedRoster.length)} of {parsedRoster.length} rows)</span>
            </div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white text-slate-500 text-[11px] uppercase font-bold tracking-tight border-b border-slate-200">
                  <th className="px-4 py-2.5 text-slate-900">Employee ID</th>
                  <th className="px-4 py-2.5 text-slate-900">Home Area</th>
                  <th className="px-4 py-2.5 text-slate-900">Work Site</th>
                  <th className="px-4 py-2.5 text-slate-900">Worker Type</th>
                  <th className="px-4 py-2.5 text-slate-900">Transport Mode</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700 font-sans">
                {parsedRoster.slice(0, 10).map((r, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-4 py-2.5 font-bold text-slate-900 font-mono">{r.id}</td>
                    <td className="px-4 py-2.5 text-slate-800">{r.district}</td>
                    <td className="px-4 py-2.5 text-slate-800">{r.site}</td>
                    <td className="px-4 py-2.5 text-slate-600">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
                        {r.workerType || 'Office'}
                      </span>
                    </td>
                    <td className="px-4 py-2.5">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-medium border ${
                        r.mode === 'MTR' ? 'bg-emerald-50 text-emerald-800 border-emerald-200/90' :
                        r.mode === 'Bus' ? 'bg-amber-50 text-amber-800 border-amber-200/90' :
                        r.mode === 'Private Car' ? 'bg-blue-50 text-blue-800 border-blue-200/90' :
                        r.mode === 'Walk' ? 'bg-teal-50 text-teal-800 border-teal-200/90' :
                        'bg-slate-50 text-slate-700 border-slate-200'
                      }`}>
                        {r.mode}
                      </span>
                    </td>
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
            className="px-4 py-2 bg-white border border-slate-300 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Check className="w-4 h-4" />
            Import {parsedRoster.length} Employees
          </button>
        </div>

      </div>
    </div>
  );
};
