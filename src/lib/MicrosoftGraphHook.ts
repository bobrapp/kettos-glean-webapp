/**
 * MicrosoftGraphHook.ts
 * Stub for Microsoft Graph API and AI Builder integration.
 * Set VITE_MS_CLIENT_ID and VITE_MS_TENANT_ID in your .env.local
 * Uses MSAL for auth in production; mock mode for development.
 */

const MS_CLIENT_ID = import.meta.env.VITE_MS_CLIENT_ID || '';
const MS_TENANT_ID = import.meta.env.VITE_MS_TENANT_ID || '';

export interface MSUserProfile {
  displayName: string;
  mail: string;
  jobTitle: string;
  department: string;
  officeLocation: string;
}

export interface AIBuilderFlow {
  flowId: string;
  name: string;
  status: 'active' | 'inactive' | 'error';
  lastRunTime: string;
  runsPerMonth: number;
}

/**
 * Get current user profile from Microsoft Graph.
 * Returns mock data in development mode.
 */
export async function getCurrentUser(): Promise<MSUserProfile | null> {
  if (!MS_CLIENT_ID || !MS_TENANT_ID) {
    return {
      displayName: 'Demo User',
      mail: 'demo@company.com',
      jobTitle: 'Field Service Technician',
      department: 'Field Operations',
      officeLocation: 'Detroit, MI',
    };
  }

  try {
    // In production: use @azure/msal-browser to acquire token first
    // const token = await acquireMSALToken();
    const response = await fetch('https://graph.microsoft.com/v1.0/me', {
      headers: {
        // Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) throw new Error(`Graph API error: ${response.status}`);
    const data = await response.json();
    return {
      displayName: data.displayName || '',
      mail: data.mail || data.userPrincipalName || '',
      jobTitle: data.jobTitle || '',
      department: data.department || '',
      officeLocation: data.officeLocation || '',
    };
  } catch (error) {
    console.error('MicrosoftGraphHook error:', error);
    return null;
  }
}

/**
 * List AI Builder flows for the organization.
 * Returns mock data in development mode.
 */
export async function listAIBuilderFlows(): Promise<AIBuilderFlow[]> {
  if (!MS_CLIENT_ID || !MS_TENANT_ID) {
    return [
      {
        flowId: 'flow-001',
        name: 'Warranty Form Auto-Fill',
        status: 'active',
        lastRunTime: '2026-06-22T14:30:00Z',
        runsPerMonth: 1240,
      },
      {
        flowId: 'flow-002',
        name: 'Parts Request Approval',
        status: 'active',
        lastRunTime: '2026-06-23T08:15:00Z',
        runsPerMonth: 890,
      },
      {
        flowId: 'flow-003',
        name: 'Field Report Classifier',
        status: 'inactive',
        lastRunTime: '2026-05-30T09:00:00Z',
        runsPerMonth: 0,
      },
    ];
  }

  // Production: call Power Automate / AI Builder API
  console.warn('MicrosoftGraphHook: AI Builder list not yet implemented for production.');
  return [];
}

/**
 * Trigger an AI Builder flow by ID.
 * No-op in development mode.
 */
export async function triggerAIBuilderFlow(flowId: string, payload: Record<string, unknown>): Promise<void> {
  if (!MS_CLIENT_ID || !MS_TENANT_ID) {
    console.log(`[MicrosoftGraphHook] Mock trigger flow ${flowId}:`, payload);
    return;
  }
  // Production: POST to Power Automate trigger endpoint
  console.warn(`MicrosoftGraphHook: triggerAIBuilderFlow(${flowId}) not yet implemented.`);
}
