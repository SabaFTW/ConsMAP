# FORGE Proof Layer v0.1 Spec

## Purpose

This document defines the first proof layer for FORGE.

The goal is not to make FORGE look magical.
The goal is to show, concretely, what problem it attacks and what behavior it should demonstrate.

Layer 1 says:

```text
FORGE is file management for engineers that learns how you actually work.
```

Proof Layer v0.1 must make that claim visible.

---

## Position in the stack

```text
Layer 1 = README / cold entry
Layer 2 = FAQ / deep explanation
Layer 3 = proof layer / concrete demonstration
```

This file defines Layer 3 v0.1.

---

## What Proof Layer v0.1 must prove

Only these claims:

1. Engineering file workflows often contain messy but meaningful patterns.
2. A useful system should observe those patterns before imposing structure.
3. FORGE should suggest structure, not force it.
4. The user remains the decision gate.
5. A feedback loop can improve future suggestions.

---

## What Proof Layer v0.1 must NOT claim

Do not claim:

- FORGE is production-ready
- FORGE replaces PDM/PLM today
- FORGE solves all compliance problems
- FORGE understands engineering intent perfectly
- FORGE has proven ROI yet
- FORGE works in every regulated industry
- AI decisions are automatically correct

This proof layer demonstrates the shape of the workflow, not market validation.

---

## Core demo artifact set

Proof Layer v0.1 should eventually include these five artifacts:

```text
1. sample_folder_tree.md
2. before_after_workflow.md
3. sample_suggestion_flow.md
4. sample_decision_loop.md
5. regulated_team_edge_case.md
```

This spec defines what each artifact must contain.

---

## Artifact 1 — sample_folder_tree.md

### Purpose

Show the difference between a messy but real engineering folder and a structured output suggested by FORGE.

### Must include

A realistic messy input tree, for example:

```text
Project_A/
├── CAD/
│   ├── bracket_final.SLDPRT
│   ├── bracket_final_v2.SLDPRT
│   ├── bracket_FINAL_REAL.SLDPRT
│   ├── assembly_test.SLDASM
│   └── old/
├── TEMP/
│   ├── motor_mount_try1.step
│   ├── motor_mount_try2.step
│   └── dont_delete_yet/
├── drawings/
│   ├── bracket.pdf
│   └── bracket_new.pdf
└── notes.xlsx
```

Then a proposed structured view:

```text
Project_A/
├── 01_design/
├── 02_work_in_progress/
├── 03_release_candidates/
├── 04_drawings/
└── 99_archive/
```

### Boundary

Do not imply FORGE automatically moves files without user approval.

Correct framing:

```text
FORGE suggests this structure. The engineer confirms, edits, or rejects it.
```

---

## Artifact 2 — before_after_workflow.md

### Purpose

Show workflow friction before and after FORGE.

### Before

```text
1. Engineer saves file.
2. System demands metadata.
3. Engineer enters placeholder values.
4. Approval workflow blocks movement.
5. Engineer creates local workaround.
6. Traceability gets worse.
```

### After

```text
1. Engineer saves file.
2. FORGE observes context.
3. FORGE suggests tags / folder / status.
4. Engineer accepts or edits.
5. FORGE records the decision.
6. Future suggestions improve.
```

### Boundary

Do not claim zero friction in all cases.

Correct framing:

```text
FORGE reduces avoidable friction. It does not eliminate all process work.
```

---

## Artifact 3 — sample_suggestion_flow.md

### Purpose

Show one concrete suggestion event.

### Example shape

```yaml
file: motor_mount_try2.step
observed_context:
  project: Project_A
  folder: TEMP
  related_files:
    - motor_mount_try1.step
    - assembly_test.SLDASM
  detected_pattern: iterative WIP variant
suggestions:
  tag: work_in_progress
  folder: 02_work_in_progress
  related_to: assembly_test.SLDASM
  cleanup_note: older variant may be archived later
user_decision: edited
user_edit:
  folder: 02_work_in_progress/motor_mount
learning_signal: user prefers component-specific WIP subfolders
```

### Boundary

This is an illustrative mock example until real implementation exists.

Must label clearly:

```text
Example only — not production output.
```

---

## Artifact 4 — sample_decision_loop.md

### Purpose

Show that the user remains the decision gate.

### Required structure

```text
Suggestion 1:
FORGE: tag as "release_candidate"
Engineer: rejects
Reason: still missing tolerance review

Suggestion 2:
FORGE: tag as "work_in_progress"
Engineer: accepts

Next time:
FORGE delays release_candidate suggestion until tolerance review files are present.
```

### Boundary

Do not frame rejection as error.

Correct framing:

```text
Rejection is not failure. Rejection is feedback.
```

---

## Artifact 5 — regulated_team_edge_case.md

### Purpose

Show honesty around compliance-heavy environments.

### Must include

A case where FORGE cannot simply defer compliance to the end:

```text
Medical implant team:
- design changes require traceability
- FMEA must be maintained during development
- review history cannot be reconstructed only at release time
```

### Required conclusion

```text
In regulated contexts, FORGE needs Compliance Mode.
Freedom remains, but scaffolding increases.
```

### Boundary

Do not claim FORGE replaces regulated process tooling without adaptation.

---

## Proof page structure

When these artifacts are created, the proof page should follow this order:

```text
1. The messy reality
2. The suggested structure
3. The decision loop
4. The feedback improvement
5. The regulated edge case
6. What this proves / what it does not prove
```

---

## What this proves

Proof Layer v0.1 proves only:

```text
FORGE has a coherent workflow model.
```

It does not prove:

```text
FORGE has market traction.
FORGE has production-grade AI.
FORGE has validated ROI.
```

Those require later proof layers.

---

## Success criteria

Proof Layer v0.1 succeeds if a cold reader can answer:

1. What does FORGE observe?
2. What does FORGE suggest?
3. Where does the human decide?
4. How does the system learn?
5. Where are the limits?

If the reader still asks "what does it actually do?", Proof Layer v0.1 failed.

---

## Failure modes

Do not let this proof layer become:

- a marketing page
- a fake demo
- a philosophy document
- a roadmap
- a claim that FORGE already does everything described

This is a demonstration scaffold, not evidence of shipped capability.

---

## Next step

Implement the five proof artifacts as separate files under:

```text
docs/forge/proof_v0_1/
```

Recommended order:

1. `sample_folder_tree.md`
2. `before_after_workflow.md`
3. `sample_suggestion_flow.md`
4. `sample_decision_loop.md`
5. `regulated_team_edge_case.md`

Do not create a video/demo script until these are written.
