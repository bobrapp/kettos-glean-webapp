/**
 * GleanSearchSDK.ts
 * Stub for Glean Enterprise Search API integration.
 * Set VITE_GLEAN_API_BASE and VITE_GLEAN_API_TOKEN in your .env.local
 */

export interface GleanResult {
  title: string;
  url: string;
  snippet: string;
  source: string;
  relevanceScore: number;
}

const GLEAN_API_BASE = import.meta.env.VITE_GLEAN_API_BASE || '';
const GLEAN_API_TOKEN = import.meta.env.VITE_GLEAN_API_TOKEN || '';

/**
 * Search Glean for content related to a query.
 * Falls back to mock data if env vars are not configured.
 */
export async function gleanSearch(query: string): Promise<GleanResult[]> {
  // Return mock data if not configured
  if (!GLEAN_API_BASE || !GLEAN_API_TOKEN) {
    return getMockResults(query);
  }

  try {
    const response = await fetch(`${GLEAN_API_BASE}/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${GLEAN_API_TOKEN}`,
      },
      body: JSON.stringify({
        query,
        pageSize: 5,
        requestOptions: {
          facetFilters: [],
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Glean API error: ${response.status}`);
    }

    const data = await response.json();

    // Map Glean API response to GleanResult shape
    return (data.results || []).map((r: any) => ({
      title: r.document?.title || r.title || 'Untitled',
      url: r.document?.url || r.url || '#',
      snippet: r.snippets?.[0]?.text || r.snippet || '',
      source: r.document?.datasource || 'Glean',
      relevanceScore: r.score || 0,
    }));
  } catch (error) {
    console.error('GleanSearchSDK error:', error);
    return getMockResults(query);
  }
}

/**
 * Mock results for development / demo mode
 */
function getMockResults(query: string): GleanResult[] {
  const lq = query.toLowerCase();
  const all: GleanResult[] = [
    {
      title: 'Salesforce Report Auto-Generation Agent (Gate 6)',
      url: '#registry/salesforce-report-gen',
      snippet: 'Automatically generates weekly field activity reports from Salesforce data, saving 2 hrs/week per rep.',
      source: 'KettOS Registry',
      relevanceScore: 0.95,
    },
    {
      title: 'Warranty Claim Classifier (Gate 5)',
      url: '#registry/warranty-classifier',
      snippet: 'AI classifier that routes warranty claims to the correct service team with 94% accuracy.',
      source: 'KettOS Registry',
      relevanceScore: 0.88,
    },
    {
      title: 'Parts Lookup AI Assistant (Gate 6)',
      url: '#registry/parts-lookup',
      snippet: 'Natural language parts lookup integrated with SAP. Reduces manual search time by 75%.',
      source: 'KettOS Registry',
      relevanceScore: 0.82,
    },
    {
      title: 'Field Training Recommendation Engine (Gate 4)',
      url: '#registry/training-rec',
      snippet: 'Recommends training modules based on technician performance data from Salesforce CRM.',
      source: 'KettOS Registry',
      relevanceScore: 0.75,
    },
  ];
  // Simple relevance filter based on query keywords
  return all.filter((r) =>
    lq.split(' ').some((word) => r.title.toLowerCase().includes(word) || r.snippet.toLowerCase().includes(word))
  ).slice(0, 3);
}
