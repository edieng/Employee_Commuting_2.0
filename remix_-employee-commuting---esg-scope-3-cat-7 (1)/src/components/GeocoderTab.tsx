import React, { useState } from 'react';
import { Search, MapPin, Globe, ExternalLink, Loader2 } from 'lucide-react';

export const GeocoderTab: React.FC = () => {
  const [addressInput, setAddressInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!addressInput.trim()) return;

    setLoading(true);
    setSearched(true);
    try {
      // Call LandsD Geodata API directly
      const response = await fetch(
        `https://geodata.gov.hk/gs/api/v1.0.0/locationSearch?q=${encodeURIComponent(addressInput)}`
      );
      if (response.ok) {
        const data = await response.json();
        setResults(Array.isArray(data) ? data : []);
      } else {
        setResults([]);
      }
    } catch (err) {
      console.error('Geodata API search error:', err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 mb-1">
          <Search className="w-5 h-5 text-purple-600" />
          <h2 className="text-base font-bold text-slate-900">
            Hong Kong Address Geocoder & GPS Lookup
          </h2>
        </div>
        <p className="text-xs text-slate-500 max-w-3xl">
          Search residential addresses, commercial towers, or public housing estates using the Hong Kong LandsD Official Geodata API endpoint.
        </p>

        {/* Search Input Form */}
        <form onSubmit={handleSearch} className="mt-4 flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              required
              placeholder="e.g. Taikoo Shing, Cheung Kong Centre, Millennium City..."
              value={addressInput}
              onChange={e => setAddressInput(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 bg-white"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-2 disabled:opacity-50 shrink-0"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            Lookup Address
          </button>
        </form>
      </div>

      {/* Results List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <h3 className="text-sm font-bold flex items-center gap-2">
            <Globe className="w-4 h-4 text-purple-400" />
            LandsD API Results
          </h3>
          <span className="text-xs font-mono text-slate-300">
            {results.length} Matches Found
          </span>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-500 text-xs flex flex-col items-center justify-center gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-purple-600" />
            Querying Hong Kong Geodata API...
          </div>
        ) : results.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {results.map((res, idx) => (
              <div key={idx} className="p-4 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    {res.nameEN || res.nameZH}
                  </h4>
                  {res.nameZH && res.nameEN && (
                    <p className="text-slate-500 text-xs">{res.nameZH}</p>
                  )}
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {res.addressEN || res.addressZH || 'Hong Kong'}
                  </p>
                </div>

                <div className="flex items-center gap-3 font-mono shrink-0">
                  <div className="px-3 py-1 bg-purple-50 text-purple-900 rounded-lg border border-purple-200 text-right">
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">GPS Coordinates</span>
                    <strong className="text-xs">{res.y?.toFixed?.(4) || res.y}, {res.x?.toFixed?.(4) || res.x}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : searched ? (
          <div className="p-12 text-center text-slate-400 text-xs">
            No locations returned for "{addressInput}". Try another search query.
          </div>
        ) : (
          <div className="p-12 text-center text-slate-400 text-xs">
            Enter an address or building name above to search coordinates.
          </div>
        )}
      </div>

    </div>
  );
};
