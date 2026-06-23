# KettOS Seven-Gate Lifecycle

The KettOS lifecycle is a seven-gate governance framework that moves an AI solution from a raw idea to a fully certified, reusable, production-grade automation. Every solution in the Agent Registry has a current gate (0–6).

---

## Gate 0 — Intake & Problem Definition

**Goal:** Capture and validate the problem worth solving.

**Builder Action:**
- Submit an Intake Form with: Problem Statement, Affected Users, Time Wasted Per User (hrs/week), Data Sources
- Glean search auto-surfaces related solutions already in the registry

**Team Action:**
- Review for duplication, feasibility, and strategic fit
- Assign a Builder Owner

**Exit Criteria:**
- Problem statement approved
- No duplicate solution found in registry
- Builder Owner confirmed

---

## Gate 1 — Solution Design

**Goal:** Define the approach before building.

**Builder Action:**
- Document the proposed tool(s), data flow, and expected output
- Identify tool dependencies (Glean, Databricks, AI Builder, Salesforce, etc.)
- Define the "failure behavior" — what happens when the AI is wrong?

**Team Action:**
- Review design for tool hygiene (Act Now vs. Watch vs. Ignore list)
- Confirm no vendor lock-in or compliance risk

**Exit Criteria:**
- Design doc approved
- Tool dependencies listed and cleared
- Failure behavior defined

---

## Gate 2 — Prototype

**Goal:** Prove the idea works on real data.

**Builder Action:**
- Build a working prototype using approved tools
- Run on 10–100 real records
- Document accuracy, errors, and edge cases

**Exit Criteria:**
- Prototype runs successfully on real data
- Accuracy rate documented
- Edge cases identified

---

## Gate 3 — Peer Review

**Goal:** Get another Builder to validate the approach.

**Builder Action:**
- Present prototype to at least one peer Builder (Builder-level or above)
- Incorporate feedback

**Team Action:**
- Facilitate peer review session (async or sync)

**Exit Criteria:**
- Peer review completed and documented
- Feedback incorporated or formally noted as out of scope

---

## Gate 4 — Pilot

**Goal:** Test with a real user group in production conditions.

**Builder Action:**
- Run the solution with 5–50 real users for 2–4 weeks
- Collect feedback and measure time savings
- Document failure incidents

**Exit Criteria:**
- Pilot report completed
- Measured time savings documented
- Failure incidents below threshold (< 5% error rate)

---

## Gate 5 — Certification

**Goal:** Formally certify the solution as production-ready.

**Team Action:**
- Review full gate history (0–4)
- Validate ROI calculation using kettos-metrics-model.md formulas
- Register in Databricks MLflow with full metadata

**Exit Criteria:**
- All gates 0–4 completed
- ROI documented and approved
- Solution registered in Databricks with Owner, Version, and Failure Behavior

---

## Gate 6 — Scale & Reuse

**Goal:** Make the solution available to the full 17,000-person org.

**Team Action:**
- Publish to Agent Registry with full documentation
- Surface in Glean search results for related queries
- Schedule quarterly review (Vendor Rotation Protocol)

**Exit Criteria:**
- Solution published in Agent Registry
- Glean integration active
- Owner-Operator committed to quarterly reviews

---

## Gate Summary Table

| Gate | Name | Key Deliverable | Owner |
|------|------|----------------|-------|
| 0 | Intake | Problem Statement + Intake Form | Builder |
| 1 | Design | Solution Design Doc | Builder |
| 2 | Prototype | Working Prototype + Accuracy Report | Builder |
| 3 | Peer Review | Peer Review Sign-off | Builder + Peer |
| 4 | Pilot | Pilot Report + Time Savings Data | Builder |
| 5 | Certification | Databricks Registration + ROI | KettOS Team |
| 6 | Scale | Agent Registry Publish + Glean | KettOS Team |
