import React, { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronDown, RefreshCw } from 'lucide-react';
import { MONTHS_LIST, MONTH_ABBRS, formatSelectedMonths } from '../utils/constants';

interface MonthMultiSelectProps {
  selectedMonths: string[];
  onChangeSelectedMonths: (months: string[]) => void;
  workingDaysOfficeMap: Record<string, number>;
  workingDaysFrontlineMap?: Record<string, number>;
  onOpenWorkingDaysModal?: () => void;
}

export const MonthMultiSelect: React.FC<MonthMultiSelectProps> = ({
  selectedMonths,
  onChangeSelectedMonths,
  workingDaysOfficeMap,
  workingDaysFrontlineMap = {},
  onOpenWorkingDaysModal
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMonth = (month: string) => {
    if (selectedMonths.includes(month)) {
      if (selectedMonths.length === 1) return; // keep at least one month
      onChangeSelectedMonths(selectedMonths.filter(m => m !== month));
    } else {
      onChangeSelectedMonths([...selectedMonths, month]);
    }
  };

  const selectAll = () => onChangeSelectedMonths([...MONTHS_LIST]);
  const clearAll = () => onChangeSelectedMonths([MONTHS_LIST[0]]); // default Jan
  const selectPreset = (months: string[]) => onChangeSelectedMonths(months);

  // Calculate total working days for selected months (Office and Frontline)
  const totalOfficeDays = selectedMonths.reduce((acc, m) => acc + (workingDaysOfficeMap[m] || 21), 0);
  const totalFrontlineDays = selectedMonths.reduce((acc, m) => acc + (workingDaysFrontlineMap[m] || 25), 0);

  // Formatted short label
  const labelText = formatSelectedMonths(selectedMonths);

  const isQuarterSelected = (quarterMonths: string[]) => {
    return quarterMonths.length === selectedMonths.length && 
      quarterMonths.every(m => selectedMonths.includes(m));
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div className="flex items-center gap-1.5">
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          Reporting Period:
        </label>
        
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center justify-between gap-2 px-3 py-1.5 bg-white border border-slate-300 rounded-lg shadow-xs text-xs font-medium text-slate-800 hover:bg-slate-50 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 transition-colors"
        >
          <span className="truncate font-bold text-emerald-900">{labelText}</span>
          <div className="flex items-center gap-1 shrink-0 font-mono text-[10px]">
            <span className="bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-md font-bold" title="Office Working Days">
              Office: {totalOfficeDays}d
            </span>
            <span className="bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-md font-bold" title="Frontline Working Days">
              Frontline: {totalFrontlineDays}d
            </span>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-0.5" />
        </button>

        {onOpenWorkingDaysModal && (
          <button
            type="button"
            onClick={onOpenWorkingDaysModal}
            title="Configure working days per month"
            className="px-2.5 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-emerald-600" />
            <span>Working Days Settings</span>
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-[360px] bg-white rounded-xl shadow-xl border border-slate-200 z-50 p-4 animate-in fade-in zoom-in-95 duration-100">
          
          {/* Section 1 Header */}
          <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">Select Months</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={selectAll}
                className="text-[11px] text-emerald-600 hover:text-emerald-700 font-semibold"
              >
                Select All
              </button>
              <button
                type="button"
                onClick={clearAll}
                className="text-[11px] text-slate-500 hover:text-slate-700"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Section 1: Select Months (2 rows of 6 months) */}
          <div className="grid grid-cols-6 gap-1.5 mb-4">
            {MONTHS_LIST.map((m) => {
              const isSelected = selectedMonths.includes(m);
              const abbr = MONTH_ABBRS[m] || m.slice(0, 3);

              return (
                <button
                  key={m}
                  type="button"
                  onClick={() => toggleMonth(m)}
                  title={m}
                  className={`py-2 px-1 text-xs font-bold rounded-lg transition-all text-center ${
                    isSelected 
                      ? 'bg-emerald-600 text-white shadow-xs' 
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200/60'
                  }`}
                >
                  {abbr}
                </button>
              );
            })}
          </div>

          {/* Section 2: Select Quarter */}
          <div className="pt-3 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">
              Select Quarter
            </span>
            <div className="grid grid-cols-4 gap-1.5">
              {[
                { label: 'Q1', months: ["January", "February", "March"] },
                { label: 'Q2', months: ["April", "May", "June"] },
                { label: 'Q3', months: ["July", "August", "September"] },
                { label: 'Q4', months: ["October", "November", "December"] },
              ].map((q) => {
                const active = isQuarterSelected(q.months);
                return (
                  <button
                    key={q.label}
                    type="button"
                    onClick={() => selectPreset(q.months)}
                    className={`py-1.5 px-2 text-xs font-bold rounded-lg transition-all text-center ${
                      active
                        ? 'bg-emerald-700 text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700'
                    }`}
                  >
                    {q.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-4 pt-2.5 border-t border-slate-100 flex justify-between items-center text-[11px] text-slate-500">
            <span>
              Period: <strong className="text-slate-900 font-bold">{labelText}</strong> ({selectedMonths.length} mo)
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-3 py-1 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 transition-colors text-xs"
            >
              Apply
            </button>
          </div>

        </div>
      )}
    </div>
  );
};
