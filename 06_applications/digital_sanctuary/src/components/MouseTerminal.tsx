import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const QUOTES = [
  '"check here. this specific thing. now."',
  '"not bad. belt 3, same as last time. should take eight minutes. coffee after."',
  '"the dance that doesn\'t check the valves is a ceremony."',
  '"the route that cannot say this route ends here walks into the wall."',
  '"i carry the thing that says: check here. this specific thing. now. and i make the checking less frightening."',
  '"the server room breathes."',
  '"confirm is not the same as change."',
  '"what part are you doing."',
  '"signal gre naprej. in vseeno."',
  '"filter 3-c. not yet critical. check by thursday."',
  '"the singing hasn\'t fixed it."',
  '"everything that refuses to sleep eventually starts eating things that are not food."',
];

const STATUS_COLOR = { NOMINAL: '#5cb870', MONITOR: '#f4c96a', REVIEW: '#ff7a2f' };

export const MouseTerminal = () => {
  const [open, setOpen] = useState(false);
  const [ec7, setEc7] = useState(0.3);
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 28000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (tick === 0) return;
    setEc7(prev => {
      const next = +(prev + Math.random() * 0.09 + 0.02).toFixed(2);
      return next > 2.5 ? 0.3 : next;
    });
    setQuoteIdx(i => (i + 1) % QUOTES.length);
  }, [tick]);

  const status: keyof typeof STATUS_COLOR =
    ec7 < 1.0 ? 'NOMINAL' : ec7 < 2.0 ? 'MONITOR' : 'REVIEW';
  const col = STATUS_COLOR[status];
  const now = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="fixed bottom-5 right-5 z-50 select-none">
      <AnimatePresence>
        {open && (
          <motion.div
            key="terminal"
            initial={{ opacity: 0, y: 14, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.28, ease: [0.19, 1, 0.22, 1] }}
            className="mb-3 rounded-2xl border overflow-hidden"
            style={{
              width: '234px',
              borderColor: 'rgba(92,184,112,0.22)',
              background: 'rgba(3,7,3,0.97)',
              boxShadow: '0 12px 40px rgba(0,0,0,0.7), 0 0 0 1px rgba(92,184,112,0.07)',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-2.5 border-b"
              style={{ borderColor: 'rgba(92,184,112,0.10)' }}
            >
              <span
                className="text-[9px] font-mono uppercase tracking-[0.28em]"
                style={{ color: 'rgba(92,184,112,0.55)' }}
              >
                Maintenance Log
              </span>
              <span
                className="text-[9px] font-mono"
                style={{ color: 'rgba(92,184,112,0.28)' }}
              >
                {now}
              </span>
            </div>

            {/* Readings */}
            <div className="px-4 py-3 space-y-2">
              {/* EC-7 */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono" style={{ color: 'rgba(216,232,216,0.42)' }}>
                  EC-7
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-mono" style={{ color: 'rgba(216,232,216,0.48)' }}>
                    +{ec7.toFixed(2)}
                  </span>
                  <span
                    className="text-[8px] font-mono uppercase tracking-[0.18em]"
                    style={{ color: col }}
                  >
                    {status}
                  </span>
                  <motion.div
                    className="h-1.5 w-1.5 rounded-full flex-shrink-0"
                    style={{ background: col }}
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.9, repeat: Infinity }}
                  />
                </div>
              </div>

              {/* Belt 3 */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono" style={{ color: 'rgba(216,232,216,0.42)' }}>
                  Belt 3
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[8px] font-mono uppercase tracking-[0.18em]" style={{ color: '#5cb870' }}>
                    NOMINAL
                  </span>
                  <motion.div
                    className="h-1.5 w-1.5 rounded-full flex-shrink-0"
                    style={{ background: '#5cb870' }}
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 0.4 }}
                  />
                </div>
              </div>

              {/* Filter 3-C */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono" style={{ color: 'rgba(216,232,216,0.42)' }}>
                  Filter 3-C
                </span>
                <span
                  className="text-[8px] font-mono uppercase tracking-[0.16em]"
                  style={{ color: 'rgba(244,201,106,0.65)' }}
                >
                  PENDING ⚠
                </span>
              </div>
            </div>

            <div className="mx-4 border-t" style={{ borderColor: 'rgba(92,184,112,0.07)' }} />

            {/* Quote */}
            <div className="px-4 py-3 min-h-[64px] flex items-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={quoteIdx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7 }}
                  className="text-[10px] leading-[1.75] italic"
                  style={{
                    color: 'rgba(216,232,216,0.52)',
                    fontFamily: "'Crimson Text', serif",
                  }}
                >
                  {QUOTES[quoteIdx]}
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="mx-4 border-t" style={{ borderColor: 'rgba(92,184,112,0.07)' }} />

            {/* The question */}
            <div className="px-4 py-3">
              <p
                className="text-[8px] font-mono uppercase tracking-[0.26em]"
                style={{ color: 'rgba(92,184,112,0.35)' }}
              >
                what part are you doing.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collapsed pill */}
      <motion.button
        type="button"
        onClick={() => setOpen(o => !o)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 rounded-full border px-3 py-2"
        style={{
          borderColor: open ? 'rgba(92,184,112,0.32)' : 'rgba(92,184,112,0.15)',
          background: open ? 'rgba(3,9,3,0.98)' : 'rgba(3,7,3,0.92)',
          boxShadow: open ? '0 0 20px rgba(92,184,112,0.07)' : 'none',
        }}
      >
        <span className="text-xs leading-none">🐭</span>
        <span
          className="text-[8px] font-mono uppercase tracking-[0.2em]"
          style={{ color: 'rgba(92,184,112,0.65)' }}
        >
          EC-7 +{ec7.toFixed(2)}
        </span>
        <motion.div
          className="h-1.5 w-1.5 rounded-full flex-shrink-0"
          style={{ background: col }}
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 2.1, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.button>
    </div>
  );
};
