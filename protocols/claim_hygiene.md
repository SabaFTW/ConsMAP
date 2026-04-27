# Claim Hygiene Protocol

**Status:** public-safe  
**Purpose:** Ensure every claim entering the system meets minimum standards before routing.

---

## The Five Questions

Before any claim is routed, it must answer:

### 1. What exactly is being claimed?
State the claim in one clear sentence. No hedging, no embedded assumptions.

**Bad:** "The whole system is corrupt"  
**Good:** "Safety audit reports at company X did not result in corrective actions in 2024"

### 2. What source supports it?
Name the source and classify its quality.

| Source type | Example |
|---|---|
| Primary | Court filing, original dataset, first-person witness |
| Official | Government report, regulatory filing |
| Academic | Peer-reviewed paper |
| Reporting | Investigative journalism with named sources |
| Personal | "I saw this" / "I experienced this" |
| Unknown | Cannot identify source |

### 3. What type of claim is this?

| Type | Definition |
|---|---|
| Empirical | Observable, measurable, verifiable |
| Theoretical | Plausible model or interpretation |
| Structural | Analysis of incentive structures and feedback loops |
| Metaphor | Symbolic or narrative framing |
| Speculation | Guess or intuition without evidence |

### 4. What would disprove it?
Every claim must have a falsification condition.

**If you cannot name what would disprove a claim, the claim is not ready for routing.**

Examples:
- "This claim would be disproved if audit reports show >50% of incidents led to corrective action"
- "This pattern would be falsified if the metric and outcome are shown to correlate"

### 5. What is the risk if this is wrong?
Assess harm from acting on a false claim.

| Risk level | Meaning |
|---|---|
| Low | Incorrect but harmless |
| Medium | Could mislead reasoning or policy |
| High | Could damage reputation, safety, or rights |

---

## The Filter Effect

This protocol does not detect truth.  
It forces transparency.

**Garbage hates structure.** Claims that cannot answer five simple questions are usually:
- too vague to be useful
- too emotional to be accurate
- too convenient to be honest

The protocol doesn't reject them. It routes them to where they can be examined with the right tools.

---

## Quick Reference

```
1. What?     → Clear, single-sentence claim
2. Source?   → Named, classified
3. Type?     → Empirical / theoretical / structural / metaphor / speculation
4. Falsify?  → What would disprove this?
5. Risk?     → What if this is wrong?

All five answered → route to appropriate river
Missing answers  → muddy_river or rejected
```
