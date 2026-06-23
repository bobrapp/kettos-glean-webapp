# KettOS Gate Evidence Requirements

This document defines the specific evidence artifacts required to pass each gate in the KettOS Seven-Gate Lifecycle. All artifacts must be stored in the Agent Registry entry in Databricks.

---

## Gate 0 — Intake Evidence

| Evidence Item | Format | Required? |
|--------------|--------|-----------|
| Problem Statement | 2–5 sentences describing the problem | Yes |
| Affected User Count | Number | Yes |
| Time Wasted Per User | Hours per week | Yes |
| Data Sources | List of systems (e.g., Salesforce, SharePoint) | Yes |
| Glean Search Confirmation | Screenshot showing no duplicate found | Yes |
| Builder Owner Assignment | Name + email | Yes |

---

## Gate 1 — Design Evidence

| Evidence Item | Format | Required? |
|--------------|--------|-----------|
| Solution Design Doc | 1–3 page document | Yes |
| Tool Dependency List | List with vendor tier (Act Now / Watch / Ignore) | Yes |
| Data Flow Diagram | Simple diagram or description | Recommended |
| Failure Behavior Definition | What happens when AI is wrong + mitigation | Yes |
| Compliance Review | Notes confirming no GDPR/PII/data residency issue | Yes |
| Tool Hygiene Approval | KettOS team sign-off on tool selection | Yes |

---

## Gate 2 — Prototype Evidence

| Evidence Item | Format | Required? |
|--------------|--------|-----------|
| Working Prototype | Link to demo / code repo | Yes |
| Test Dataset | Min 10 real records (anonymized OK) | Yes |
| Accuracy Report | % correct, % false positives, % false negatives | Yes |
| Edge Case Log | List of known failure modes | Yes |
| Run Log | Screenshot or export showing prototype ran | Yes |

---

## Gate 3 — Peer Review Evidence

| Evidence Item | Format | Required? |
|--------------|--------|-----------|
| Peer Reviewer Name | Name + Builder level | Yes |
| Review Date | Date | Yes |
| Review Notes | Summary of feedback (async doc or meeting notes) | Yes |
| Feedback Resolution | How feedback was addressed or why deferred | Yes |
| Peer Sign-off | Email or chat confirmation from reviewer | Yes |

---

## Gate 4 — Pilot Evidence

| Evidence Item | Format | Required? |
|--------------|--------|-----------|
| Pilot User Group | Name / team + count of users | Yes |
| Pilot Duration | Start and end dates | Yes |
| Pilot Report | 1–2 page summary | Yes |
| Time Savings Measured | Hrs/week saved × users | Yes |
| User Feedback | Survey results or quotes (min 3 users) | Yes |
| Error Rate | % of AI outputs requiring manual correction | Yes |
| Error Rate Threshold | Must be < 5% to pass | Yes |

---

## Gate 5 — Certification Evidence

| Evidence Item | Format | Required? |
|--------------|--------|-----------|
| Full Gate History | Links to Gate 0–4 artifacts | Yes |
| ROI Calculation | Using formulas from kettos-metrics-model.md | Yes |
| Databricks Registration | MLflow entry with all required metadata | Yes |
| Owner-Operator Commitment | Signed agreement to maintain the solution | Yes |
| KettOS Team Approval | Sign-off from at least one KettOS team member | Yes |

**Required Databricks Metadata Fields:**
- `solution_name`
- `owner_email`
- `gate_level` (0–6)
- `tool_dependencies` (list)
- `failure_behavior` (string)
- `roi_hours_per_month` (number)
- `roi_fte_equivalent` (number)
- `last_reviewed` (date)
- `version` (semver)

---

## Gate 6 — Scale Evidence

| Evidence Item | Format | Required? |
|--------------|--------|-----------|
| Agent Registry Entry | Published in KettOS webapp | Yes |
| Glean Integration | Solution surfaces in Glean for related queries | Yes |
| Documentation | User guide in Agent Registry | Yes |
| Quarterly Review Schedule | Calendar entry or Jira ticket | Yes |
| Vendor Rotation Check | Confirmed tool still on Act Now list | Yes |
