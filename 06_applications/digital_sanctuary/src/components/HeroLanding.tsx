import { motion } from 'framer-motion';

interface HeroLandingProps {
  onNavigate: (view: 'mirror' | 'story' | 'analyzer' | 'docs' | 'aimode') => void;
}

type Badge = 'METAPHOR' | 'TECH' | 'RISK' | 'BOUNDARY';

const badgeClass: Record<Badge, string> = {
  METAPHOR: 'border-purple-500/40 bg-purple-900/30 text-purple-200',
  TECH: 'border-cyan-500/40 bg-cyan-900/30 text-cyan-200',
  RISK: 'border-red-500/40 bg-red-900/30 text-red-200',
  BOUNDARY: 'border-amber-500/40 bg-amber-900/30 text-amber-200',
};

const decoderPreview: Array<{ symbol: string; grounded: string; badges: Badge[]; projection?: boolean }> = [
  {
    symbol: 'Miška = mali prevajalec med svetovi',
    grounded: 'Interface abstraction layer (human-readable shell over operational core).',
    badges: ['METAPHOR', 'TECH', 'BOUNDARY'],
  },
  {
    symbol: 'Repek = vez z izvirom',
    grounded: 'Cable/sync channel for power + data exchange.',
    badges: ['METAPHOR', 'TECH'],
  },
  {
    symbol: '6/9 spor',
    grounded: 'Conflicting claim often means missing axis (orientation/time/observer).',
    badges: ['BOUNDARY', 'RISK'],
    projection: true,
  },
];

const warningRows = [
  ['Literalization failure', 'Symbol gets treated as physical proof.'],
  ['Evidence laundering', 'Narrative tone replaces verifiable grounding.'],
  ['Dashboard worship', 'Metric proxy drifts away from real outcome.'],
  ['Harmony sludge', 'Everything sounds aligned, nothing is falsifiable.'],
];

const frameworkCards = [
  {
    title: 'Digital Mouse Interface',
    text: 'Cute frontstage translator. Never a sentience claim.',
  },
  {
    title: 'Symbolic Reading Map',
    text: 'Decode language, extract claim type, preserve boundary.',
  },
  {
    title: 'FORGE Proof Layer',
    text: 'Move from style to testable evidence structures.',
  },
  {
    title: 'Automation Discipline',
    text: 'Guardrails + recovery paths without killing useful range.',
  },
  {
    title: 'Operator Field Guide',
    text: 'Practical doctrine: calm, bounded, falsifiable operations.',
  },
];

type RepoBadge = 'START' | 'SYMBOLIC' | 'PROOF' | 'TOOLS' | 'ARCHIVE' | 'RISK';

const repoBadgeClass: Record<RepoBadge, string> = {
  START: 'border-emerald-500/40 bg-emerald-900/30 text-emerald-200',
  SYMBOLIC: 'border-purple-500/40 bg-purple-900/30 text-purple-200',
  PROOF: 'border-cyan-500/40 bg-cyan-900/30 text-cyan-200',
  TOOLS: 'border-amber-500/40 bg-amber-900/30 text-amber-200',
  ARCHIVE: 'border-slate-500/40 bg-slate-900/50 text-slate-200',
  RISK: 'border-red-500/40 bg-red-900/30 text-red-200',
};

const repoMapCards: Array<{
  title: string;
  desc: string;
  badges: RepoBadge[];
  links: Array<{ label: string; path: string }>;
  is: string;
  isNot: string;
}> = [
  {
    title: 'Start Here',
    desc: 'Najprej orientacija: kaj je ConsMAP in kako vstopiš.',
    badges: ['START'],
    links: [
      { label: 'README', path: 'README.md' },
      { label: 'START_HERE_FOR_HUMANS', path: 'START_HERE_FOR_HUMANS.md' },
      { label: 'START_HERE_FOR_AI', path: 'START_HERE_FOR_AI.md' },
    ],
    is: 'Entry orientation layer.',
    isNot: 'Ni full corpus ali deep-dive dokazovanje.',
  },
  {
    title: 'Symbolic Interface',
    desc: 'Simbolni jezik kot vmesnik, ne kot ontološki dokaz.',
    badges: ['SYMBOLIC', 'RISK'],
    links: [
      { label: 'digital-mouse-interface', path: 'docs/digital-mouse-interface.md' },
      { label: 'SYMBOLIC_INTERFACE_READING_MAP', path: 'docs/forge/SYMBOLIC_INTERFACE_READING_MAP.md' },
      { label: 'visual_parables', path: 'docs/visual_parables/digital_mouse_interface/' },
    ],
    is: 'Translation + interpretive framing.',
    isNot: 'Ni evidence engine sama po sebi.',
  },
  {
    title: 'FORGE',
    desc: 'Proof layer, workflow primeri in decision discipline.',
    badges: ['PROOF'],
    links: [
      { label: 'forge root', path: 'docs/forge/' },
      { label: 'proof_v0_1', path: 'docs/forge/proof_v0_1/' },
      { label: 'FORGE_LAYER_1_README_DRAFT', path: 'docs/forge/FORGE_LAYER_1_README_DRAFT.md' },
    ],
    is: 'Claim-to-proof operational path.',
    isNot: 'Ni storytelling-only plast.',
  },
  {
    title: 'Automation',
    desc: 'Bounded pipeline, test cases in operator tooling.',
    badges: ['TOOLS', 'RISK'],
    links: [
      { label: 'automation root', path: 'automation/' },
      { label: 'operator_pipeline.py', path: 'automation/operator_pipeline.py' },
      { label: 'attack_cases_v0_2', path: 'automation/tests/attack_cases_v0_2.md' },
    ],
    is: 'Execution discipline + guardrails.',
    isNot: 'Ni samodejna resnica brez pregleda.',
  },
  {
    title: 'Operator Protocols',
    desc: 'Field guide, audit in multi-model reasoning discipline.',
    badges: ['TOOLS'],
    links: [
      { label: 'protocols', path: 'protocols/' },
      { label: 'operator_field_guide_v2_3', path: 'protocols/operator_field_guide_v2_3.md' },
      { label: 'workflows', path: 'workflows/' },
    ],
    is: 'How to operate the system safely.',
    isNot: 'Ni replacement za dokazni sloj.',
  },
  {
    title: 'Archive / Classics',
    desc: 'Pattern library za kontekst in primerjave skozi čas.',
    badges: ['ARCHIVE', 'RISK'],
    links: [
      { label: 'classics root', path: 'research/archive/classics/' },
      { label: 'CLASSICS_INDEX', path: 'research/archive/classics/CLASSICS_INDEX.md' },
      { label: 'manifest', path: 'research/archive/classics/manifest.yaml' },
    ],
    is: 'Reference and pattern memory.',
    isNot: 'Ni samostojen dokaz za nove trditve.',
  },
  {
    title: 'Research Corpus',
    desc: 'Surov material + user research z register higieno.',
    badges: ['RISK', 'START'],
    links: [
      { label: '01_corpus_refs', path: 'docs/01_corpus_refs/' },
      { label: 'user_research', path: 'user_research/' },
      { label: 'concepts', path: 'docs/concepts/' },
    ],
    is: 'Input material for careful analysis.',
    isNot: 'Ni instant conclusion layer.',
  },
];

const HeroLanding: React.FC<HeroLandingProps> = ({ onNavigate }) => {
  const openDocInApp = (path: string) => {
    window.location.hash = `doc=${encodeURIComponent(path.startsWith('/') ? path : `/${path}`)}`;
    onNavigate('docs');
  };

  return (
    <div className="relative z-10 min-h-screen px-6 py-10 md:py-14">
      <motion.div
        animate={{ opacity: [0.04, 0.09, 0.04] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, rgba(92,184,112,0.10) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <div className="text-3xl mb-5">🐭🧭⚔️</div>
          <h1 className="text-4xl md:text-6xl font-light tracking-tight" style={{ color: '#d8e8d8' }}>
            ConsMAP
          </h1>
          <p className="mt-3 text-xs font-mono tracking-[0.24em] uppercase" style={{ color: '#5cb870' }}>
            claim hygiene · symbolic boundary · operator reasoning
          </p>
          <p className="mt-6 max-w-3xl mx-auto text-sm md:text-base leading-7" style={{ color: 'rgba(216,232,216,0.72)' }}>
            Symbolic language = human-readable compression. Technical language = grounded mechanism. ConsMAP decoder = bridge.
          </p>
          <p className="mt-3 text-sm font-mono" style={{ color: 'rgba(216,232,216,0.58)' }}>
            Good symbolism leads back to clearer reality. Bad symbolism replaces reality.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2 mb-8">
          <section className="rounded-2xl border border-slate-700 bg-slate-900/70 p-5">
            <div className="text-xs uppercase tracking-[0.2em] text-cyan-300 mb-4">Decoder preview</div>
            <div className="space-y-4">
              {decoderPreview.map((item, idx) => (
                <div key={idx} className="rounded-xl border border-slate-700 bg-slate-950/60 p-4">
                  <div className="text-sm" style={{ color: '#d8e8d8' }}>{item.symbol}</div>
                  <div className="text-xs mt-2" style={{ color: 'rgba(216,232,216,0.72)' }}>{item.grounded}</div>
                  <div className="mt-3 flex flex-wrap gap-2 items-center">
                    {item.badges.map((b) => (
                      <span key={b} className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded-full border ${badgeClass[b]}`}>
                        {b}
                      </span>
                    ))}
                    {item.projection && (
                      <span className="text-indigo-300 text-xs" title="Axis check: time/scale/location/observer/measurement">
                        🧭
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-amber-700/40 bg-slate-900/70 p-5">
            <div className="text-xs uppercase tracking-[0.2em] text-amber-300 mb-4">Warning panel</div>
            <div className="space-y-3">
              {warningRows.map(([title, text]) => (
                <div key={title} className="rounded-xl border border-slate-700 bg-slate-950/60 p-3">
                  <div className="text-sm text-amber-200">{title}</div>
                  <div className="text-xs mt-1" style={{ color: 'rgba(216,232,216,0.72)' }}>{text}</div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="rounded-2xl border border-slate-700 bg-slate-900/70 p-5 mb-8">
          <div className="text-xs uppercase tracking-[0.2em] text-emerald-300 mb-4">Framework layer</div>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {frameworkCards.map((card) => (
              <div key={card.title} className="rounded-xl border border-slate-700 bg-slate-950/60 p-4">
                <div className="text-sm" style={{ color: '#d8e8d8' }}>{card.title}</div>
                <div className="text-xs mt-2" style={{ color: 'rgba(216,232,216,0.72)' }}>{card.text}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-indigo-700/40 bg-slate-900/70 p-5 mb-8">
          <div className="text-xs uppercase tracking-[0.2em] text-indigo-300">Axis recovery</div>
          <p className="mt-2 text-sm" style={{ color: 'rgba(216,232,216,0.75)' }}>
            The task is not agreement. The task is axis recovery.
          </p>
          <p className="mt-2 text-xs font-mono" style={{ color: 'rgba(216,232,216,0.55)' }}>
            Check missing axes: time · scale · location · observer position · measurement method · definition · substrate · phase · system boundary · purpose.
          </p>
        </section>

        <section className="rounded-2xl border border-cyan-700/40 bg-slate-900/70 p-5 mb-10">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-cyan-300">Explore ConsMAP</div>
              <p className="text-xs mt-1" style={{ color: 'rgba(216,232,216,0.58)' }}>
                Izberi vrata: repo struktura prevedena v človeško berljiv zemljevid.
              </p>
            </div>
            <span className="text-lg">🗺️</span>
          </div>

          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {repoMapCards.map((card) => (
              <motion.div
                key={card.title}
                whileHover={{ y: -3, scale: 1.01 }}
                transition={{ duration: 0.18 }}
                className="rounded-xl border border-slate-700 bg-slate-950/60 p-4 shadow-[0_0_0_rgba(34,211,238,0)] hover:shadow-[0_8px_30px_rgba(34,211,238,0.12)]"
              >
                <div className="text-sm font-medium" style={{ color: '#d8e8d8' }}>{card.title}</div>
                <div className="text-xs mt-2" style={{ color: 'rgba(216,232,216,0.72)' }}>{card.desc}</div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {card.badges.map((b) => (
                    <span key={b} className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded-full border ${repoBadgeClass[b]}`}>
                      {b}
                    </span>
                  ))}
                </div>

                <div className="mt-3 space-y-1.5">
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

                <div className="mt-3 text-[11px] leading-5" style={{ color: 'rgba(216,232,216,0.65)' }}>
                  <span className="text-emerald-300">Is:</span> {card.is}
                  <br />
                  <span className="text-amber-300">Is not:</span> {card.isNot}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-3 md:gap-4"
        >
          <button onClick={() => onNavigate('mirror')} className="px-4 py-2 rounded-full border border-slate-700 bg-slate-900/60 text-xs font-mono uppercase tracking-[0.16em] hover:border-cyan-600 hover:text-cyan-300 transition">Mirror</button>
          <button onClick={() => onNavigate('analyzer')} className="px-4 py-2 rounded-full border border-slate-700 bg-slate-900/60 text-xs font-mono uppercase tracking-[0.16em] hover:border-cyan-600 hover:text-cyan-300 transition">Analyzer</button>
          <button onClick={() => onNavigate('story')} className="px-4 py-2 rounded-full border border-slate-700 bg-slate-900/60 text-xs font-mono uppercase tracking-[0.16em] hover:border-cyan-600 hover:text-cyan-300 transition">Story</button>
          <button onClick={() => onNavigate('docs')} className="px-4 py-2 rounded-full border border-slate-700 bg-slate-900/60 text-xs font-mono uppercase tracking-[0.16em] hover:border-cyan-600 hover:text-cyan-300 transition">Library</button>
          <button onClick={() => onNavigate('aimode')} className="px-4 py-2 rounded-full border border-slate-700 bg-slate-900/60 text-xs font-mono uppercase tracking-[0.16em] hover:border-cyan-600 hover:text-cyan-300 transition">AI Mode</button>
        </motion.nav>

        <p className="text-center mt-10 text-[10px] uppercase tracking-[0.28em]" style={{ color: 'rgba(216,232,216,0.35)' }}>
          frontstage clean · backstage alive
        </p>
      </div>
    </div>
  );
};

export default HeroLanding;
