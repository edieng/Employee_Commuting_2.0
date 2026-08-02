import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import { DistrictCalculation, CustomWorkSite } from '../types';
import { DISTRICT_DATA } from '../utils/constants';
import { DistrictToSiteReview } from './DistrictToSiteReview';

interface SamplerTabProps {
  districtCalcs: DistrictCalculation[];
  customSites: CustomWorkSite[];
}

export const SamplerTab: React.FC<SamplerTabProps> = ({ districtCalcs, customSites }) => {
  const [selectedDistrict, setSelectedDistrict] = useState(districtCalcs[0]?.name || 'Tsuen Wan Town');

  const activeData = districtCalcs.find(d => d.name === selectedDistrict) || districtCalcs[0];
  const activeConfig = DISTRICT_DATA[selectedDistrict];

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-amber-500" />
            18 Districts Geodata Sampler & Parameters
          </h2>
          <p className="text-xs text-slate-500">
            Inspect ESG commute parameters, district employee distributions, and distance matrices across Hong Kong
          </p>
        </div>
      </div>

      {/* District Detail Cards */}
      {activeData && activeConfig && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Overview */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">{activeData.name}</h3>
              <span className="text-xs font-semibold text-slate-500">{activeData.nameZH}</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">District Employees:</span>
                <span className="font-mono font-bold text-slate-900">{activeData.employees}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Public Housing Ratio:</span>
                <span className="font-mono font-bold text-blue-600">{Math.round(activeData.pubRatio * 100)}%</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Private Housing Ratio:</span>
                <span className="font-mono font-bold text-emerald-600">{Math.round((1 - activeData.pubRatio) * 100)}%</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Average Commute Dist:</span>
                <span className="font-mono font-bold text-amber-600">{activeData.avgDistance} km</span>
              </div>
            </div>
          </div>

          {/* Card 2: Transport Mode Splits */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
              Transport Mode Share in {activeData.name}
            </h3>

            <div className="space-y-2.5">
              {Object.entries(activeData.splits).map(([mode, pct]) => (
                <div key={mode} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-700">{mode}</span>
                    <span className="font-mono font-bold text-slate-900">{pct}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        mode === 'MTR' ? 'bg-emerald-500' :
                        mode === 'Bus' ? 'bg-blue-500' :
                        mode === 'Private Car' ? 'bg-amber-500' : 'bg-slate-400'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 3: Geodata Coordinates */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
              District Geographical Spread
            </h3>

            <div className="space-y-2 text-xs font-mono">
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-400 font-sans block uppercase font-bold">Center Latitude / Longitude</span>
                <span className="text-slate-800 font-bold">{activeConfig.lat.toFixed(4)}, {activeConfig.lng.toFixed(4)}</span>
              </div>

              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-400 font-sans block uppercase font-bold">Spread Radius</span>
                <span className="text-slate-800 font-bold">{activeConfig.radius} km</span>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* District-to-Site Commute & Distance Review */}
      <DistrictToSiteReview customSites={customSites} districtCalcs={districtCalcs} />

    </div>
  );
};

