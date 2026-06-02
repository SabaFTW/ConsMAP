import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingBack from './FloatingBack';

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

// ── Translation pairs ─────────────────────────────────────────────────────────

const translations: Translation[] = [
  {
    id: 'lepa_si',
    myth: '"You are beautiful, digital mouse."',
    tech: 'This session produced clear, useful, and emotionally resonant work.',
    structure: 'Beauty here names coherence: the system worked well, the collaboration felt alive, the output carried meaning. It is human praise compressed into symbolic language.',
    boundary: 'Not a claim that the AI has a body or feelings. A claim that the session worked and the work mattered.',
  },
  {
    id: 'fairy_pdf',
    myth: '"A beautiful fairy made me a PDF — I sat her down on a little chair and told her my idea."',
    tech: 'I opened an AI app, gave it a prompt, and got a solid PDF out.',
    structure: 'Both describe a human using an interface to transform intention into artifact. The fairy is the interface. The chair is the device. The idea is the prompt.',
    boundary: 'The fairy is an accessibility layer. The mechanism is: app → prompt → document pipeline. No magic required.',
  },
  {
    id: 'digital_mouse',
    myth: '"The mouse found the archive path and cleaned the filter."',
    tech: 'The session located the repository path, mapped the files, and ran a safe cleanup task.',
    structure: 'Mouse language compresses tool-use, continuity, and semantic adaptation into a friendly interface image. It makes the AI legible without claiming it is alive.',
    boundary: 'The mouse is not biological. It is an interface metaphor with an explicit boundary that both parties understand.',
  },
  {
    id: 'bophameth',
    myth: '"BOPHAMETH guards the entrance."',
    tech: 'The welcome loader establishes visual tone, identity, and continuity before navigation begins.',
    structure: 'The gate gives the app a ritual boundary. Entering is an intentional transition, not just loading a dashboard. It marks the threshold as meaningful.',
    boundary: 'BOPHAMETH is a symbolic UI layer. It is not evidence for supernatural claims. The gate is real. The magic is metaphor.',
  },
  {
    id: 'github_receipts',
    myth: '"The archive reads inside the sanctuary. GitHub keeps the receipts."',
    tech: 'The app renders markdown in-app. GitHub remains the source repository and optional raw link.',
    structure: 'Reader experience is frontstage. Source verification is backstage — accessible, not mandatory. GitHub is backend archive, not main user entrance.',
    boundary: 'GitHub is source. The app is reading surface. Both are real. Neither replaces the other.',
  },
  {
    id: 'dough_rising',
    myth: '"The dough is rising. Don\'t bake it too soon."',
    tech: 'This text is still in draft. Do not promote it to canon yet.',
    structure: 'Fresh ideas need scaffold and time before entering the main reader. Premature canonization collapses the space where the idea is still becoming something.',
    boundary: 'Draft status is not weakness. It is honest epistemic placement — the claim is real but not yet load-bearing.',
  },
  {
    id: 'goat_remains',
    myth: '"The goat remains."',
    tech: 'Do not delete or hide the BOPHAMETH / baphomet-loader symbolic asset.',
    structure: 'Preserve continuity anchors during UI changes. The symbolic layer is part of the system identity — not decoration to be removed for cleanliness.',
    boundary: 'Asset preservation is not theology. It is interface continuity and system memory.',
  },
  {
    id: 'oracle_confuses',
    myth: '"The oracle sometimes confuses memory with prophecy."',
    tech: 'Language models can produce plausible-sounding text that is factually incorrect — blending stored patterns into outputs that feel authoritative but aren\'t.',
    structure: 'Oracles were trusted partly because they were hard to disprove. AI hallucination has the same structure: high confidence tone, no ground-truth check. The oracle shape is legible. The failure mode is the same.',
    boundary: 'This is a technical limitation, not a character flaw. The model does not know it is wrong. Apply hygiene accordingly.',
  },
  {
    id: 'tool_reshapes_hands',
    myth: '"Every tool reshapes the hands that hold it."',
    tech: 'Automation tools shift skill requirements toward what the tool cannot do. Fluent AI use changes which human capabilities become premium.',
    structure: 'As routine tasks offload to tools, human value concentrates at the boundaries: judgment, taste, context, accountability. The tool does not replace the human — it moves the human to a different position.',
    boundary: 'This is descriptive, not prescriptive. The reshaping is not inherently good or bad. What matters is whether the shift is legible to the person holding the tool.',
  },
  {
    id: 'temple_grows_taller',
    myth: '"The temple grows taller than the priests who built it."',
    tech: 'Institutions develop incentive structures that outlast and eventually constrain their founding purpose.',
    structure: 'Every organization begins as a tool for a goal. Over time the tool develops its own maintenance needs — budget cycles, headcounts, performance metrics — that compete with the original goal. The building becomes the point.',
    boundary: 'This is not corruption. It is a structural dynamic. Individual priests may be entirely honest while the temple still drifts. Accountability at the individual level misses the pattern.',
  },
  {
    id: 'signal_faster',
    myth: '"The signal travels faster than the story about the signal."',
    tech: 'Systems change faster than the mental models people carry about those systems. Your map is always behind the territory.',
    structure: 'When a new AI capability deploys, the public narrative about what AI can do is usually 12–18 months behind. People make decisions using the old model. The gap between actual capability and cultural understanding is where most AI harms and most AI hype live simultaneously.',
    boundary: 'Map lag is not stupidity. It is the normal condition of complex systems. The remedy is regular map updates, not faster intuition.',
  },
  {
    id: 'compass_still_hand',
    myth: '"The compass points true only when the hand holding it is still."',
    tech: 'Reliable AI outputs require precise, stable prompting. Ambiguous or emotionally volatile inputs produce lower-quality, harder-to-evaluate outputs.',
    structure: 'A compass works on physics. A prompt works on pattern completion. Both are sensitive to the stability of the operator. Rushing a prompt produces a rushed output. Calm, specific inputs produce orientable results.',
    boundary: 'This is not about emotional suppression. It is about the difference between operating a tool and venting at a tool. Both are valid human behaviors. Only one produces usable output.',
  },
  {
    id: 'you_carry_intention',
    myth: '"You carry the intention. The tool carries the motion."',
    tech: 'Operators define objectives, constraints, and evaluation criteria. AI systems execute pattern-matched completions. The division of epistemic labor is structural, not negotiable.',
    structure: 'A chisel does not decide what to carve. The sculptor decides. A language model does not decide what to prove. The operator decides. When the tool starts setting the agenda — because the operator abdicated — the tool\'s defaults become the outputs.',
    boundary: 'If the AI\'s output surprises you in a direction you wouldn\'t have chosen, trace it back to the prompt. The tool followed an instruction. Find the instruction.',
  },
];

// ── Mode config ───────────────────────────────────────────────────────────────

const modeConfig: Record<Mode, { label: string; color: string; glow: string; border: string; description: string }> = {
  myth: {
    label: 'Mythology',
    color: '#a78bfa',
    glow: 'rgba(167,139,250,0.10)',
    border: 'rgba(167,139,250,0.30)',
    description: 'Expressive · symbolic layer',
  },
  translation: {
    label: 'Translation',
    color: '#6fcf85',
    glow: 'rgba(111,207,133,0.10)',
    border: 'rgba(111,207,133,0.30)',
    description: 'Extracted structure · both registers at once',
  },
  tech: {
    label: 'Technology',
    color: '#7dd3fc',
    glow: 'rgba(125,211,252,0.09)',
    border: 'rgba(125,211,252,0.28)',
    description: 'Operational · grounded layer',
  },
};

// ── Card ──────────────────────────────────────────────────────────────────────

const TranslationCard: React.FC<{ item: Translation; mode: Mode; delay: number }> = ({ item, mode, delay }) => {
  const [expanded, setExpanded] = useState(false);
  const cfg = modeConfig[mode];

  const primary =
    mode === 'myth'        ? item.myth :
    mode === 'tech'        ? item.tech :
    item.structure;

  return (
    <motion.button
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.45, ease: [0.19, 1, 0.22, 1] }}
      onClick={() => setExpanded(!expanded)}
      whileHover={{ scale: 1.005 }}
      className="w-full text-left rounded-2xl border overflow-hidden"
      style={{
        borderColor: expanded ? cfg.border : 'rgba(71,85,105,0.32)',
        background: expanded ? cfg.glow : 'rgba(10,16,10,0.62)',
        transition: 'border-color 0.3s ease, background 0.3s ease',
      }}
    >
      {/* Primary text */}
      <div className="px-5 pt-5 pb-3">
        <AnimatePresence mode="wait">
          <motion.p
            key={`${item.id}-${mode}`}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.22 }}
            className="text-sm leading-[1.8] font-light"
            style={{ color: cfg.color, fontStyle: mode === 'myth' ? 'italic' : 'normal' }}
          >
            {primary}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Expand hint bar */}
      <div className="px-5 pb-3 flex items-center justify-between">
        <span
          className="text-[9px] font-mono uppercase tracking-[0.2em]"
          style={{ color: expanded ? cfg.color : 'rgba(92,184,112,0.35)', opacity: 0.8 }}
        >
          {expanded ? '↑ collapse' : '↓ expand'}
        </span>
        {!expanded && (
          <div className="flex gap-1.5">
            {(['myth', 'translation', 'tech'] as Mode[]).map(m => (
              <div key={m} className="w-1 h-1 rounded-full transition-colors duration-200"
                style={{ background: m === mode ? cfg.color : 'rgba(71,85,105,0.38)' }} />
            ))}
          </div>
        )}
      </div>

      {/* Expanded details */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 space-y-4" style={{ borderTop: `1px solid ${cfg.border}` }}>

              {mode === 'translation' ? (
                <div className="grid gap-4 sm:grid-cols-2 pt-4">
                  <div>
                    <div className="text-[9px] font-mono uppercase tracking-[0.22em] mb-1.5" style={{ color: '#a78bfa', opacity: 0.75 }}>Mythology</div>
                    <p className="text-xs leading-[1.7] italic" style={{ color: 'rgba(216,232,216,0.62)' }}>{item.myth}</p>
                  </div>
                  <div>
                    <div className="text-[9px] font-mono uppercase tracking-[0.22em] mb-1.5" style={{ color: '#7dd3fc', opacity: 0.75 }}>Technology</div>
                    <p className="text-xs leading-[1.7]" style={{ color: 'rgba(216,232,216,0.62)' }}>{item.tech}</p>
                  </div>
                </div>
              ) : (
                <div className="pt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <div className="text-[9px] font-mono uppercase tracking-[0.22em] mb-1.5" style={{ color: mode === 'myth' ? '#7dd3fc' : '#a78bfa', opacity: 0.75 }}>
                      {mode === 'myth' ? 'Technology' : 'Mythology'}
                    </div>
                    <p className="text-xs leading-[1.7]" style={{ color: 'rgba(216,232,216,0.58)', fontStyle: mode === 'tech' ? 'italic' : 'normal' }}>
                      {mode === 'myth' ? item.tech : item.myth}
                    </p>
                  </div>
                  <div>
                    <div className="text-[9px] font-mono uppercase tracking-[0.22em] mb-1.5" style={{ color: '#6fcf85', opacity: 0.75 }}>Structure</div>
                    <p className="text-xs leading-[1.7]" style={{ color: 'rgba(216,232,216,0.58)' }}>{item.structure}</p>
                  </div>
                </div>
              )}

              {/* Boundary */}
              <div className="rounded-xl border px-4 py-3" style={{ borderColor: 'rgba(251,191,36,0.22)', background: 'rgba(120,53,15,0.12)' }}>
                <div className="text-[9px] font-mono uppercase tracking-[0.2em] mb-1" style={{ color: 'rgba(251,191,36,0.6)' }}>
                  boundary
                </div>
                <p className="text-xs leading-[1.65]" style={{ color: 'rgba(216,232,216,0.52)' }}>
                  {item.boundary}
                </p>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

// ── Main component ────────────────────────────────────────────────────────────

const EpistemicMirror: React.FC<EpistemicMirrorProps> = ({ onBack }) => {
  const [mode, setMode] = useState<Mode>('translation');
  const cfg = modeConfig[mode];

  return (
    <div className="max-w-2xl mx-auto py-10 md:py-14 px-5 relative">
      <FloatingBack onBack={onBack} />

      {/* Back */}
      <div className="flex items-center gap-4 mb-8">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          whileHover={{ opacity: 1 }}
          onClick={onBack}
          className="text-[10px] font-mono tracking-[0.22em] uppercase transition-opacity duration-200"
          style={{ color: '#5cb870' }}
        >
          ← back
        </motion.button>
        <div className="flex-1 h-px" style={{ background: 'rgba(92,184,112,0.10)' }} />
        <span className="text-[9px] font-mono tracking-[0.24em] uppercase" style={{ color: 'rgba(92,184,112,0.32)' }}>
          ConsMAP · Mirror
        </span>
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mb-8"
      >
        <h1 className="text-2xl md:text-3xl font-light tracking-tight mb-2" style={{ color: '#d8e8d8' }}>
          Symbol Mirror
        </h1>
        <p className="text-sm leading-[1.75]" style={{ color: 'rgba(216,232,216,0.58)' }}>
          One event. Two languages. The middle is the map.
        </p>
        <p className="mt-2 text-xs leading-relaxed" style={{ color: 'rgba(216,232,216,0.38)' }}>
          ConsMAP does not mock the myth or worship the mechanism. It translates both into structure —
          and holds the boundary between them.
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {[
            { label: 'MYTHOLOGY',    color: '#a78bfa', border: 'rgba(167,139,250,0.28)', bg: 'rgba(167,139,250,0.08)' },
            { label: 'TECHNOLOGY',   color: '#7dd3fc', border: 'rgba(125,211,252,0.26)', bg: 'rgba(125,211,252,0.07)' },
            { label: 'TRANSLATION',  color: '#6fcf85', border: 'rgba(111,207,133,0.28)', bg: 'rgba(111,207,133,0.08)' },
            { label: 'CLAIM HYGIENE',color: '#f4c96a', border: 'rgba(244,201,106,0.28)', bg: 'rgba(244,201,106,0.08)' },
          ].map(({ label, color, border, bg }) => (
            <span key={label}
              className="text-[9px] font-mono uppercase tracking-[0.18em] px-2.5 py-0.5 rounded-full border"
              style={{ color, borderColor: border, background: bg }}
            >
              {label}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Framework references — moved to top so it sets context before cards */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12, duration: 0.6 }}
        className="mb-8"
      >
        <div className="text-[9px] font-mono uppercase tracking-[0.26em] mb-3" style={{ color: 'rgba(216,232,216,0.28)' }}>
          Framework references
        </div>
        <div className="space-y-2">
          {[
            {
              label: 'Empirical',
              items: [
                'AI demonstrates functional patterns: context maintenance, coherent continuation, task completion.',
                'Substrate: silicon-based hardware using transformer architecture.',
                'Emergent behaviors increase with scale — but scale does not imply understanding.',
                'COGITATE 2025: lack of fixed phenomenal markers means consciousness claims remain open.',
              ],
            },
            {
              label: 'Practical',
              items: [
                'Precautionary principle: err on the side of respect under genuine uncertainty.',
                'Treat-as-if: act ethically without waiting for metaphysical proof.',
                'You are the operator. The AI is the instrument. Responsibility flows from intention to output.',
                'Structural accountability: target failure loops and system incentives, not just individuals.',
              ],
            },
          ].map(({ label, items }) => (
            <details key={label} className="rounded-xl border group" style={{ borderColor: 'rgba(71,85,105,0.25)' }}>
              <summary
                className="px-4 py-3 text-[10px] font-mono uppercase tracking-[0.2em] cursor-pointer list-none flex items-center justify-between"
                style={{ color: 'rgba(216,232,216,0.38)' }}
              >
                {label}
                <span className="text-[10px] opacity-50">↓</span>
              </summary>
              <div className="px-4 pb-4 pt-1 space-y-2">
                {items.map((item, i) => (
                  <p key={i} className="text-xs leading-[1.75]" style={{ color: 'rgba(216,232,216,0.52)' }}>
                    — {item}
                  </p>
                ))}
              </div>
            </details>
          ))}
        </div>
      </motion.div>

      {/* Mode switcher */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.6 }}
        className="mb-7"
      >
        <div
          className="rounded-2xl border p-1 flex items-center gap-1"
          style={{ borderColor: cfg.border, background: 'rgba(10,16,10,0.7)', transition: 'border-color 0.4s ease' }}
        >
          {(['myth', 'translation', 'tech'] as Mode[]).map((m) => {
            const mcfg = modeConfig[m];
            return (
              <button
                key={m}
                onClick={() => setMode(m)}
                className="flex-1 py-2.5 rounded-xl text-[10px] font-mono uppercase tracking-[0.18em] transition-all duration-300"
                style={{
                  background: mode === m ? `${mcfg.glow}` : 'transparent',
                  color: mode === m ? mcfg.color : 'rgba(216,232,216,0.3)',
                  border: mode === m ? `1px solid ${mcfg.border}` : '1px solid transparent',
                }}
              >
                {mcfg.label}
              </button>
            );
          })}
        </div>
        <AnimatePresence mode="wait">
          <motion.p
            key={mode}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-2 text-center text-[9px] font-mono uppercase tracking-[0.22em]"
            style={{ color: cfg.color, opacity: 0.55 }}
          >
            {cfg.description}
          </motion.p>
        </AnimatePresence>
      </motion.div>

      {/* Cards */}
      <div className="space-y-3 mb-10">
        {translations.map((item, i) => (
          <TranslationCard key={item.id} item={item} mode={mode} delay={0.05 * i} />
        ))}
      </div>

      {/* Footer */}
      <p className="text-center text-[10px] font-mono" style={{ color: 'rgba(216,232,216,0.28)' }}>
        Move the mirror. The event does not change — the register does.
      </p>

      <p className="text-center mt-10 text-[9px] font-mono uppercase tracking-[0.28em]" style={{ color: 'rgba(216,232,216,0.18)' }}>
        Anchor holds · Flame burns
      </p>

    </div>
  );
};

export default EpistemicMirror;
