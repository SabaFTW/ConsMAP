# Operator Audit Trail

**Status:** public-safe protocol  
**Purpose:** Record and review operator decisions to prevent silent bias and drift.

---

## Problem

ConsMAP assumes the operator is the final validation layer.

But the operator is also a source of bias, fatigue, and selective reasoning.

Without an audit trail, the system cannot detect when the operator is consistently misclassifying or steering outcomes.

---

## Core Rule

> Every non-trivial routing or validation decision should include a reason.

This is not for surveillance.
It is for self-audit and later correction.

---

## Minimal Decision Log

Each significant decision adds a record:

```yaml
decision_log:
  decision_id: "decision-0001"
  timestamp: "YYYY-MM-DDTHH:MM:SS"
  claim_id: "claim-0001"
  action: "route_to_clean_river | route_to_muddy_river | reject | promote | re-run"
  reason: "explicit reasoning for this decision"
  confidence: "low | medium | high"
  skipped_checks:
    - "cross_model_checkpoint"
    - "full_hygiene"
  notes: "optional context"
```

---

## What Counts as a Decision

Log when you:

- promote a claim to `clean_river`
- downgrade a claim
- override a model output
- skip a pipeline phase
- accept a synthesis despite contradictions

Do not log trivial edits.

---

## Drift Detection

Over time, review decision logs for patterns:

- repeated high-confidence decisions later proven wrong
- consistent routing toward a preferred narrative
- frequent skipping of the same check

If patterns appear, update either:

- your workflow triggers
- your intervention thresholds
- or your assumptions about the domain

---

## Failure Modes Addressed

| Failure | Detection via audit |
|---|---|
| Confirmation bias | Repeated routing toward same conclusion |
| Fatigue shortcuts | Increasing skipped_checks frequency |
| Overconfidence | High confidence + later corrections |
| Selective validation | Ignoring contradictions in synthesis |

---

## Integration with EPG

The audit trail complements provenance:

- EPG answers: "what happened to the claim"
- Audit trail answers: "why did the operator allow it"

Together they create a full reasoning trace.

---

## One-Line Summary

> If the operator is the final authority, the operator must also be observable.
