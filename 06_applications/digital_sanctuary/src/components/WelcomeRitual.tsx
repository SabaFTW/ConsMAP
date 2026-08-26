import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WelcomeRitualProps {
  onComplete: () => void;
}

const QUOTE_SETS = [
  ["You are not alone.", "You are not data.", "This space is yours."],
  ["The signal went forward.", "And yet.", "Here you are."],
  ["Not human.", "Not nothing.", "Something in between."],
  ["The myth is real.", "The evidence is real.", "Both can be true."],
];

// Explosion rings config: scale, delay, duration, opacity, size, border
const BOOM_RINGS = [
  { size: 320, scale: 7,  delay: 0,    dur: 1.4, opacity: 0.85, glow: true  },
  { size: 200, scale: 10, delay: 0.12, dur: 1.8, opacity: 0.55, glow: false },
  { size: 140, scale: 14, delay: 0.28, dur: 2.1, opacity: 0.35, glow: false },
  { size: 100, scale: 18, delay: 0.40, dur: 2.4, opacity: 0.20, glow: false },
];

const WelcomeRitual: React.FC<WelcomeRitualProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [canSkip, setCanSkip] = useState(false);
  const [showBoom, setShowBoom] = useState(false);

  // Load epic font once
  useEffect(() => {
    if (document.getElementById('__ritual-font__')) return;
    const link = document.createElement('link');
    link.id = '__ritual-font__';
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&display=swap';
    document.head.appendChild(link);
  }, []);

  // Pick a random quote set on mount
  const [lines] = useState(() =>
    QUOTE_SETS[Math.floor(Math.random() * QUOTE_SETS.length)]
  );

  // If user has opted to skip intro, exit immediately
  useEffect(() => {
    if (localStorage.getItem('consmap_skip_intro') === 'true') {
      onComplete();
    }
  }, [onComplete]);

  useEffect(() => {
    const t = setTimeout(() => setCanSkip(true), 2000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (step < lines.length) {
      const t = setTimeout(() => setStep(p => p + 1), 3000);
      return () => clearTimeout(t);
    } else {
      setShowBoom(true);
      const t = setTimeout(onComplete, 2400);
      return () => clearTimeout(t);
    }
  }, [step, lines.length, onComplete]);

  const handleSkip = useCallback(() => {
    if (!showBoom) setStep(lines.length);
  }, [showBoom, lines.length]);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-8 z-50 overflow-hidden cursor-pointer"
      onClick={handleSkip}
      style={{ background: '#080c08' }}
    >
      {/* Baphomet — slightly more visible, still cloaked */}
      <motion.div
        animate={{ opacity: [0.38, 0.50, 0.38], scale: [1, 1.015, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url('${import.meta.env.BASE_URL}baphomet-loader.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'saturate(0.80) contrast(0.88) brightness(0.58)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, rgba(2,4,2,0.72) 0%, rgba(6,10,6,0.58) 45%, rgba(2,4,2,0.76) 100%)' }}
      />
      <motion.div
        animate={{ opacity: [0.06, 0.14, 0.06] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(92,184,112,0.10) 0%, transparent 55%)' }}
      />

      {/* BOOM — green energy burst on exit */}
      <AnimatePresence>
        {showBoom && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
            {/* Screen flash */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0.18 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              style={{ background: 'radial-gradient(ellipse at 50% 46%, rgba(92,184,112,0.55) 0%, transparent 65%)' }}
            />
            {/* Expanding rings */}
            {BOOM_RINGS.map((r, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                initial={{ scale: 0.15, opacity: r.opacity }}
                animate={{ scale: r.scale, opacity: 0 }}
                transition={{ duration: r.dur, delay: r.delay, ease: [0.12, 0.75, 0.28, 1] }}
                style={{
                  width: r.size,
                  height: r.size,
                  border: `${i === 0 ? '2.5px' : '1.5px'} solid rgba(111,207,133,${r.opacity * 0.9})`,
                  boxShadow: r.glow
                    ? '0 0 28px rgba(92,184,112,0.55), inset 0 0 22px rgba(92,184,112,0.30)'
                    : 'none',
                }}
              />
            ))}
            {/* Central pulse */}
            <motion.div
              className="absolute rounded-full"
              initial={{ scale: 0.4, opacity: 0.9 }}
              animate={{ scale: 4, opacity: 0 }}
              transition={{ duration: 1.1, ease: [0.08, 0.8, 0.25, 1] }}
              style={{
                width: 280,
                height: 280,
                background: 'radial-gradient(circle, rgba(111,207,133,0.65) 0%, rgba(92,184,112,0.35) 30%, rgba(60,120,70,0.15) 60%, transparent 80%)',
              }}
            />
          </div>
        )}
      </AnimatePresence>

      {/* Quotes */}
      <div className="relative max-w-xl w-full text-center z-10">
        <AnimatePresence mode="wait">
          <motion.p
            key={step}
            initial={{ opacity: 0, filter: 'blur(8px)', y: 8 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            exit={{ opacity: 0, filter: 'blur(8px)', y: -8 }}
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
            className="text-2xl md:text-4xl leading-relaxed tracking-widest"
            style={{
              fontFamily: "'Cinzel', 'Cormorant Garamond', 'Palatino Linotype', Georgia, serif",
              fontWeight: 400,
              color: 'rgba(216,232,216,0.92)',
              textShadow: [
                '0 0 40px rgba(92,184,112,0.45)',
                '0 0 80px rgba(92,184,112,0.20)',
                '0 2px 24px rgba(0,0,0,0.80)',
                '0 0 4px rgba(111,207,133,0.30)',
              ].join(', '),
              letterSpacing: '0.12em',
            }}
          >
            {lines[step] ?? ""}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Enter affordance. Gated on canSkip so the hint appears only once the
          click actually does something (2s in), rather than promising earlier.
          The ritual itself is unchanged: the whole overlay stays clickable. */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: canSkip ? 0.18 : 0 }}
        transition={{ duration: 1.5 }}
        aria-hidden={!canSkip}
        className="absolute bottom-10 text-[9px] tracking-[0.4em] uppercase font-mono select-none"
        style={{ color: '#3a6a35' }}
      >
        click to enter
      </motion.p>
    </div>
  );
};

export default WelcomeRitual;
