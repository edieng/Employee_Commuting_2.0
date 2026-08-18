import React, { useState, useEffect } from 'react';
import { X, Check, Building2, MapPin } from 'lucide-react';
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
    ) || '';
  };

  const codeCol = findBestHeader(['site code', 'sitecode', 'site_code', 'code', 'site id', 'site_id']);
  const nameCol = findBestHeader(['site name', 'sitename', 'work site', 'workplace', 'name', 'building', 'office', 'hub']) || availableHeaders[0] || '';
  const districtCol = findBestHeader(['district', 'area', 'region', 'location']) || availableHeaders[1] || '';
  const latCol = findBestHeader(['lat', 'latitude', 'gps y', 'y']);
  const lngCol = findBestHeader(['lng', 'lon', 'longitude', 'gps x', 'x']);

  // Highest existing site code index
  const startNum = getHighestSiteCodeNumber(customSites) + 1;

  // Local state for editable parsed sites
  const [parsedSites, setParsedSites] = useState<CustomWorkSite[]>(() => {
    return rawSiteData.map((row, idx) => {
      const rawCode = codeCol ? String(row[codeCol] || '').trim() : '';
      const assignedCode = rawCode || generateSiteCode(startNum + idx);

      const name = String(row[nameCol] || `Workplace ${idx + 1}`).trim();
      const district = String(row[districtCol] || 'Central').trim();
      
      let lat = latCol ? parseFloat(row[latCol]) : NaN;
      let lng = lngCol ? parseFloat(row[lngCol]) : NaN;

      if (isNaN(lat)) lat = 22.28;
      if (isNaN(lng)) lng = 114.15;

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
  });

  // Re-initialize if rawSiteData changes
  useEffect(() => {
    setParsedSites(
      rawSiteData.map((row, idx) => {
        const rawCode = codeCol ? String(row[codeCol] || '').trim() : '';
        const assignedCode = rawCode || generateSiteCode(startNum + idx);

        const name = String(row[nameCol] || `Workplace ${idx + 1}`).trim();
        const district = String(row[districtCol] || 'Central').trim();
        
        let lat = latCol ? parseFloat(row[latCol]) : NaN;
        let lng = lngCol ? parseFloat(row[lngCol]) : NaN;

        if (isNaN(lat)) lat = 22.28;
        if (isNaN(lng)) lng = 114.15;

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
      })
    );
  }, [rawSiteData]);

  const handleSiteCodeChange = (index: number, newCode: string) => {
    const updated = [...parsedSites];
    updated[index] = {
      ...updated[index],
      siteCode: newCode,
      id: newCode || updated[index].id
    };
    setParsedSites(updated);
  };

  const handleImport = () => {
    onConfirmUpload(parsedSites);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="px-6 py-4 bg-white border-b border-slate-200 text-slate-900 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-slate-100 rounded-lg text-slate-700">
              <Building2 className="w-5 h-5 text-slate-700" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Import Work Sites ({rawSiteData.length} Sites)
              </h2>
              <p className="text-xs text-slate-500">
                Preview uploaded work site records. You can type or edit custom site codes below.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          
          <div className="flex items-center justify-between text-xs text-slate-600 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200">
            <span>Special site codes detected from Excel / CSV or automatically generated.</span>
            <span className="font-semibold text-slate-800">Total: {parsedSites.length} sites</span>
          </div>

          {/* Table Preview */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 text-[11px] uppercase font-bold tracking-tight border-b border-slate-200">
                  <th className="px-3 py-2.5 w-32">Site Code (Typable)</th>
                  <th className="px-3 py-2.5">Work Site Name</th>
                  <th className="px-3 py-2.5 w-36">District / Area</th>
                  <th className="px-3 py-2.5 whitespace-nowrap">GPS Coordinates</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-xs text-slate-700 font-sans">
                {parsedSites.map((site, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="px-3 py-2">
                      <input
                        type="text"
                        value={site.siteCode || ''}
                        onChange={e => handleSiteCodeChange(idx, e.target.value)}
                        placeholder="e.g. SITE-01"
                        className="w-full px-2 py-1 text-xs font-mono font-semibold border border-slate-300 rounded-md focus:ring-1 focus:ring-slate-900 bg-white"
                      />
                    </td>
                    <td className="px-3 py-2 font-bold text-slate-900">{site.name}</td>
                    <td className="px-3 py-2 text-slate-600">{site.district}</td>
                    <td className="px-3 py-2 text-slate-500 font-mono text-[11px]">
                      <div className="inline-flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{site.lat.toFixed(4)}, {site.lng.toFixed(4)}</span>
                      </div>
                    </td>
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
            className="px-4 py-2 bg-white border border-slate-300 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleImport}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Check className="w-4 h-4" />
            Import {parsedSites.length} Sites
          </button>
        </div>

      </div>
    </div>
  );
};
