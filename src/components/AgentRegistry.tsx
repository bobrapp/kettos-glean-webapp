import React, { useState, useEffect } from 'react';
import { listSolutions, SolutionEntry } from '../lib/DatabricksRegistry';

const GATE_COLORS: Record<number, string> = {
  0: 'bg-gray-100 text-gray-700',
  1: 'bg-blue-100 text-blue-700',
  2: 'bg-indigo-100 text-indigo-700',
  3: 'bg-purple-100 text-purple-700',
  4: 'bg-yellow-100 text-yellow-700',
  5: 'bg-orange-100 text-orange-700',
  6: 'bg-green-100 text-green-700',
};

const GATE_LABELS: Record<number, string> = {
  0: 'Gate 0: Intake',
  1: 'Gate 1: Design',
  2: 'Gate 2: Prototype',
  3: 'Gate 3: Peer Review',
  4: 'Gate 4: Pilot',
  5: 'Gate 5: Certified',
  6: 'Gate 6: Scaled',
};

export const AgentRegistry: React.FC = () => {
  const [solutions, setSolutions] = useState<SolutionEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterGate, setFilterGate] = useState<number | 'all'>('all');
  const [filterOwner, setFilterOwner] = useState('');
  const [filterTool, setFilterTool] = useState('');
  const [selected, setSelected] = useState<SolutionEntry | null>(null);

  useEffect(() => {
    setLoading(true);
    listSolutions()
      .then(setSolutions)
      .catch(() => setError('Failed to load solutions from registry.'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = solutions.filter((s) => {
    if (filterGate !== 'all' && s.gate_level !== filterGate) return false;
    if (filterOwner && !s.owner_email.toLowerCase().includes(filterOwner.toLowerCase())) return false;
    if (filterTool && !s.tool_dependencies.some((t) => t.toLowerCase().includes(filterTool.toLowerCase()))) return false;
    return true;
  });

  if (selected) {
    return (
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-8">
        <button onClick={() => setSelected(null)} className="mb-4 text-sm text-blue-700 hover:underline">&larr; Back to Registry</button>
        <h1 className="text-2xl font-bold text-blue-900 mb-1">{selected.solution_name}</h1>
        <div className="flex items-center gap-2 mb-4">
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${GATE_COLORS[selected.gate_level]}`}>{GATE_LABELS[selected.gate_level]}</span>
          <span className="text-xs text-gray-400">v{selected.version}</span>
        </div>
        <div className="space-y-3 text-sm">
          <div><span className="font-medium text-gray-600">Owner:</span> <span className="text-gray-800">{selected.owner_email}</span></div>
          <div><span className="font-medium text-gray-600">Tool Dependencies:</span> <span className="text-gray-800">{selected.tool_dependencies.join(', ')}</span></div>
          <div><span className="font-medium text-gray-600">Failure Behavior:</span> <span className="text-gray-800">{selected.failure_behavior}</span></div>
          <div><span className="font-medium text-gray-600">ROI (hrs/month):</span> <span className="text-gray-800">{selected.roi_hours_per_month.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></div>
          <div><span className="font-medium text-gray-600">FTE-Equivalent:</span> <span className="text-gray-800">{selected.roi_fte_equivalent.toFixed(1)}</span></div>
          <div><span className="font-medium text-gray-600">Last Reviewed:</span> <span className="text-gray-800">{selected.last_reviewed}</span></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-blue-900">Agent Registry</h1>
          <p className="text-sm text-gray-500">All KettOS certified AI solutions</p>
        </div>
        <span className="text-sm text-gray-500">{filtered.length} solutions</span>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-5">
        <select value={filterGate} onChange={(e) => setFilterGate(e.target.value === 'all' ? 'all' : Number(e.target.value))}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
          <option value="all">All Gates</option>
          {[0,1,2,3,4,5,6].map((g) => <option key={g} value={g}>{GATE_LABELS[g]}</option>)}
        </select>
        <input type="text" placeholder="Filter by owner email..." value={filterOwner} onChange={(e) => setFilterOwner(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-48" />
        <input type="text" placeholder="Filter by tool..." value={filterTool} onChange={(e) => setFilterTool(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-40" />
      </div>

      {loading && <div className="text-center py-12 text-gray-400">Loading registry...</div>}
      {error && <div className="text-center py-12 text-red-500">{error}</div>}

      {!loading && !error && (
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Solution</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Owner</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Gate</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Tools</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">ROI (hrs/mo)</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Last Reviewed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="text-center py-8 text-gray-400">No solutions match your filters.</td></tr>
              )}
              {filtered.map((s, i) => (
                <tr key={i} onClick={() => setSelected(s)} className="hover:bg-blue-50 cursor-pointer transition-colors">
                  <td className="px-4 py-3 font-medium text-blue-800">{s.solution_name}</td>
                  <td className="px-4 py-3 text-gray-600">{s.owner_email}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${GATE_COLORS[s.gate_level]}`}>{GATE_LABELS[s.gate_level]}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{s.tool_dependencies.slice(0, 2).join(', ')}{s.tool_dependencies.length > 2 ? ` +${s.tool_dependencies.length - 2}` : ''}</td>
                  <td className="px-4 py-3 text-gray-600">{s.roi_hours_per_month.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                  <td className="px-4 py-3 text-gray-500">{s.last_reviewed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AgentRegistry;
