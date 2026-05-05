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
3. **Claim hygiene required** — output is routed as draft material until reviewed.

---

## Directory layout

```text
automation/
├── README.md
├── config.example.yaml
├── operator_pipeline.py
└── runs/
```

---

## Quick start

```bash
cp automation/config.example.yaml automation/config.yaml
python automation/operator_pipeline.py --topic "AI safety rhetoric vs profit incentives" --dry-run
```

---

## Minimal operating rule

> Automation may generate drafts. Only claim hygiene may promote knowledge.
