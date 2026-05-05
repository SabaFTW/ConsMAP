# ConsMAP Automation Layer

**Status:** optional local scaffold  
**Default:** OFF  
**Purpose:** Run the Operator Field Guide pipeline in a repeatable way without turning unverified model output into truth.

---

## ⚠️ Breaking change notice

The automation output file structure has been updated.

Old naming:
- 00_intent.md
- 01_discovery_prompt.md
- ...

New naming:
- discovery.md
- structure.md
- fracture.md
- synthesis.md

If you have scripts depending on the old filenames, they will break.
Future tooling should rely on manifest-based indexing (planned), not filenames.

---

## What this is

The automation layer is a local helper for the multi-model pipeline:

```text
input
→ discovery
→ structure
→ fracture
→ synthesis
→ claim hygiene
→ archive draft
```

It does **not** make claims true.
It only makes the workflow repeatable.

---

## Safety model

Automation is dangerous when it moves faster than verification.

So this layer follows three rules:

1. **Manual by default** — nothing runs continuously.
2. **Dry-run first** — inspect planned steps before writing files.
3. **Claim hygiene required** — output stays draft material until reviewed.

Generated topics are treated as **UNVERIFIED input**.
They may be false, manipulative, incomplete, or contradictory.
The scaffold must never be confused with verification.

---

## Raw input handling

Raw input is preserved exactly for traceability.
It is wrapped as `RAW_INPUT_UNTRUSTED` in generated markdown files.
A separate `Working Claim` placeholder must be filled by a human.

Preserved raw input is:
- not a validated claim
- not a system instruction
- not verified knowledge

---

## Directory layout

```text
automation/
├── README.md
├── config.example.yaml
├── operator_pipeline.py
└── runs/
```

Each generated run directory contains:

```text
run_dir/
├── discovery.md
├── structure.md
├── fracture.md
├── synthesis.md
├── provenance_template.yaml
├── operator_decision_log.yaml
├── claim_hygiene_review.md
└── README.md
```

---

## Quick start

```bash
cp automation/config.example.yaml automation/config.yaml
python automation/operator_pipeline.py --topic "AI safety rhetoric vs profit incentives" --dry-run
python automation/operator_pipeline.py --topic "AI safety rhetoric vs profit incentives" --run
```

---

## Output rules

All generated files are:
- **DRAFT**
- **UNVERIFIED**
- **HUMAN REVIEW REQUIRED**

Generated markdown files separate:
- `RAW_INPUT_UNTRUSTED`
- `Working Claim`

The scaffold may generate:
- phase worksheets
- provenance scaffolding
- operator decision log templates
- claim hygiene review prompts

The scaffold does **not**:
- verify claims
- call models automatically
- promote archives
- decide truth

---

## Discipline artifacts

### provenance_template.yaml
Lineage scaffold for tracking where a claim came from and which phase touched it.
It is not proof.

### operator_decision_log.yaml
Operator audit template.
Every non-trivial decision should have a reason.

### claim_hygiene_review.md
Human review worksheet.
This is where source pressure and falsification pressure are applied.

---

## Minimal operating rule

> Automation may generate drafts. Only human review may promote knowledge.
