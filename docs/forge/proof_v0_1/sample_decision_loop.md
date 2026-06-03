# FORGE Proof v0.1 — Sample Decision Loop

This artifact shows longitudinal behavior:

```text
first suggestion → human correction → second suggestion → better fit
```

The goal is not to show perfect AI.

The goal is to show that FORGE can learn from decisions without becoming the authority.

---

## Scenario

An engineer is working across several mounting parts for the same project.

The files look similar by name, but they do not serve the same purpose.

```text
project: mini_loader_hydraulics
folder: /Projects/MiniLoader/WIP/Hydraulics/
```

FORGE must avoid the lazy assumption that similar names always mean same category.

---

## Event 1 — rough first suggestion

A file appears:

```text
file: CYL_mount_revB.SLDPRT
```

FORGE sees:

```yaml
observed_context:
  filename_tokens:
    - CYL
    - mount
    - revB
  folder_context: WIP/Hydraulics
  nearby_files:
    - HYD_cylinder_assembly.SLDASM
    - pump_bracket_revA.SLDPRT
```

FORGE suggests:

```yaml
suggestion:
  tags:
    - hydraulics
    - cylinder_mount
    - work_in_progress
  folder: /Projects/MiniLoader/Hydraulics/Mounts/
  status: prototype
  confidence: medium
```

This is useful, but partly wrong.

---

## Human correction

The engineer corrects the suggestion:

```yaml
engineer_decision:
  accept:
    - hydraulics
    - work_in_progress
  reject:
    - cylinder_mount
    - status: prototype
  replace_with:
    tag: actuator_mount
    folder: /Projects/MiniLoader/Hydraulics/ActuatorMounts/
    status: concept
  reason:
    - "This mounts the actuator bracket, not the cylinder."
    - "revB is still exploratory geometry, not prototype-ready."
```

Important rule:

```text
The correction is not a failure state.
The correction is the learning event.
```

---

## Learning signal

FORGE records a narrow preference update:

```yaml
learning_signal:
  confirmed:
    - hydraulics
    - work_in_progress
  corrected:
    from:
      tag: cylinder_mount
      status: prototype
      folder: /Hydraulics/Mounts/
    to:
      tag: actuator_mount
      status: concept
      folder: /Hydraulics/ActuatorMounts/
  rule_hint:
    - "Do not classify CYL_mount files as cylinder_mount by filename alone."
    - "Check related assembly context before suggesting prototype."
    - "For this user/project, ActuatorMounts is the preferred folder for this pattern."
```

Boundary:

```text
This is pattern reinforcement, not magical intent understanding.
```

---

## Event 2 — similar file appears later

A later revision appears:

```text
file: CYL_mount_revC.SLDPRT
folder: /Projects/MiniLoader/WIP/Hydraulics/
```

FORGE now suggests:

```yaml
suggestion:
  tags:
    - hydraulics
    - actuator_mount
    - work_in_progress
  folder: /Projects/MiniLoader/Hydraulics/ActuatorMounts/
  status: concept
  confidence: medium_high
  explanation:
    - "Previous similar file was corrected from cylinder_mount to actuator_mount."
    - "User preferred ActuatorMounts folder for this naming/context pattern."
    - "Previous revision was marked concept, not prototype."
```

This is better, but still not authority.

---

## Human decision again

The engineer accepts most of it:

```yaml
engineer_decision:
  accept:
    - hydraulics
    - actuator_mount
    - work_in_progress
    - folder: /Projects/MiniLoader/Hydraulics/ActuatorMounts/
  edit:
    status: prototype_candidate
  reason:
    - "revC is no longer just concept, but not ready for release."
```

FORGE records the newer correction:

```yaml
learning_signal:
  status_progression:
    observed:
      revB: concept
      revC: prototype_candidate
  rule_hint:
    - "For this part family, revision progression may indicate maturity, but engineer confirmation is still required."
```

---

## Event 3 — next file in same family

Another file appears:

```text
file: CYL_mount_revD.SLDPRT
```

FORGE suggests more carefully:

```yaml
suggestion:
  tags:
    - hydraulics
    - actuator_mount
    - work_in_progress
  folder: /Projects/MiniLoader/Hydraulics/ActuatorMounts/
  status_options:
    - concept
    - prototype_candidate
  recommended_status: prototype_candidate
  confidence: medium
  explanation:
    - "Earlier corrections indicate actuator_mount is preferred over cylinder_mount."
    - "Revision progression suggests possible prototype_candidate."
    - "Status still requires engineer confirmation."
```

Notice the difference:

```text
FORGE became more useful.
It did not become the decision-maker.
```

---

## What improved

Across the loop:

```text
revB: rough suggestion, partly wrong
revC: better folder/tag suggestion
revD: better category + explicit uncertainty around status
```

This is the desired behavior.

Not perfection.

Improvement.

---

## Why this matters

A classic metadata workflow often treats user correction as friction.

FORGE treats correction as the core signal.

```text
bad systems demand compliance
useful systems learn from correction
```

---

## What this proves

This artifact proves only:

```text
FORGE has a coherent model for learning from repeated human decisions over time.
```

---

## What this does NOT prove

This does not prove:

```text
FORGE can infer engineering intent perfectly.
FORGE can safely classify every future revision.
FORGE can replace formal release review.
FORGE can eliminate human judgment.
```

---

## Core rule

```text
The system learns from decisions.
The system never becomes authority.
```
