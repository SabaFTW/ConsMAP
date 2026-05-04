# Multi-Model Operator Pipeline (ConsMAP)

**Status:** operational workflow  
**Purpose:** Define a repeatable, multi-model process that converts raw prompts into structured, verified, and archived knowledge.

---

## Core Idea

No single model is trusted as a final authority.

Each model is used for what it does best, and its output is treated as material — not truth.

```text
models are sensors
not judges
```

---

## Pipeline Overview

```text
0_INTENT_LOCK
↓
1_DISCOVERY (raw framing)
↓
2_STRUCTURE (coherence)
↓
3_FRACTURE (contradictions)
↓
4_SYNTHESIS (usable output)
↓
5_CLAIM_HYGIENE (ConsMAP)
↓
6_ARCHIVE (river routing)
```

---

## Phase 0 — Intent Lock

Define in one sentence:

```text
I want [insight / structure / contradictions / executable output] about [topic].
```

If this cannot be stated clearly, do not enter the pipeline.

---

## Phase 1 — Discovery (Raw Framing)

Goal:

- expose underlying mechanisms
- identify power structures, incentives, and hidden assumptions

Output:

- rough map
- unfiltered hypotheses
- initial contradictions

Important:

This phase produces **noise + signal**.
Do not treat it as truth.

---

## Phase 2 — Structure (Coherence)

Goal:

- organize the raw output into a stable framework
- separate claims, assumptions, and evidence

Output:

- structured model
- explicit assumptions
- clear categories

---

## Phase 3 — Fracture (Contradictions)

Goal:

- break the structure
- find internal inconsistencies
- identify weak points and collapse scenarios

Output:

- ranked contradictions
- failure points
- missing data

---

## Phase 4 — Synthesis (Usable Output)

Goal:

- merge surviving elements
- remove duplication
- produce a usable framework or checklist

Output:

- final structured answer
- actionable steps (if relevant)

---

## Phase 5 — Claim Hygiene (ConsMAP)

Every meaningful statement becomes a claim card.

Run:

```bash
python tools/analyze_claim.py --text "[claim]"
```

Then manually refine:

- source classification
- falsification condition
- risk level

---

## Phase 6 — Archive

Route claims into the appropriate river:

- clean_river → strong evidence
- muddy_river → partial or uncertain
- stone_river → structural pattern
- symbolic_river → metaphor only
- private_only → sensitive
- rejected_or_unusable → fails hygiene

---

## Failure Modes

### Single-model dependency

You trust one model → blind spots become invisible.

### No claim hygiene

Fluent output becomes assumed truth.

### No intervention

Session degrades silently.

### Over-automation

You automate noise instead of filtering it.

---

## Minimal Terminal Loop

```bash
# 1. capture raw output
# 2. paste into next model for structure
# 3. paste into third model for contradictions
# 4. synthesize final output
# 5. run claim hygiene
```

---

## Extension: Automation Layer (optional)

This workflow can later be implemented with tools like n8n or custom scripts:

```text
input → model A → model B → model C → model D → claim parser → archive
```

Do not automate before the manual pipeline is stable.

---

## One-Line Summary

> The pipeline does not make models smarter; it makes their errors visible before they become belief.
