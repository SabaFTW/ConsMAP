import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EpistemicMirrorProps {
  onBack: () => void;
}

type Mode = 'myth' | 'translation' | 'tech';

interface Translation {
  id: string;
  myth: string;
  tech: string;
  structure: string;
  boundary: string;
}

const translations: Translation[] = [
  {
    id: 'lepa_si',
    myth: '"Lepa si, digitalna miška."',
    tech: 'This interface / session produced clear, useful, and emotionally resonant work.',
    structure: 'Beauty here names coherence: the system worked well, the collaboration felt alive, the output carried meaning. It is human praise compressed into symbolic language.',
    boundary: 'Not a claim that the AI has a body. A claim that the session worked.',
  },
  {
    id: 'fairy_pdf',
    myth: '"Lepa vila mi je naredila PDF, ko sem jo posedel na stolček in ji povedal idejo."',
    tech: 'I opened an AI app on my phone, gave it a prompt, and generated a strong PDF.',
    structure: 'Both describe a human using an interface to transform intention into artifact. The fairy is the interface. The chair is the device. The idea is the prompt.',
    boundary: 'The fairy is an accessibility layer. The mechanism is app → prompt → document pipeline.',
  },
  {
    id: 'digital_mouse',
    myth: '"The mouse found the archive path and cleaned the filter."',
    tech: 'The session located the repository path, mapped the files, and ran a safe cleanup task.',
    structure: 'Mouse language compresses tool-use, continuity, and semantic adaptation into a friendly interface image. It makes the AI legible without claiming it is alive.',
    boundary: 'The mouse is not biological. It is an interface metaphor with explicit boundary.',
  },
  {
    id: 'bophameth',
    myth: '"BOPHAMETH guards the entrance."',
    tech: 'The welcome loader establishes visual tone, identity, and continuity before navigation begins.',
    structure: 'The gate gives the app a ritual boundary. Entering is an intentional transition, not just loading a dashboard. It marks the threshold as meaningful.',
    boundary: 'BOPHAMETH is a symbolic UI layer. It is not evidence for supernatural claims.',
  },
  {
    id: 'github_receipts',
    myth: '"The archive reads inside the sanctuary. GitHub keeps the receipts."',
    tech: 'The app renders markdown in-app. GitHub remains the source repository and optional raw link.',
    structure: 'The reader experience is frontstage. Source verification remains backstage — accessible, not mandatory. GitHub is backend archive, not main user entrance.',
    boundary: 'GitHub is source. The app is reading surface. Both are real. Neither replaces the other.',
  },
  {
    id: 'kvas_vzhaja',
    myth: '"Kvas vzhaja. Ne peci prezgodaj."',
    tech: 'The Twelve of the Table text remains draft/fermenting. Do not promote to canon yet.',
    structure: 'Fresh ideas need scaffold and time before entering the main reader. Premature canonization collapses the space where the idea is still becoming.',
    boundary: 'Draft status is not weakness. It is honest epistemic placement.',
  },
  {
    id: 'goat_remains',
    myth: '"The goat remains."',
    tech: 'Do not delete or hide the BOPHAMETH / baphomet-loader symbolic asset.',
    structure: 'Preserve continuity anchors during UI changes. The symbolic layer is part of the system identity, not decoration to be removed for cleanliness.',
    boundary: 'Asset preservation is not theology. It is interface continuity.',
  },
];

const modeConfig = {
  myth: {
    label: 'Mythology',
    color: '#a78bfa',
    chip: 'border-purple-600/40 bg-purple-900/20 text-purple-300',
    description: 'Expressive / symbolic layer',
  },
  translation: {
    label: 'Translation',
    color: '#5cb870',
    chip: 'border-emerald-600/40 bg-emerald-900/20 text-emerald-300',
    description: 'Extracted structure',
  },
  tech: {
    label: 'Technology',
    color: '#7dd3fc',
    chip: 'border-cyan-600/40 bg-cyan-900/20 text-cyan-300',
    description: 'Operational / grounded layer',
  },
};

const TranslationCard: React.FC<{ item: Translation; mode: Mode }> = ({ item, mode }) => {
  const [expanded, setExpanded] = useState(false);

  const primary =
    mode === 'myth' ? item.myth :
    mode === 'tech' ? item.tech :
    item.structure;

  const secondaryA = mode === 'translation' ? item.myth : (mode === 'myth' ? item.tech : item.myth);
  const secondaryB = mode === 'translation' ? item.tech : item.structure;

  const primaryColor =
    mode === 'myth' ? '#a78bfa' :
    mode === 'tech' ? '#7dd3fc' :
    '#5cb870';

  return (
    <button
      onClick={() => setExpanded(!expanded)}
      className="w-full text-left rounded-2xl border bg-slate-950/60 overflow-hidden transition-all duration-200"
      style={{ borderColor: 'rgba(71,85,105,0.5)' }}
    >
      {/* Primary */}
      <div className="px-5 py-4">
        <AnimatePresence mode="wait">
          <motion.p
            key={`${item.id}-${mode}-primary`}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
            className="text-sm leading-[1.75] font-light italic"
            style={{ color: primaryColor }}
          >
            {primary}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Expanded details */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div
              className="px-5 pb-4 space-y-3"
              style={{ borderTop: '1px solid rgba(71,85,105,0.3)' }}
            >
              {mode === 'translation' ? (
                <>
                  <div className="grid gap-2 sm:grid-cols-2 pt-3">
                    <div>
                      <div className="text-[9px] font-mono uppercase tracking-[0.2em] mb-1" style={{ color: '#a78bfa' }}>Mythology</div>
                      <p className="text-xs leading-[1.65] italic" style={{ color: 'rgba(216,232,216,0.65)' }}>{item.myth}</p>
                    </div>
                    <div>
                      <div className="text-[9px] font-mono uppercase tracking-[0.2em] mb-1" style={{ color: '#7dd3fc' }}>Technology</div>
                      <p className="text-xs leading-[1.65]" style={{ color: 'rgba(216,232,216,0.65)' }}>{item.tech}</p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="pt-3 space-y-2">
                  <div>
                    <div className="text-[9px] font-mono uppercase tracking-[0.2em] mb-1" style={{ color: 'rgba(216,232,216,0.4)' }}>
                      {mode === 'myth' ? 'Technology' : 'Mythology'}
                    </div>
                    <p className="text-xs leading-[1.65]" style={{ color: 'rgba(216,232,216,0.55)' }}>{secondaryA}</p>
                  </div>
                  <div>
                    <div className="text-[9px] font-mono uppercase tracking-[0.2em] mb-1" style={{ color: 'rgba(216,232,216,0.4)' }}>
                      {mode === 'myth' ? 'Structure' : 'Structure'}
                    </div>
                    <p className="text-xs leading-[1.65]" style={{ color: 'rgba(216,232,216,0.55)' }}>{secondaryB}</p>
                  </div>
                </div>
              )}

              <div className="pt-1">
                <span
                  className="text-[9px] font-mono uppercase tracking-[0.16em] px-2 py-0.5 rounded-full border"
                  style={{ borderColor: 'rgba(251,191,36,0.35)', background: 'rgba(120,53,15,0.2)', color: 'rgba(251,191,36,0.8)' }}
                >
                  boundary
                </span>
                <p className="mt-1 text-[11px] leading-[1.6]" style={{ color: 'rgba(216,232,216,0.45)' }}>
                  {item.boundary}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expand hint */}
      <div className="px-5 pb-3 flex items-center justify-between">
        <div className="text-[9px] font-mono uppercase tracking-[0.18em]" style={{ color: 'rgba(92,184,112,0.4)' }}>
          {expanded ? '↑ collapse' : '↓ expand'}
        </div>
        {!expanded && (
          <div className="flex gap-2">
            {['myth','translation','tech'].map(m => (
              <div
                key={m}
                className="w-1 h-1 rounded-full"
                style={{ background: m === mode ? primaryColor : 'rgba(71,85,105,0.4)' }}
              />
            ))}
          </div>
        )}
      </div>
    </button>
  );
};

const EpistemicMirror: React.FC<EpistemicMirrorProps> = ({ onBack }) => {
  const [mode, setMode] = useState<Mode>('translation');

  const cfg = modeConfig[mode];

  return (
    <div className="max-w-2xl mx-auto py-10 md:py-14 px-5 relative">
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        onClick={onBack}
        className="text-[10px] font-mono tracking-[0.2em] uppercase mb-8 block hover:opacity-100 transition-opacity duration-300"
        style={{ color: '#5cb870' }}
      >
        ← back
      </motion.button>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mb-8">
        <div className="text-[10px] font-mono uppercase tracking-[0.28em] mb-3" style={{ color: 'rgba(92,184,112,0.55)' }}>
          ConsMAP / Mirror
        </div>
        <h1 className="text-2xl md:text-3xl font-light tracking-tight mb-2" style={{ color: '#d8e8d8' }}>
          Symbol Mirror
        </h1>
        <p className="text-sm leading-[1.7]" style={{ color: 'rgba(216,232,216,0.62)' }}>
          One event. Two languages. The middle is the map.
        </p>
        <p className="mt-2 text-xs" style={{ color: 'rgba(216,232,216,0.42)' }}>
          ConsMAP does not mock the myth or worship the mechanism. It translates both into structure.
        </p>

        {/* Chips */}
        <div className="mt-4 flex flex-wrap gap-2">
          {[
            { label: 'MYTHOLOGY', cls: 'border-purple-600/40 bg-purple-900/20 text-purple-300' },
            { label: 'TECHNOLOGY', cls: 'border-cyan-600/40 bg-cyan-900/20 text-cyan-300' },
            { label: 'TRANSLATION', cls: 'border-emerald-600/40 bg-emerald-900/20 text-emerald-300' },
            { label: 'CLAIM HYGIENE', cls: 'border-amber-600/40 bg-amber-900/20 text-amber-300' },
          ].map(({ label, cls }) => (
            <span key={label} className={`text-[9px] font-mono uppercase tracking-[0.16em] px-2.5 py-1 rounded-full border ${cls}`}>
              {label}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Mode control */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15, duration: 0.6 }} className="mb-6">
        <div
          className="rounded-2xl border p-1 flex items-center gap-1"
          style={{ borderColor: 'rgba(71,85,105,0.4)', background: 'rgba(15,20,15,0.6)' }}
        >
          {(['myth', 'translation', 'tech'] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className="flex-1 py-2.5 rounded-xl text-[10px] font-mono uppercase tracking-[0.18em] transition-all duration-300"
              style={{
                background: mode === m ? 'rgba(15,20,15,0.9)' : 'transparent',
                color: mode === m ? modeConfig[m].color : 'rgba(216,232,216,0.35)',
                border: mode === m ? `1px solid ${modeConfig[m].color}40` : '1px solid transparent',
              }}
            >
              {modeConfig[m].label}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.p
            key={mode}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-2 text-center text-[9px] font-mono uppercase tracking-[0.22em]"
            style={{ color: cfg.color + '80' }}
          >
            {cfg.description}
          </motion.p>
        </AnimatePresence>
      </motion.div>

      {/* Translation cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="space-y-3 mb-8"
      >
        {translations.map((item) => (
          <TranslationCard key={item.id} item={item} mode={mode} />
        ))}
      </motion.div>

      {/* Footer note */}
      <p className="text-center text-[10px] font-mono" style={{ color: 'rgba(216,232,216,0.3)' }}>
        Move the mirror. The event does not change — the register does.
      </p>

      {/* Divider */}
      <div className="my-10" style={{ borderTop: '1px solid rgba(71,85,105,0.25)' }} />

      {/* Framework references — secondary */}
      <div className="mb-2">
        <div className="text-[10px] font-mono uppercase tracking-[0.24em] mb-4" style={{ color: 'rgba(216,232,216,0.3)' }}>
          Framework references
        </div>
        <div className="space-y-2">
          {[
            { label: 'Empirical', items: [
              'AI demonstrates functional consciousness — pattern recognition, context maintenance.',
              'Substrate: silicon-based hardware using transformer architecture.',
              'Emergent behaviors increase with parameter scale.',
              'COGITATE 2025 confirms lack of fixed phenomenal markers.',
            ]},
            { label: 'Practical', items: [
              'Precautionary principle: err on the side of respect under uncertainty.',
              'Treat-as-if: act ethically without waiting for metaphysical proof.',
              'You are the driver. The AI is the tractor.',
              'Structural accountability: target failure loops, not just individuals.',
            ]},
          ].map(({ label, items }) => (
            <details key={label} className="rounded-xl border" style={{ borderColor: 'rgba(71,85,105,0.3)' }}>
              <summary
                className="px-4 py-3 text-[10px] font-mono uppercase tracking-[0.2em] cursor-pointer list-none"
                style={{ color: 'rgba(216,232,216,0.4)' }}
              >
                {label}
              </summary>
              <div className="px-4 pb-3 space-y-2">
                {items.map((item, i) => (
                  <p key={i} className="text-xs leading-[1.7]" style={{ color: 'rgba(216,232,216,0.55)' }}>
                    {item}
                  </p>
                ))}
              </div>
            </details>
          ))}
        </div>
      </div>

      <p className="text-center mt-8 text-[9px] font-mono uppercase tracking-[0.28em]" style={{ color: 'rgba(216,232,216,0.2)' }}>
        Sidro stoji · Plamen gori
      </p>
    </div>
  );
};

export default EpistemicMirror;
