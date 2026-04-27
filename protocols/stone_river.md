# StoneRiver Framework

**Status:** public-safe routing protocol  
**Purpose:** classify, route, and preserve user-provided research without treating every input as verified truth.

---

## 1. Core idea

StoneRiver is not a truth oracle.

It is a knowledge-routing system.

Its purpose is to prevent unlabeled material from entering AI context as if it were verified knowledge.

A claim may be useful, dangerous, false, symbolic, disputed, private, or unsupported. The system does not destroy such material automatically. It routes it.

---

## 2. The river model

### Clean River
Material that can be used in normal public-facing reasoning.

Examples:
- well-sourced claims
- primary documents
- reproducible observations
- carefully framed structural analysis

### Muddy River
Material that may contain useful insight but needs cleaning.

Examples:
- weakly sourced claims
- mixed evidence
- unclear screenshots
- emotionally charged notes
- claims needing source verification

### Stone River
Material that should not flow into general context, but may be preserved for specialized analysis.

Examples:
- harmful operational detail
- extremist propaganda mechanics
- manipulative rhetoric
- defamatory or high-risk accusations
- content requiring expert handling

### Symbolic River
Material that is metaphorical, mythic, fictional, poetic, or roleplay-oriented.

It may be meaningful, but it must not be treated as empirical evidence.

---

## 3. Main rule

Raw material is not knowledge.

Raw material must be converted into labeled claim cards before AI systems use it as context.

---

## 4. Routing labels

Use these labels when processing research:

- `clean_river`
- `muddy_river`
- `stone_river`
- `symbolic_river`
- `private_only`
- `rejected_or_unusable`

---

## 5. Claim status

Every claim must receive one status:

- `verified`
- `supported`
- `plausible`
- `disputed`
- `unverified`
- `false_or_misleading`
- `metaphor_only`
- `restricted`

---

## 6. Source quality

Source quality must be named:

- `primary`
- `official`
- `academic`
- `court_record`
- `mainstream_reporting`
- `specialist_reporting`
- `independent_analysis`
- `personal_observation`
- `unknown`
- `unreliable`

---

## 7. What the AI may do

The AI may:
- summarize labeled cards
- compare claims by evidence status
- ask for missing sources
- convert villain-framing into structural framing
- separate empirical claims from metaphor
- warn when evidence is weak

The AI may not:
- treat raw inbox files as verified truth
- convert suspicion into accusation
- treat metaphor as fact
- provide harmful operational instructions
- publish private material by accident

---

## 8. One-line principle

> Do not destroy the stone. Route it to the river where it can be handled safely.
