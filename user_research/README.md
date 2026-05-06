# User Research Pipeline

This is the intake system for user-contributed research, claims, and evidence.

## How it works

```
1. Drop raw material into inbox_raw/
2. Extract claims using protocols/claim_hygiene.md
3. Route to the appropriate river folder
4. Only routed, labeled material enters AI context
```

## Folder structure

| Folder | River | What goes here |
|--------|-------|---------------|
| `inbox_raw/` | — | Unprocessed material. Nothing here is knowledge. |
| `claims_pending/` | — | Extracted claims awaiting review and routing. |
| `evidence_verified/` | Clean | Well-sourced, verified material ready for use. |
| `disputed/` | Muddy | Conflicting evidence or mixed-quality sources. |
| `symbolic_metaphor/` | Symbolic | Poetic, narrative, persona, or mythic material. |
| `restricted/` | Stone | High-risk material requiring specialized handling. |
| `rejected/` | — | False, misleading, unusable, or too contaminated. |

## Rules

1. **Raw files are not knowledge.** Nothing in `inbox_raw/` is treated as evidence by AI.
2. **Every claim gets a card.** Use `machine_context/CLAIM_SCHEMA.yaml` as template.
3. **Every card answers five questions.** See `protocols/claim_hygiene.md`.
4. **Routing is transparent.** The river assignment is visible and auditable.
5. **Nothing is silently destroyed.** Even rejected material stays in `rejected/` for record.

## For contributors

If you clone this repo and add your own research:
- Start in `inbox_raw/`
- Process into claim cards
- Submit cards, not raw files
- Your research enriches the structure only if it passes through the structure

## Pipeline status

The routing infrastructure is complete. No claims have been formally processed through this pipeline yet. All river folders currently contain only placeholder files.

This means: the system exists as defined protocol, not as active evidence base. Do not treat the existence of these folders as implying that research has been reviewed, verified, or routed. Nothing here is knowledge until it has passed claim hygiene and received a river assignment.
