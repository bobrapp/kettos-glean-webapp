# One-Shot Prompt — KettOS Glean Webapp

Use this prompt in **Cursor** (or any Copilot-enabled IDE) to generate the full working application from the scaffold files in this repository.

---

## Prompt

```
You are a senior React/TypeScript engineer. Using the scaffold files in this repository, generate a complete, working KettOS Glean Webapp with the following specifications:

### Context
This is an AI Innovation Lab platform for an 8-person AI team supporting 17,000 field employees (5,000 employees + 10,000 contractors) at an automotive company. The platform must enable self-service AI builder certification and solution governance — without the central team becoming a delivery bureau.

### Pages / Views to Build

1. **Home / Dashboard**
   - Summary cards: Active Builders, Solutions in Registry, Time Saved (hrs/month), FTE-Equivalent Value
   - Quick links to Intake, Registry, and Docs
   - Glean-powered search bar (uses GleanSearchSDK.ts)

2. **Intake Form** (IntakeForm.tsx)
   - Fields: Problem Statement, Affected Users (count), Time Wasted Per User (hrs/week), Data Sources Used
   - Glean sidebar: surfaces related KB articles and past solutions as the user types
   - On submit: registers the solution at Gate 0 in the Databricks registry

3. **Agent Registry** (AgentRegistry.tsx)
   - Table view of all certified solutions
   - Columns: Solution Name, Owner, Gate Level (0-6), Tool Dependencies, Failure Behavior, Last Updated
   - Filter by Gate level, Owner, Tool
   - Click-through to solution detail page
   - Backed by DatabricksRegistry.ts

4. **Metrics Dashboard** (MetricsDashboard.tsx)
   - Monthly Active Builders (line chart)
   - Solution Reuse Rate (bar chart)
   - Avoided Replacement Hires (metric card)
   - Time Saved Total (metric card)
   - ROI formulas from docs/kettos-metrics-model.md

5. **Docs Viewer**
   - Renders the four markdown files from /docs/ inline in the app
   - Tab navigation: Lifecycle | Gates | Builder Levels | Metrics Model

### Tech Stack
- React 18 + TypeScript + Vite
- Tailwind CSS for styling
- React Router v6 for navigation
- Recharts for dashboard charts
- Marked.js for markdown rendering
- SDK stubs in src/lib/ (connect to real APIs via env vars)

### Design
- Clean, enterprise-grade UI
- Sidebar navigation
- KettOS brand colors: deep blue (#1B3A6B) and gold (#F5A623)
- Responsive layout

### Instructions
1. Generate App.tsx with React Router routes for all 5 views
2. Generate main.tsx entry point
3. Implement all components in src/components/
4. Wire up all SDK calls using the stubs in src/lib/
5. Add a .env.example file with all required VITE_ variables
6. Ensure TypeScript compiles cleanly with no errors
7. Add basic error boundaries around each SDK call

Start with App.tsx and main.tsx, then each component in order.
```

---

## How to Use

1. Open this repo in Cursor
2. Open the Cursor chat panel (`Cmd+L`)
3. Paste the prompt above
4. Cursor will generate each file sequentially
5. Review, accept, and test each generated file
6. Run `npm install && npm run dev` to verify
7. Push to GitHub when satisfied

## Tips

- If Cursor misses a file, reference it explicitly: "Now generate `src/lib/GleanSearchSDK.ts`"
- Use `@docs/kettos-lifecycle.md` in Cursor to give it context about gate stages
- Use `@docs/kettos-metrics-model.md` to give it the exact ROI formulas
