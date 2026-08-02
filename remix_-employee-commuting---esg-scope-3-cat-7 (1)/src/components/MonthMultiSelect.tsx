import React, { useState, useRef, useEffect } from 'react';
import { Calendar, Check, ChevronDown, CheckSquare, Square, RefreshCw } from 'lucide-react';
import { MONTHS_LIST } from '../utils/constants';

interface MonthMultiSelectProps {
  selectedMonths: string[];
  onChangeSelectedMonths: (months: string[]) => void;
  workingDaysOfficeMap: Record<string, number>;
  onOpenWorkingDaysModal?: () => void;
}

export const MonthMultiSelect: React.FC<MonthMultiSelectProps> = ({
  selectedMonths,
  onChangeSelectedMonths,
  workingDaysOfficeMap,
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

  // Calculate total working days for selected months
  const totalDays = selectedMonths.reduce((acc, m) => acc + (workingDaysOfficeMap[m] || 21), 0);

  // Display label
  const labelText = selectedMonths.length === 12 
    ? "All 12 Months (Full Year)"
    : selectedMonths.length === 1
    ? selectedMonths[0]
    : `${selectedMonths.length} Months Selected (${selectedMonths.slice(0, 2).join(', ')}${selectedMonths.length > 2 ? '...' : ''})`;

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
          className="inline-flex items-center justify-between gap-2 px-3 py-1.5 bg-white border border-slate-300 rounded-lg shadow-xs text-xs font-medium text-slate-800 hover:bg-slate-50 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 transition-colors min-w-[210px]"
        >
          <span className="truncate font-semibold text-emerald-900">{labelText}</span>
          <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-full font-mono font-bold shrink-0">
            {totalDays} days
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-1" />
        </button>

        {onOpenWorkingDaysModal && (
          <button
            type="button"
            onClick={onOpenWorkingDaysModal}
            title="Configure working days per month"
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-72 bg-white rounded-xl shadow-xl border border-slate-200 z-50 p-3 animate-in fade-in zoom-in-95 duration-100">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-700">Select Months</span>
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

          {/* Quick Presets */}
          <div className="grid grid-cols-4 gap-1 mb-2.5">
            <button
              type="button"
              onClick={() => selectPreset(["January", "February", "March"])}
              className="px-1.5 py-1 text-[10px] font-medium bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 rounded-md text-slate-600 transition-colors"
            >
              Q1
            </button>
            <button
              type="button"
              onClick={() => selectPreset(["April", "May", "June"])}
              className="px-1.5 py-1 text-[10px] font-medium bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 rounded-md text-slate-600 transition-colors"
            >
              Q2
            </button>
            <button
              type="button"
              onClick={() => selectPreset(["July", "August", "September"])}
              className="px-1.5 py-1 text-[10px] font-medium bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 rounded-md text-slate-600 transition-colors"
            >
              Q3
            </button>
            <button
              type="button"
              onClick={() => selectPreset(["October", "November", "December"])}
              className="px-1.5 py-1 text-[10px] font-medium bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 rounded-md text-slate-600 transition-colors"
            >
              Q4
            </button>
          </div>

          {/* Months Checkbox Grid */}
          <div className="grid grid-cols-2 gap-1 max-h-56 overflow-y-auto">
            {MONTHS_LIST.map((m) => {
              const isSelected = selectedMonths.includes(m);
              const days = workingDaysOfficeMap[m] || 21;

              return (
                <button
                  key={m}
                  type="button"
                  onClick={() => toggleMonth(m)}
                  className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                    isSelected 
                      ? 'bg-emerald-50 text-emerald-900 font-semibold border border-emerald-200' 
                      : 'hover:bg-slate-50 text-slate-600 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-1.5 truncate">
                    {isSelected ? (
                      <CheckSquare className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    ) : (
                      <Square className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                    )}
                    <span className="truncate">{m}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono shrink-0">
                    {days}d
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-3 pt-2 border-t border-slate-100 flex justify-between items-center text-[11px] text-slate-500">
            <span>Total: <strong className="text-slate-800">{selectedMonths.length}</strong> months</span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-2.5 py-1 bg-emerald-600 text-white font-medium rounded-md hover:bg-emerald-700 transition-colors text-xs"
            >
              Apply Filter
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
