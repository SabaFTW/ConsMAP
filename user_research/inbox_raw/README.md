# User Research Inbox

This folder receives raw, unprocessed material.

**Nothing in this folder is treated as knowledge.**

## How to add research

1. Drop your file here (PDF, text, link, screenshot, note)
2. Create a claim card using `machine_context/CLAIM_SCHEMA.yaml`
3. Route the card to the appropriate river folder
4. Only routed cards enter AI context

## Rules

- Raw files stay here until processed
- No file in inbox is referenced by AI as evidence
- Processing means: extract claims → answer five questions → assign river
- See `protocols/claim_hygiene.md` for the five questions

## Folder structure

```
user_research/
├── inbox_raw/          ← you are here (unprocessed)
├── claims_pending/     ← extracted claims awaiting review
├── evidence_verified/  ← clean_river material
├── disputed/           ← conflicting evidence
├── symbolic_metaphor/  ← symbolic_river material
├── restricted/         ← stone_river material
└── rejected/           ← false, unusable, or too contaminated
```
