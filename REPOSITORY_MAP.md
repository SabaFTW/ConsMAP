# Repository Map

An annotated tree of ConsMAP. If you are looking for where something lives,
start here; if you are looking for how the pieces fit together, read
[ARCHITECTURE.md](ARCHITECTURE.md).

```
ConsMAP/
├── 06_applications/          the applications (356 tracked files)
│   ├── digital_sanctuary/    THE primary app — React + Vite, the deployed site
│   ├── saga_map/             standalone page, copied into dist/ by CI
│   ├── rebis_landing_page/   standalone HTML page
│   ├── forge_faq/            standalone HTML page
│   ├── continuum_arc/        standalone HTML page
│   ├── bicameral_hud/        standalone HTML page
│   ├── consciousness_survival_guide/
│   ├── sircek_cosmology/
│   └── sistem_pepela/
│
├── docs/                     canonical documentation (131 tracked files)
│   ├── 00_foundations/       what the project takes as given
│   ├── 01_corpus_refs/       references into the source corpus
│   ├── 02_boundaries/        the interpretive boundary material
│   ├── 03_explorations/      open work, not settled
│   ├── 04_dialogic_defense/  argument and counter-argument
│   ├── 05_meta/              method and self-description
│   ├── 06_omnia/             the OMNIA material
│   ├── concepts/             concept definitions
│   ├── theology/             theological material — symbolic, not empirical
│   ├── visual_parables/      the illustrated parables (Factory Trilogy etc.)
│   ├── sigils/ forge/ refinery/
│   ├── project/              repository-level decisions and invariants
│   └── _archive/             superseded material, kept readable, never canon
│
├── automation/               automation harness + its run outputs (386 files)
├── research/                 research memoranda
├── user_research/            user-facing research material
├── protocols/                the protocol documents
├── machine_context/          context files written for agents
├── templates/ examples/ prompts/ workflows/ tools/ local_options/
├── reports/repository-audit/ the audit artifacts for this cleanup
│
├── .github/workflows/
│   ├── deploy.yml            builds digital_sanctuary, publishes to Pages
│   └── validate.yml          build + lint + invariant checks on every PR
│
├── README.md                 what ConsMAP is, and where to start
├── ARCHITECTURE.md           how the pieces fit, and what is generated
├── CONTRIBUTING.md           how to work in this repository
├── REPOSITORY_MAP.md         this file
├── PUBLIC_SAFETY.md          the public-safety boundary
├── START_HERE_FOR_HUMANS.md  human entry point
├── START_HERE_FOR_AGENTS.md  agent entry point
├── START_HERE_FOR_AI.md      short AI entry point
├── netlify.toml              authoritative Netlify config (secondary host)
└── LICENSE
```

## Top-level directories, one line each

| directory | what it is | generated? |
|---|---|---|
| `06_applications/` | every application and standalone page | no |
| `06_applications/digital_sanctuary/public/` | assets and documents served verbatim at runtime | partly — see ARCHITECTURE |
| `docs/` | the canonical written corpus | no |
| `docs/_archive/` | superseded material retained for provenance | no |
| `automation/` | the automation harness | `automation/runs/` is output |
| `research/`, `user_research/` | research material | no |
| `protocols/` | protocol documents | no |
| `machine_context/` | files written to be read by agents | no |
| `reports/repository-audit/` | baseline manifest, duplicate report, ledgers | yes, by this audit |
| `.github/workflows/` | CI | no |

## Where to start

- **A human reading the project:** `README.md`, then `START_HERE_FOR_HUMANS.md`.
- **An agent:** `START_HERE_FOR_AGENTS.md`. It is the single entry point.
- **Running the app:** `CONTRIBUTING.md` → Running the application.
- **Changing repository structure:** `ARCHITECTURE.md` and
  `docs/project/DECISION_LOG.md` first. `docs/project/BAPHOMET_INVARIANT.md`
  is binding.
