import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { DistrictCalculation, TotalSummary, CustomWorkSite } from '../types';
import { SummaryCards } from './SummaryCards';
import { Users, Upload } from 'lucide-react';

interface DashboardTabProps {
  summary: TotalSummary;
  districtCalcs: DistrictCalculation[];
  customSites: CustomWorkSite[];
  selectedMonths: string[];
}

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6'];

export const DashboardTab: React.FC<DashboardTabProps> = ({
  summary,
  districtCalcs,
  customSites,
  selectedMonths
}) => {
  const activeSitesCount = customSites.filter(s => s.visible !== false).length;

  // Prepare transport split aggregate data
  const modeAggregates: Record<string, number> = { MTR: 0, Bus: 0, 'Private Car': 0, Walk: 0 };
  let totalStaff = 0;

  districtCalcs.forEach(d => {
    totalStaff += d.employees;
    Object.entries(d.splits).forEach(([mode, pct]) => {
      const count = Math.round((pct / 100) * d.employees);
      modeAggregates[mode] = (modeAggregates[mode] || 0) + count;
    });
  });

  const pieData = Object.entries(modeAggregates).map(([name, value]) => ({
    name,
    value,
    percentage: totalStaff > 0 ? ((value / totalStaff) * 100).toFixed(1) : '0'
  }));

  // Top 10 districts by carbon emissions
  const sortedDistricts = [...districtCalcs].sort((a, b) => b.tCO2eSelectedMonths - a.tCO2eSelectedMonths);
  const chartDistrictData = sortedDistricts.slice(0, 10).map(d => ({
    name: d.name,
    SelectedEmissions: d.tCO2eSelectedMonths,
    AnnualEmissions: d.tCO2eYear,
    Employees: d.employees
  }));

  return (
    <div className="space-y-6">
      
      {/* KPI Cards */}
      <SummaryCards summary={summary} activeSitesCount={activeSitesCount} />

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* District Emissions Bar Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Top Districts Carbon Emissions</h3>
              <p className="text-xs text-slate-500">
                Selected Months ({summary.selectedMonthNames.join(', ')}) vs Total Annual Emissions (tCO₂e)
              </p>
            </div>
            <span className="text-xs font-mono bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-lg font-bold border border-emerald-200">
              {summary.selectedMonthsCO2Tons} tCO₂e Total
            </span>
          </div>

          <div className="h-72 w-full">
            {chartDistrictData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartDistrictData} margin={{ top: 10, right: 10, left: -10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 10, fill: '#64748b' }} 
                    angle={-25} 
                    textAnchor="end" 
                    interval={0} 
                  />
                  <YAxis tick={{ fontSize: 10, fill: '#64748b' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', fontSize: '12px', border: 'none' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Bar dataKey="SelectedEmissions" name="Selected Month(s)" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="AnnualEmissions" name="Annual 12-Month Total" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                <Users className="w-8 h-8 text-slate-300 mb-2" />
                <p className="text-xs font-semibold text-slate-600">Employee Roster Empty</p>
                <p className="text-[11px] text-slate-400 mt-1 max-w-sm">
                  Import an employee roster CSV/Excel file or add employees manually in the Roster tab to view district emission breakdowns.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Modal Split Pie Chart */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">Transport Mode Share</h3>
            <p className="text-xs text-slate-500 mb-4">Commute modal split for active workforce</p>
            
            <div className="h-52 w-full">
              {totalStaff > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-4 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                  <p className="text-xs font-semibold text-slate-500">No Transport Data</p>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100">
            {pieData.map((item, idx) => (
              <div key={item.name} className="flex items-center gap-2 p-1.5 bg-slate-50 rounded-lg">
                <span 
                  className="w-2.5 h-2.5 rounded-full shrink-0" 
                  style={{ backgroundColor: COLORS[idx % COLORS.length] }} 
                />
                <div className="truncate">
                  <span className="text-[11px] font-bold text-slate-800 block truncate">{item.name}</span>
                  <span className="text-[10px] text-slate-500 font-mono">{item.percentage}% ({item.value})</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* District Emissions Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold">18 Districts ESG Commute Breakdown</h3>
            <p className="text-xs text-slate-300">
              Employee counts, average distances, and month emissions dynamically synced with Roster
            </p>
          </div>
          <span className="text-xs font-mono font-bold bg-slate-800 text-emerald-400 px-3 py-1 rounded-lg">
            {districtCalcs.length} Active Districts
          </span>
        </div>

        <div className="overflow-x-auto">
          {districtCalcs.length > 0 ? (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 text-[11px] uppercase font-bold tracking-tight border-b border-slate-200">
                  <th className="px-4 py-3">District (EN / ZH)</th>
                  <th className="px-4 py-3 text-right">Employees</th>
                  <th className="px-4 py-3 text-right">Avg Dist (km)</th>
                  <th className="px-4 py-3 text-right">Selected Month(s) (tCO₂e)</th>
                  <th className="px-4 py-3 text-right">Annual 12-Month (tCO₂e)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-xs text-slate-800">
                {districtCalcs.map((d) => (
                  <tr key={d.name} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-4 py-3 font-semibold text-slate-900">
                      {d.name} <span className="text-slate-400 text-[11px] font-normal ml-1">({d.nameZH})</span>
                    </td>
                    <td className="px-4 py-3 text-right font-mono font-bold text-slate-800">
                      {d.employees}
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-slate-600">
                      {d.avgDistance} km
                    </td>
                    <td className="px-4 py-3 text-right font-mono font-bold text-emerald-700 bg-emerald-50/30">
                      {d.tCO2eSelectedMonths.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-right font-mono font-bold text-slate-900">
                      {d.tCO2eYear.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-8 text-center bg-slate-50">
              <p className="text-xs font-semibold text-slate-600">Employee Roster is currently empty.</p>
              <p className="text-[11px] text-slate-400 mt-1">
                Import your employee dataset to populate district breakdowns aligned with real employee residency.
              </p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

