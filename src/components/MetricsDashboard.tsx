import React, { useEffect, useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { listSolutions, SolutionEntry } from '../lib/DatabricksRegistry';

interface MetricCard {
  label: string;
  value: string;
  sub: string;
  color: string;
}

const MOCK_BUILDER_TREND = [
  { month: 'Jan', builders: 4 }, { month: 'Feb', builders: 7 }, { month: 'Mar', builders: 10 },
  { month: 'Apr', builders: 14 }, { month: 'May', builders: 18 }, { month: 'Jun', builders: 23 },
];

const MOCK_REUSE_RATE = [
  { name: 'Salesforce Auto-Summary', reuse: 12 },
  { name: 'Parts Lookup AI', reuse: 8 },
  { name: 'Warranty Classifier', reuse: 6 },
  { name: 'Field Report Gen', reuse: 5 },
  { name: 'Training Rec Engine', reuse: 3 },
];

export const MetricsDashboard: React.FC = () => {
  const [solutions, setSolutions] = useState<SolutionEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listSolutions()
      .then(setSolutions)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const certifiedSolutions = solutions.filter((s) => s.gate_level >= 5);
  const totalHrsMonth = certifiedSolutions.reduce((sum, s) => sum + s.roi_hours_per_month, 0);
  const totalFTE = totalHrsMonth * 12 / 2080;
  // Attrition avoidance: 0.5% of affected users * $45,000 replacement cost
  // Estimated affected users = totalHrsMonth / 4.33 (reverse of formula)
  const estimatedUsers = totalHrsMonth > 0 ? Math.round(totalHrsMonth / 4.33) : 0;
  const attritionAvoidance = Math.round(0.005 * estimatedUsers * 45000);

  const cards: MetricCard[] = [
    {
      label: 'Monthly Active Builders',
      value: loading ? '...' : '23',
      sub: 'Target: 25+ by Year 1',
      color: 'bg-blue-50 border-blue-200',
    },
    {
      label: 'Solutions in Registry',
      value: loading ? '...' : String(solutions.length),
      sub: `${certifiedSolutions.length} certified (Gate 5+)`,
      color: 'bg-indigo-50 border-indigo-200',
    },
    {
      label: 'Time Saved / Month',
      value: loading ? '...' : `${totalHrsMonth.toLocaleString(undefined, { maximumFractionDigits: 0 })} hrs`,
      sub: 'Across all Gate 5+ solutions',
      color: 'bg-amber-50 border-amber-200',
    },
    {
      label: 'FTE-Equivalent Value',
      value: loading ? '...' : `${totalFTE.toFixed(1)} FTEs`,
      sub: `~$${(totalFTE * 85 * 2080 / 1000).toFixed(0)}K/yr value`,
      color: 'bg-green-50 border-green-200',
    },
    {
      label: 'Solution Reuse Rate',
      value: '42%',
      sub: 'Solutions used beyond origin team',
      color: 'bg-purple-50 border-purple-200',
    },
    {
      label: 'Avoided Replacement Hires',
      value: loading ? '...' : `$${(attritionAvoidance / 1000).toFixed(0)}K/yr`,
      sub: 'Attrition avoidance value',
      color: 'bg-rose-50 border-rose-200',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-blue-900">Metrics Dashboard</h1>
        <p className="text-sm text-gray-500">KettOS platform-wide ROI and builder activity</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {cards.map((card, i) => (
          <div key={i} className={`border rounded-xl p-5 ${card.color}`}>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">{card.label}</p>
            <p className="text-3xl font-bold text-gray-900 mb-1">{card.value}</p>
            <p className="text-xs text-gray-500">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6">
        {/* Monthly Active Builders */}
        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Monthly Active Builders</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={MOCK_BUILDER_TREND}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line type="monotone" dataKey="builders" stroke="#1B3A6B" strokeWidth={2} dot={{ fill: '#F5A623' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Solution Reuse Rate */}
        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Solution Reuse (Teams Using)</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={MOCK_REUSE_RATE} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 10 }} width={130} />
              <Tooltip />
              <Bar dataKey="reuse" fill="#F5A623" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ROI Formula Reminder */}
      <div className="mt-6 bg-blue-900 text-white rounded-xl p-5 text-sm">
        <h3 className="font-semibold mb-2">ROI Formula (from kettos-metrics-model.md)</h3>
        <code className="text-blue-200 text-xs">
          Monthly Savings = Hours Wasted/User/Week x Affected Users x Automation Efficiency x 4.33
          | FTE-Equiv = Annual Hours / 2,080
        </code>
      </div>
    </div>
  );
};

export default MetricsDashboard;
