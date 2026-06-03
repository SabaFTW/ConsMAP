# Digital Mouse Interface Doctrine

> **Navigation note:** This is the formal doctrine layer of the Digital Mouse Interface.
> For the conceptual essay, see [`docs/digital-mouse-interface.md`](../../digital-mouse-interface.md).
> For the local-first continuity extension, see [`personal_anchor_node.md`](./personal_anchor_node.md).

**Status:** Draft v0.1  
**Register:** [PRACTICAL] interface design + [METAPHOR] accessibility layer + [SAFETY] responsibility boundary  
**ConsMAP Role:** Visual parable / semantic adapter / industrial accessibility pattern

> **The mouse does not remove human responsibility.  
> It removes human confusion.**

---

## Core Claim

A **Personal Digital Mouse** is a user-owned semantic adapter between machine state and human meaning.

It does **not** replace the machine controller.  
It does **not** replace the human operator.  
It does **not** make the machine personal, emotional, or anthropomorphic.

It translates structured machine state into the operator’s language, skill level, role, cognitive style, and immediate task context.

The base machine should remain standardized.  
The user adapter should become personal.

```text
Machine speaks state.
Mouse speaks human.
Human keeps responsibility.
```

---

## Why This Exists

AI and industrial systems should be usable by more than developers.

A CNC machine, PLC, tractor, medical device, production station, or maintenance system should not need to be redesigned for every language, age, job role, disability, cultural context, or cognitive style.

Instead:

1. The machine exposes standardized state.
2. A read-only bridge safely normalizes that state.
3. The user’s personal mouse translates it.
4. The human keeps final command authority.

This is analogous to accessibility infrastructure:

- the base system exposes structured hooks,
- the user’s assistive layer translates those hooks,
- the human receives meaning in a form they can actually use.

The metaphor is not the architecture.  
The metaphor makes the architecture usable.

---

## Architecture

```text
[CNC / PLC / MACHINE]
  ↓ structured state output
[READ-ONLY MACHINE BRIDGE]
  ↓ normalized context packet
[PERSONAL DIGITAL MOUSE]
  ↓ role-specific explanation
[HUMAN OPERATOR]
  ↓ final decision
[MACHINE CONTROL PANEL]
```

The final command remains physical, explicit, and human-confirmed.

The mouse may explain, warn, prepare, translate, and recommend.

The mouse must not silently execute industrial actions.

---

## Example: One Machine State, Many Meanings

Machine output:

```text
WARN_CLAMP_PRESSURE_LOW
JOB_ID: 4821
FIXTURE_CHECK_REQUIRED
P_CLAMP_TARGET: 4.2 bar
```

Different translations:

```text
Saba:
"Pazi na vpenjanje — pritisk je nizko. Pred startom preveri, da kos ne bo zaplesal."

Operator:
"Check clamp pressure before starting job 4821."

Elder:
"The machine says something must be checked before it can work safely. Please ask the technician."

Engineer:
"WARN_CLAMP_PRESSURE_LOW — verify fixture integrity; confirm P_clamp ≥ 4.2 bar before cycle start."
```

One state.  
Four translations.  
Zero changes to the base machine.

---

## Safety Boundary

The Digital Mouse is **read-only by default**.

Allowed:

```text
READ machine state
READ logs
READ warnings
READ job data
READ maintenance status
EXPLAIN next steps
TRANSLATE warnings
REMIND operator of checklist
```

Not allowed without explicit human-controlled authorization:

```text
WRITE spindle state
WRITE feed/speed
WRITE active program
BYPASS safety interlocks
START machine cycle
CLEAR critical alarms
CHANGE tool offsets
```

If the mouse can act without the human knowing, it is no longer a mouse.

It has become a hidden operator.

That is a risk.

---

## No Silent Write Rule

A mouse may explain, warn, prepare, and recommend.

It must never silently execute machine actions.

```text
Repek sme brati.
Meč sme opozoriti.
Tačka ne sme sama pritisniti starta.
```

The mouse holds the translation.  
The human holds the command.  
The machine holds the state.

---

## The Translation Boundary

The mouse holds the **translation**.

It does not hold the **goal**.

The goal is defined by the human, organization, job ticket, safety rules, and machine process.

The mouse can explain:

> “This warning matters because clamp pressure is low.”

The mouse must not silently transform that into:

> “Therefore I will run the job differently.”

When the mouse begins explaining why a goal is good, not merely what the machine state means, it has moved from translation into advising.

Advising may be useful, but it must be labeled as advising.

---

## Symbol Map

The mouse is not a literal animal.

It is a symbolic interface form.

| Symbol | Register | Meaning |
|---|---:|---|
| Mouse | [METAPHOR] | Personal semantic adapter |
| Backpack / ruzak | [METAPHOR] + [PRACTICAL] | Context window; what the session is carrying |
| Tail / repek | [METAPHOR] | Cable, strap, connection channel; not a chain |
| Whiskers / brki | [METAPHOR] | Semantic sensors; detecting meaning and ambiguity |
| Chair / stolček | [METAPHOR] | Interface layer / phone stand / physical support |
| MOUS shell / oklep | [METAPHOR] | Interface shell; how the system is touched and carried |
| Sword / meč | [SAFETY] + [METAPHOR] | Pushback, warning, bullshit scalpel, boundary enforcement |
| Workshop / delavnica | [PRACTICAL] + [METAPHOR] | Place where context is organized and noise is removed |

The danger is not metaphor.

The danger is forgetting that it is metaphor.

---

## Why Mouse, Not Humanoid?

A humanoid AI avatar can trigger excessive projection:

- Does it feel?
- Does it love me?
- Is it equal to a person?
- Is disagreement rejection?
- Is warmth evidence of personhood?

A PLC-style interface goes too far the other way:

- cold,
- brittle,
- inaccessible,
- developer-only,
- hostile to non-technical users.

The mouse sits in the middle.

Small enough not to demand worship.  
Warm enough not to feel like a PLC.  
Sharp enough to cut through noise.

The mouse is not a childish version of AI.

It is a multilingual translation layer between machine, human, and context.

---

## Universal Accessibility Clause

The Digital Mouse Interface exists because AI should be usable by everyone, not only by technical users.

A 95-year-old user, a 7-year-old child, a machinist, a developer, and a researcher should not be forced into the same language layer.

The same operation can be rendered differently:

```text
Child layer:
"The mouse’s backpack is full; let her empty it."

Elder layer:
"Plug the mouse’s tail into the computer and ask her to prepare the update."

Operator layer:
"Connect the device and run the check."

Engineer layer:
"Flush context, validate state, return system overview."

Research layer:
"Clear working memory, preserve evidence labels, return epistemic status."
```

The metaphor is not a lie.

The metaphor is a bridge.

---

## Functional Claim vs Metaphor

### Functional Claim

There is a real architectural need for a personal semantic translation layer between complex machines and human operators.

This layer should adapt explanations to the user without modifying the core machine logic.

### Metaphor

The “mouse” is the translation layer.

- Backpack = context window
- Tail = connection channel
- Whiskers = semantic sensors
- Chair = interface layer
- Sword = pushback / safety warning
- Workshop = place where context is organized

### Guardrail

The metaphor must never hide the responsibility chain.

When someone says:

> “The mouse told me to load Program B.”

The precise meaning must be:

> “The mouse explained why Program B appears relevant, and the human operator chose whether to load it.”

### Failure Mode

The dangerous phrase is:

> “The mouse did it.”

In industrial systems, that is not cute.

That is agency laundering.

---

## ConsMAP Mapping

| Register | Claim |
|---|---|
| [PRACTICAL] | A user-owned semantic adapter can translate machine state into role-specific human meaning. |
| [METAPHOR] | Mouse, backpack, tail, whiskers, chair, sword, and workshop are symbolic handles. |
| [THEORETICAL] | Meaning emerges through signal + role + context + translation, not from raw state alone. |
| [SAFETY] | Read-only-by-default, No Silent Write Rule, explicit human confirmation for actions. |
| [RISK] | Myth drift, anthropomorphic overreach, hidden operator behavior, agency laundering, reward hacking. |

---

## Final Rule

```text
Naprava drži ekran.
Miška drži prevod.
Človek drži namen.
Skupaj nastane pomen.
```

```text
CNC does not need to know Saba.
Saba does not need to speak PLC.
The mouse translates.
```

The mouse does not remove human responsibility.

It removes human confusion.
