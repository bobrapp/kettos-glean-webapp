# KettOS Glean Webapp — Bootstrap Guide

This guide walks you through setting up the full development environment, running the app locally, and deploying to production.

## Prerequisites

- Node.js 18+
- npm 9+
- A Glean enterprise tenant with API access
- Databricks workspace (for agent registry)
- Azure subscription (for Microsoft Graph / AI Builder)
- Salesforce org (for CRM stubs)

## 1. Clone the Repository

```bash
git clone https://github.com/bobrapp/kettos-glean-webapp.git
cd kettos-glean-webapp
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Configure Environment Variables

Copy the example env file and fill in your credentials:

```bash
cp .env.example .env.local
```

### Required Variables

```env
# Glean
VITE_GLEAN_API_BASE=https://your-tenant.glean.com/api/v1
VITE_GLEAN_API_TOKEN=your-glean-token

# Databricks
VITE_DATABRICKS_HOST=https://your-workspace.azuredatabricks.net
VITE_DATABRICKS_TOKEN=your-databricks-token

# Microsoft Graph
VITE_MS_CLIENT_ID=your-azure-app-client-id
VITE_MS_TENANT_ID=your-azure-tenant-id

# Salesforce
VITE_SF_INSTANCE_URL=https://your-org.salesforce.com
VITE_SF_ACCESS_TOKEN=your-sf-token
```

## 4. Run Locally

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

## 5. Build for Production

```bash
npm run build
npm run preview
```

## 6. Deploy

The included `.github/workflows/ci.yml` will:
1. Run TypeScript type checks
2. Run lint
3. Build the app
4. Deploy to GitHub Pages (or your target host)

See `one-shot-prompt.md` for using Cursor AI to generate the full implementation from this scaffold.

## Project Structure

```
kettos-glean-webapp/
├── README.md
├── README-bootstrap.md         # This file
├── one-shot-prompt.md          # Cursor AI generation prompt
├── docs/
│   ├── kettos-lifecycle.md
│   ├── kettos-gates.md
│   ├── kettos-builder-levels.md
│   └── kettos-metrics-model.md
├── src/
│   ├── components/
│   │   ├── IntakeForm.tsx
│   │   ├── AgentRegistry.tsx
│   │   └── MetricsDashboard.tsx
│   ├── lib/
│   │   ├── GleanSearchSDK.ts
│   │   ├── DatabricksRegistry.ts
│   │   ├── MicrosoftGraphHook.ts
│   │   └── SalesforceCRM.ts
│   ├── App.tsx
│   └── main.tsx
├── .github/
│   └── workflows/
│       └── ci.yml
├── package.json
├── tsconfig.json
└── vite.config.ts
```
