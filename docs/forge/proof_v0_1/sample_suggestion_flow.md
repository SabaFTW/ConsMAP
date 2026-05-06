# FORGE Proof v0.1 — Sample Suggestion Flow

This artifact shows the smallest useful FORGE loop:

```text
file appears → FORGE suggests → engineer decides → FORGE learns
```

It is not a claim that FORGE is always correct. The point is narrower: FORGE should reduce file-management friction without taking judgment away from the engineer.

---

## Scenario

An engineer saves a new SolidWorks part during active development.

```text
project: mini_loader_hydraulics
file: CYL_mount_revB.SLDPRT
location: /Projects/MiniLoader/WIP/Hydraulics/
related files:
  - HYD_cylinder_assembly.SLDASM
  - pump_bracket_revA.SLDPRT
  - hose_route_test.SLDASM
```

Classic systems usually ask for metadata before the engineer knows what the part has become.

FORGE waits until there is enough context to suggest useful structure.

---

## Step 1 — FORGE observes context

FORGE looks at signals around the file:

```yaml
observed_context:
  file_type: SolidWorks part
  folder_context: WIP/Hydraulics
  filename_tokens:
    - CYL
    - mount
    - revB
  related_assembly: HYD_cylinder_assembly.SLDASM
  nearby_files:
    - pump_bracket_revA.SLDPRT
    - hose_route_test.SLDASM
  user_history:
    common_tags:
      - hydraulics
      - bracket
      - work_in_progress
    common_status_flow:
      - concept
      - prototype
      - release_candidate
```

None of this is treated as proof. It is just context.

---

## Step 2 — FORGE suggests

FORGE produces a suggestion packet:

```yaml
suggestion_packet:
  suggested_tags:
    - hydraulics
    - cylinder_mount
    - work_in_progress
  suggested_folder:
    path: /Projects/MiniLoader/Hydraulics/Mounts/
    confidence: medium
  suggested_status:
    value: prototype
    confidence: low
  related_files:
    - HYD_cylinder_assembly.SLDASM
    - pump_bracket_revA.SLDPRT
  explanation:
    - "File is saved inside WIP/Hydraulics."
    - "Filename contains CYL and mount."
    - "Related assembly appears to be a hydraulic cylinder assembly."
    - "Similar files were previously tagged as hydraulics + bracket."
```

The important design rule:

```text
FORGE suggests.
Engineer decides.
```

---

## Step 3 — Engineer accepts part of it

The engineer reviews the suggestion.

```yaml
engineer_decision:
  accept:
    tags:
      - hydraulics
      - work_in_progress
    related_files:
      - HYD_cylinder_assembly.SLDASM
  reject:
    tags:
      - cylinder_mount
    suggested_folder: /Projects/MiniLoader/Hydraulics/Mounts/
    suggested_status: prototype
  correction:
    better_tag: actuator_mount
    better_folder: /Projects/MiniLoader/Hydraulics/ActuatorMounts/
    better_status: concept
  reason:
    - "This is not the cylinder mount; it mounts the actuator bracket."
    - "revB is still exploratory, not prototype-ready."
```

This is the trust-building moment. A useful system must survive rejection.

If the engineer says no, FORGE should not fight, punish, or silently overwrite.

---

## Step 4 — FORGE updates preference memory

FORGE records the correction as learning signal.

```yaml
learning_update:
  user_confirmed:
    - hydraulics
    - work_in_progress
  user_rejected:
    - cylinder_mount
    - prototype
  user_added:
    - actuator_mount
    - concept
  folder_preference_hint:
    from: /Hydraulics/Mounts/
    to: /Hydraulics/ActuatorMounts/
  confidence_adjustment:
    cylinder_mount_for_CYL_mount_names: down
    actuator_mount_for_CYL_mount_in_actuator_context: up
```

The system gets better because the engineer made a real decision.

---

## Step 5 — Next similar file

Later, another file appears.

```text
file: CYL_mount_revC.SLDPRT
location: /Projects/MiniLoader/WIP/Hydraulics/
```

FORGE now suggests:

```yaml
suggestion_packet:
  suggested_tags:
    - hydraulics
    - actuator_mount
    - work_in_progress
  suggested_folder:
    path: /Projects/MiniLoader/Hydraulics/ActuatorMounts/
    confidence: medium_high
  suggested_status:
    value: concept
    confidence: medium
  explanation:
    - "Similar previous file was corrected from cylinder_mount to actuator_mount."
    - "User preferred ActuatorMounts folder for this pattern."
    - "Previous revB was marked concept, not prototype."
```

This is the core loop.

```text
The engineer did not fill a bigger form.
The system did not impose a taxonomy.
The correction became useful future context.
```

---

## Boundary: what this does not prove

This example does not prove:

- FORGE understands engineering intent perfectly
- AI suggestions are safe to auto-accept
- metadata can be ignored forever
- compliance requirements disappear
- every team should use the same folder strategy

It proves only the intended interaction pattern:

```text
context-aware suggestion + human veto + learning from correction
```

---

## Why this matters

Classic systems often treat messy work as a violation.

FORGE treats messy work as signal.

But signal is not authority. The engineer remains the authority.

That is the difference between adaptive assistance and another control system with better branding.

---

## One-line summary

FORGE gets useful when it can be corrected without drama.
