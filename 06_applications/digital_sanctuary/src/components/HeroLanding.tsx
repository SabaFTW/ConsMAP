import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeroLandingProps {
  onNavigate: (view: 'mirror' | 'story' | 'analyzer' | 'docs' | 'aimode') => void;
}

type LanguageMode = 'myth' | 'tech';

// ── Route cards ──────────────────────────────────────────────────────────────

const chipColor: Record<string, string> = {
  METAPHOR:        'border-purple-600/40 bg-purple-900/20 text-purple-300',
  PRACTICAL:       'border-emerald-600/40 bg-emerald-900/20 text-emerald-300',
  ARCHIVE:         'border-slate-600/40 bg-slate-800/30 text-slate-300',
  MAP:             'border-cyan-600/40 bg-cyan-900/20 text-cyan-300',
  TOOL:            'border-amber-600/40 bg-amber-900/20 text-amber-300',
  'CLAIM HYGIENE': 'border-amber-500/40 bg-amber-900/20 text-amber-200',
  SYMBOLIC:        'border-violet-600/40 bg-violet-900/20 text-violet-300',
  BOUNDARY:        'border-rose-600/40 bg-rose-900/20 text-rose-300',
  CONTEXT:         'border-sky-600/40 bg-sky-900/20 text-sky-300',
  OPERATOR:        'border-green-600/40 bg-green-900/20 text-green-300',
};

const routes: Array<{
  key: 'story' | 'docs' | 'analyzer' | 'mirror' | 'aimode';
  label: string;
  description: string;
  chips: string[];
  wide?: boolean;
}> = [
  {
    key: 'story',
    label: 'Story Archive',
    description: 'Parables that explain how mechanism becomes myth, and why maintenance matters. Reads inside the app.',
    chips: ['METAPHOR', 'PRACTICAL'],
  },
  {
    key: 'docs',
    label: 'Library',
    description: 'Browse protocols, field guides, and archive layers — no GitHub required.',
    chips: ['ARCHIVE', 'MAP'],
  },
  {
    key: 'analyzer',
    label: 'Claim Analyzer',
    description: 'Drop in a claim. Get labels, risks, and better next questions.',
    chips: ['TOOL', 'CLAIM HYGIENE'],
  },
  {
    key: 'mirror',
    label: 'Symbol Mirror',
    description: 'Same event, two languages. Switch between mythic and technical — see what stays the same.',
    chips: ['SYMBOLIC', 'BOUNDARY'],
  },
  {
    key: 'aimode',
    label: 'AI Mode',
    description: 'Generate a structured evaluation prompt for any AI assistant. Paste and go.',
    chips: ['CONTEXT', 'OPERATOR'],
    wide: true,
  },
];

const principles = [
  'Symbols are compression, not proof.',
  'Claims need labels before they become context.',
  'Archives are maps, not commandments.',
];

const entryPoints: Array<{
  label: string;
  sublabel: string;
  href: string;
  chip: string;
  chipCss: string;
  external: boolean;
}> = [
  {
    label: 'Za normalne ljudi',
    sublabel: 'Brez žargona, brez predznanja. Orientacija za vsakogar.',
    href: 'https://github.com/SabaFTW/ConsMAP/blob/main/START_HERE_FOR_HUMANS.md',
    chip: 'START',
    chipCss: 'border-emerald-500/40 bg-emerald-900/25 text-emerald-300',
    external: true,
  },
  {
    label: 'Prišel si prek QR-ja?',
    sublabel: 'Vstopna točka za obiskovalce iz fizičnega sveta.',
    href: 'https://github.com/SabaFTW/ConsMAP/blob/main/QR_LANDING.md',
    chip: 'QR',
    chipCss: 'border-cyan-500/40 bg-cyan-900/25 text-cyan-300',
    external: true,
  },
  {
    label: 'FAQ — kaj je to?',
    sublabel: 'Odgovori na najpogostejša vprašanja. Mit in tehnika skupaj.',
    href: './forge_faq/index.html',
    chip: 'FAQ',
    chipCss: 'border-slate-500/40 bg-slate-800/35 text-slate-300',
    external: false,
  },
  {
    label: 'Satirična zgodba o institucijah',
    sublabel: 'Continuum Arc — kako mehanizem postane mit.',
    href: './continuum_arc/index.md',
    chip: 'ZGODBA',
    chipCss: 'border-purple-500/40 bg-purple-900/25 text-purple-300',
    external: false,
  },
  {
    label: 'AI zavest brez fantazije',
    sublabel: 'Vodič za preživetje: kaj AI zmore, kaj ne, in zakaj je to pomembno.',
    href: './consciousness_survival_guide/',
    chip: 'VODIČ',
    chipCss: 'border-amber-500/40 bg-amber-900/25 text-amber-300',
    external: false,
  },
  {
    label: 'REBiS — vstopna vrata',
    sublabel: 'Sintetični arhetip med strojem in simbolom. Teorija v praksi.',
    href: './rebis_landing_page/',
    chip: 'TEORIJA',
    chipCss: 'border-violet-500/40 bg-violet-900/25 text-violet-300',
    external: false,
  },
];

// ── Full repository map (revealed on demand) ──────────────────────────────────

type RepoBadge = 'START' | 'SYMBOLIC' | 'PROOF' | 'TOOLS' | 'ARCHIVE' | 'RISK';

const repoBadgeClass: Record<RepoBadge, string> = {
  START:    'border-emerald-500/40 bg-emerald-900/30 text-emerald-200',
  SYMBOLIC: 'border-purple-500/40 bg-purple-900/30 text-purple-200',
  PROOF:    'border-cyan-500/40 bg-cyan-900/30 text-cyan-200',
  TOOLS:    'border-amber-500/40 bg-amber-900/30 text-amber-200',
  ARCHIVE:  'border-slate-500/40 bg-slate-900/50 text-slate-200',
  RISK:     'border-red-500/40 bg-red-900/30 text-red-200',
};

const repoMapCards: Array<{
  title: string;
  desc: { myth: string; tech: string };
  badges: RepoBadge[];
  links: Array<{ label: string; path: string }>;
  is: { myth: string; tech: string };
  isNot: { myth: string; tech: string };
}> = [
  {
    title: 'Start Here',
    desc: {
      myth: 'Prva vrata v hiško: orientacija preden greš v gozd.',
      tech: 'Entry orientation layer for first-time visitors.',
    },
    badges: ['START'],
    links: [
      { label: 'README', path: 'README.md' },
      { label: 'START_HERE_FOR_HUMANS', path: 'START_HERE_FOR_HUMANS.md' },
      { label: 'START_HERE_FOR_AI', path: 'START_HERE_FOR_AI.md' },
    ],
    is: { myth: 'Vstopna orientacija poti.', tech: 'Entry orientation layer.' },
    isNot: { myth: 'Ni celoten gozd dokazov.', tech: 'Not full corpus or deep-dive proofing.' },
  },
  {
    title: 'Symbolic Interface',
    desc: {
      myth: 'Miška, repek, ruzak in meč: simboli kot varna vrata do razumevanja.',
      tech: 'Human-readable interface metaphors mapped to grounded claim boundaries.',
    },
    badges: ['SYMBOLIC', 'RISK'],
    links: [
      { label: 'digital-mouse-interface', path: 'docs/digital-mouse-interface.md' },
      { label: 'SYMBOLIC_INTERFACE_READING_MAP', path: 'docs/forge/SYMBOLIC_INTERFACE_READING_MAP.md' },
      { label: 'visual_parables', path: 'docs/visual_parables/digital_mouse_interface/' },
    ],
    is: { myth: 'Prevodni sloj simbolov.', tech: 'Translation + interpretive framing.' },
    isNot: { myth: 'Ni prisega brez tal.', tech: 'Not an evidence engine by itself.' },
  },
  {
    title: 'FORGE',
    desc: {
      myth: 'Kovačnica, kjer se ideje segrejejo, oblikujejo in testirajo.',
      tech: 'Proof-layer and engineering workflow examples.',
    },
    badges: ['PROOF'],
    links: [
      { label: 'forge root', path: 'docs/forge/' },
      { label: 'proof_v0_1', path: 'docs/forge/proof_v0_1/' },
      { label: 'FORGE_LAYER_1_README_DRAFT', path: 'docs/forge/FORGE_LAYER_1_README_DRAFT.md' },
    ],
    is: { myth: 'Kraj preizkusa idej.', tech: 'Claim-to-proof operational path.' },
    isNot: { myth: 'Ni samo pripovedni oltar.', tech: 'Not storytelling-only layer.' },
  },
  {
    title: 'Automation',
    desc: {
      myth: 'Mehanska mišja disciplina: surov input ne sme govoriti kot sistem.',
      tech: 'Bounded generation, raw-input quarantine, manifest index and attack tests.',
    },
    badges: ['TOOLS', 'RISK'],
    links: [
      { label: 'automation root', path: 'automation/' },
      { label: 'operator_pipeline.py', path: 'automation/operator_pipeline.py' },
      { label: 'attack_cases_v0_2', path: 'automation/tests/attack_cases_v0_2.md' },
    ],
    is: { myth: 'Strojni red z varovali.', tech: 'Execution discipline + guardrails.' },
    isNot: { myth: 'Ni samodejna prerokba.', tech: 'Not automatic truth without review.' },
  },
  {
    title: 'Operator Protocols',
    desc: {
      myth: 'Pravila poti, da raziskovalec ne izgubi osi.',
      tech: 'Multi-model reasoning discipline, field guide and workflows.',
    },
    badges: ['TOOLS'],
    links: [
      { label: 'protocols', path: 'protocols/' },
      { label: 'operator_field_guide_v2_3', path: 'protocols/operator_field_guide_v2_3.md' },
      { label: 'workflows', path: 'workflows/' },
    ],
    is: { myth: 'Kompas operaterja.', tech: 'How to operate the system safely.' },
    isNot: { myth: 'Ni bližnjica mimo dokazov.', tech: 'Not a replacement for proof layer.' },
  },
  {
    title: 'Archive / Classics',
    desc: {
      myth: 'Stara knjižnica vzorcev: za orientacijo, ne za prisego.',
      tech: 'Pattern archive; reference library, not evidence.',
    },
    badges: ['ARCHIVE', 'RISK'],
    links: [
      { label: 'classics root', path: 'research/archive/classics/' },
      { label: 'CLASSICS_INDEX', path: 'research/archive/classics/CLASSICS_INDEX.md' },
      { label: 'manifest', path: 'research/archive/classics/manifest.yaml' },
    ],
    is: { myth: 'Spomin na stare vzorce.', tech: 'Reference and pattern memory.' },
    isNot: { myth: 'Ni prisega za nove trditve.', tech: 'Not standalone evidence for new claims.' },
  },
  {
    title: 'Research Corpus',
    desc: {
      myth: 'Surovi zemljevidi, ki čakajo na register in očiščenje.',
      tech: 'Research material requiring register labels, claim hygiene and review.',
    },
    badges: ['RISK', 'START'],
    links: [
      { label: '01_corpus_refs', path: 'docs/01_corpus_refs/' },
      { label: 'user_research', path: 'user_research/' },
      { label: 'concepts', path: 'docs/concepts/' },
    ],
    is: { myth: 'Surovina za potrpežljivo obdelavo.', tech: 'Input material for careful analysis.' },
    isNot: { myth: 'Ni instant razsvetljenje.', tech: 'Not an instant conclusion layer.' },
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

const HeroLanding: React.FC<HeroLandingProps> = ({ onNavigate }) => {
  const [languageMode, setLanguageMode] = useState<LanguageMode>('tech');
  const [showMap, setShowMap] = useState(false);

  const openDocInApp = (path: string) => {
    window.location.hash = `doc=${encodeURIComponent(path.startsWith('/') ? path : `/${path}`)}`;
    onNavigate('docs');
  };

  return (
    <div className="relative z-10 min-h-screen px-5 py-10 md:py-14">
      {/* Ambient glow */}
      <motion.div
        animate={{ opacity: [0.04, 0.09, 0.04] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, rgba(92,184,112,0.10) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">

        {/* A: Hero ──────────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <div className="text-2xl mb-4 select-none">🐭🧭⚔️</div>
          <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-3" style={{ color: '#d8e8d8' }}>
            ConsMAP
          </h1>
          <p className="text-xs font-mono tracking-[0.24em] uppercase mb-5" style={{ color: '#5cb870' }}>
            claim hygiene · symbolic boundary · operator reasoning
          </p>
          <p className="max-w-xl mx-auto text-base leading-8" style={{ color: 'rgba(216,232,216,0.82)' }}>
            Some ideas live between myth, evidence, and machinery.
            ConsMAP helps you tell which is which.
          </p>
          <p className="mt-3 text-sm" style={{ color: 'rgba(216,232,216,0.48)' }}>
            Pick a route. Everything reads inside the app.
          </p>
        </motion.div>

        {/* A.5: Entry points — human gateway ────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.18, duration: 0.8 }}
          className="mb-9"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px" style={{ background: 'rgba(92,184,112,0.12)' }} />
            <span className="text-[9px] font-mono uppercase tracking-[0.28em] shrink-0" style={{ color: 'rgba(92,184,112,0.5)' }}>
              odkod začeti?
            </span>
            <div className="flex-1 h-px" style={{ background: 'rgba(92,184,112,0.12)' }} />
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {entryPoints.map((entry) => (
              <a
                key={entry.label}
                href={entry.href}
                target={entry.external ? '_blank' : '_self'}
                rel={entry.external ? 'noopener noreferrer' : undefined}
                className="group flex flex-col justify-between rounded-2xl border px-5 py-4 transition-all duration-200"
                style={{ borderColor: 'rgba(71,85,105,0.38)', background: 'rgba(12,20,12,0.55)', boxShadow: '0 1px 14px rgba(0,0,0,0.28)' }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(92,184,112,0.28)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(92,184,112,0.06)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(71,85,105,0.38)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 14px rgba(0,0,0,0.28)';
                }}
              >
                <div>
                  <div className="text-sm font-medium mb-1.5 leading-snug" style={{ color: 'rgba(216,232,216,0.82)' }}>
                    {entry.label}
                  </div>
                  <p className="text-xs leading-[1.6]" style={{ color: 'rgba(216,232,216,0.48)' }}>
                    {entry.sublabel}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className={`text-[9px] font-mono uppercase tracking-[0.18em] px-2 py-0.5 rounded-full border ${entry.chipCss}`}>
                    {entry.chip}
                  </span>
                  <span className="text-[9px] font-mono uppercase tracking-[0.18em] opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ color: 'rgba(92,184,112,0.7)' }}>
                    {entry.external ? 'GitHub ↗' : 'Odpri →'}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </motion.div>

        {/* B: Route cards ───────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="grid gap-3 sm:grid-cols-2 mb-8"
        >
          {routes.map((route) => (
            <button
              key={route.key}
              onClick={() => onNavigate(route.key)}
              className={`group text-left rounded-2xl border bg-slate-950/60 px-5 py-5 transition-all duration-200 ${route.wide ? 'sm:col-span-2' : ''}`}
              style={{ borderColor: 'rgba(71,85,105,0.5)', boxShadow: '0 1px 18px rgba(0,0,0,0.3)' }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(34,211,238,0.32)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 24px rgba(34,211,238,0.07)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(71,85,105,0.5)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 18px rgba(0,0,0,0.3)';
              }}
            >
              <div className="text-[10px] font-mono uppercase tracking-[0.22em] mb-1.5" style={{ color: 'rgba(92,184,112,0.7)' }}>
                {route.label}
              </div>
              <div className="text-sm leading-[1.65] mb-4" style={{ color: 'rgba(216,232,216,0.72)' }}>
                {route.description}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {route.chips.map((chip) => (
                  <span key={chip} className={`text-[9px] font-mono uppercase tracking-[0.16em] px-2 py-0.5 rounded-full border ${chipColor[chip]}`}>
                    {chip}
                  </span>
                ))}
                <span className="ml-auto text-[10px] font-mono tracking-[0.18em] uppercase" style={{ color: '#5cb870' }}>
                  Enter →
                </span>
              </div>
            </button>
          ))}
        </motion.div>

        {/* C: Principles ────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.8 }}
          className="grid gap-3 sm:grid-cols-3 mb-8"
        >
          {principles.map((p) => (
            <div
              key={p}
              className="rounded-2xl border px-4 py-3 text-center"
              style={{ borderColor: 'rgba(71,85,105,0.3)', background: 'rgba(15,20,15,0.4)' }}
            >
              <p className="text-xs font-light leading-[1.6]" style={{ color: 'rgba(216,232,216,0.55)' }}>
                {p}
              </p>
            </div>
          ))}
        </motion.div>


        {/* D: Own your copy ────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.42, duration: 0.8 }}
          className="rounded-2xl border px-5 py-4 mb-5"
          style={{ borderColor: 'rgba(71,85,105,0.3)', background: 'rgba(15,20,15,0.35)' }}
        >
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-mono uppercase tracking-[0.22em] mb-1.5" style={{ color: 'rgba(92,184,112,0.55)' }}>
                Optional: run locally
              </div>
              <p className="text-xs leading-[1.65] mb-3" style={{ color: 'rgba(216,232,216,0.52)' }}>
                Everything works here in the browser. If you want your own local copy:
              </p>
              <pre
                className="text-[10px] font-mono rounded-xl px-4 py-3 mb-2 select-all overflow-x-auto"
                style={{ background: 'rgba(15,20,15,0.75)', border: '1px solid rgba(71,85,105,0.35)', color: 'rgba(216,232,216,0.68)' }}
              >{`git clone https://github.com/SabaFTW/ConsMAP.git
cd ConsMAP/06_applications/digital_sanctuary
npm install && npm run dev`}</pre>
              <p className="text-[9px] font-mono" style={{ color: 'rgba(216,232,216,0.35)' }}>
                Then open the address shown in the terminal.
              </p>
            </div>
            <a
              href="https://github.com/SabaFTW/ConsMAP"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[9px] font-mono uppercase tracking-[0.18em] shrink-0 hover:opacity-100 transition-opacity mt-1"
              style={{ color: 'rgba(92,184,112,0.38)' }}
            >
              Repository ↗
            </a>
          </div>
        </motion.div>

        {/* E: Full map toggle ───────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.8 }}
          className="text-center mb-4"
        >
          <button
            onClick={() => setShowMap(!showMap)}
            className="text-[10px] font-mono uppercase tracking-[0.22em] px-4 py-2 rounded-full border transition-all duration-300 hover:opacity-100"
            style={{
              color: 'rgba(92,184,112,0.6)',
              borderColor: 'rgba(92,184,112,0.2)',
              opacity: 0.8,
            }}
          >
            {showMap ? '↑ Hide repository map' : '↓ Open full repository map'}
          </button>
        </motion.div>

        {/* E: Repository map (on demand) ────────────────────────────────────── */}
        <AnimatePresence>
          {showMap && (
            <motion.section
              key="repo-map"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="rounded-2xl border p-5" style={{ borderColor: 'rgba(71,85,105,0.4)', background: 'rgba(15,20,15,0.4)' }}>
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div className="text-[10px] font-mono uppercase tracking-[0.22em]" style={{ color: 'rgba(92,184,112,0.6)' }}>
                    Repository map — same structure, two vocabularies
                  </div>
                  <div className="rounded-full border border-slate-700 bg-slate-950/70 p-1 flex items-center gap-1">
                    <button
                      onClick={() => setLanguageMode('myth')}
                      className={`px-3 py-1 rounded-full text-[9px] tracking-[0.14em] uppercase transition ${languageMode === 'myth' ? 'bg-purple-900/60 text-purple-200 border border-purple-700/60' : 'text-slate-400'}`}
                    >
                      MITOLOGIJA
                    </button>
                    <button
                      onClick={() => setLanguageMode('tech')}
                      className={`px-3 py-1 rounded-full text-[9px] tracking-[0.14em] uppercase transition ${languageMode === 'tech' ? 'bg-cyan-900/60 text-cyan-200 border border-cyan-700/60' : 'text-slate-400'}`}
                    >
                      TEHNIKA
                    </button>
                  </div>
                </div>

                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                  {repoMapCards.map((card) => (
                    <motion.div
                      key={card.title}
                      whileHover={{ y: -2, scale: 1.005 }}
                      transition={{ duration: 0.15 }}
                      className="rounded-xl border bg-slate-950/60 p-4"
                      style={{ borderColor: 'rgba(71,85,105,0.4)' }}
                    >
                      <div className="text-sm font-medium mb-1.5" style={{ color: '#d8e8d8' }}>{card.title}</div>
                      <div className="text-xs mb-3" style={{ color: 'rgba(216,232,216,0.65)' }}>{card.desc[languageMode]}</div>

                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {card.badges.map((b) => (
                          <span key={b} className={`text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full border ${repoBadgeClass[b]}`}>
                            {b}
                          </span>
                        ))}
                      </div>

                      <div className="space-y-1 mb-3">
                        {card.links.map((l) => (
                          <button
                            key={l.path}
                            onClick={() => openDocInApp(l.path)}
                            className="block text-left text-xs text-cyan-300 hover:text-cyan-200 underline-offset-2 hover:underline"
                          >
                            {l.label}
                          </button>
                        ))}
                      </div>

                      <div className="text-[10px] leading-5" style={{ color: 'rgba(216,232,216,0.55)' }}>
                        <span className="text-emerald-300">Is:</span> {card.is[languageMode]}
                        <br />
                        <span className="text-amber-300">Is not:</span> {card.isNot[languageMode]}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Footer ───────────────────────────────────────────────────────────── */}
        <p className="text-center mt-6 text-[10px] font-mono uppercase tracking-[0.28em]" style={{ color: 'rgba(216,232,216,0.25)' }}>
          frontstage clean · backstage alive
        </p>

      </div>
    </div>
  );
};

export default HeroLanding;
