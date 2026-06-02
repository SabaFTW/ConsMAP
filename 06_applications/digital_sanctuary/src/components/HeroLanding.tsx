import { motion } from 'framer-motion';

interface HeroLandingProps {
  onNavigate: (view: 'mirror' | 'story' | 'analyzer' | 'docs' | 'aimode' | 'frame', meta?: string) => void;
}

type ItemAction =
  | { type: 'view'; view: 'mirror' | 'story' | 'analyzer' | 'docs' | 'aimode' }
  | { type: 'docs'; docPath: string }
  | { type: 'frame'; url: string };

const BASE = import.meta.env.BASE_URL;

// ── Entry cards — "First time here" ──────────────────────────────────────────

// Entry section is now rendered with a hardcoded split-card layout (see JSX below).

// ── Route cards — deeper exploration ─────────────────────────────────────────

const routeCards: Array<{
  label: string;
  desc: string;
  chip: string;
  accent: string;
  glow: string;
  border: string;
  wide?: boolean;
  action: ItemAction;
}> = [
  {
    label: 'Story Archive',
    desc: 'Parables that explain how mechanism becomes myth, and why maintenance matters. Reads inside the app.',
    chip: 'METAPHOR',
    accent: '#c4b5fd',
    glow: 'rgba(196,181,253,0.09)',
    border: 'rgba(196,181,253,0.22)',
    action: { type: 'view', view: 'story' },
  },
  {
    label: 'Library',
    desc: 'Browse protocols, field guides, and archive layers — no GitHub required.',
    chip: 'ARCHIVE',
    accent: '#7dd3fc',
    glow: 'rgba(125,211,252,0.09)',
    border: 'rgba(125,211,252,0.22)',
    action: { type: 'view', view: 'docs' },
  },
  {
    label: 'Claim Analyzer',
    desc: 'Drop in a claim. Get labels, risks, and better next questions.',
    chip: 'TOOL',
    accent: '#f4c96a',
    glow: 'rgba(244,201,106,0.09)',
    border: 'rgba(244,201,106,0.22)',
    action: { type: 'view', view: 'analyzer' },
  },
  {
    label: 'Symbol Mirror',
    desc: 'Same event, two languages. Switch between mythic and technical — see what stays the same.',
    chip: 'SYMBOLIC',
    accent: '#a78bfa',
    glow: 'rgba(167,139,250,0.09)',
    border: 'rgba(167,139,250,0.22)',
    action: { type: 'view', view: 'mirror' },
  },
  {
    label: 'AI Mode',
    desc: 'Generate a structured evaluation prompt for any AI assistant. Paste and go.',
    chip: 'OPERATOR',
    accent: '#6fcf85',
    glow: 'rgba(111,207,133,0.09)',
    border: 'rgba(111,207,133,0.22)',
    wide: true,
    action: { type: 'view', view: 'aimode' },
  },
];

// ── Shared card hover handlers ────────────────────────────────────────────────

const onEnter = (el: HTMLElement, glow: string, boost = 0.18) => {
  el.style.boxShadow = `0 8px 36px ${glow.replace(/[\d.]+\)$/, `${boost})`)}`;
};
const onLeave = (el: HTMLElement) => {
  el.style.boxShadow = 'none';
};

// ── Component ─────────────────────────────────────────────────────────────────

const HeroLanding: React.FC<HeroLandingProps> = ({ onNavigate }) => {
  const handleAction = (action: ItemAction) => {
    if (action.type === 'view') onNavigate(action.view);
    else if (action.type === 'docs') onNavigate('docs', action.docPath);
    else onNavigate('frame', action.url);
  };

  return (
    <div className="relative z-10 min-h-screen px-5 py-14 md:py-20">
      {/* Ambient glow */}
      <motion.div
        animate={{ opacity: [0.05, 0.10, 0.05] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 30%, rgba(92,184,112,0.08) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">

        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <h1
            className="text-4xl md:text-5xl font-light tracking-tight mb-3"
            style={{ color: '#d8e8d8' }}
          >
            ConsMAP
          </h1>
          <p
            className="text-xs font-mono tracking-[0.24em] uppercase mb-5"
            style={{ color: '#5cb870' }}
          >
            claim hygiene · symbolic boundary · operator reasoning
          </p>
          <p
            className="max-w-lg mx-auto text-base leading-8"
            style={{ color: 'rgba(216,232,216,0.68)' }}
          >
            Some ideas live between myth, evidence, and machinery.
            ConsMAP helps you tell which is which.
          </p>
        </motion.div>

        {/* ── First time here ───────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.14, duration: 0.7 }}
          className="mb-10"
        >
          <SectionRule label="first time here" accent="rgba(111,207,133,0.55)" />

          {/* Main split card — Start Here (left) | QR (right) */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
            className="rounded-2xl border overflow-hidden mb-3"
            style={{ borderColor: 'rgba(111,207,133,0.30)', background: 'linear-gradient(150deg, rgba(14,26,14,0.94) 0%, rgba(8,14,8,0.97) 100%)' }}
          >
            <div className="flex divide-x" style={{ borderColor: 'rgba(111,207,133,0.12)' }}>
              {/* Left — Start Here */}
              <button
                onClick={() => onNavigate('docs', '/START_HERE_FOR_HUMANS.md')}
                className="group flex-1 text-left px-6 py-6 transition-colors duration-200 hover:bg-[rgba(111,207,133,0.04)]"
                style={{ borderRight: '1px solid rgba(111,207,133,0.12)' }}
              >
                <div className="text-base font-light mb-1 leading-snug" style={{ color: '#6fcf85' }}>
                  Start here
                </div>
                <p className="text-xs leading-[1.6] mb-4" style={{ color: 'rgba(216,232,216,0.42)' }}>
                  What this is. What you can do here. Zero jargon.
                </p>
                <div className="flex items-center justify-between">
                  <Chip label="START" accent="#6fcf85" border="rgba(111,207,133,0.30)" glow="rgba(111,207,133,0.10)" />
                  <span className="text-[10px] font-mono uppercase tracking-[0.18em] opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#6fcf85' }}>Open →</span>
                </div>
              </button>

              {/* Right — QR */}
              <button
                onClick={() => onNavigate('docs', '/QR_LANDING.md')}
                className="group flex-1 text-left px-6 py-6 transition-colors duration-200 hover:bg-[rgba(125,211,252,0.04)]"
              >
                <div className="text-base font-light mb-1 leading-snug" style={{ color: '#7dd3fc' }}>
                  QR arrival
                </div>
                <p className="text-xs leading-[1.6] mb-4" style={{ color: 'rgba(216,232,216,0.42)' }}>
                  Arrived from the physical world? This is your door.
                </p>
                <div className="flex items-center justify-between">
                  <Chip label="QR" accent="#7dd3fc" border="rgba(125,211,252,0.28)" glow="rgba(125,211,252,0.09)" />
                  <span className="text-[10px] font-mono uppercase tracking-[0.18em] opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#7dd3fc' }}>Open →</span>
                </div>
              </button>
            </div>
          </motion.div>

          {/* Secondary small row — FAQ and REBiS */}
          <div className="flex gap-2">
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate('docs', '/START_HERE_FOR_HUMANS.md')}
              className="flex-1 text-left rounded-xl border px-4 py-3"
              style={{ borderColor: 'rgba(216,232,216,0.14)', background: 'rgba(10,16,10,0.6)', transition: 'border-color 0.2s ease' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(216,232,216,0.28)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(216,232,216,0.14)'; }}
            >
              <div className="text-xs font-mono uppercase tracking-[0.16em] mb-0.5" style={{ color: 'rgba(216,232,216,0.65)' }}>FAQ</div>
              <div className="text-[10px] leading-snug" style={{ color: 'rgba(216,232,216,0.32)' }}>Common questions, honest answers</div>
            </motion.button>

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.33, duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate('frame', `${BASE}rebis_landing_page/`)}
              className="flex-1 text-left rounded-xl border px-4 py-3"
              style={{ borderColor: 'rgba(167,139,250,0.18)', background: 'rgba(10,10,16,0.6)', transition: 'border-color 0.2s ease' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(167,139,250,0.35)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(167,139,250,0.18)'; }}
            >
              <div className="text-xs font-mono uppercase tracking-[0.16em] mb-0.5" style={{ color: '#a78bfa' }}>REBiS</div>
              <div className="text-[10px] leading-snug" style={{ color: 'rgba(216,232,216,0.32)' }}>Symbolic archetype — the recovered correction</div>
            </motion.button>
          </div>
        </motion.div>

        {/* ── Explore further ───────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.38, duration: 0.7 }}
          className="mb-10"
        >
          <SectionRule label="explore further" accent="rgba(92,184,112,0.38)" />

          <div className="grid gap-3 sm:grid-cols-2">
            {routeCards.map((card, i) => (
              <motion.button
                key={card.label}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42 + i * 0.08, duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                whileHover={{ y: -3, scale: 1.008 }}
                whileTap={{ scale: 0.988 }}
                onClick={() => handleAction(card.action)}
                onMouseEnter={(e) => onEnter(e.currentTarget as HTMLElement, card.glow, 0.20)}
                onMouseLeave={(e) => onLeave(e.currentTarget as HTMLElement)}
                className={`group text-left rounded-2xl border px-5 py-5 ${card.wide ? 'sm:col-span-2' : ''}`}
                style={{
                  borderColor: card.border,
                  background: 'linear-gradient(150deg, rgba(12,20,12,0.75) 0%, rgba(8,12,8,0.88) 100%)',
                  transition: 'box-shadow 0.3s ease',
                }}
              >
                <div
                  className="text-[10px] font-mono uppercase tracking-[0.22em] mb-2"
                  style={{ color: card.accent, opacity: 0.8 }}
                >
                  {card.label}
                </div>
                <div
                  className="text-sm leading-[1.7] mb-4"
                  style={{ color: 'rgba(216,232,216,0.58)' }}
                >
                  {card.desc}
                </div>
                <div className="flex items-center gap-2">
                  <Chip label={card.chip} accent={card.accent} border={card.border} glow={card.glow} />
                  <span
                    className="ml-auto text-[10px] font-mono uppercase tracking-[0.18em] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ color: card.accent }}
                  >
                    Enter →
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* ── Footer ────────────────────────────────────────────────────────── */}
        <p
          className="text-center mt-6 text-[10px] font-mono uppercase tracking-[0.28em]"
          style={{ color: 'rgba(216,232,216,0.18)' }}
        >
          frontstage clean · backstage alive
        </p>

      </div>
    </div>
  );
};

// ── Sub-components ────────────────────────────────────────────────────────────

const SectionRule: React.FC<{ label: string; accent: string }> = ({ label, accent }) => (
  <div className="flex items-center gap-3 mb-5">
    <div className="flex-1 h-px" style={{ background: 'rgba(92,184,112,0.10)' }} />
    <span
      className="text-[9px] font-mono uppercase tracking-[0.3em] shrink-0"
      style={{ color: accent }}
    >
      {label}
    </span>
    <div className="flex-1 h-px" style={{ background: 'rgba(92,184,112,0.10)' }} />
  </div>
);

const Chip: React.FC<{ label: string; accent: string; border: string; glow: string }> = ({
  label, accent, border, glow,
}) => (
  <span
    className="text-[9px] font-mono uppercase tracking-[0.2em] px-2.5 py-0.5 rounded-full border"
    style={{ color: accent, borderColor: border, background: glow }}
  >
    {label}
  </span>
);

export default HeroLanding;
