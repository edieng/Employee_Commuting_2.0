import React, { useState } from 'react';
import { X, Check, Building2 } from 'lucide-react';
import { CustomWorkSite } from '../types';
import { getHighestSiteCodeNumber, generateSiteCode } from '../utils/constants';

interface SitePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  rawSiteData: Record<string, any>[];
  customSites: CustomWorkSite[];
  onConfirmUpload: (sites: CustomWorkSite[]) => void;
}

export const SitePreviewModal: React.FC<SitePreviewModalProps> = ({
  isOpen,
  onClose,
  rawSiteData,
  customSites,
  onConfirmUpload
}) => {
  if (!isOpen || !rawSiteData || rawSiteData.length === 0) return null;

  // Auto detect headers
  const availableHeaders = Object.keys(rawSiteData[0] || {});

  const findBestHeader = (keywords: string[]) => {
    return availableHeaders.find(h => 
      keywords.some(k => h.toLowerCase().trim().includes(k))
    ) || availableHeaders[0] || '';
  };

  const [nameCol, setNameCol] = useState(findBestHeader(['site name', 'sitename', 'name', 'building', 'office', 'hub']));
  const [districtCol, setDistrictCol] = useState(findBestHeader(['district', 'area', 'region', 'location']));
  const [latCol, setLatCol] = useState(findBestHeader(['lat', 'latitude', 'gps y', 'y']));
  const [lngCol, setLngCol] = useState(findBestHeader(['lng', 'lon', 'longitude', 'gps x', 'x']));

  // Highest existing site code index
  const startNum = getHighestSiteCodeNumber(customSites) + 1;

  // Map parsed rows
  const parsedSites: CustomWorkSite[] = rawSiteData.map((row, idx) => {
    const name = String(row[nameCol] || `Workplace ${idx + 1}`).trim();
    const district = String(row[districtCol] || 'Central').trim();
    
    let lat = parseFloat(row[latCol]);
    let lng = parseFloat(row[lngCol]);

    if (isNaN(lat)) lat = 22.28;
    if (isNaN(lng)) lng = 114.15;

    const assignedCode = generateSiteCode(startNum + idx);

    return {
      id: assignedCode,
      name,
      district,
      lat,
      lng,
      staffCount: 100,
      visible: true,
      siteCode: assignedCode
    };
  });

  const handleImport = () => {
    onConfirmUpload(parsedSites);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-emerald-400" />
            <div>
              <h2 className="text-base font-bold">Bulk Site Upload Preview ({rawSiteData.length} Sites)</h2>
              <p className="text-xs text-slate-300">
                Match Work Site Name, District, and GPS Coordinates. Site Codes are assigned automatically.
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
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* Column Selector mapping */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-tight block">
                Match Header Mapping
              </span>
              <span className="text-xs font-mono font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md border border-emerald-200">
                Next Auto Site Code Range: {generateSiteCode(startNum)} - {generateSiteCode(startNum + rawSiteData.length - 1)}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div>
                <label className="text-[10px] font-semibold text-slate-600 block mb-1">Work Site Name *</label>
                <select
                  value={nameCol}
                  onChange={e => setNameCol(e.target.value)}
                  className="w-full px-2 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 font-bold text-slate-900"
                >
                  {availableHeaders.map(h => <option key={h} value={h}>{h}</option>)}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-semibold text-slate-600 block mb-1">District *</label>
                <select
                  value={districtCol}
                  onChange={e => setDistrictCol(e.target.value)}
                  className="w-full px-2 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                >
                  {availableHeaders.map(h => <option key={h} value={h}>{h}</option>)}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-semibold text-slate-600 block mb-1">Latitude (GPS Y) *</label>
                <select
                  value={latCol}
                  onChange={e => setLatCol(e.target.value)}
                  className="w-full px-2 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 font-mono"
                >
                  {availableHeaders.map(h => <option key={h} value={h}>{h}</option>)}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-semibold text-slate-600 block mb-1">Longitude (GPS X) *</label>
                <select
                  value={lngCol}
                  onChange={e => setLngCol(e.target.value)}
                  className="w-full px-2 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 font-mono"
                >
                  {availableHeaders.map(h => <option key={h} value={h}>{h}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Table Preview */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 font-bold text-xs text-slate-700 flex justify-between items-center">
              <span>Parsed Preview (First {Math.min(10, parsedSites.length)} rows)</span>
              <span className="text-[11px] font-normal text-slate-500">Site codes assigned automatically</span>
            </div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-600 text-[11px] uppercase font-bold tracking-tight border-b border-slate-200">
                  <th className="px-4 py-2">Auto Site Code</th>
                  <th className="px-4 py-2">Work Site Name</th>
                  <th className="px-4 py-2">District</th>
                  <th className="px-4 py-2">Lat</th>
                  <th className="px-4 py-2">Lng</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-xs text-slate-700 font-mono">
                {parsedSites.slice(0, 10).map((site, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="px-4 py-2 font-bold text-emerald-800">{site.siteCode}</td>
                    <td className="px-4 py-2 font-sans font-semibold text-slate-900">{site.name}</td>
                    <td className="px-4 py-2 font-sans">{site.district}</td>
                    <td className="px-4 py-2 text-slate-500">{site.lat.toFixed(4)}</td>
                    <td className="px-4 py-2 text-slate-500">{site.lng.toFixed(4)}</td>
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
            className="px-4 py-2 bg-white border border-slate-300 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleImport}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            Import {parsedSites.length} Sites
          </button>
        </div>

      </div>
    </div>
  );
};
