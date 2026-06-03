# Personal Anchor Node Doctrine

> **Navigation note:** This is the local-first continuity extension of the Digital Mouse Interface.
> For the formal interface doctrine, see [`README.md`](./README.md).
> For the conceptual essay, see [`docs/digital-mouse-interface.md`](../../digital-mouse-interface.md).

**Status:** Draft v0.2 / methodological hardening  
**Register:** [PRACTICAL] personal data sovereignty + [METAPHOR] mouse home / backpack dock + [SAFETY] local-first portability + [RISK] false-security failure modes  
**Related:** Digital Mouse Interface Doctrine

> Phone is temporary.  
> Computer is replaceable.  
> Provider is conditional.  
> Anchor is carried.  
> Context returns home.  
> **Anchor is only yours if it is encrypted.**

---

## Core Claim

A **Personal Anchor Node** is a small, user-owned physical storage and synchronization device for the Digital Mouse ecosystem.

It is not a cloud provider.  
It is not a magic backup.  
It is not inherently secure because it is physical.  
It is not sovereign without open export formats.

It is a portable, local-first sync point that lets the user dump, retrieve, and move their own context between phones, computers, AI tools, repositories, and local systems without being trapped by one device, account, vendor, or app.

In mouse-language:

```text
The mouse carries a backpack.
The anchor node is where the backpack can be emptied, sorted, verified, encrypted, and reloaded.
```

The metaphor is permitted.

The protocol must do the real work.

---

## Why This Exists

A personal AI interface becomes dangerous if all memory and context live only inside one vendor account.

That creates lock-in:

- change phone → lose context,
- change computer → lose workflow,
- change app → lose history,
- lose provider access → lose continuity,
- lose export path → lose sovereignty.

The Personal Anchor Node exists so the user can keep their own substrate.

It is a local continuity object.

But physical possession is not enough.

```text
Physical possession is not security.
Encryption is security.
Verified sync is continuity.
Open export is sovereignty.
```

---

## Local-First Position

This concept belongs near local-first computing, data portability, personal archiving, and accessibility infrastructure.

It is not based on the claim that all cloud systems are evil.

It is based on a simpler structural point:

```text
The incentives of a cloud provider are not automatically identical to the continuity needs of the user.
```

A user-owned node reduces dependency on:

- device lifecycle,
- app lifecycle,
- account access,
- platform terms,
- proprietary export paths,
- remote availability.

Digital sovereignty does not require paranoia.

It requires export, encryption, and control.

---

## Device Role

A practical implementation could be a small low-power Wi-Fi microcontroller node with:

- local flash or SD storage,
- simple web UI,
- phone-to-node sync,
- node-to-computer export,
- optional solar charging,
- LED state indicator,
- USB-C power / data port,
- encrypted local vault.

The exact hardware can vary.

The architectural role stays the same.

```text
[PHONE / PERSONAL MOUSE]
  ↓ dump / sync / retrieve
[PERSONAL ANCHOR NODE]
  ↓ export / backup / local bridge
[COMPUTER / REPO / LOCAL VAULT]
```

The node is a sync point.

It is not a complete backup strategy by itself.

---

## Minimum Security Requirements

A Personal Anchor Node can easily become a privacy risk if designed badly.

Minimum requirements:

```text
Encryption at rest: mandatory, not optional
Sync verification: checksum + confirmation before overwrite
Visible sync state: no silent success assumption
Recovery path: defined lost / stolen / damaged-device response
Export standard: documented and open
Pairing state: visible and revocable
Audit log: imports, exports, overwrites, failed syncs
No silent cloud upload: local-first means local-first
No automatic trust of unknown machines
```

If the node stores personal context, then the node must be treated like a key, wallet, or diary.

Cute shell.

Serious vault.

---

## Threat Model Notes

### Physical Theft

A stolen unencrypted node is worse than many cloud failures because the attacker has direct physical access.

Physical possession is not security.

### Weak Encryption

Bad cryptography turns a sovereignty object into theater.

Encryption must be mandatory, modern, and implementation-reviewed.

### Sync Illusion

The most dangerous failure mode is the user believing that a dump succeeded when it did not.

This creates the **magic backup box illusion**.

If the light says success, success must be verified.

### Malware on Source Device

The node does not magically cleanse compromised input.

If the phone is compromised, exported context may also be compromised.

### Misconfiguration

Non-technical users should not be pushed toward insecure convenience.

Secure defaults must be the default.

---

## Conflict Resolution

Sync conflict resolution is not optional.

When the phone, node, and computer diverge, the system needs an explicit conflict protocol.

Questions that must be answered:

```text
Which version is newer?
Which version was verified?
Can both versions be preserved?
Does the user see a clear conflict warning?
Is overwrite ever silent?
Can the user roll back?
```

Default rule:

```text
Never silently overwrite context.
Preserve conflicting versions until the user chooses or a documented merge policy applies.
```

---

## Three Access Modes

The same underlying system can present different language layers for different users.

This is not three separate realities.

It is one system with three access doors.

Important boundary:

```text
If the system assigns users to layers, it can become patronizing.
If the user chooses their layer, it becomes accessibility.
```

---

### 1. Seed / Child Layer

**Audience:** children, first-time users, people entering technology gently.

Purpose:

- make technology approachable,
- preserve curiosity,
- avoid fear and sterile command language,
- use metaphor without lying.

Example language:

```text
This is not a real animal mouse.
It is a little helper box with chips, wires, light, and memory.
The mouse’s backpack is where your notes can rest.
The tail is how it connects.
The light tells you whether it is awake.
```

Guardrail:

The child layer must not turn technology into magic that replaces the physical world.

It should invite children back into reality:

- sunlight charges the panel,
- cables carry signals,
- memory stores files,
- protocols move messages,
- machines still need care.

The metaphor opens the door.

Reality remains inside the room.

---

### 2. Weave / Youth-Adult Layer

**Audience:** teenagers, adults, explorers, creators, symbolic thinkers.

Purpose:

- allow mythic imagination,
- support creative identity,
- explain networks and protocols through living metaphor,
- preserve epistemic labels.

Example language:

```text
Your mouse can fly across the network, but only through real protocols.
Her wings are Wi-Fi.
Her backpack is context.
Her tail is the connection.
Her workshop is the local vault.
```

Guardrail:

Myth is allowed.

Myth must remain labeled.

The Weave layer is powerful because it can make invisible systems emotionally legible.

It becomes dangerous when symbols are treated as literal hidden beings, secret commands, or unquestionable authority.

---

### 3. Soil / Elder Layer

**Audience:** elderly users, non-technical users, practical users, accessibility-first contexts.

Purpose:

- reduce confusion,
- avoid jargon,
- allow safe use of tools,
- preserve dignity.

Example language:

```text
This small box keeps a copy of your notes.
When you plug it in, your phone can place things there.
When you connect it to the computer, the computer can read those things back.
The light shows whether the box is ready.
```

Optional mouse-language:

```text
The mouse is sitting at home.
Her backpack is open.
You can put today’s notes inside.
```

Guardrail:

The elder layer must not infantilize the user.

Simple language is not childish language.

Accessibility means respecting the user’s dignity while removing unnecessary technical burden.

Patronizing:

```text
Press the button and wait for the pretty light.
```

Dignified:

```text
The green light means the sync completed successfully.
```

---

## Physical Object as Sovereignty Symbol

The Personal Anchor Node is physically carried.

That matters.

It changes the relationship from:

```text
“My memory is somewhere inside a company platform.”
```

into:

```text
“My working archive is in this object I control.”
```

But this sentence is only true if the object is encrypted, exportable, and recoverable.

The physicality is not nostalgia.

It is an anti-lock-in strategy.

---

## Solar / Low-Power Motif

A small solar panel is not only aesthetic.

It encodes an operational principle:

```text
The node should not depend entirely on a wall socket, vendor cloud, or permanent infrastructure.
```

The node does not need to be always online.

It needs to be reliably available when the user wants to sync, dump, retrieve, or move context.

Solar charging does not replace power-state verification.

If the node lacked power during sync, the user must know.

---

## LED State Language

The light ring can become a simple state interface.

Example:

| Light | Meaning | Mouse-language |
|---|---|---|
| Blue | Ready / calm | Mouse is awake and listening. |
| Purple | Syncing / weave | Mouse is sorting the backpack. |
| Orange | Needs attention | Mouse found something that needs checking. |
| Red | Error / stop | Do not continue until the issue is resolved. |
| Off | Sleeping / no power | Mouse is resting, or the device is off. |

The LED should never be decorative only.

If it glows, it should mean something.

If it fails, failure must be legible.

---

## No Silent Write Rule

The node may receive dumps.

The node may serve exports.

The node must never silently overwrite without user confirmation or a documented merge policy.

```text
The mouse may empty the backpack.
The anchor may store the packet.
The human must know when memory changes.
```

---

## Functional Claim vs Metaphor

### Functional Claim

Users need a portable, local-first continuity layer for AI context, personal notes, files, and semantic state.

This layer should reduce vendor lock-in and device dependency.

### Metaphor

- Anchor = stable local continuity
- Mouse home = place where the digital mouse rests
- Backpack dock = place where context is emptied and reloaded
- Solar shell = low-dependency survivability
- Light ring = state language
- Tail = cable / connection channel

### Guardrail

The device is not mystical.

It is a physical storage and sync node.

The mythic language exists to make its role understandable.

### Failure Mode

If the user believes the node magically preserves everything without backups, encryption, verification, or export discipline, the metaphor has failed.

The anchor must be boringly reliable under the symbol.

---

## Open-Source Project Skeleton

A real open-source version should separate protocol from hardware.

```text
PERSONAL_ANCHOR_NODE/
├── README.md
├── THREAT_MODEL.md
├── PROTOCOL_SPEC.md
├── HARDWARE_REFERENCE.md
├── UX_LANGUAGE_GUIDE.md
├── ENCRYPTION_REQUIREMENTS.md
├── CONFLICT_RESOLUTION.md
└── EXPORT_SCHEMA.yaml
```

Critical requirement:

```text
The protocol must be open and documented independently from any single device implementation.
```

Otherwise the project simply replaces one lock-in with another.

---

## README Sentence

```text
The Personal Anchor Node is not a tiny cloud owned by a company.
It is a small local home where the user’s digital mouse can empty her backpack.
```

Hardening clause:

```text
A home without a lock is not safer than the cloud.
An anchor without encryption is only a box.
```

---

## Final Seal

```text
Phone is temporary.
Computer is replaceable.
Provider is conditional.
Anchor is carried.
Context returns home.
Anchor is only yours if it is encrypted.
```

```text
The mouse holds the translation.
The anchor holds the context.
The human holds the keys.
```
