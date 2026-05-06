# FORGE Proof v0.1 — Regulated Team Edge Case

This artifact shows a boundary condition.

FORGE is not anti-compliance.
FORGE is not “freedom solves everything.”

In regulated environments, freedom changes shape:

```text
less free-form chaos
more visible scaffolding
same human authority
stronger audit trail
```

---

## Scenario

A small engineering team is developing a component used in a regulated system.

Example domains:

```text
medical device / aviation / safety-critical machinery
```

This is not a legal compliance guide.

The point is workflow pressure:

```text
some decisions must be traceable while work is still happening
```

---

## Why normal FORGE mode is not enough

In ordinary R&D, a team can often work freely and clean up structure near release.

In regulated work, that is not always acceptable.

Some artifacts may need to exist during development:

```text
- design rationale
- requirement links
- risk notes
- review history
- change reason
- test evidence
- approval trail
```

A system cannot honestly say:

```text
save however you want; we will fix compliance later
```

That would be bullshit.

---

## Classic failure mode

A rigid compliance system often behaves like this:

```text
1. Engineer modifies a design.
2. System demands full compliance fields immediately.
3. Engineer does not yet know every answer.
4. Engineer enters placeholder or vague text.
5. Database looks compliant.
6. Actual reasoning remains weak.
```

The form is complete.
The truth is not.

---

## FORGE Compliance Mode

In this context, FORGE should switch from loose adaptive mode to compliance-aware scaffolding.

Not a prison.
A stricter workbench.

```yaml
compliance_mode:
 save_allowed: true
 required_minimum_context:
 - change_reason
 - affected_requirement_or_unknown
 - risk_relevance_or_none
 - reviewer_needed_or_not
 optional_context:
 - related_test
 - design_rationale
 - supplier_note
 - open_question
 hard_blocks:
 - release_without_required_traceability
 - approval_without_review_record
```

Important distinction:

```text
FORGE should not block exploration.
FORGE may block release.
```

---

## Example change event

An engineer modifies a mounting feature.

```text
file: actuator_mount_revD.SLDPRT
change: increased fillet radius around bolt boss
context: previous prototype showed stress concentration
```

FORGE asks for minimum trace context:

```yaml
required_prompt:
 change_reason: "Why was this geometry changed?"
 affected_requirement: "Which requirement/test/risk item may be affected?"
 risk_relevance: "Does this affect safety, fit, function, or manufacturability?"
 review_needed: "Who needs to review this before release?"
```

Engineer response:

```yaml
engineer_response:
 change_reason: "Stress concentration near bolt boss in prototype load case."
 affected_requirement: "REQ-MOUNT-LOAD-004"
 risk_relevance: "Potential structural safety relevance; requires review."
 review_needed: "mechanical lead before release candidate."
```

---

## What FORGE suggests

FORGE can now suggest a structured trace packet:

```yaml
trace_packet_suggestion:
 status: work_in_progress
 tags:
 - actuator_mount
 - structural_review
 - requirement_linked
 related_items:
 requirement: REQ-MOUNT-LOAD-004
 prior_file: actuator_mount_revC.SLDPRT
 review_role: mechanical_lead
 release_gate:
 blocked_until:
 - review_record_exists
 - risk_note_reviewed
```

This is not FORGE deciding compliance.

This is FORGE preserving the decision surface.

---

## Human authority remains

The engineer or reviewer can correct the trace packet.

```yaml
reviewer_decision:
 accept:
 - requirement: REQ-MOUNT-LOAD-004
 - tag: actuator_mount
 edit:
 risk_relevance: "manufacturability + structural review"
 reject:
 - tag: structural_review
 reason:
 - "Stress issue is below threshold after updated load case, but manufacturability still needs review."
```

FORGE records the correction.

It does not become the compliance authority.

---

## What changes in regulated mode

| Area | Normal FORGE mode | Compliance Mode |
| ----------- | --------------------------- | --------------------------------------------------- |
| Save | low-friction | still allowed, but minimum context may be requested |
| Metadata | suggested after observation | some trace fields required earlier |
| Exploration | broad freedom | broad freedom with visible risk context |
| Release | user-driven | gated by required trace/review artifacts |
| AI role | suggestion assistant | suggestion + trace scaffold assistant |
| Human role | decision gate | decision gate + accountable reviewer |

---

## What this proves

This artifact proves only:

```text
FORGE can be described with an honest regulated-mode boundary:
more scaffolding, more traceability, same human authority.
```

---

## What this does NOT prove

This does not prove:

```text
FORGE is certified for regulated production use.
FORGE replaces formal quality systems.
FORGE satisfies FDA, EASA, ISO, or other regulatory requirements by itself.
FORGE can determine legal compliance.
FORGE should be used in regulated production without expert validation.
```

---

## Design principle

```text
Freedom without traceability becomes risk.
Traceability without agency becomes bureaucracy.
```

FORGE should live between those failures.

---

## Core rule

```text
In regulated work, FORGE does not remove responsibility.
It makes responsibility harder to lose.
```
