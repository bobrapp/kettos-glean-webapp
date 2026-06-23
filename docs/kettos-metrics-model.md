# KettOS Metrics Model

This document defines the official ROI formulas and measurement framework for all KettOS AI solutions. All certified solutions (Gate 5+) must have a completed ROI calculation using these formulas.

---

## Core Principle

ROI is measured in three dimensions:
1. **Time Savings** — direct hours recovered per user per week
2. **Attrition Avoidance** — retention value from reducing burnout and friction
3. **FTE-Equivalent Value** — the human capacity unlocked by the automation

---

## Formula 1: Monthly Time Savings

```
Monthly Time Savings (hrs) =
  (Hours Wasted Per User Per Week)
  × (Number of Affected Users)
  × (Automation Efficiency Rate)
  × 4.33 weeks/month
```

**Variables:**
- `hours_wasted_per_user_per_week`: from Intake Form (Gate 0)
- `affected_users`: from Intake Form (Gate 0)
- `automation_efficiency_rate`: % of the task the AI handles (0.0–1.0), measured in Pilot (Gate 4)

**Example:**
- Hours wasted: 2 hrs/week
- Affected users: 200
- Automation efficiency: 0.75 (75%)
- Monthly savings = 2 × 200 × 0.75 × 4.33 = **1,299 hrs/month**

---

## Formula 2: Annual Dollar Value of Time Saved

```
Annual Time Savings Value ($) =
  Monthly Time Savings (hrs)
  × 12
  × Fully-Loaded Hourly Rate ($)
```

**Variables:**
- `fully_loaded_hourly_rate`: Use $85/hr for field employees, $110/hr for contractor roles (blended fully-loaded cost including benefits, overhead)
- Adjust if the solution targets a specific role with known rate

**Example (continuing above):**
- 1,299 hrs/month × 12 × $85 = **$1,324,980/year**

---

## Formula 3: FTE-Equivalent Value

```
FTE-Equivalent (FTEs) =
  Annual Time Savings (hrs)
  ÷ 2,080 hrs/yr (standard FTE)
```

**Example:**
- 1,299 × 12 = 15,588 hrs/year
- 15,588 ÷ 2,080 = **7.5 FTE-equivalents**

This metric is the most compelling for leadership: frame it as "this solution does the equivalent work of 7.5 additional people, without headcount."

---

## Formula 4: Attrition Avoidance Value

```
Attrition Avoidance Value ($) =
  (Estimated Attrition Rate Reduction)
  × (Affected Users)
  × (Cost to Replace One Employee)
```

**Variables:**
- `attrition_rate_reduction`: Conservative estimate is 0.5–2% for high-friction task elimination (use 0.5% as default)
- `affected_users`: same as Formula 1
- `replacement_cost`: Use $45,000 for field roles (recruiting + onboarding + ramp time)

**Example:**
- Attrition reduction: 0.5% = 0.005
- Affected users: 200
- Replacement cost: $45,000
- Attrition avoidance = 0.005 × 200 × $45,000 = **$45,000/year**

---

## Formula 5: Total Annual ROI

```
Total Annual ROI ($) =
  Annual Time Savings Value
  + Attrition Avoidance Value
  - Solution Build Cost
  - Annual Maintenance Cost
```

**Build Cost Estimation:**
- Explorer/Builder built: $0 direct (absorbed in existing role)
- KettOS team support: ~$5,000–$15,000 depending on complexity

**Maintenance Cost:**
- Typically 10–20% of build cost annually

**Example (full):**
- Time savings value: $1,324,980
- Attrition avoidance: $45,000
- Build cost: $10,000
- Maintenance: $2,000
- **Total ROI = $1,357,980/year**

---

## Metric Dashboard Targets

The KettOS Metrics Dashboard (MetricsDashboard.tsx) tracks these platform-wide KPIs:

| KPI | Definition | Target |
|-----|-----------|--------|
| Monthly Active Builders | Unique builders who submitted or updated a solution in the past 30 days | 25+ by end of Year 1 |
| Solution Reuse Rate | % of solutions used by teams other than the original builder's team | 40%+ |
| Avoided Replacement Hires | Sum of attrition avoidance FTE-equivalents across all certified solutions | 10+ FTEs/year |
| Time Saved Total | Sum of Monthly Time Savings across all Gate 5+ solutions | 5,000+ hrs/month |
| Solutions in Registry | Total solutions at Gate 5 or 6 | 20+ by end of Year 1 |
| Solutions at Gate 6 (scaled) | Solutions available org-wide | 10+ by end of Year 1 |

---

## Reporting Cadence

| Report | Audience | Frequency | Owner |
|--------|----------|-----------|-------|
| Builder Activity Report | KettOS Team | Weekly | Auto (from Databricks) |
| Innovation Dashboard | Leadership | Monthly | KettOS Team |
| Annual ROI Summary | Exec sponsors | Annually | KettOS Team + Champion |
| Vendor Rotation Report | KettOS Advisory Circle | Quarterly | KettOS Team |
