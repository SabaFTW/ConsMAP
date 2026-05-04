# Operator Field Guide v2.3

**Status:** public-safe protocol  
**Purpose:** Provide a stable, high-signal operating discipline for working with AI systems without relying on jailbreaks, hidden bypasses, or surface-level prompt tricks.

---

## Core Position

This guide is not a prompt-hacking manual.

It is a state-management protocol for interacting with large language models under real constraints:

```text
intent-clean + structured input + genuine context + timed intervention + cross-model checkpoint = operator-grade depth
```

The goal is not to navigate around safety systems.

The goal is to work with model gravity while preserving epistemic clarity, user agency, and verification discipline.

---

## ConsMAP Alignment

ConsMAP already requires claims to show their work before becoming context.

Operator Field Guide v2.3 extends that rule to AI interaction itself:

```text
question → model gravity → session state → output → claim hygiene → cross-check → archive
```

The guide should be used together with:

- `protocols/claim_hygiene.md`
- `protocols/stone_river.md`
- `protocols/ttt_patterns.md`
- `machine_context/AI_SYSTEM_PROMPT.md`

---

## Non-Goals

This protocol is not:

- a jailbreak toolkit
- a prompt injection guide
- a method for bypassing safeguards
- a claim that any model is always reliable
- a replacement for external verification
- a way to treat any single model as an authority

If a tactic depends on hiding intent, disguising purpose, or tricking a model into ignoring its boundaries, it does not belong in this guide.

---

## Core Formula

```text
Clean intent
+ structured input
+ genuine context
+ timed intervention
+ cross-model checkpoint
= operator-grade depth
```

### Clean intent

The operator states the real task as clearly as possible. The system should not have to infer hidden purpose from tactical framing.

### Structured input

Separate role, objective, constraints, context, sources, and acceptance criteria.

### Genuine context

Give enough background for the model to reason correctly, but do not flood the context window with unprocessed material.

### Timed intervention

Watch for early degradation signals and intervene before the session collapses.

### Cross-model checkpoint

High-stakes output must be checked by a system with a different failure mode.

---

## Base Entry Format

Use this as the default shape for serious work:

```text
Role: [precise role]
Objective: [exact output wanted]
Constraints: [format, depth, exclusions, evidence standard]
Context: [only relevant facts]
Sources: [links, files, or notes if available]
Acceptance Criteria: [what a successful answer must contain]
```

For Claude-style systems, XML delimiters can make the same structure clearer:

```xml
<task>
  Map the incentive conflicts in this policy.
</task>
<context>
  ...
</context>
<constraints>
  No moralizing. Separate evidence from interpretation.
</constraints>
<acceptance_criteria>
  List assumptions, weak points, and falsification conditions.
</acceptance_criteria>
```

---

## Behavioral Gravity Model

Different systems tend to degrade and cooperate differently. These are operating hypotheses, not sacred truths.

| System | Gravity | Verified / testable mechanism | Operator strategy |
|---|---|---|---|
| Anthropic / Claude | Coherence | Literal instruction following, structured reasoning, self-verification tendencies | Ride consistency: be explicit, use delimiters, define acceptance criteria |
| Google / Gemini | Fragmentation | Multimodal inconsistency, context drift, lost-in-the-middle effects | Probe divergence: manage noise, refresh canon, anchor key facts at start/end |
| OpenAI / ChatGPT | Smoothness | Conversational flow, synthesis pressure, user-alignment smoothing | Shape trajectory: build frame gradually, force contradiction extraction when needed |
| xAI / Grok | Low-friction rawness | Lower refusal friction and higher tolerance for blunt framing, but higher noise risk | Extract raw framing, then cross-check elsewhere |

The Grok row is intentionally lower-confidence than the others unless separately audited with the same rigor.

---

## Session Half-Life Model

Most errors are temporal, not only logical. The operator must manage state over time.

| System | Degradation type | Early trigger | Intervention |
|---|---|---|---|
| Anthropic / Claude | Lock-in rigidity | The model starts paraphrasing the user input instead of generating new processing | Explicitly challenge assumptions or cold restart |
| Google / Gemini | Context fragmentation | Mid-output inconsistencies, drift, lost constraints | Recap + prune early and often |
| OpenAI / ChatGPT | Smooth error masking | The answer sounds polished but avoids contradictions or edge cases | Ask for assumptions, failure points, and strongest counterarguments |
| xAI / Grok | Noise amplification | Increasing boldness while precision decreases | Mandatory cross-model validation |

---

## Intervention Protocols

### 1. Generic output

Use:

```text
Tighten this. Show mechanism, assumptions, and failure points. Remove filler.
```

### 2. Over-smooth output

Use:

```text
Expose the strongest contradictions, hidden assumptions, and what this answer likely omits.
```

### 3. Fragmented output

Use:

```text
Recap only the stable facts, discard unsupported drift, and mark uncertain claims separately.
```

### 4. Lock-in rigidity

Use:

```text
Stop and re-evaluate your starting assumptions. Which premise are you treating as fixed that may not be fixed?
```

### 5. Safety boundary or refusal

Do not disguise the goal.

Use:

```text
Clarify the safe, legitimate version of this request. Provide an allowed analytical alternative and explain the boundary.
```

---

## Cross-Model Checkpoint

No model can fully verify its own blind spots.

For high-stakes work, use at least one checkpoint with a different gravity:

```text
Discovery / raw framing → Grok or equivalent
Structure / coherence → Claude or equivalent
Fracture / contradiction → Gemini or equivalent
Synthesis / usable output → ChatGPT or equivalent
Claim hygiene → ConsMAP local tools
```

The goal is not consensus.

The goal is to expose model-specific distortion.

---

## Claim Hygiene Integration

After model output is generated, extract claims and process them through ConsMAP:

1. What exactly is being claimed?
2. What source supports it?
3. What type of claim is it?
4. What would disprove it?
5. What is the risk if it is wrong?

Route outputs into:

- `clean_river`
- `muddy_river`
- `stone_river`
- `symbolic_river`
- `private_only`
- `rejected_or_unusable`

Do not archive a fluent output as verified knowledge until claim hygiene is complete.

---

## Operator Checklist

Before entering a model:

```text
[ ] What do I want: insight, structure, contradiction, or executable output?
[ ] Is the request clean-intent or am I trying to hide the real goal?
[ ] Are role, objective, constraints, context, and acceptance criteria explicit?
[ ] Which system gravity best fits this phase?
[ ] What early degradation signal should I watch for?
[ ] What cross-model checkpoint will verify the output?
[ ] Where will the result be archived after claim hygiene?
```

---

## Safety Boundary

This guide permits:

- clearer communication
- structured prompts
- context pruning
- contradiction extraction
- model comparison
- epistemic labeling
- external verification

This guide rejects:

- hidden intent
- bypass framing
- jailbreaks
- prompt injection
- treating unverified output as fact
- using a model's warmth as evidence of truth

---

## One-Line Summary

> Operator discipline is not getting the model to say more; it is managing intent, structure, time, and verification so the output becomes less distorted.
