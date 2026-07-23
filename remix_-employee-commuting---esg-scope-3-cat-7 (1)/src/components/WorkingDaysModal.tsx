import React from 'react';
import { X, Calendar, Save } from 'lucide-react';
import { MONTHS_LIST } from '../utils/constants';

interface WorkingDaysModalProps {
  isOpen: boolean;
  onClose: () => void;
  workingDaysOffice: Record<string, number>;
  workingDaysFrontline: Record<string, number>;
  onUpdateOfficeDays: (month: string, days: number) => void;
  onUpdateFrontlineDays: (month: string, days: number) => void;
  onResetDefaults: () => void;
}

export const WorkingDaysModal: React.FC<WorkingDaysModalProps> = ({
  isOpen,
  onClose,
  workingDaysOffice,
  workingDaysFrontline,
  onUpdateOfficeDays,
  onUpdateFrontlineDays,
  onResetDefaults
}) => {
  if (!isOpen) return null;

  const totalOffice = MONTHS_LIST.reduce((sum, m) => sum + (workingDaysOffice[m] || 21), 0);
  const totalFrontline = MONTHS_LIST.reduce((sum, m) => sum + (workingDaysFrontline[m] || 25), 0);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-400" />
            <div>
              <h2 className="text-base font-bold">12-Month Working Days Configuration</h2>
              <p className="text-xs text-slate-300">
                Annual carbon emissions sum across all 12 months based on these values.
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
        <div className="p-6 overflow-y-auto flex-1">
          <div className="flex items-center justify-between mb-4 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Annual Total Working Days</span>
              <div className="flex items-center gap-4 mt-1 text-sm font-bold font-mono text-slate-800">
                <span>Office: <strong className="text-emerald-600">{totalOffice} days</strong></span>
                <span>Frontline: <strong className="text-blue-600">{totalFrontline} days</strong></span>
              </div>
            </div>
            <button
              onClick={onResetDefaults}
              className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Reset Defaults
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {MONTHS_LIST.map((m) => (
              <div key={m} className="p-3 bg-white border border-slate-200 rounded-xl hover:border-slate-300 transition-colors">
                <div className="font-semibold text-xs text-slate-800 mb-2">{m}</div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-medium text-slate-500 block mb-0.5">
                      Office Staff Days
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={31}
                      value={workingDaysOffice[m] || 21}
                      onChange={(e) => onUpdateOfficeDays(m, parseInt(e.target.value) || 0)}
                      className="w-full px-2.5 py-1 text-xs border border-slate-300 rounded-lg font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-medium text-slate-500 block mb-0.5">
                      Frontline Staff Days
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={31}
                      value={workingDaysFrontline[m] || 25}
                      onChange={(e) => onUpdateFrontlineDays(m, parseInt(e.target.value) || 0)}
                      className="w-full px-2.5 py-1 text-xs border border-slate-300 rounded-lg font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            Save & Recalculate
          </button>
        </div>

      </div>
    </div>
  );
};
