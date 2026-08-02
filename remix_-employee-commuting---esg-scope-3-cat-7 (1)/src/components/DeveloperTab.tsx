import React, { useState } from 'react';
import { Code2, Copy, Check, Terminal, Play } from 'lucide-react';

export const DeveloperTab: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const pythonScript = `import requests
import pandas as pd
import time

# ---------------------------------------------------------
# Hong Kong ESG Scope 3 Commuting Geocoder (LandsD Endpoint)
# ---------------------------------------------------------

def geocode_hk_address(address_text):
    """
    Fetch latitude and longitude for a Hong Kong address or building name
    via free LandsD Geodata API.
    """
    url = f"https://geodata.gov.hk/gs/api/v1.0.0/locationSearch?q={requests.utils.quote(address_text)}"
    try:
        response = requests.get(url, timeout=5)
        if response.status_code == 200:
            data = response.json()
            if isinstance(data, list) and len(data) > 0:
                first_match = data[0]
                lat = first_match.get('y')
                lng = first_match.get('x')
                name = first_match.get('nameEN', address_text)
                return {"lat": lat, "lng": lng, "matched_name": name, "status": "SUCCESS"}
    except Exception as e:
        print(f"Error geocoding {address_text}: {e}")
    return {"lat": None, "lng": None, "matched_name": None, "status": "NOT_FOUND"}

# Example Employee Dataset Batch
sample_employees = [
    {"emp_id": "EMP-0001", "home_address": "Taikoo Shing, Quarry Bay"},
    {"emp_id": "EMP-0002", "home_address": "Belvedere Garden Phase 1, Tsuen Wan"},
    {"emp_id": "EMP-0003", "home_address": "Metro Town, Tseung Kwan O"},
    {"emp_id": "EMP-0004", "home_address": "Yoho Town, Yuen Long"}
]

print("Starting Hong Kong ESG Batch Geocoding...")
results = []
for emp in sample_employees:
    res = geocode_hk_address(emp["home_address"])
    results.append({
        "emp_id": emp["emp_id"],
        "home_address": emp["home_address"],
        "lat": res["lat"],
        "lng": res["lng"],
        "matched_name": res["matched_name"]
    })
    time.sleep(0.2)  # Polite API throttling

df = pd.DataFrame(results)
print("\\nGeocoding Results DataFrame:")
print(df)

# Export to CSV for import into ESG Dashboard
df.to_csv("hk_employee_geocoded_roster.csv", index=False)
print("\\nExported to hk_employee_geocoded_roster.csv!")
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(pythonScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Code2 className="w-5 h-5 text-cyan-600" />
            Python Batch Geocoder Script (Google Colab / Local Machine)
          </h2>
          <p className="text-xs text-slate-500">
            Automate large-scale address coordinate resolution directly on your local workstation without network restrictions
          </p>
        </div>

        <button
          onClick={handleCopy}
          className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-200" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied to Clipboard!' : 'Copy Script'}
        </button>
      </div>

      {/* Code Container */}
      <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-300 font-mono text-xs">
            <Terminal className="w-4 h-4 text-cyan-400" />
            hk_esg_batch_geocoder.py
          </div>
          <span className="text-[10px] bg-slate-800 text-cyan-300 px-2 py-0.5 rounded font-mono font-bold">
            Python 3.8+
          </span>
        </div>

        <div className="p-4 text-slate-200 font-mono text-xs leading-relaxed overflow-x-auto select-text">
          <pre className="text-cyan-300">{pythonScript}</pre>
        </div>
      </div>

    </div>
  );
};
