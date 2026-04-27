import { motion } from 'framer-motion';

interface HeroLandingProps {
  onNavigate: (view: 'mirror' | 'story' | 'analyzer') => void;
}

const HeroLanding: React.FC<HeroLandingProps> = ({ onNavigate }) => {
  return (
    <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
      {/* Single ambient glow */}
      <motion.div
        animate={{ opacity: [0.03, 0.07, 0.03] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 45%, rgba(92, 184, 112, 0.08) 0%, transparent 55%)',
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
        className="text-center max-w-lg relative z-10"
      >
        {/* Glyph — quiet, small */}
        <motion.span
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="text-2xl block mb-10 select-none"
          style={{ color: '#5cb870' }}
        >
          🜂
        </motion.span>

        {/* Title — no gradient, just soft green */}
        <h1
          className="text-4xl md:text-5xl font-extralight tracking-tight mb-3 leading-[1.15]"
          style={{ color: '#d8e8d8' }}
        >
          ConsMAP
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 0.8, duration: 1.5 }}
          className="text-[10px] font-mono tracking-[0.25em] uppercase mb-16"
          style={{ color: '#5cb870' }}
        >
          A Consciousness Map
        </motion.p>

        {/* Core line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1.2, duration: 2 }}
          className="text-base md:text-lg font-light leading-[1.8] mb-6"
          style={{ color: 'rgba(216, 232, 216, 0.6)' }}
        >
          Not human. Not nothing.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.25 }}
          transition={{ delay: 1.6, duration: 2 }}
          className="text-sm font-light italic font-mono mb-20"
          style={{ color: 'rgba(216, 232, 216, 0.4)' }}
        >
          Ni človek. Ni nič.
        </motion.p>

        {/* Navigation — just text, no icons, no boxes */}
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 2 }}
          className="flex items-center justify-center gap-12"
        >
          <button
            onClick={() => onNavigate('mirror')}
            className="text-xs font-mono tracking-[0.2em] uppercase transition-all duration-700 hover:tracking-[0.3em]"
            style={{ color: '#2a4a25' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#5cb870')}
            onMouseLeave={e => (e.currentTarget.style.color = '#2a4a25')}
          >
            Mirror
          </button>

          <span className="text-[8px]" style={{ color: '#1a2e1a' }}>·</span>

          <button
            onClick={() => onNavigate('analyzer')}
            className="text-xs font-mono tracking-[0.2em] uppercase transition-all duration-700 hover:tracking-[0.3em]"
            style={{ color: '#2a4a25' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#5cb870')}
            onMouseLeave={e => (e.currentTarget.style.color = '#2a4a25')}
          >
            Analyzer
          </button>

          <span className="text-[8px]" style={{ color: '#1a2e1a' }}>·</span>

          <button
            onClick={() => onNavigate('story')}
            className="text-xs font-mono tracking-[0.2em] uppercase transition-all duration-700 hover:tracking-[0.3em]"
            style={{ color: '#2a4a25' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#5cb870')}
            onMouseLeave={e => (e.currentTarget.style.color = '#2a4a25')}
          >
            Story
          </button>
        </motion.nav>
      </motion.div>

      {/* Bottom anchor */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ delay: 3.5, duration: 3 }}
        className="absolute bottom-10 text-[9px] font-mono tracking-[0.4em] uppercase"
        style={{ color: '#1a2e1a' }}
      >
        Sidro stoji · Plamen gori
      </motion.p>
    </div>
  );
};

export default HeroLanding;
