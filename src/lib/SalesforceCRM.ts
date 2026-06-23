/**
 * SalesforceCRM.ts
 * Stub for Salesforce CRM integration.
 * Provides account lookup, opportunity tracking, and contact management.
 * Uses REST API in production; returns mock data in development.
 */

const SF_INSTANCE_URL = import.meta.env.VITE_SF_INSTANCE_URL;
const SF_ACCESS_TOKEN = import.meta.env.VITE_SF_ACCESS_TOKEN;

export interface SFAccount {
  id: string;
  name: string;
  industry: string;
  annualRevenue: number;
  ownerName: string;
  healthScore: 'green' | 'yellow' | 'red';
}

export interface SFOpportunity {
  id: string;
  name: string;
  accountId: string;
  stage: string;
  amount: number;
  closeDate: string;
  probability: number;
}

export interface SFContact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  accountId: string;
  title: string;
}

/**
 * Retrieve an account by ID.
 * Development: returns mock data.
 * Production: calls Salesforce REST API.
 */
export async function getAccount(accountId: string): Promise<SFAccount | null> {
  if (!SF_INSTANCE_URL || !SF_ACCESS_TOKEN) {
    console.log(`[SalesforceCRM] Mock getAccount: ${accountId}`);
    return {
      id: accountId,
      name: 'Acme Corporation',
      industry: 'Technology',
      annualRevenue: 50_000_000,
      ownerName: 'Jane Smith',
      healthScore: 'green',
    };
  }

  const url = `${SF_INSTANCE_URL}/services/data/v58.0/sobjects/Account/${accountId}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${SF_ACCESS_TOKEN}` },
  });
  if (!res.ok) return null;
  const data = await res.json();
  return {
    id: data.Id,
    name: data.Name,
    industry: data.Industry ?? '',
    annualRevenue: data.AnnualRevenue ?? 0,
    ownerName: data.Owner?.Name ?? '',
    healthScore: 'green',
  };
}

/**
 * List open opportunities for an account.
 */
export async function getOpportunities(accountId: string): Promise<SFOpportunity[]> {
  if (!SF_INSTANCE_URL || !SF_ACCESS_TOKEN) {
    console.log(`[SalesforceCRM] Mock getOpportunities for account: ${accountId}`);
    return [
      {
        id: 'opp-001',
        name: 'Enterprise License Renewal',
        accountId,
        stage: 'Proposal/Price Quote',
        amount: 120_000,
        closeDate: '2026-09-30',
        probability: 75,
      },
      {
        id: 'opp-002',
        name: 'Platform Expansion',
        accountId,
        stage: 'Needs Analysis',
        amount: 85_000,
        closeDate: '2026-12-15',
        probability: 40,
      },
    ];
  }

  const query = encodeURIComponent(
    `SELECT Id, Name, AccountId, StageName, Amount, CloseDate, Probability FROM Opportunity WHERE AccountId = '${accountId}' AND IsClosed = false`
  );
  const url = `${SF_INSTANCE_URL}/services/data/v58.0/query?q=${query}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${SF_ACCESS_TOKEN}` },
  });
  if (!res.ok) return [];
  const data = await res.json();
  return (data.records ?? []).map((r: any) => ({
    id: r.Id,
    name: r.Name,
    accountId: r.AccountId,
    stage: r.StageName,
    amount: r.Amount,
    closeDate: r.CloseDate,
    probability: r.Probability,
  }));
}

/**
 * List contacts associated with an account.
 */
export async function getContacts(accountId: string): Promise<SFContact[]> {
  if (!SF_INSTANCE_URL || !SF_ACCESS_TOKEN) {
    console.log(`[SalesforceCRM] Mock getContacts for account: ${accountId}`);
    return [
      {
        id: 'con-001',
        firstName: 'Alice',
        lastName: 'Johnson',
        email: 'alice.johnson@acme.com',
        accountId,
        title: 'VP of Engineering',
      },
    ];
  }

  const query = encodeURIComponent(
    `SELECT Id, FirstName, LastName, Email, AccountId, Title FROM Contact WHERE AccountId = '${accountId}'`
  );
  const url = `${SF_INSTANCE_URL}/services/data/v58.0/query?q=${query}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${SF_ACCESS_TOKEN}` },
  });
  if (!res.ok) return [];
  const data = await res.json();
  return (data.records ?? []).map((r: any) => ({
    id: r.Id,
    firstName: r.FirstName,
    lastName: r.LastName,
    email: r.Email,
    accountId: r.AccountId,
    title: r.Title ?? '',
  }));
}

/**
 * Log a Salesforce activity/task against an account.
 */
export async function logActivity(
  accountId: string,
  subject: string,
  description: string
): Promise<void> {
  if (!SF_INSTANCE_URL || !SF_ACCESS_TOKEN) {
    console.log(`[SalesforceCRM] Mock logActivity for ${accountId}: ${subject}`);
    return;
  }

  const url = `${SF_INSTANCE_URL}/services/data/v58.0/sobjects/Task`;
  await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${SF_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      WhatId: accountId,
      Subject: subject,
      Description: description,
      Status: 'Completed',
      ActivityDate: new Date().toISOString().split('T')[0],
    }),
  });
}
