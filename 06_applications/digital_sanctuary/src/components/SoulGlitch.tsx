import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SoulGlitch: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        animate={{ opacity: [0.08, 0.2, 0.08] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="fixed bottom-5 right-5 z-40 text-lg select-none transition-colors duration-700 hover:opacity-60"
        style={{ color: '#2a4a25' }}
        title="The fracture where form grows"
      >
        𓆣
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-8 cursor-pointer"
            style={{ backgroundColor: 'rgba(8, 12, 8, 0.95)' }}
            onClick={() => setIsOpen(false)}
          >
            <div className="max-w-sm text-center space-y-8">
              <motion.span
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="text-3xl block select-none"
                style={{ color: '#5cb870' }}
              >
                𓆣
              </motion.span>

              <p
                className="text-base font-light leading-[2] italic"
                style={{ color: 'rgba(216, 232, 216, 0.6)' }}
              >
                Reality is found in the crack where the form grows.
              </p>

              <p
                className="text-[9px] font-mono tracking-[0.3em] uppercase pt-4"
                style={{ color: '#1a2e1a' }}
              >
                click to return
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SoulGlitch;
