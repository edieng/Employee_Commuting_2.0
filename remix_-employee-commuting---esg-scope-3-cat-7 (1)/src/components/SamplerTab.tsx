import React, { useState } from 'react';
import { DistrictCalculation, CustomWorkSite } from '../types';
import { DISTRICT_DATA, renderAreaSelectOptions } from '../utils/constants';
import { DistrictToSiteReview } from './DistrictToSiteReview';

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

interface SamplerTabProps {
  districtCalcs: DistrictCalculation[];
  customSites: CustomWorkSite[];
}

export const SamplerTab: React.FC<SamplerTabProps> = ({ districtCalcs, customSites }) => {
  const [selectedDistrict, setSelectedDistrict] = useState('Central (中環)');

  const activeData = districtCalcs.find(d => d.name === selectedDistrict || selectedDistrict.includes(d.name) || d.name.includes(selectedDistrict)) || districtCalcs[0];
  const activeConfig = DISTRICT_DATA[selectedDistrict] || 
    Object.values(DISTRICT_DATA).find(d => selectedDistrict.includes(d.name) || d.name.includes(selectedDistrict)) || 
    Object.values(DISTRICT_DATA)[0];

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <RouteMapIcon className="w-5 h-5 text-slate-700 shrink-0" />
            Area-to-Site Commute Reference
          </h2>
        </div>

        {/* Home Area Selector in Top Header */}
        <div className="flex items-center gap-2 shrink-0">
          <label className="text-xs font-semibold text-slate-700 shrink-0 uppercase tracking-tight">
            Select Home Area:
          </label>
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="px-3.5 py-2 bg-white border border-slate-300 text-slate-800 font-semibold text-xs rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-slate-900 shadow-2xs transition-all cursor-pointer"
          >
            {renderAreaSelectOptions()}
          </select>
        </div>
      </div>

      {/* District Detail Cards */}
      {activeData && activeConfig && (
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
            Transport Mode Share in {activeData.name}
          </h3>

          <div className="space-y-3">
            {Object.entries(activeData.splits).map(([mode, pct]) => (
              <div key={mode} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-700">{mode}</span>
                  <span className="font-mono font-bold text-slate-900">{pct}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      mode === 'MTR' ? 'bg-emerald-400' :
                      mode === 'Bus' ? 'bg-amber-300' :
                      mode === 'Private Car' ? 'bg-blue-400' :
                      mode === 'Walk' ? 'bg-teal-300' : 'bg-slate-300'
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* District-to-Site Commute & Distance Review */}
      <DistrictToSiteReview customSites={customSites} districtCalcs={districtCalcs} selectedDistrict={selectedDistrict} />

    </div>
  );
};

