import React, { useState } from 'react';
import { X, Building2, Plus, Upload, Eye, EyeOff, Trash2, MapPin } from 'lucide-react';
import { CustomWorkSite } from '../types';
import { getHighestSiteCodeNumber, generateSiteCode } from '../utils/constants';

interface SiteManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  customSites: CustomWorkSite[];
  onAddSite: (site: Omit<CustomWorkSite, 'id'>) => void;
  onToggleSiteVisibility: (id: string) => void;
  onDeleteSite: (id: string) => void;
  onOpenBulkSiteUpload: () => void;
}

export const SiteManagementModal: React.FC<SiteManagementModalProps> = ({
  isOpen,
  onClose,
  customSites,
  onAddSite,
  onToggleSiteVisibility,
  onDeleteSite,
  onOpenBulkSiteUpload
}) => {
  const [name, setName] = useState('');
  const [district, setDistrict] = useState('Central / Admiralty / Sheung Wan');
  const [lat, setLat] = useState('22.2814');
  const [lng, setLng] = useState('114.1584');
  const [showAddForm, setShowAddForm] = useState(false);

  if (!isOpen) return null;

  const nextNum = getHighestSiteCodeNumber(customSites) + 1;
  const autoSiteCode = generateSiteCode(nextNum);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAddSite({
      name: name.trim(),
      district,
      lat: parseFloat(lat) || 22.28,
      lng: parseFloat(lng) || 114.15,
      staffCount: 100,
      visible: true,
      siteCode: autoSiteCode
    });

    setName('');
    setShowAddForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-purple-400" />
            <div>
              <h2 className="text-base font-bold">Work Site Location Management</h2>
              <p className="text-xs text-slate-300">
                Configure corporate offices, hospitals, and operational sites in Hong Kong
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
          
          {/* Actions Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <div>
              <span className="text-xs font-bold text-slate-800 block">Active Workplaces</span>
              <span className="text-xs text-slate-500">
                {customSites.filter(s => s.visible !== false).length} of {customSites.length} sites enabled for commuting routing
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onOpenBulkSiteUpload}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
              >
                <Upload className="w-3.5 h-3.5" />
                Bulk Upload Sites (XLSX)
              </button>

              <button
                type="button"
                onClick={() => setShowAddForm(!showAddForm)}
                className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                {showAddForm ? 'Cancel' : 'Add Single Site'}
              </button>
            </div>
          </div>

          {/* Add Site Form */}
          {showAddForm && (
            <form onSubmit={handleSubmit} className="p-4 bg-purple-50/50 rounded-xl border border-purple-200 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-purple-900 uppercase tracking-tight">Add New Custom Work Site</h3>
                <span className="text-xs font-mono font-bold bg-purple-100 text-purple-800 px-2.5 py-0.5 rounded-md border border-purple-200">
                  Auto Site Code: {autoSiteCode}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                <div>
                  <label className="text-[11px] font-medium text-slate-600 block mb-1">Site Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Cheung Kong Centre"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 bg-white"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-medium text-slate-600 block mb-1">District Area</label>
                  <input
                    type="text"
                    placeholder="e.g. Central"
                    value={district}
                    onChange={e => setDistrict(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 bg-white"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-medium text-slate-600 block mb-1">Latitude</label>
                  <input
                    type="number"
                    step="0.0001"
                    value={lat}
                    onChange={e => setLat(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 bg-white font-mono"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-medium text-slate-600 block mb-1">Longitude</label>
                  <input
                    type="number"
                    step="0.0001"
                    value={lng}
                    onChange={e => setLng(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 bg-white font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
                >
                  Save New Site ({autoSiteCode})
                </button>
              </div>
            </form>
          )}

          {/* Sites List */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 text-[11px] uppercase font-bold tracking-tight border-b border-slate-200">
                  <th className="px-4 py-2.5">Code</th>
                  <th className="px-4 py-2.5">Work Site Name</th>
                  <th className="px-4 py-2.5">District</th>
                  <th className="px-4 py-2.5">GPS Coordinates</th>
                  <th className="px-4 py-2.5 text-center">Status</th>
                  <th className="px-4 py-2.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-xs text-slate-700 font-sans">
                {customSites.map((site) => {
                  const isVisible = site.visible !== false;
                  return (
                    <tr key={site.id} className={`hover:bg-slate-50 transition-colors ${!isVisible ? 'opacity-50 bg-slate-50/50' : ''}`}>
                      <td className="px-4 py-3 font-mono font-bold text-slate-500 text-[11px]">
                        {site.siteCode || site.id}
                      </td>
                      <td className="px-4 py-3 font-bold text-slate-900">
                        {site.name}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {site.district}
                      </td>
                      <td className="px-4 py-3 font-mono text-[11px] text-slate-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {site.lat.toFixed(4)}, {site.lng.toFixed(4)}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          isVisible ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                        }`}>
                          {isVisible ? 'Active' : 'Disabled'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => onToggleSiteVisibility(site.id)}
                            title={isVisible ? "Disable Site" : "Enable Site"}
                            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                          >
                            {isVisible ? <Eye className="w-4 h-4 text-emerald-600" /> : <EyeOff className="w-4 h-4 text-slate-400" />}
                          </button>

                          <button
                            type="button"
                            onClick={() => onDeleteSite(site.id)}
                            title="Delete Site"
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
