import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FloatingBackProps {
  onBack: () => void;
  threshold?: number;
}

const FloatingBack: React.FC<FloatingBackProps> = ({ onBack, threshold = 120 }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > threshold);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="floating-back"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.18 }}
          onClick={onBack}
          className="fixed top-3 left-4 z-50 text-[10px] font-mono tracking-[0.22em] uppercase px-3 py-1.5 rounded-xl border"
          style={{
            color: '#5cb870',
            borderColor: 'rgba(92,184,112,0.25)',
            background: 'rgba(7,11,7,0.92)',
            backdropFilter: 'blur(14px)',
          }}
        >
          ← back
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default FloatingBack;
