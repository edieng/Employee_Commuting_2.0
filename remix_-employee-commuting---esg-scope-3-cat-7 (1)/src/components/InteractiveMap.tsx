import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

export interface CustomWorkSite {
  id: string;
  name: string;
  district: string;
  lat: number;
  lng: number;
  staffCount: number;
  visible?: boolean;
}

export interface DistrictCalc {
  name: string;
  nameZH: string;
  lat: number;
  lng: number;
  employees: number;
  avgDistance: number;
  tCO2eYear: number;
}

interface InteractiveMapProps {
  customSites: CustomWorkSite[];
  toggleSiteVisibility: (id: string) => void;
  districtCalculations: DistrictCalc[];
  hqLocation: { name: string; lat: number; lng: number };
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  customSites,
  toggleSiteVisibility,
  districtCalculations,
  hqLocation
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Standard HK coordinates: 22.35, 114.15, zoom: 11
    const map = L.map(mapContainerRef.current, {
      center: [22.35, 114.15],
      zoom: 11,
      minZoom: 10,
      maxZoom: 15,
      zoomControl: true,
      attributionControl: true
    });

    // Add elegant light-theme tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20
    }).addTo(map);

    // Create a layer group for markers
    const markersLayer = L.layerGroup().addTo(map);

    mapInstanceRef.current = map;
    markersLayerRef.current = markersLayer;

    // Cleanup on unmount
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update map contents when data changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersLayer = markersLayerRef.current;
    if (!map || !markersLayer) return;

    // Clear existing markers
    markersLayer.clearLayers();

    // 1. Draw District Commuter Density Bubbles
    districtCalculations.forEach((dist) => {
      // Calculate color based on average commute distance
      // Green = Short (< 12km), Yellow = Medium (12-22km), Red = Long (> 22km)
      let color = '#3b82f6'; // default blue
      let fillOpacity = 0.2;
      if (dist.avgDistance < 12) {
        color = '#10b981'; // green
      } else if (dist.avgDistance < 22) {
        color = '#f59e0b'; // amber
      } else {
        color = '#ef4444'; // red
      }

      // Proportional radius mapping: from 300m up to 1800m
      const minEmployees = 50;
      const maxEmployees = 1000;
      const normEmp = Math.min(1, Math.max(0, (dist.employees - minEmployees) / (maxEmployees - minEmployees)));
      const circleRadius = 300 + normEmp * 1200; // in meters

      const circle = L.circle([dist.lat, dist.lng], {
        color: color,
        fillColor: color,
        fillOpacity: fillOpacity,
        weight: 1.5,
        radius: circleRadius
      });

      // Add comprehensive descriptive tooltip
      circle.bindTooltip(`
        <div class="p-1 font-sans">
          <div class="font-bold text-slate-800 text-[12px]">${dist.name} (${dist.nameZH})</div>
          <div class="text-[10px] text-slate-500 mt-0.5">Employees: <span class="font-bold text-slate-700">${dist.employees.toLocaleString()}</span></div>
          <div class="text-[10px] text-slate-500">Carbon Footprint: <span class="font-bold text-slate-700">${dist.tCO2eYear.toFixed(1)} t/yr</span></div>
        </div>
      `, { permanent: false, direction: 'top', opacity: 0.95 });

      markersLayer.addLayer(circle);
    });

    // 2. Draw Active/Inactive Custom Work Sites
    customSites.forEach((site) => {
      const isVisible = site.visible !== false;

      // Define custom div-based marker icon for performance and style
      const iconHtml = `
        <div class="relative flex items-center justify-center">
          <!-- Pulse animation for active site -->
          ${isVisible ? `<span class="absolute inline-flex h-6 w-6 animate-ping rounded-full bg-emerald-400 opacity-40"></span>` : ''}
          <!-- Central Pin marker -->
          <div class="relative flex h-5 w-5 items-center justify-center rounded-full border-2 border-white shadow-md ${isVisible ? 'bg-emerald-600' : 'bg-slate-400 opacity-60'}">
            <span class="text-[9px] font-bold text-white">🏢</span>
          </div>
          <!-- Floating site label -->
          <div class="absolute top-6 bg-slate-900 text-white font-sans font-bold text-[9px] px-1.5 py-0.5 rounded shadow-sm whitespace-nowrap border border-slate-700 ${isVisible ? 'opacity-100' : 'opacity-50'}">
            ${site.name.split('(')[0].trim()}
          </div>
        </div>
      `;

      const siteIcon = L.divIcon({
        html: iconHtml,
        className: 'custom-leaflet-site-marker',
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });

      const marker = L.marker([site.lat, site.lng], { icon: siteIcon });

      marker.bindPopup(`
        <div class="p-2 font-sans w-52">
          <div class="font-bold text-slate-800 text-xs mb-1">🏢 ${site.name}</div>
          <div class="text-[10px] text-slate-500 mb-1">Located in: <strong class="text-slate-700">${site.district}</strong></div>
          <div class="text-[10px] text-slate-500 mb-2">Staff Target: <strong class="text-slate-700">${site.staffCount} employees</strong></div>
          <div class="flex justify-between items-center border-t pt-1.5 mt-1.5">
            <span class="text-[9px] uppercase font-bold text-slate-400">Status:</span>
            <span class="px-1.5 py-0.5 text-[9px] font-bold rounded ${isVisible ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'}">
              ${isVisible ? '🟢 ACTIVE' : '⚪ DISABLED'}
            </span>
          </div>
          <button 
            id="popup-toggle-btn-${site.id}"
            class="w-full mt-2 py-1 bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-bold rounded shadow transition cursor-pointer"
          >
            ${isVisible ? 'Disable Site (Mute Impact)' : 'Enable Site (Apply Impact)'}
          </button>
        </div>
      `, { minWidth: 200 });

      marker.on('popupopen', () => {
        const btn = document.getElementById(`popup-toggle-btn-${site.id}`);
        if (btn) {
          btn.onclick = () => {
            toggleSiteVisibility(site.id);
            marker.closePopup();
          };
        }
      });

      markersLayer.addLayer(marker);
    });

    // 3. Draw Corporate HQ
    const hqIconHtml = `
      <div class="relative flex items-center justify-center">
        <span class="absolute inline-flex h-8 w-8 animate-ping rounded-full bg-blue-400 opacity-30"></span>
        <div class="relative flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 border-2 border-white shadow-lg z-20">
          <span class="text-[10px]">👑</span>
        </div>
        <div class="absolute -top-6 bg-blue-900 text-white font-sans font-black text-[9px] px-1.5 py-0.5 rounded shadow border border-blue-700 whitespace-nowrap z-20">
          HQ: ${hqLocation.name.split(',')[0]}
        </div>
      </div>
    `;

    const hqIcon = L.divIcon({
      html: hqIconHtml,
      className: 'custom-leaflet-hq-marker',
      iconSize: [28, 28],
      iconAnchor: [14, 14]
    });

    const hqMarker = L.marker([hqLocation.lat, hqLocation.lng], { icon: hqIcon });
    hqMarker.bindPopup(`
      <div class="p-1 font-sans">
        <div class="font-extrabold text-blue-900 text-xs">👑 Primary Corporate Headquarters</div>
        <div class="text-[10px] font-bold text-slate-800 mt-1">${hqLocation.name}</div>
        <p class="text-[9.5px] text-slate-500 mt-1 leading-normal">
          This serves as the centralized baseline destination. All employee commutes are calculated relative to this anchor point unless multi-site deployment is active.
        </p>
      </div>
    `);

    markersLayer.addLayer(hqMarker);

  }, [customSites, districtCalculations, hqLocation, toggleSiteVisibility]);

  return (
    <div className="flex-1 flex flex-col md:flex-row border border-slate-200 rounded-lg overflow-hidden h-[380px] bg-white shadow-sm shrink-0">
      {/* Map Element */}
      <div id="interactive-commuter-map" ref={mapContainerRef} className="flex-1 min-h-[250px] z-10" />

      {/* Side Control Panel */}
      <div className="w-full md:w-64 bg-slate-50 border-t md:border-t-0 md:border-l border-slate-200 p-3 flex flex-col gap-2 shrink-0 max-h-[380px] overflow-y-auto">
        <div className="border-b border-slate-200 pb-2">
          <h4 className="text-[11px] font-bold text-slate-700 uppercase tracking-tight flex items-center gap-1">
            🗺️ Client Work Sites Manager
          </h4>
          <p className="text-[9px] text-slate-500 mt-0.5 leading-normal">
            Toggle visibility to recalculate ESG commuter splits and observe direct impact on carbon outputs.
          </p>
        </div>

        {/* Site Checklist */}
        <div className="flex-1 flex flex-col gap-1.5">
          {customSites.map((site) => {
            const isVisible = site.visible !== false;
            return (
              <div 
                key={site.id} 
                className={`p-2 rounded border transition flex items-center justify-between ${isVisible ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-100 border-slate-200 opacity-60'}`}
              >
                <div className="flex items-center gap-2 overflow-hidden mr-2">
                  <input 
                    type="checkbox"
                    checked={isVisible}
                    onChange={() => toggleSiteVisibility(site.id)}
                    className="h-3.5 w-3.5 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500 cursor-pointer accent-emerald-500"
                  />
                  <div className="text-left overflow-hidden">
                    <span className="font-bold text-[11px] text-slate-800 block truncate" title={site.name}>
                      {site.name.split('(')[0]}
                    </span>
                    <span className="text-[9px] text-slate-500 font-medium block truncate">
                      📍 {site.district} · {site.staffCount} staff
                    </span>
                  </div>
                </div>

                <span className={`px-1 rounded text-[8px] font-black shrink-0 ${isVisible ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-slate-200 text-slate-600'}`}>
                  {isVisible ? 'ACTIVE' : 'MUTED'}
                </span>
              </div>
            );
          })}

          {customSites.length === 0 && (
            <div className="text-center py-6 text-slate-400 font-semibold text-[10px]">
              No custom client sites added yet. Add some in the bottom left or via address lookup!
            </div>
          )}
        </div>

        {/* Map Legend */}
        <div className="bg-white p-2 rounded border border-slate-200 text-[9px] text-slate-500 flex flex-col gap-1 mt-auto">
          <div className="font-bold text-slate-700 uppercase text-[8px] tracking-wider mb-0.5">Commute Heat Legend</div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full border border-white opacity-50"></span>
            <span>Short Distance (&lt; 12 km)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-amber-500 rounded-full border border-white opacity-50"></span>
            <span>Medium Distance (12 - 22 km)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-red-500 rounded-full border border-white opacity-50"></span>
            <span>Long Commute (&gt; 22 km)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
