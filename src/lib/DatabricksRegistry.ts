/**
 * DatabricksRegistry.ts
 * Stub for Databricks MLflow Model Registry integration.
 * Set VITE_DATABRICKS_HOST and VITE_DATABRICKS_TOKEN in your .env.local
 */

export interface SolutionEntry {
  solution_name: string;
  owner_email: string;
  gate_level: number;
  tool_dependencies: string[];
  failure_behavior: string;
  roi_hours_per_month: number;
  roi_fte_equivalent: number;
  last_reviewed: string;
  version: string;
}

const DATABRICKS_HOST = import.meta.env.VITE_DATABRICKS_HOST || '';
const DATABRICKS_TOKEN = import.meta.env.VITE_DATABRICKS_TOKEN || '';

const REGISTERED_MODEL_NAME = 'kettos-solution-registry';

/**
 * Register a new solution in the Databricks MLflow registry.
 * Falls back to console log if not configured.
 */
export async function registerSolution(entry: SolutionEntry): Promise<void> {
  if (!DATABRICKS_HOST || !DATABRICKS_TOKEN) {
    console.log('[DatabricksRegistry] Mock register:', entry);
    await new Promise((r) => setTimeout(r, 800)); // Simulate network delay
    return;
  }

  const response = await fetch(
    `${DATABRICKS_HOST}/api/2.0/mlflow/registered-models/create`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${DATABRICKS_TOKEN}`,
      },
      body: JSON.stringify({
        name: `${REGISTERED_MODEL_NAME}/${entry.solution_name}`,
        tags: [
          { key: 'owner_email', value: entry.owner_email },
          { key: 'gate_level', value: String(entry.gate_level) },
          { key: 'tool_dependencies', value: entry.tool_dependencies.join(',') },
          { key: 'failure_behavior', value: entry.failure_behavior },
          { key: 'roi_hours_per_month', value: String(entry.roi_hours_per_month) },
          { key: 'roi_fte_equivalent', value: String(entry.roi_fte_equivalent) },
          { key: 'last_reviewed', value: entry.last_reviewed },
          { key: 'version', value: entry.version },
        ],
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Databricks API error: ${response.status}`);
  }
}

/**
 * List all solutions from the Databricks MLflow registry.
 * Falls back to mock data if not configured.
 */
export async function listSolutions(): Promise<SolutionEntry[]> {
  if (!DATABRICKS_HOST || !DATABRICKS_TOKEN) {
    return getMockSolutions();
  }

  try {
    const response = await fetch(
      `${DATABRICKS_HOST}/api/2.0/mlflow/registered-models/search?filter=name+LIKE+'${REGISTERED_MODEL_NAME}%25'`,
      {
        headers: { Authorization: `Bearer ${DATABRICKS_TOKEN}` },
      }
    );

    if (!response.ok) throw new Error(`Databricks list error: ${response.status}`);

    const data = await response.json();
    return (data.registered_models || []).map((m: any) => {
      const tags = Object.fromEntries((m.tags || []).map((t: any) => [t.key, t.value]));
      return {
        solution_name: m.name.replace(`${REGISTERED_MODEL_NAME}/`, ''),
        owner_email: tags.owner_email || '',
        gate_level: Number(tags.gate_level || 0),
        tool_dependencies: (tags.tool_dependencies || '').split(',').filter(Boolean),
        failure_behavior: tags.failure_behavior || '',
        roi_hours_per_month: Number(tags.roi_hours_per_month || 0),
        roi_fte_equivalent: Number(tags.roi_fte_equivalent || 0),
        last_reviewed: tags.last_reviewed || '',
        version: tags.version || '1.0.0',
      } as SolutionEntry;
    });
  } catch (error) {
    console.error('DatabricksRegistry list error:', error);
    return getMockSolutions();
  }
}

function getMockSolutions(): SolutionEntry[] {
  return [
    {
      solution_name: 'Salesforce Report Auto-Generation',
      owner_email: 'jsmith@company.com',
      gate_level: 6,
      tool_dependencies: ['Salesforce', 'Glean', 'AI Builder'],
      failure_behavior: 'Falls back to manual template with notification to owner',
      roi_hours_per_month: 1299,
      roi_fte_equivalent: 7.5,
      last_reviewed: '2026-04-15',
      version: '2.1.0',
    },
    {
      solution_name: 'Warranty Claim Classifier',
      owner_email: 'mgarcia@company.com',
      gate_level: 5,
      tool_dependencies: ['Databricks', 'Salesforce'],
      failure_behavior: 'Routes to human queue with low-confidence flag',
      roi_hours_per_month: 420,
      roi_fte_equivalent: 2.4,
      last_reviewed: '2026-03-28',
      version: '1.3.0',
    },
    {
      solution_name: 'Parts Lookup AI Assistant',
      owner_email: 'lwilson@company.com',
      gate_level: 6,
      tool_dependencies: ['SAP', 'Glean', 'Microsoft Graph'],
      failure_behavior: 'Redirects to SAP direct search with error message',
      roi_hours_per_month: 650,
      roi_fte_equivalent: 3.75,
      last_reviewed: '2026-05-01',
      version: '1.0.2',
    },
    {
      solution_name: 'Field Training Recommendation Engine',
      owner_email: 'alee@company.com',
      gate_level: 4,
      tool_dependencies: ['Salesforce', 'Databricks'],
      failure_behavior: 'Shows default training list without personalization',
      roi_hours_per_month: 180,
      roi_fte_equivalent: 1.04,
      last_reviewed: '2026-06-01',
      version: '0.8.0',
    },
    {
      solution_name: 'Customer Complaint Summarizer',
      owner_email: 'bpatel@company.com',
      gate_level: 2,
      tool_dependencies: ['Glean', 'AI Builder'],
      failure_behavior: 'TBD at Gate 3',
      roi_hours_per_month: 0,
      roi_fte_equivalent: 0,
      last_reviewed: '2026-06-10',
      version: '0.2.0',
    },
  ];
}
