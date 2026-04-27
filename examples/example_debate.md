# Example Debate — StoneRiver + TTT in Action

This shows how ConsMAP processes a real-world claim through the full system.

---

## Scenario

A user submits the following claim:

> "Content moderation doesn't actually reduce harm — it just moves the harm to outsourced workers in low-wage countries."

---

## Step 1: Claim Hygiene (Five Questions)

| # | Question | Answer |
|---|----------|--------|
| 1 | What is claimed? | Content moderation displaces harm rather than eliminating it |
| 2 | Source? | TIME investigation (2023), The Verge reporting, academic studies on moderator PTSD |
| 3 | Type? | Structural analysis with empirical support |
| 4 | Falsification? | Show total harm (including moderator welfare) is measured and reduced, not just displaced |
| 5 | Risk if wrong? | Medium — could undermine legitimate moderation efforts |

---

## Step 2: StoneRiver Routing

```yaml
claim: "Content moderation displaces harm to outsourced workers"
river: clean_river
status: supported
confidence: high
source_quality: specialist_reporting
```

**Why clean_river?** The claim is supported by documented reporting from multiple credible sources. It is not a conspiracy theory — it is a structural observation with evidence.

---

## Step 3: TTT Pattern Match

```
Checking against TTT pattern library...

→ TTT-004: HARM_DISPLACEMENT_NOT_REMOVAL
  Signal strength: 85%
  Confidence: HIGH
  Source: documented

  GOAL:   Safe platform / content moderation
  PROXY:  Harmful content removed from platform
  EFFECT: Outsourced to low-wage workers viewing worst content repeatedly
  RISK:   Psychological harm not eliminated — externalized and made invisible

  SAFETY ↑ → HUMAN COST: RELOCATED
```

**Match confirmed.** This is a documented instance of hazard relocation.

---

## Step 4: Epistemic Labeling

```
[EMPIRICAL]    Content moderation outsourcing is documented by TIME,
               The Verge, and academic research on moderator PTSD.

[EMPIRICAL]    Platforms report "content removed" as safety metric
               but do not include moderator welfare in that metric.

[THEORETICAL]  The structural incentive is to optimize visible
               platform safety while externalizing invisible costs.

[PRACTICAL]    Any safety claim should include supply-chain harm
               in its measurement, not just end-user metrics.

[UNVERIFIED]   The claim that moderation produces NO net harm
               reduction is too strong — some benefit exists.
```

---

## Step 5: Output

### ConsMAP Assessment

**Claim:** Content moderation displaces harm to outsourced workers.  
**River:** Clean — the structural pattern is documented.  
**TTT Pattern:** TTT-004 (HARM_DISPLACEMENT_NOT_REMOVAL) — 85% signal.  
**Confidence:** High for the structural pattern. Medium for the total-harm claim.

**Key distinction:**  
The claim is supported as a structural observation.  
The stronger version ("doesn't reduce harm at all") is not supported — moderation does reduce some user-facing harm.  
The honest framing: **harm is partially reduced for users and partially relocated to workers.**

**What would change this assessment:**  
Published data showing moderator psychological outcomes are measured, tracked, and improving alongside platform safety metrics.

---

## What This Example Shows

1. **Claim hygiene** prevented the claim from being either inflated or dismissed
2. **StoneRiver** classified it as clean because evidence exists
3. **TTT** identified the structural pattern (hazard relocation)
4. **Epistemic labels** separated what is proven from what is theoretical
5. **Falsification** was stated — the assessment is updatable
6. **Structural framing** was used — no villain, no conspiracy, just incentives

This is what ConsMAP does: **it doesn't tell you what's true — it forces every claim to show its work.**
