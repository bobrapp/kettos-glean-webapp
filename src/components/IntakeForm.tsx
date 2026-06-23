import React, { useState, useEffect } from 'react';
import { gleanSearch, GleanResult } from '../lib/GleanSearchSDK';
import { registerSolution } from '../lib/DatabricksRegistry';

interface IntakeFormData {
  problemStatement: string;
  affectedUsers: number;
  hoursWastedPerWeek: number;
  dataSources: string;
  ownerName: string;
  ownerEmail: string;
}

const initialFormData: IntakeFormData = {
  problemStatement: '',
  affectedUsers: 0,
  hoursWastedPerWeek: 0,
  dataSources: '',
  ownerName: '',
  ownerEmail: '',
};

export const IntakeForm: React.FC = () => {
  const [formData, setFormData] = useState<IntakeFormData>(initialFormData);
  const [gleanResults, setGleanResults] = useState<GleanResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (formData.problemStatement.length < 10) { setGleanResults([]); return; }
    const debounce = setTimeout(async () => {
      setIsSearching(true);
      try { const results = await gleanSearch(formData.problemStatement); setGleanResults(results); }
      catch (err) { console.error('Glean search error:', err); }
      finally { setIsSearching(false); }
    }, 600);
    return () => clearTimeout(debounce);
  }, [formData.problemStatement]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: name === 'affectedUsers' || name === 'hoursWastedPerWeek' ? Number(value) : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      await registerSolution({
        solution_name: formData.problemStatement.slice(0, 60),
        owner_email: formData.ownerEmail,
        gate_level: 0,
        tool_dependencies: formData.dataSources.split(',').map((s) => s.trim()),
        failure_behavior: 'Unknown - to be defined at Gate 1',
        roi_hours_per_month: formData.hoursWastedPerWeek * formData.affectedUsers * 4.33,
        roi_fte_equivalent: 0,
        last_reviewed: new Date().toISOString().split('T')[0],
        version: '0.1.0',
      });
      setSubmitted(true);
    } catch (err) {
      setError('Failed to register solution. Please try again.');
    } finally { setIsSubmitting(false); }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-blue-900 mb-2">Intake Submitted!</h2>
          <p className="text-gray-600">Your solution has been registered at Gate 0. The KettOS team will review it within 2 business days.</p>
          <button onClick={() => { setSubmitted(false); setFormData(initialFormData); }} className="mt-6 px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800">
            Submit Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-6 max-w-6xl mx-auto">
      <div className="flex-1 bg-white rounded-xl shadow p-8">
        <h1 className="text-2xl font-bold text-blue-900 mb-1">Solution Intake Form</h1>
        <p className="text-gray-500 mb-6 text-sm">Gate 0 - Submit a new AI solution idea for review</p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Problem Statement <span className="text-red-500">*</span></label>
            <textarea name="problemStatement" value={formData.problemStatement} onChange={handleChange} rows={4} required
              placeholder="Describe the problem in 2-5 sentences."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Affected Users <span className="text-red-500">*</span></label>
              <input type="number" name="affectedUsers" value={formData.affectedUsers || ''} onChange={handleChange} required min={1}
                placeholder="e.g. 200" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hours Wasted / User / Week <span className="text-red-500">*</span></label>
              <input type="number" name="hoursWastedPerWeek" value={formData.hoursWastedPerWeek || ''} onChange={handleChange} required min={0.25} step={0.25}
                placeholder="e.g. 2" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            </div>
          </div>
          {formData.affectedUsers > 0 && formData.hoursWastedPerWeek > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm">
              <span className="font-medium text-amber-800">Estimated monthly impact: </span>
              <span className="text-amber-700">{(formData.hoursWastedPerWeek * formData.affectedUsers * 4.33).toLocaleString(undefined, { maximumFractionDigits: 0 })} hrs/month</span>
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Data Sources <span className="text-red-500">*</span></label>
            <input type="text" name="dataSources" value={formData.dataSources} onChange={handleChange} required
              placeholder="e.g. Salesforce, SharePoint, SAP (comma-separated)"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Name <span className="text-red-500">*</span></label>
              <input type="text" name="ownerName" value={formData.ownerName} onChange={handleChange} required
                placeholder="Full name" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Email <span className="text-red-500">*</span></label>
              <input type="email" name="ownerEmail" value={formData.ownerEmail} onChange={handleChange} required
                placeholder="you@company.com" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
            </div>
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button type="submit" disabled={isSubmitting} className="w-full py-3 bg-blue-900 text-white font-semibold rounded-lg hover:bg-blue-800 disabled:opacity-50">
            {isSubmitting ? 'Submitting...' : 'Submit Intake (Gate 0)'}
          </button>
        </form>
      </div>
      <div className="w-80 bg-gray-50 rounded-xl shadow p-5">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Related Solutions (Glean)</h2>
        {isSearching && <p className="text-xs text-gray-400">Searching Glean...</p>}
        {!isSearching && gleanResults.length === 0 && formData.problemStatement.length >= 10 && (
          <p className="text-xs text-gray-400">No similar solutions found. Your idea may be novel!</p>
        )}
        {!isSearching && formData.problemStatement.length < 10 && (
          <p className="text-xs text-gray-400">Start typing to search for related solutions...</p>
        )}
        <div className="space-y-3">
          {gleanResults.map((result, i) => (
            <div key={i} className="bg-white rounded-lg p-3 border border-gray-200">
              <a href={result.url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-blue-700 hover:underline">{result.title}</a>
              <p className="text-xs text-gray-500 mt-1">{result.snippet}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IntakeForm;
