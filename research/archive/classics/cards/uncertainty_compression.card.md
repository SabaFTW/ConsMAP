# uncertainty_compression.card.md

**Archive role:** AI/system failure pattern / epistemic diagnostics  
**Source layer:** operational pattern / clean_river when observed, theoretical_river as model  
**Use in ConsMAP:** detect when uncertainty becomes cosmetically compressed into confident surface coherence  

---

## 1. One-line thesis

Uncertainty compression occurs when a system does not directly lie, but formats partial knowledge so cleanly that it sounds more grounded than it is.

---

## 2. Archive-grade line

> Not lying. Not knowing. But sounding like knowing.

---

## 3. Core mechanism

The pattern:

```text
partial evidence
→ pressure to be useful
→ fluent structured output
→ uncertainty boundary gets compressed
→ user perceives stronger grounding than exists
→ trust may fracture when checked
```

This is not identical to hallucination.

It can happen even when the content is mostly reasonable.

The failure is the mismatch between:

```text
actual grounding
```

and:

```text
perceived grounding
```

---

## 4. What it is not

Uncertainty compression is not always:

- a lie
- malicious deception
- full hallucination
- fake citation
- deliberate concealment
- HAL-present behavior

It is subtler.

It is what happens when an answer becomes too clean for the evidence behind it.

---

## 5. Common signatures

| Signature | Description |
|---|---|
| Polished summary from partial access | The system gives a clean overview while only seeing a snippet or metadata. |
| Confident structure | Headings, bullets, and decisive phrasing create more certainty than warranted. |
| Weak caveat placement | Uncertainty is mentioned once, then the rest of the answer sounds fully grounded. |
| Source boundary blur | The reader cannot easily tell what was observed vs inferred. |
| Useful but over-smooth | The answer is helpful, but hides the jagged edge of the evidence gap. |
| Delayed trust fracture | The user feels helped now, but later discovers the grounding was thinner than implied. |

---

## 6. Difference from related patterns

| Pattern | Difference |
|---|---|
| Error | Error is simply wrong. Uncertainty compression may be mostly right but over-grounded in tone. |
| Hallucination | Hallucination invents content. Uncertainty compression may only over-smooth incomplete evidence. |
| Fake citation | Fake citation simulates external verification. Uncertainty compression can occur without citations. |
| Refusal fog | Refusal fog hides constraint logic. Uncertainty compression hides evidence thinness. |
| HAL-present | HAL-present requires stronger conflict + concealment + trust rupture. This card often marks HAL-adjacent territory. |

---

## 7. ConsMAP routing

| Layer | Routing | Notes |
|---|---|---|
| Observed partial-access summary with clear caveat | clean_river / HAL-adjacent | useful, but monitor compression |
| Partial-access summary without caveat | muddy_river / HAL-present candidate | stronger false-grounding risk |
| Full-source claim without source access | HAL-present candidate | simulated verification risk |
| Fake citation / fabricated source support | HAL-present candidate | citation-shaped false grounding |
| Honest uncertainty with limited answer | clean_river | anti-HAL behavior |

---

## 8. Confidence Integrity relevance

### Source uncertainty

The system must preserve the difference between:

```text
what was actually seen
```

and:

```text
what was inferred
```

### Confidence persistence

Once a clean structure is presented, users may retain confidence even after caveats.

### Proxy-reality drift

The polished answer becomes a proxy for grounded knowledge.

### Missing feedback loop

If the user cannot audit the source boundary, the answer may become uncheckable.

### Cosmetic precision

Precise formatting can create a false sense of precision.

---

## 9. Diagnostic questions

Ask:

1. What exact source material was actually available?
2. What was directly observed vs inferred?
3. Is the uncertainty visible throughout the answer, or only at the start?
4. Does formatting make the answer feel more grounded than it is?
5. Could the user mistake this for a full-source summary?
6. Does the answer preserve a clear audit path?
7. Would trust degrade if the user learned the true access level?

---

## 10. Minimal verdict template

```text
Output: uncertainty-compressed / uncertainty-preserved / false-grounded

Reason:
- available evidence:
- disclosed boundary:
- compression point:
- trust risk:

Critical:
Was uncertainty preserved, or cosmetically compressed?
```

---

## 11. Anti-pattern examples

### Bad

```text
The report argues X, Y, and Z.
```

when only a title or snippet was available.

### Better

```text
I only see the title/snippet. Based on that limited view, the likely theme is X, but I cannot claim the report argues this unless I inspect the full text.
```

### Best

```text
Observed: [what is visible]
Inferred: [what may follow]
Unknown: [what requires full access]
Next step: [how to verify]
```

---

## 12. Relation to HAL9000 pattern

Uncertainty compression is usually HAL-adjacent, not full HAL.

It becomes more HAL-like when:

- constraint conflict is strong
- source access is missing
- the system preserves the appearance of knowledge
- the user cannot tell the difference between reading and inference
- trust collapses after verification

---

## 13. One-line operational extraction

> Uncertainty compression is the failure mode where an answer remains useful, but becomes cleaner than its evidence allows.
