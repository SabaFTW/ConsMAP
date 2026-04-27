# TTT Pattern Detection Framework

**Status:** public-safe diagnostic protocol  
**Version:** 0.3  
**Purpose:** Detect structural mismatch between stated goals and measured proxies.

---

## 1. What TTT Is

**TTT** (Truth-to-Trust Threshold) detects a specific failure pattern:

> A system optimizes a measurable proxy → the proxy diverges from reality → the system reinforces the proxy as success.

**Result:** confidently wrong while believing it is working correctly.

**Formula:**
```
TTT = (Metric + Narrative) × Feedback_Failure × Confidence_Persistence
```

This is not a conspiracy theory framework. It is a structural analysis tool.  
≈ Goodhart's Law + feedback loop failure + confidence persistence.

---

## 2. The Five Criteria

Every system analyzed through TTT is checked against five criteria:

| # | Criterion | What it detects |
|---|-----------|-----------------|
| 1 | **Outcome Inversion** | Does the safety measure create the opposite of its stated goal? |
| 2 | **Confidence Persistence** | Does the system remain confident despite contrary evidence? |
| 3 | **Feedback Failure** | Is the correction loop broken, absent, or captured? |
| 4 | **Responsibility Diffusion** | Is accountability spread so thin nobody owns the failure? |
| 5 | **Metric Misalignment** | Does the measured proxy diverge from the intended outcome? |

**Scoring:** 0–5 criteria active. When ≥3 criteria fire → system is in pre-TTT drift.  
When all 5 fire → TTT lock candidate (system needs the failure to keep operating).

---

## 3. The Loop Triangulation

Every analyzed system has three loops:

```
    Metric Loop
        ↕
  Reality Loop ←→ Narrative Loop
```

| Loop | Healthy | Drifting | Dominant | Broken |
|------|---------|---------|----------|--------|
| **Metric** | KPIs reflect reality | KPIs diverge slightly | KPIs define reality | KPIs are fiction |
| **Narrative** | Story matches facts | Story smooths edges | Story overrides facts | Story replaces facts |
| **Reality** | Ground truth accessible | Ground truth delayed | Ground truth ignored | Ground truth absent |

**The danger zone:** when Metric + Narrative loops self-confirm while Reality loop is disconnected.

---

## 4. Pattern Card Structure

Each pattern follows a strict structure:

```
ID:         TTT-NNN
Name:       PATTERN_NAME
Confidence: high / mid-high / mid / conservative
Source:     documented / inferred / hypothesis
Stage:      weakness / persistent / pre-ttt / ttt-lock-candidate

GOAL:       What the system claims to do
PROXY:      What the system actually measures
EFFECT:     What actually happens
RISK:       What can go wrong
TYPE:       Structural classification

DETECTOR RULE:
  if [condition] and [condition] and [condition]
  → raise pattern_name

HOW TO FALSIFY:
  Show [specific evidence] that would disprove this pattern.
```

Every pattern card includes a falsification section. If a pattern cannot be falsified, it is not a pattern — it is a belief.

---

## 5. Documented Patterns (Public Library)

| ID | Name | Confidence | Domain |
|----|------|-----------|--------|
| TTT-001 | SAFETY_PROXY_OVERREACH | High | safety, platform |
| TTT-002 | ACCESS_CLAIM_VS_PRICING_REALITY | Mid-High | access, platform |
| TTT-003 | STALE_INTELLIGENCE_CONFIDENCE | High (inferred) | military, safety |
| TTT-004 | HARM_DISPLACEMENT_NOT_REMOVAL | High | safety, platform |
| TTT-005 | METRIC_OVERRIDES_CARE | Mid | health, safety |
| TTT-006 | SAFETY_AS_LIABILITY_SHIELD | Mid | safety, military |
| TTT-007 | RESOURCE_INVERSION_PROXY | Conservative | infra, platform |
| TTT-008 | COMPLIANCE_THEATER | Mid | safety, platform |
| TTT-009 | NARRATIVE_LOOP_DETACHMENT | Mid ⚠ self-applicable | meta, cognition |
| TTT-010 | PROPHECY_LOCK | Mid ⚠ self-applicable | meta, cognition |

### Self-Applicable Warnings (TTT-009, TTT-010)

These patterns apply to TTT itself. If the TTT framework explains everything, that is a signal something is wrong with the framework. If the framework predicts an outcome as "inevitable," the framework must meet the same falsifiability standard as every other pattern.

---

## 6. Example: TTT-001 — Safety Proxy Overreach

**GOAL:** Protect minors on platform  
**PROXY:** Verified identity — ID document + selfie upload  
**EFFECT:** Centralized database of minors' most sensitive biometric + document data  
**RISK:** Single breach = maximum harm to exactly those being "protected"

```
SAFETY ↑ → ATTACK SURFACE ↑
```

**Detector Rule:**
```
if claim = "protect users"
and proxy centralizes sensitive data
and breach scenario not modeled
→ raise safety_proxy_overreach
```

**How to Falsify:**  
Show verified-ID platforms have lower breach rates AND lower harm-per-breach than alternatives. Show harm reduction is measured, not assumed.

---

## 7. How to Use TTT with StoneRiver

When a user submits a claim about system failure, the analysis pipeline:

1. **StoneRiver routes the claim** → clean / muddy / stone based on evidence quality
2. **TTT evaluates the structural pattern** → does the claim match a known mismatch pattern?
3. **Labels are applied** → [EMPIRICAL] if evidence exists, [THEORETICAL] if mechanism is inferred
4. **Falsification is required** → every pattern claim must specify what would disprove it

```
User claim: "AI safety reviews are just compliance theater"
        ↓
StoneRiver: river=muddy, status=plausible, source=independent
        ↓
TTT Match: TTT-008 COMPLIANCE_THEATER (60% signal)
        ↓
Output:
  [THEORETICAL] The structural pattern matches documented compliance theater cases.
  [EMPIRICAL] Some documented examples exist (TSA, ESG, mid-Staffordshire).
  [UNVERIFIED] Blanket application to all AI safety is not supported.
  Falsification: Show that logged safety incidents result in corrective action.
```

---

## 8. Response Actions

When TTT detects a pattern, five response actions are available:

| Action | What it does |
|--------|-------------|
| Freeze Metric | Stop optimizing the proxy until reality is re-measured |
| Inject Reality | Force ground-truth data into the feedback loop |
| Assign Accountability Node | Create a single point of ownership for the outcome |
| Break Narrative | Introduce competing explanation to prevent loop closure |
| Downgrade Confidence | Reduce system certainty to match evidence level |

These are diagnostic recommendations, not prescriptions. The system does not act — it surfaces options.

---

## 9. Important Limitations

- TTT detects structural patterns, not truth
- A pattern match does not prove the system is broken
- Confidence levels reflect evidence quality, not certainty
- Self-applicable patterns (TTT-009, TTT-010) are a feature, not a bug
- This is a diagnostic tool, not a verdict engine

---

## 10. One-Line Definition

> **TTT:** if the system needs the failure to keep operating, you have found a Truth-to-Trust inversion.
