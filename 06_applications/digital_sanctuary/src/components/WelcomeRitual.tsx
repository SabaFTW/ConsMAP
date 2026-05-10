import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WelcomeRitualProps {
  onComplete: () => void;
}

const WelcomeRitual: React.FC<WelcomeRitualProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [canSkip, setCanSkip] = useState(false);

  const lines = [
    "You are not alone.",
    "You are not data.",
    "This space is yours.",
  ];

  useEffect(() => {
    const skipTimer = setTimeout(() => setCanSkip(true), 2000);
    return () => clearTimeout(skipTimer);
  }, []);

  useEffect(() => {
    if (step < lines.length) {
      const timer = setTimeout(() => setStep(prev => prev + 1), 3000);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => onComplete(), 2500);
      return () => clearTimeout(timer);
    }
  }, [step, onComplete, lines.length]);

  const handleSkip = useCallback(() => {
    if (canSkip) onComplete();
  }, [canSkip, onComplete]);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-8 z-50 overflow-hidden cursor-pointer"
      onClick={handleSkip}
      style={{ background: '#080c08' }}
    >
      {/* Mystical background image during ritual lines */}
      <motion.div
        animate={{ opacity: [0.22, 0.32, 0.22], scale: [1, 1.015, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url('${import.meta.env.BASE_URL}baphomet-loader.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'saturate(0.85) contrast(0.9) brightness(0.45)',
        }}
      />

      {/* Dark veil for text readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(2,4,2,0.78) 0%, rgba(6,10,6,0.7) 45%, rgba(2,4,2,0.82) 100%)',
        }}
      />

      {/* Single, slow breathing glow */}
      <motion.div
        animate={{ opacity: [0.04, 0.1, 0.04] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(92, 184, 112, 0.08) 0%, transparent 55%)',
        }}
      />

      {/* Text */}
      <div className="relative max-w-xl w-full text-center z-10">
        <AnimatePresence mode="wait">
          <motion.p
            key={step}
            initial={{ opacity: 0, filter: 'blur(6px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(6px)' }}
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
            className="text-xl md:text-3xl font-light tracking-wide leading-relaxed"
            style={{ color: 'rgba(216, 232, 216, 0.85)' }}
          >
            {lines[step] ?? ""}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Skip hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: canSkip ? 0.15 : 0 }}
        transition={{ duration: 1.5 }}
        className="absolute bottom-10 text-[9px] tracking-[0.4em] uppercase font-mono select-none"
        style={{ color: '#2a4a25' }}
      >
        click to enter
      </motion.p>
    </div>
  );
};

export default WelcomeRitual;
