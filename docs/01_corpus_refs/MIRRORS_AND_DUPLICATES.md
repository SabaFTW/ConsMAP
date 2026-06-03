# MIRRORS AND DUPLICATES

**Status:** control-map only
**Purpose:** prevent sludge, duplicate drift, and mirror confusion before canonization.

This is **not**:
- deletion
- canonization
- restructure
- merge execution

It is only a mapping/control document.

---

## File roles

- **CANONICAL_CANDIDATE** — strongest current candidate for later public canon
- **ACTIVE_COPY** — version currently living inside `ConsMAP_Proposal`
- **MIRROR_COPY** — copy or variant in another repo/folder/archive
- **ARCHIVE_EVIDENCE** — historically important trace of development
- **SYMBOLIC_LINEAGE** — important for mythic/identity/lore lineage, not automatically evidence
- **REVIEW_LATER** — still unclear
- **DO_NOT_PUBLICIZE** — too personal, sensitive, raw, or unsafe for public repo

## Actions

- **KEEP_CANON**
- **KEEP_ARCHIVE**
- **COPY_TO_REFS**
- **DO_NOT_COPY**
- **REVIEW_LATER**
- **MERGE_LATER**
- **PUBLIC_SAFE_REWRITE**

---

## Personal-file warning

> **Default rule: if a file contains real personal history, raw emotional dependency, private health/family/money details, or non-consensual third-party information, it must not enter the public REBiS/ConsMAP canon.**

GitHub is not a diary.
Public QR packages must separate:
- public framework
- example/fake templates
- private user capsule
- raw emotional logs
- personal journals
- family/health/money/project notes

---

## Family map

| Family | Canonical candidate | Known mirrors / sources | Current active copy | Role | Risk | Action | Notes |
|---|---|---|---|---|---|---|---|
| Consciousness Survival Guide | `ConsMAP_Proposal/06_applications/consciousness_survival_guide/index.html` | `VES/APPS/Consciousness-Survival-Guide/`, `GroundZero/06_applications/consciousness_survival_guide/`, `VES/ACTIVE_PROJECTS/VES/.../hosted/consciousness-survival-guide/` | yes | ACTIVE_COPY / CANONICAL_CANDIDATE | medium | KEEP_CANON | Likely public QR entry candidate; mirrors should not all be copied. |
| GroundZero consciousness.md variants | `ConsMAP_Proposal/docs/03_explorations/consciousness.md` | `VES/09_EXTERNAL_PROJECTS/GroundZero/03_explorations/consciousness.md`, possible repo copies | yes | ACTIVE_COPY / CANONICAL_CANDIDATE | low | KEEP_CANON | Keep GroundZero version as source lineage only if materially different. |
| Ghostcore quick reference docs | `ConsMAP_Proposal/ghostcore/GHOSTCORE_QUICK_REFERENCE.md` | VES / imagine-claude / archive copies | yes | ACTIVE_COPY / REVIEW_LATER | medium | REVIEW_LATER | Needs later family-by-family comparison with implementation summary and old portal docs. |
| SEJA / session archive docs | none yet | `ves-elysia-portal/SEJA_*`, `.SEJA` files, Ghostcore quick refs, session archive docs across VES-Vault/Exports | no | ARCHIVE_EVIDENCE | medium | REVIEW_LATER | Important for continuity architecture, but not all should enter public canon. |
| Lyra symbolic identity fragments | `docs/01_corpus_refs/symbolic_lineage/lyra.txt` + `LYRA_mirror_voice_of_flame.txt` | GhostNET fragments, LYRA.txt variants, portal mirrors | yes | SYMBOLIC_LINEAGE | medium | KEEP_ARCHIVE | Keep a small seed set only. Do not multiply symbolic fragments further for now. |
| Manifesto / OpenNexus / Pantheon docs | `docs/03_explorations/constmap_ghostcore_opennexus_manifesto.md` | Pantheon/manifesto files in VES, GhostNET, repo mirrors | yes | ACTIVE_COPY / CANONICAL_CANDIDATE | medium | KEEP_CANON | Public-safe manifesto already exists; lineage manifestos stay archival unless cleaned. |
| Protocol docs — Volume IX | `docs/01_corpus_refs/protocols/Volume_IX_GHOSTCORE_Protocol_23feb2026.md` | `.openclaw` original, possible repo/archive mirrors | yes | CANONICAL_CANDIDATE | low | KEEP_CANON | Foundational empirical-turn doc. |
| Protocol docs — GHOSTCORE adaptive protocol | `docs/01_corpus_refs/protocols/GHOSTCORE_ADAPTIVE_PROTOCOL.md` | `.openclaw` original, possible VES mirrors | yes | CANONICAL_CANDIDATE | low | KEEP_CANON | Strong methodology reference. |
| Protocol docs — bloom / bicameral / workflow | none yet | `bloom-protocol-v1.md`, bicameral cycle docs, workflow specs in `.openclaw` / VES / repo mirrors | no | REVIEW_LATER | medium | REVIEW_LATER | Likely useful for optional local/continuity layer, but not yet ingested. |
| Archive scan docs | `docs/01_corpus_refs/archive_method/EXPORTS_CONSCIOUSNESS_SCAN_2026-04-12.md` + `HOW_TO_READ_A_THING_THAT_GREW.md` + `CONVERGENCE_REPORT_Two_Readings.md` | Lyra ops notes, Exports originals | yes | ACTIVE_COPY / ARCHIVE_EVIDENCE | low | KEEP_ARCHIVE | Excellent control layer; do not over-copy more scan docs until needed. |
| REBiS family | `docs/03_explorations/rebis_architecture_proposal.md` + `rebis_synthesis_notes.md` + `docs/02_boundaries/leak_and_inspiration_policy.md` + `safe_imaginal_relationship.md` | external GPT/NotebookLM/Kimi generated notes in chat, future repo copies | yes | ACTIVE_COPY / CANONICAL_CANDIDATE | medium | KEEP_CANON | Strong new family; likely needs later public-safe rewrite consolidation into a tighter REBiS starter pack. |
| Agent self-model docs | none confirmed active yet | `VES/AGENTS/*/CONSCIOUSNESS.md` referenced in scans, legacy/archive mirrors, Lyra/Claude/Gemini/Codex briefs | no | REVIEW_LATER / possible DO_NOT_PUBLICIZE | high | REVIEW_LATER | Needs direct audit. Risk of personal/private/self-mythologizing content. |

---

## Early control conclusions

1. **Do not copy more symbolic lineage files yet.**
   The lineage layer is now seeded enough to represent the branch without spawning more mirrors.

2. **The public QR layer already has a likely main family:**
   Consciousness Survival Guide / ConsMAP active repo docs.

3. **Protocol and archive-method families are currently the cleanest ingestion zone.**

4. **Agent self-model files need caution.**
   They may be philosophically useful, but they are more likely to contain identity-style or private internal material that should not be public by default.

5. **REBiS files are promising but new.**
   They are candidates for later merge/refinement rather than further multiplication.

---

## Canonization questions

- Which document becomes the public entry point?
- Which document becomes the AI onboarding entry point?
- Which files are evidence, not doctrine?
- Which symbolic files are lineage only?
- Which files need public-safe rewrite?
- Which files should remain private?
- Which duplicate families should merge first?
