import React from 'react';
import { MonthMultiSelect } from './MonthMultiSelect';

interface HeaderProps {
  selectedMonths: string[];
  onChangeSelectedMonths: (months: string[]) => void;
  workingDaysOfficeMap: Record<string, number>;
  workingDaysFrontlineMap: Record<string, number>;
  onOpenWorkingDaysModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  selectedMonths,
  onChangeSelectedMonths,
  workingDaysOfficeMap,
  workingDaysFrontlineMap,
  onOpenWorkingDaysModal
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 transition-colors">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
        
        {/* App Title */}
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
              Employee Commuting Calculator
              <span className="text-[10px] font-semibold px-2 py-0.5 font-mono bg-slate-100 text-slate-700 border border-slate-200 rounded-md">
                Scope 3 Category 7
              </span>
            </h1>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <MonthMultiSelect
            selectedMonths={selectedMonths}
            onChangeSelectedMonths={onChangeSelectedMonths}
            workingDaysOfficeMap={workingDaysOfficeMap}
            workingDaysFrontlineMap={workingDaysFrontlineMap}
            onOpenWorkingDaysModal={onOpenWorkingDaysModal}
          />
        </div>

      </div>
    </header>
  );
};

