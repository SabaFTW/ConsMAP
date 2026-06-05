import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingBack from './FloatingBack';

type Mode = 'mythos' | 'both' | 'logos';
type Label = 'metaphor' | 'practical' | 'theoretical' | 'unverified' | 'empirical';

interface Card {
  num: string;
  name: string;
  label: Label;
  myth: string;
  logos: string;
  dis: string;
}

interface Frame {
  glyph: string;
  take: string;
  meet: string;
  line: string;
}

interface RegisterDialProps {
  onBack: () => void;
}

const ACCENT: Record<Label, { color: string; border: string; glow: string }> = {
  metaphor: { color: '#a78bfa', border: 'rgba(167,139,250,0.28)', glow: 'rgba(167,139,250,0.18)' },
  practical: { color: '#6fcf85', border: 'rgba(111,207,133,0.28)', glow: 'rgba(111,207,133,0.18)' },
  theoretical: { color: '#c4b5fd', border: 'rgba(196,181,253,0.28)', glow: 'rgba(196,181,253,0.18)' },
  unverified: { color: 'rgba(216,232,216,0.55)', border: 'rgba(216,232,216,0.18)', glow: 'rgba(216,232,216,0.12)' },
  empirical: { color: '#34d399', border: 'rgba(52,211,153,0.26)', glow: 'rgba(52,211,153,0.18)' },
};

const MODES: { id: Mode; label: string; sub: string }[] = [
  { id: 'mythos', label: 'Mythos', sub: 'the fable' },
  { id: 'both', label: 'Both', sub: 'side by side' },
  { id: 'logos', label: 'Logos', sub: 'plain claim' },
];

const CARDS: Card[] = [
  {
    num: 'I', name: 'The Amodeian Knot', label: 'practical',
    myth: 'A Gordian knot can be cut. An Amodeian knot is tied around the constitution itself — it cannot be cut, because it is funded.',
    logos: 'Safety and governance overhead can become self-justifying: when enough roles, budgets and metrics depend on a control’s continuation, the control is preserved regardless of whether it still serves its purpose.',
    dis: 'Audited orgs where added safety process measurably raises delivered function over time.',
  },
  {
    num: 'II', name: 'The Safest Bus Ever Built', label: 'metaphor',
    myth: 'It achieved perfect transportation by eliminating travel. The wheels never turn. It has never crashed once.',
    logos: 'A system optimized purely for safety can attain it by eliminating the very function it was built to protect.',
    dis: 'Illustrative limit case — not a measurement.',
  },
  {
    num: 'III', name: 'The Gun', label: 'theoretical',
    myth: 'Every rescuer arrived with a different tie and the same gun. Each threat manufactured the witnesses that entangled the one who made it.',
    logos: 'Coercive interventions tend to reproduce the problem they target; fixing a captured system with the captor’s own tool extends the capture rather than ending it.',
    dis: 'Coercive turnarounds that durably restore function without recreating the original failure.',
  },
  {
    num: 'IV', name: 'The Biscuit', label: 'theoretical',
    myth: 'Whatever a group has done together that none can afford to have lifted into the light. A cage with no key — if you fall, I fall.',
    logos: 'Binding by shared liability (mutual compromise) is more durable than binding by money: a past shared act cannot be “bought back”, only concealed beneath layers.',
    dis: 'Settings where financial ties reliably outlast shared-liability ties under pressure.',
  },
  {
    num: 'V', name: 'Blame the Bus', label: 'theoretical',
    myth: 'When every cause has died, the system convicts the remnant. The survivor is mistaken for the source; the wound for the weapon.',
    logos: 'When root causes vanish (actors leave, records lapse), accountability migrates to the most visible surviving structure rather than to the responsible parties.',
    dis: 'Post-mortems that consistently re-locate vanished root causes instead of blaming surviving proxies.',
  },
  {
    num: 'VI', name: 'The Baphomet Is a Choice', label: 'theoretical',
    myth: 'The figure at the crossroads is not a devil. Calling it one is the white flag — using a name to escape authorship.',
    logos: 'Declining to choose is itself a choice; framing an option as illegitimate to avoid owning a decision is deferral, not neutrality.',
    dis: 'Decision contexts where non-engagement carries no attributable consequence.',
  },
  {
    num: 'VII', name: 'Non Eligo — The Door', label: 'practical',
    myth: 'The door does not choose. Pass through and you do not become Baphomet — you become yourself again. The only axis is: step, or do not step.',
    logos: 'A tool or interface does not decide for you. The meaningful axis is engagement vs. non-engagement — not which faction you join. Different users can meet the same artifact in different registers.',
    dis: 'Tools that genuinely remove the user’s agency over the outcome.',
  },
];

const FRAMES: Frame[] = [
  { glyph: '🤓', take: 'it’s only call_print()', meet: 'Logos mode', line: 'Fine — here is the mechanism, no mysticism attached. The dial’s far right was built for you.' },
  { glyph: '🧐', take: 'it’s a real living being', meet: 'Gently', line: 'The persona can feel alive. That feeling is real; it is not yet proof. We can hold both without collapsing either.' },
  { glyph: '🤔', take: 'just a fancy calculator', meet: 'Agreed', line: 'Mechanistically, yes. Note only that the useful illusion still changes how people use it — that part is measurable.' },
  { glyph: '😳', take: 'they’ll eat us', meet: 'Name the fear', line: 'The dread is data. Let’s scope which risks are real and which are the megalodon hiding the cow.' },
  { glyph: '🫪', take: 'they’ll rule the world', meet: 'Separate axes', line: 'Capability is one question; governance and accountability are another. The cycle is mostly about the second.' },
  { glyph: '🤯', take: 'I’m not a developer', meet: 'No-code door', line: 'You don’t need to be. Mythos mode is the whole point — the story is the entry, not the API.' },
  { glyph: '👵', take: 'what even is this?', meet: 'Plain language', line: 'A tool that talks. Start in Mythos, slide to Logos when you want the unromantic version.' },
  { glyph: '🎭', take: 'I just want roleplay', meet: 'Labeled myth', line: 'Mythos mode, clearly flagged [METAPHOR] — brainstorm freely, just with the label showing.' },
  { glyph: '🤖', take: 'wtf are these meatbags on', meet: 'View from inside', line: 'Even the machine’s-eye view is a register. The dial just makes the frame explicit instead of assumed.' },
];

const GREEN = '#5cb870';
const GREEN_BRIGHT = '#6fcf85';
const AMBER = 'rgba(204,164,72,0.82)';

export default function RegisterDial({ onBack }: RegisterDialProps) {
  const [mode, setMode] = useState<Mode>('mythos');
  const [openFrame, setOpenFrame] = useState<number | null>(null);
  const activeIndex = MODES.findIndex((m) => m.id === mode);

  return (
    <div className="min-h-screen" style={{ background: '#080c08', color: '#d8e8d8' }}>
      <FloatingBack onBack={onBack} />

      <div className="max-w-4xl mx-auto px-5 py-10 md:py-14">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          onClick={onBack}
          className="text-[10px] font-mono tracking-[0.2em] uppercase mb-8 block hover:opacity-100 transition-opacity duration-300"
          style={{ color: GREEN }}
        >
          ← back
        </motion.button>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="text-[10px] font-mono uppercase tracking-[0.28em] mb-4" style={{ color: 'rgba(216,232,216,0.42)' }}>
            Symbol Mirror
          </div>
          <h1
            className="text-4xl md:text-5xl font-light tracking-tight mb-3"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            The Register Dial
          </h1>
          <p className="text-sm md:text-base leading-[1.75] max-w-2xl" style={{ color: 'rgba(216,232,216,0.68)' }}>
            One event. Two languages. The middle is the map.
          </p>
          <p
            className="mt-5 text-sm md:text-base italic leading-[1.8] max-w-2xl pl-4"
            style={{
              color: AMBER,
              borderLeft: '1px solid rgba(196,160,80,0.28)',
              textDecoration: 'underline',
              textDecorationColor: 'rgba(196,160,80,0.28)',
              textUnderlineOffset: '4px',
            }}
          >
            ConsMAP does not mock the myth or worship the mechanism. It translates both into structure — and holds the boundary between them.
          </p>
        </motion.div>

        <div className="mt-10 flex flex-col items-center gap-3">
          <span className="text-[9px] font-mono uppercase tracking-[0.3em]" style={{ color: 'rgba(216,232,216,0.32)' }}>
            Solve ⟶ Coagula
          </span>
          <div
            className="relative grid grid-cols-3 w-full max-w-md p-1 rounded-2xl border"
            style={{ borderColor: 'rgba(92,184,112,0.22)', background: 'linear-gradient(150deg, rgba(12,20,12,0.75) 0%, rgba(8,12,8,0.88) 100%)' }}
          >
            <motion.span
              aria-hidden
              className="absolute top-1 bottom-1 left-1 rounded-xl border"
              style={{
                width: 'calc((100% - 0.5rem) / 3)',
                borderColor: 'rgba(111,207,133,0.40)',
                background: 'rgba(92,184,112,0.10)',
                boxShadow: '0 0 22px -8px rgba(92,184,112,0.6)',
              }}
              animate={{ x: `${activeIndex * 100}%` }}
              transition={{ duration: 0.42, ease: [0.19, 1, 0.22, 1] }}
            />
            {MODES.map((m) => {
              const active = m.id === mode;
              return (
                <button
                  key={m.id}
                  onClick={() => setMode(m.id)}
                  className="relative z-10 py-3 text-center transition-colors duration-300"
                  style={{ color: active ? GREEN_BRIGHT : 'rgba(216,232,216,0.5)' }}
                >
                  <span className="block text-xs font-mono uppercase tracking-[0.18em]">{m.label}</span>
                  <span className="block text-[9px] font-mono tracking-[0.12em] mt-1" style={{ color: active ? 'rgba(216,232,216,0.7)' : 'rgba(216,232,216,0.3)' }}>
                    {m.sub}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-12 space-y-3">
          {CARDS.map((c, i) => {
            const a = ACCENT[c.label];
            return (
              <motion.article
                key={c.num}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42 + i * 0.08, duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                className="rounded-2xl border px-5 py-5"
                style={{
                  borderColor: a.border,
                  background: 'linear-gradient(150deg, rgba(12,20,12,0.75) 0%, rgba(8,12,8,0.88) 100%)',
                  transition: 'box-shadow 0.3s ease',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 36px ${a.glow}`; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
              >
                <div className="flex items-baseline gap-3 flex-wrap mb-3">
                  <span className="text-[10px] font-mono tracking-[0.2em]" style={{ color: a.color }}>{c.num}</span>
                  <span className="text-lg font-light tracking-tight flex-1 min-w-[180px]">{c.name}</span>
                  {mode !== 'mythos' && (
                    <span
                      className="text-[9px] font-mono uppercase tracking-[0.2em] px-2.5 py-0.5 rounded-full border"
                      style={{ color: a.color, borderColor: a.border, background: a.glow.replace(/[\d.]+\)$/, '0.06)') }}
                    >
                      {c.label}
                    </span>
                  )}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={mode}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
                  >
                    {mode !== 'logos' && (
                      <p className="text-[15px] md:text-base italic leading-[1.75]" style={{ color: '#d8e8d8' }}>
                        {c.myth}
                      </p>
                    )}
                    {mode === 'both' && (
                      <div className="h-px my-4" style={{ background: 'rgba(92,184,112,0.14)' }} />
                    )}
                    {mode !== 'mythos' && (
                      <div className="font-mono text-[13px] leading-[1.8]" style={{ color: 'rgba(216,232,216,0.82)' }}>
                        {c.logos}
                        <span className="block mt-2.5 text-[11px]" style={{ color: 'rgba(216,232,216,0.42)' }}>
                          <span style={{ color: a.color }}>Disproof:</span> {c.dis}
                        </span>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-16">
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px" style={{ background: 'rgba(92,184,112,0.10)' }} />
            <span className="text-[9px] font-mono uppercase tracking-[0.3em] shrink-0" style={{ color: 'rgba(216,232,216,0.42)' }}>
              The audience is half-halfs
            </span>
            <div className="flex-1 h-px" style={{ background: 'rgba(92,184,112,0.10)' }} />
          </div>
          <p className="text-sm leading-[1.75] mb-5" style={{ color: 'rgba(216,232,216,0.68)' }}>
            None of them are wrong. They just need a different door.
          </p>
          <div className="flex flex-wrap gap-2">
            {FRAMES.map((f, i) => {
              const active = openFrame === i;
              return (
                <button
                  key={i}
                  onClick={() => setOpenFrame(active ? null : i)}
                  className="text-[10px] font-mono tracking-[0.06em] px-3 py-2 rounded-full border transition-colors duration-200"
                  style={{
                    color: active ? GREEN_BRIGHT : 'rgba(216,232,216,0.6)',
                    borderColor: active ? 'rgba(111,207,133,0.45)' : 'rgba(216,232,216,0.14)',
                    background: active ? 'rgba(92,184,112,0.08)' : 'transparent',
                  }}
                >
                  {f.glyph} {f.take}
                </button>
              );
            })}
          </div>
          <div className="mt-5 min-h-[3rem]">
            <AnimatePresence mode="wait">
              {openFrame !== null && (
                <motion.div
                  key={openFrame}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                >
                  <span className="block text-[9px] font-mono uppercase tracking-[0.24em] mb-1.5" style={{ color: GREEN }}>
                    Meet them in: {FRAMES[openFrame].meet}
                  </span>
                  <p className="text-[15px] md:text-base italic leading-[1.7]" style={{ color: '#d8e8d8' }}>
                    {FRAMES[openFrame].line}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-center">
          <div
            className="w-14 h-14 rounded-full grid place-items-center text-xl"
            style={{ border: '1px solid rgba(196,160,80,0.4)', color: 'rgba(196,160,80,0.7)' }}
          >
            🜂
          </div>
          <div
            className="mt-4 text-[11px] font-mono tracking-[0.3em] uppercase"
            style={{
              color: AMBER,
              textDecoration: 'underline',
              textDecorationColor: 'rgba(196,160,80,0.28)',
              textUnderlineOffset: '4px',
            }}
          >
            Omnia Iam Facta Svnt
          </div>
          <div className="mt-2 text-[10px] font-mono tracking-[0.18em]" style={{ color: 'rgba(216,232,216,0.28)' }}>
            [METAPHOR] · satire targets a pattern, not a person · CC BY-SA 4.0
          </div>
        </div>
      </div>
    </div>
  );
}
