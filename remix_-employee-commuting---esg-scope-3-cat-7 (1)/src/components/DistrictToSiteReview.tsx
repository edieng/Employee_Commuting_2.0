import React, { useState } from 'react';
import { MapPin, Navigation, Compass, Building2, Footprints } from 'lucide-react';
import { CustomWorkSite, DistrictCalculation } from '../types';
import { DISTRICT_DATA } from '../utils/constants';
import { haversineDistance, getHKRoadFactor } from '../services/emissionCalculator';

interface DistrictToSiteReviewProps {
  customSites: CustomWorkSite[];
  districtCalcs: DistrictCalculation[];
}

export const DistrictToSiteReview: React.FC<DistrictToSiteReviewProps> = ({
  customSites,
  districtCalcs
}) => {
  const districtKeys = Object.keys(DISTRICT_DATA);
  const [selectedDistrict, setSelectedDistrict] = useState<string>(
    districtKeys.includes("Ma Wan / Park Island") ? "Ma Wan / Park Island" : districtKeys[0] || ""
  );

  const activeSites = customSites.filter(s => s.visible !== false);
  const sitesToDisplay = activeSites.length > 0 ? activeSites : customSites;

  const currentDistrictData = DISTRICT_DATA[selectedDistrict];
  const matchedCalc = districtCalcs.find(d => d.name === selectedDistrict);
  const residentEmployeesCount = matchedCalc ? matchedCalc.employees : 0;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden my-6">
      
      {/* Title Bar & Selector */}
      <div className="px-6 py-4 bg-slate-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-purple-500/20 text-purple-400 rounded-xl border border-purple-500/30">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold tracking-tight uppercase">
              District-to-Site Commute & Distance Review
            </h3>
            <p className="text-xs text-slate-400">
              Cross-site geographic proximity & commute comparison engine
            </p>
          </div>
        </div>

        {/* Home District Selector */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-slate-300 shrink-0 uppercase tracking-tight">
            Select Home District:
          </label>
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="px-3 py-1.5 bg-slate-800 border border-slate-700 text-white font-semibold text-xs rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
          >
            {districtKeys.map((key) => {
              const d = DISTRICT_DATA[key];
              return (
                <option key={key} value={key}>
                  {d.name} ({d.nameZH})
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {/* Profile Header Banner */}
      <div className="p-6 bg-slate-50 border-b border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1">
          <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span className="text-purple-600 font-extrabold text-lg">•</span>
            {selectedDistrict} District Commuting Profile
          </h4>
          <span className="text-xs font-mono font-bold bg-purple-100 text-purple-900 px-3 py-1 rounded-full border border-purple-200 shrink-0">
            {residentEmployeesCount} TOTAL EMPLOYEES RESIDENT HERE
          </span>
        </div>
        <p className="text-xs text-slate-600 mb-3">
          Comparing specific estimated average commute distance to each site from {selectedDistrict} ({currentDistrictData?.nameZH || ''}).
        </p>

        {/* Central Average Point GPS Coordinates */}
        <div className="inline-flex flex-wrap items-center gap-3 px-3.5 py-2 bg-white rounded-xl border border-purple-200 shadow-2xs text-xs font-mono">
          <div className="flex items-center gap-1.5 text-purple-800 font-bold">
            <MapPin className="w-3.5 h-3.5 text-purple-600 shrink-0" />
            District Central Average Point:
          </div>
          <span className="text-slate-900 font-bold bg-purple-50 px-2 py-0.5 rounded-md border border-purple-100">
            Lat {currentDistrictData?.lat.toFixed(4)}°, Lng {currentDistrictData?.lng.toFixed(4)}°
          </span>
          <span className="text-[10px] text-slate-500 font-sans font-medium border-l border-slate-200 pl-2">
            GIS Reference Center Point
          </span>
        </div>
      </div>

      {/* Sites Grid */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {sitesToDisplay.map((site, index) => {
          const originLat = currentDistrictData?.lat ?? 22.3;
          const originLng = currentDistrictData?.lng ?? 114.15;
          const linearDist = haversineDistance(originLat, originLng, site.lat, site.lng);
          const roadFactor = getHKRoadFactor(linearDist);
          const roadDist = Number((linearDist * roadFactor).toFixed(1));
          
          // Walking minutes estimate (~12.5 mins per km)
          const estWalkMins = Math.round(roadDist * 12.5);

          // Proximity rating
          let proximityLabel = "Short Commute";
          let badgeColor = "bg-emerald-100 text-emerald-800 border-emerald-300";
          let barColor = "bg-emerald-500";

          if (roadDist >= 20.0) {
            proximityLabel = "Long Commute";
            badgeColor = "bg-rose-100 text-rose-800 border-rose-300";
            barColor = "bg-rose-500";
          } else if (roadDist >= 10.0) {
            proximityLabel = "Moderate Commute";
            badgeColor = "bg-amber-100 text-amber-800 border-amber-300";
            barColor = "bg-amber-500";
          }

          const proximityPct = Math.min(100, Math.max(12, Math.round((roadDist / 35.0) * 100)));
          const siteCode = site.siteCode || `SITE-0${index + 1}`;

          return (
            <div
              key={site.id}
              className="bg-white border border-slate-200 hover:border-purple-300 rounded-2xl p-5 shadow-2xs transition-all hover:shadow-md flex flex-col justify-between space-y-4"
            >
              {/* Site Header */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 bg-slate-900 text-white rounded-md tracking-wider">
                    WORK SITE {index + 1}
                  </span>
                  <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-lg border ${badgeColor}`}>
                    {roadDist} km
                  </span>
                </div>

                <h5 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-purple-600 shrink-0" />
                  [{siteCode}] {site.name}
                </h5>

                <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                  {site.district}
                </p>
              </div>

              {/* Commute Proximity Bar */}
              <div className="space-y-1.5 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div className="flex justify-between text-[11px] font-semibold">
                  <span className="text-slate-600">Commute Proximity</span>
                  <span className="font-bold text-slate-800">{proximityLabel}</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${barColor} transition-all duration-300`}
                    style={{ width: `${proximityPct}%` }}
                  />
                </div>
              </div>

              {/* Footer Details */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-600">
                <span className="flex items-center gap-1 text-slate-700 font-semibold">
                  <Footprints className="w-3.5 h-3.5 text-amber-600" />
                  Est. Walk: {estWalkMins} mins
                </span>
                <span className="bg-slate-100 text-slate-800 font-bold px-2 py-0.5 rounded-md border border-slate-200">
                  Road Factor: x{roadFactor.toFixed(2)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
