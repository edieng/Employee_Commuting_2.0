import React, { useState } from 'react';
import { MapPin, Navigation, Compass, Footprints } from 'lucide-react';
import { CustomWorkSite, DistrictCalculation } from '../types';
import { DISTRICT_DATA, renderAreaSelectOptions } from '../utils/constants';
import { haversineDistance, getHKRoadFactor } from '../services/emissionCalculator';

interface DistrictToSiteReviewProps {
  customSites: CustomWorkSite[];
  districtCalcs: DistrictCalculation[];
  selectedDistrict: string;
}

export const DistrictToSiteReview: React.FC<DistrictToSiteReviewProps> = ({
  customSites,
  districtCalcs,
  selectedDistrict
}) => {
  const activeSites = customSites.filter(s => s.visible !== false);
  const sitesToDisplay = activeSites.length > 0 ? activeSites : customSites;

  const currentDistrictData = DISTRICT_DATA[selectedDistrict] || 
    Object.values(DISTRICT_DATA).find(d => selectedDistrict.includes(d.name) || d.name.includes(selectedDistrict)) || 
    Object.values(DISTRICT_DATA)[0];
  const matchedCalc = districtCalcs.find(d => d.name === selectedDistrict || selectedDistrict.includes(d.name) || d.name.includes(selectedDistrict));
  const residentEmployeesCount = matchedCalc ? matchedCalc.employees : 0;

  const hasZH = currentDistrictData?.nameZH && selectedDistrict.includes(currentDistrictData.nameZH);
  const displayName = (hasZH || !currentDistrictData?.nameZH)
    ? selectedDistrict
    : `${selectedDistrict} (${currentDistrictData.nameZH})`;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden my-6">
      
      {/* Profile Header Banner */}
      <div className="p-6 bg-slate-50 border-b border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1">
          <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span className="text-slate-400 font-extrabold text-lg">•</span>
            {displayName} Commuting Profile
          </h4>
          <span className="text-xs bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full font-medium border border-slate-200 shrink-0">
            {residentEmployeesCount} Total Employees Resident Here
          </span>
        </div>
        <p className="text-xs text-slate-600 mb-3">
          Comparing specific estimated average commute distance to each site from {displayName}.
        </p>

        {/* Central Average Point GPS Coordinates */}
        <div className="inline-flex flex-wrap items-center gap-3 px-3.5 py-2 bg-white rounded-xl border border-slate-200 shadow-2xs text-xs font-mono">
          <div className="flex items-center gap-1.5 text-slate-700 font-bold">
            <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            Area Central Point:
          </div>
          <span className="text-slate-900 font-bold bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
            Lat {currentDistrictData?.lat.toFixed(4)}°, Lng {currentDistrictData?.lng.toFixed(4)}°
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
              className="bg-white border border-slate-200 hover:border-emerald-300 rounded-2xl p-5 shadow-2xs transition-all hover:shadow-md flex flex-col justify-between space-y-4"
            >
              {/* Site Header */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-slate-100 text-slate-700 border border-slate-200 rounded-md tracking-wider">
                    WORK SITE {index + 1}
                  </span>
                  <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-lg border ${badgeColor}`}>
                    {roadDist} km
                  </span>
                </div>

                <h5 className="text-sm font-bold text-slate-900">
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
            </div>
          );
        })}
      </div>

    </div>
  );
};
