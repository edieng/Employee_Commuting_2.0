import React, { useState } from 'react';
import { X, Building2, Upload, Pencil, Trash2, MapPin, Check } from 'lucide-react';
import { CustomWorkSite } from '../types';
import { renderAreaSelectOptions } from '../utils/constants';

interface SiteManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  customSites: CustomWorkSite[];
  onUpdateSite: (site: CustomWorkSite) => void;
  onDeleteSite: (id: string) => void;
  onOpenBulkSiteUpload: () => void;
}

export const SiteManagementModal: React.FC<SiteManagementModalProps> = ({
  isOpen,
  onClose,
  customSites,
  onUpdateSite,
  onDeleteSite,
  onOpenBulkSiteUpload
}) => {
  const [editingSiteId, setEditingSiteId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<CustomWorkSite | null>(null);

  if (!isOpen) return null;

  const startEdit = (site: CustomWorkSite) => {
    setEditingSiteId(site.id);
    setEditForm({ ...site });
  };

  const cancelEdit = () => {
    setEditingSiteId(null);
    setEditForm(null);
  };

  const saveEdit = () => {
    if (editForm) {
      onUpdateSite(editForm);
      setEditingSiteId(null);
      setEditForm(null);
    }
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
              <h2 className="text-base font-bold text-slate-900">Work Site Location Management</h2>
              <p className="text-xs text-slate-500">
                Configure corporate offices, hospitals, and operational sites in Hong Kong
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
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* Actions Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <div>
              <span className="text-xs font-bold text-slate-800 block">Registered Workplaces</span>
              <span className="text-xs text-slate-500">
                {customSites.length} site location(s) configured for employee commuting routing
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onOpenBulkSiteUpload}
                className="px-3.5 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 text-xs font-semibold rounded-lg shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5 text-slate-500" />
                Upload Sites (.xlsx/.csv)
              </button>
            </div>
          </div>

          {/* Sites List */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 text-[11px] uppercase font-bold tracking-tight border-b border-slate-200">
                  <th className="px-3 py-2.5 w-20 whitespace-nowrap">Code</th>
                  <th className="px-3 py-2.5">Work Site Name</th>
                  <th className="px-3 py-2.5 w-32 whitespace-nowrap">Area</th>
                  <th className="px-3 py-2.5 whitespace-nowrap">GPS Coordinates (Lat, Lng)</th>
                  <th className="px-3 py-2.5 text-right w-28 whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-xs text-slate-700 font-sans">
                {customSites.map((site) => {
                  const isEditing = editingSiteId === site.id;

                  if (isEditing && editForm) {
                    return (
                      <tr key={site.id} className="bg-emerald-50/40 border-l-4 border-l-emerald-600">
                        <td className="px-3 py-2">
                          <input
                            type="text"
                            value={editForm.siteCode || ''}
                            onChange={e => setEditForm({ ...editForm, siteCode: e.target.value })}
                            className="w-full px-2 py-1 text-xs font-sans border border-emerald-300 rounded-md focus:ring-1 focus:ring-emerald-500 bg-white"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="text"
                            value={editForm.name || ''}
                            onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                            className="w-full px-2 py-1 text-xs font-bold border border-emerald-300 rounded-md focus:ring-1 focus:ring-emerald-500 bg-white"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <select
                            value={editForm.district || ''}
                            onChange={e => setEditForm({ ...editForm, district: e.target.value })}
                            className="w-full px-2 py-1 text-xs border border-emerald-300 rounded-md focus:ring-1 focus:ring-emerald-500 bg-white"
                          >
                            {renderAreaSelectOptions()}
                          </select>
                        </td>
                        <td className="px-3 py-2">
                          <div className="flex items-center gap-1 font-mono">
                            <input
                              type="number"
                              step="0.0001"
                              value={editForm.lat || 0}
                              onChange={e => setEditForm({ ...editForm, lat: parseFloat(e.target.value) || 0 })}
                              className="w-24 px-1.5 py-1 text-xs border border-emerald-300 rounded-md focus:ring-1 focus:ring-emerald-500 bg-white"
                            />
                            <span>,</span>
                            <input
                              type="number"
                              step="0.0001"
                              value={editForm.lng || 0}
                              onChange={e => setEditForm({ ...editForm, lng: parseFloat(e.target.value) || 0 })}
                              className="w-24 px-1.5 py-1 text-xs border border-emerald-300 rounded-md focus:ring-1 focus:ring-emerald-500 bg-white"
                            />
                          </div>
                        </td>
                        <td className="px-3 py-2 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={saveEdit}
                              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-2xs transition-colors flex items-center gap-1 cursor-pointer"
                            >
                              <Check className="w-3.5 h-3.5" /> Save
                            </button>
                            <button
                              type="button"
                              onClick={cancelEdit}
                              className="px-2.5 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                            >
                              <X className="w-3.5 h-3.5" /> Cancel
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  }

                  return (
                    <tr key={site.id} className="hover:bg-slate-50 transition-colors align-middle">
                      <td className="px-3 py-3 font-sans font-semibold text-slate-800 text-xs whitespace-nowrap align-middle">
                        {site.siteCode || site.id}
                      </td>
                      <td className="px-3 py-3 font-bold text-slate-900 text-xs align-middle">
                        {site.name}
                      </td>
                      <td className="px-3 py-3 text-slate-600 text-xs whitespace-nowrap align-middle">
                        {site.district}
                      </td>
                      <td className="px-3 py-3 text-xs text-slate-600 whitespace-nowrap align-middle">
                        <div className="inline-flex items-center gap-1 font-mono text-[11px]">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{site.lat.toFixed(4)}, {site.lng.toFixed(4)}</span>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-right whitespace-nowrap align-middle">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => startEdit(site)}
                            title="Edit Site Details"
                            className="px-2.5 py-1 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1 cursor-pointer border border-slate-200"
                          >
                            <Pencil className="w-3.5 h-3.5 text-slate-500" />
                            <span>Edit</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => onDeleteSite(site.id)}
                            title="Delete Site"
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer ml-1"
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
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};

