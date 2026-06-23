# KettOS Glean Webapp

> AI Innovation Lab — Lifecycle, Governance & Self-Service Platform
> Built for a 17,000-person automotive field organization (5,000 employees + 10,000 contractors)

## What is KettOS?

KettOS is a governed, self-service AI innovation platform that enables an 8-person AI center of excellence to support thousands of field builders — without becoming a service bureau.

Instead of delivering solutions, the KettOS team:
- **Certifies** builders at Explorer → Builder → Architect → Champion levels
- **Governs** solutions through a Seven-Gate lifecycle (Gates 0–6)
- **Measures** ROI in time savings, attrition avoidance, and FTE-equivalent value
- **Integrates** with Glean (enterprise search), Databricks (model registry), Microsoft AI Builder, and Salesforce CRM

## How Glean Integration Works

Glean is the enterprise knowledge layer. The webapp uses the Glean Search SDK to:
1. Surface relevant KB articles, past solutions, and agent patterns inside the Intake form
2. Power the Agent Registry search experience
3. Provide contextual docs inside each gate review screen

## Docs Embedded in the App

| File | Purpose |
|------|---------|
| `docs/kettos-lifecycle.md` | Gate 0–6 stage definitions |
| `docs/kettos-gates.md` | Evidence requirements per gate |
| `docs/kettos-builder-levels.md` | Explorer / Builder / Architect / Champion |
| `docs/kettos-metrics-model.md` | ROI formulas: time saved, attrition, FTE-equiv |

## Quick Start

```bash
npm install
npm run dev
```

See `README-bootstrap.md` for the full setup guide and `one-shot-prompt.md` for generating the app in Cursor.

## Tech Stack

- React 18 + TypeScript + Vite
- Tailwind CSS
- Glean Search SDK
- Databricks REST API
- Microsoft Graph / AI Builder hooks
- Salesforce CRM stubs

## License

MIT
