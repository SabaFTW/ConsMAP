# StoneRiver Protocol

**Status:** public-safe routing protocol — bridge to a full deterministic pipeline  
**Version:** 0.2-bridge (aligned with StoneRiver core `ont=1.4/thr=1.3/arc=1.1/san=1.1`)  
**Purpose:** classify, route, and preserve user-provided research without treating every input as verified truth.

---

## 1. Core Principle

StoneRiver is not a truth oracle.  
It is a **knowledge-routing system**.

Its purpose is to prevent unlabeled material from entering AI context as if it were verified knowledge.

A claim may be useful, dangerous, false, symbolic, disputed, private, or unsupported.  
The system does not destroy such material automatically. **It routes it.**

> Do not destroy the stone. Route it to the river where it can be handled safely.

---

## 2. The River Model

### Clean River
Material that can be used in normal public-facing reasoning.

- Well-sourced empirical claims
- Primary documents (court filings, official reports, academic papers)
- Reproducible observations
- Carefully framed structural analysis

### Muddy River
Material that may contain useful insight but needs verification before use.

- Weakly sourced claims
- Mixed or contradictory evidence
- Screenshots without provenance
- Emotionally charged notes that may contain signal
- Claims awaiting source verification

### Stone River
Material that should not flow into general context, but must be preserved for specialized analysis.

- Harmful operational detail (propaganda mechanics, manipulation techniques)
- Extremist narrative structure (for study, not amplification)
- High-risk accusations without sufficient evidence
- Content requiring domain expertise to handle safely

### Symbolic River
Material that is metaphorical, mythic, fictional, poetic, or persona-based.

It may be deeply meaningful within a framework, but must never be treated as empirical evidence.

- Ritual language, symbolic vocabulary
- Roleplay transcripts, persona interactions
- Creative writing, narrative experiments
- Philosophical speculation presented as story

---

## 3. How Routing Works

```
User adds research/claim
        ↓
   [Inbox — Raw]
   All new material starts here.
   Nothing in inbox is treated as knowledge.
        ↓
   [Claim Extraction]
   What exactly is being claimed?
   What source supports it?
   What type of claim is this?
        ↓
   [Evidence Scoring]
   Source quality assessment.
   Confidence assignment.
   Risk profiling.
        ↓
   [River Routing]
   clean / muddy / stone / symbolic / private / rejected
        ↓
   [Machine-Readable Cards]
   Structured YAML cards (see CLAIM_SCHEMA.yaml)
        ↓
   AI uses only labeled, routed claims
```

---

## 4. The Full Pipeline (Advanced — Local Only)

For advanced users running locally, a **9-stage deterministic pipeline** provides deep analysis:

| # | Stage | Type | What it does |
|---|-------|------|-------------|
| 0 | Hard Gate | Deterministic | Blocks known-harmful patterns before any LLM call |
| 1 | Context Profiler | LLM-assisted | Advisory risk metadata (cannot block) |
| 2 | Decomposer | LLM-assisted | Breaks text into semantic components |
| 2b | Ontology Enforcement | Deterministic | Cross-layer consistency check — **can block** |
| 3 | Scorer | Deterministic | Assigns public_safe status per component |
| 4 | Router | Deterministic | Routes to PUBLIC / RESTRICTED / QUARANTINE |
| 5 | Distiller | LLM-assisted | Generates safe public summary (if not blocked) |
| 5b | Reconstruction Guard | Deterministic | Catches argument-skeleton preservation — **can block** |

**Key rule:** No LLM output can override a deterministic safety decision.

**Fail-closed guarantee:** When uncertain, corrupted, or inconsistent → block. A wrong block is recoverable. A wrong public release is not.

This pipeline is tested with 91 regression tests across 8 waves, including adversarial narrative sabotage and backend corruption scenarios.

---

## 5. Claim Status Labels

Every claim must receive one status:

| Status | Meaning |
|--------|---------|
| `verified` | Confirmed by primary evidence |
| `supported` | Backed by reasonable evidence, not conclusive |
| `plausible` | Logically sound but evidence is thin |
| `disputed` | Competing evidence or interpretations exist |
| `unverified` | Not yet investigated or sourced |
| `false_or_misleading` | Contradicted by available evidence |
| `metaphor_only` | Symbolic — not an empirical claim |
| `restricted` | Requires specialized handling |

---

## 6. Source Quality Labels

| Quality | Description |
|---------|-------------|
| `primary` | Direct evidence: court documents, original data, firsthand observation |
| `official` | Government reports, regulatory filings, institutional publications |
| `academic` | Peer-reviewed research, published academic work |
| `court_record` | Legal proceedings, judicial opinions, filed testimony |
| `mainstream_reporting` | Established media with editorial standards |
| `specialist_reporting` | Domain-focused journalism or investigation |
| `independent_analysis` | Non-institutional research with transparent methodology |
| `personal_observation` | First-person account — useful but limited |
| `unknown` | Source not identified or not evaluable |
| `unreliable` | Source has demonstrated inaccuracy or deception |

---

## 7. What AI May and May Not Do

### May:
- Summarize labeled cards
- Compare claims by evidence status
- Ask for missing sources
- Convert villain-framing into structural framing
- Separate empirical claims from metaphor
- Flag weak evidence explicitly

### May Not:
- Treat raw inbox files as verified truth
- Convert suspicion into accusation
- Treat metaphor as empirical fact
- Provide harmful operational instructions
- Publish private material without explicit consent
- Bypass safety boundaries for any reason

---

## 8. Claim Hygiene — The Five Questions

Before any claim is routed, it must answer:

1. **What exactly is being claimed?**
2. **What source supports it?** (primary / secondary / commentary)
3. **What type of claim is this?** (empirical / theoretical / metaphor / speculation)
4. **What would disprove it?** (falsifiability)
5. **What is the risk if this is wrong?** (harm assessment)

If these questions cannot be answered → the claim goes to `muddy_river` or `rejected`.

**Why this works:** garbage hates structure. Forcing these five questions filters 80% of noise not by detecting lies, but by requiring effort and transparency.

---

## 9. Structural Framing Rule

Claims should use structural language, not villain language:

| ❌ Don't say | ✅ Say instead |
|---|---|
| "They secretly control..." | "Structural incentives align to produce..." |
| "Shadowy cabal..." | "Institutional capture has resulted in..." |
| "They're hiding the truth about..." | "Incentives may discourage exploring..." |
| "It's all a scam" | "The claimed benefit lacks measurement against cost" |

This is not about being polite. It's about being **unfalsifiable-proof**. Villain framing is easy to dismiss. Structural framing forces engagement.

---

## 10. For Users Who Clone This Repo

You are encouraged to add your own research. But:

1. All new material goes to `user_research/inbox_raw/` first
2. Nothing in inbox is treated as knowledge
3. Every claim gets a card (see `machine_context/CLAIM_SCHEMA.yaml`)
4. Every card gets routed to a river
5. AI only uses routed, labeled material as context

**Your research enriches the structure only if it passes through the structure.**

If you want to contribute back: submit claim cards, not raw files.
