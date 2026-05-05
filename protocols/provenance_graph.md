# Epistemic Provenance Graph (EPG)

**Status:** public-safe protocol  
**Purpose:** Track how a claim changes as it moves through the ConsMAP operator pipeline.

---

## Problem

A claim can become distorted at any handoff:

```text
raw output → structured framework → fracture analysis → synthesis → claim hygiene → archive
```

Without provenance, the system can identify that a final claim is weak, but not where the weakness entered.

The Epistemic Provenance Graph records the lineage of each claim so errors can be traced backward.

---

## Core Rule

> No claim should be archived without a lineage record.

A claim may remain in `muddy_river` without full provenance, but anything promoted to stronger use must show its path.

---

## Minimal Lineage Fields

Each claim card should include:

```yaml
lineage:
  claim_id: "claim-0001"
  created_at: "YYYY-MM-DDTHH:MM:SS"
  source_material: "path/or/reference"
  generated_by:
    phase: "discovery"
    model_or_tool: "manual | grok | claude | gemini | chatgpt | other"
    note: "initial premise or raw framing"
  structured_by:
    phase: "structure"
    model_or_tool: "manual | claude | other"
    changes:
      - "separated evidence from interpretation"
      - "added assumptions"
  fractured_by:
    phase: "fracture"
    model_or_tool: "manual | gemini | other"
    contradictions:
      - "specific contradiction or missing data"
  synthesized_by:
    phase: "synthesis"
    model_or_tool: "manual | chatgpt | other"
    reconciliation: "how contradictions were handled"
  hygiene_check:
    tool: "tools/analyze_claim.py | manual"
    result: "clean | muddy | stone | symbolic | private_only | rejected"
  archive_target: "user_research/..."
```

---

## Provenance Is Not Proof

A lineage record does not make a claim true.

It shows:

- who or what generated it
- where it changed
- what contradictions were found
- why it was routed where it was routed

This turns the archive from a pile of outputs into a map of reasoning traces.

---

## Backtracking Procedure

When a claim fails hygiene or later proves wrong:

1. Open its lineage record.
2. Identify the first phase where the unsupported premise appeared.
3. Mark the handoff as degraded.
4. Check whether similar claims share the same handoff pattern.
5. Update the operator guide or workflow trigger if needed.

---

## Common Failure Patterns

| Pattern | Meaning | Response |
|---|---|---|
| Discovery noise promoted | Raw framing was treated as evidence | Demote to muddy_river |
| Structure lock-in | A false assumption was made coherent | Re-run fracture from original raw material |
| Fracture miss | Contradiction model failed to catch central weakness | Add explicit counterfactual prompt |
| Synthesis smoothing | Final output reconciled away real contradictions | Preserve contradictions in final card |
| Hygiene bypass | Claim was archived without full five-question review | Roll back archive status |

---

## EPG and Cross-Model Validation

Cross-model validation catches some errors, but not all.

Models can share training-data priors and converge on the same false claim.

EPG does not assume model independence.
It records where agreement emerged so future audits can distinguish:

```text
independent corroboration
vs
correlated repetition
```

---

## One-Line Summary

> Provenance does not prove truth; it preserves the trail needed to find where false confidence entered.
