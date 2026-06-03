# FORGE Proof v0.1 — Before / After Workflow

## Purpose

This artifact shows how FORGE changes the engineering file workflow.

It does not claim FORGE removes all process work.
It does not claim FORGE replaces PDM/PLM.
It shows the workflow shift:

```text
from: engineer works for the system
  to: system learns from the engineer
```

---

## Scenario

A mechanical engineer is working on a bracket and motor mount inside an active customer project.

The project is still moving. Names are messy. Some files are experiments. Some files are customer-facing. Some are old but still useful.

This is normal engineering reality.

---

## Before: classic PDM-style flow

```text
1. Engineer creates or modifies a CAD file.
2. Engineer tries to save it into the managed project space.
3. System requires metadata before save:
   - part number
   - lifecycle state
   - project code
   - release category
   - owner
   - description
   - revision
4. Engineer does not know some fields yet.
5. Engineer enters placeholder values:
   - TBD
   - temp
   - draft
   - ask later
6. System accepts the form but now contains low-quality metadata.
7. Approval workflow blocks movement until required fields are cleaned.
8. Engineer creates local workaround folder to keep working.
9. Shadow files appear outside the official system.
10. Traceability gets worse while the database looks cleaner.
```

---

## Before: what the system optimized for

```text
complete forms
clean database fields
workflow compliance
administrative control
```

---

## Before: what the engineer needed

```text
save without breaking flow
keep variants visible
mark uncertainty without lying
return later for cleanup
avoid losing experimental work
```

---

## Failure pattern

The classic system forces structure too early.

That creates a common failure:

```text
premature structure → fake metadata → workarounds → worse traceability
```

The problem is not that engineers hate structure.

The problem is that structure arrives before the work is ready for it.

---

## After: FORGE-style flow

```text
1. Engineer saves a CAD file.
2. FORGE allows save without forced metadata.
3. FORGE observes context:
   - folder location
   - related assemblies
   - naming pattern
   - nearby drawings
   - previous engineer choices
4. FORGE suggests structure:
   - likely tag
   - possible folder
   - possible relation to assembly
   - possible release status
   - cleanup reminder if needed later
5. Engineer accepts, edits, or rejects the suggestion.
6. FORGE records the decision as feedback.
7. Future suggestions adjust to that engineer and project.
```

---

## After: what FORGE optimizes for

```text
low-friction saving
human decision control
traceable uncertainty
gradual structure
learning from actual workflow
```

---

## Example interaction

```yaml
file: bracket_FINAL_REAL.SLDPRT
context:
  folder: CAD/
  related_files:
    - bracket_final.SLDPRT
    - bracket_final_v2.SLDPRT
    - assembly_customer_preview.SLDASM
forge_suggestion:
  tag: release_candidate
  folder: 03_release_candidates/customer_preview
  confidence: medium
  reason:
    - name suggests final candidate
    - related assembly appears customer-facing
    - similar past files were prepared for review
engineer_decision: reject
engineer_reason: "This is still internal geometry; final name is misleading."
forge_learning_signal:
  - do not rely on FINAL in filename alone
  - check drawing/review status before release_candidate suggestion
```

---

## What changed

The important difference is not that FORGE guessed correctly.

In this example, FORGE guessed partly wrong.

The important difference is that the wrong guess is useful:

```text
suggestion → correction → learning signal
```

Rejection is not failure.
Rejection is calibration.

---

## Side-by-side summary

| Step | Classic PDM | FORGE |
|---|---|---|
| Save file | gated by metadata | allowed immediately |
| Unknown fields | user fakes certainty | uncertainty stays visible |
| Structure | imposed before work is ready | suggested after observing context |
| User role | form-filler | decision gate |
| Bad suggestion | system error / friction | feedback signal |
| Workaround risk | high | lower, because messy work is allowed inside the system |
| Traceability | often breaks through shadow files | improves through visible decisions |

---

## What this proves

This artifact proves only:

```text
FORGE has a coherent workflow model for reducing premature administrative friction while preserving human control.
```

---

## What this does NOT prove

This does not prove:

```text
FORGE eliminates compliance work.
FORGE always suggests correctly.
FORGE can replace existing PLM systems.
FORGE has validated productivity gains.
FORGE is suitable for every regulated environment without adaptation.
```

---

## Core rule

```text
FORGE reduces avoidable friction.
It does not remove responsibility.
```
