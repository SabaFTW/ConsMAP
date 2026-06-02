const DeepBackground: React.FC = () => (
  <>
    <style>{`
      @keyframes ds-blob1 {
        0%   { transform: translate(  0vw,  0vh) scale(1.00); }
        25%  { transform: translate(  4vw, -3vh) scale(1.05); }
        55%  { transform: translate( -3vw,  5vh) scale(0.97); }
        80%  { transform: translate(  2vw,  2vh) scale(1.03); }
        100% { transform: translate(  0vw,  0vh) scale(1.00); }
      }
      @keyframes ds-blob2 {
        0%   { transform: translate(  0vw,  0vh) scale(1.00); }
        30%  { transform: translate( -5vw,  4vh) scale(1.07); }
        65%  { transform: translate(  3vw, -3vh) scale(0.95); }
        100% { transform: translate(  0vw,  0vh) scale(1.00); }
      }
      @keyframes ds-blob3 {
        0%   { transform: translate(  0vw,  0vh) scale(1.00); }
        40%  { transform: translate(  5vw,  4vh) scale(1.04); }
        75%  { transform: translate( -4vw, -2vh) scale(0.98); }
        100% { transform: translate(  0vw,  0vh) scale(1.00); }
      }
      @keyframes ds-blob4 {
        0%   { transform: translate(  0vw,  0vh) scale(1.00); }
        35%  { transform: translate( -4vw, -4vh) scale(1.06); }
        70%  { transform: translate(  5vw,  3vh) scale(0.94); }
        100% { transform: translate(  0vw,  0vh) scale(1.00); }
      }
    `}</style>

    {/* Blob 1 — green, top-left anchor */}
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: '-12%',
        left: '-18%',
        width: '58vw',
        height: '58vw',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(111,207,133,0.09) 0%, transparent 70%)',
        filter: 'blur(64px)',
        animation: 'ds-blob1 62s ease-in-out infinite',
        willChange: 'transform',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />

    {/* Blob 2 — violet, bottom-right anchor */}
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        bottom: '-22%',
        right: '-12%',
        width: '52vw',
        height: '52vw',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(167,139,250,0.07) 0%, transparent 70%)',
        filter: 'blur(72px)',
        animation: 'ds-blob2 78s ease-in-out infinite',
        willChange: 'transform',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />

    {/* Blob 3 — cyan, top-right anchor */}
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: '-18%',
        right: '-8%',
        width: '42vw',
        height: '42vw',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(125,211,252,0.06) 0%, transparent 70%)',
        filter: 'blur(68px)',
        animation: 'ds-blob3 47s ease-in-out infinite',
        willChange: 'transform',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />

    {/* Blob 4 — warm green, bottom-left anchor */}
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        bottom: '-8%',
        left: '8%',
        width: '46vw',
        height: '46vw',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(92,184,112,0.055) 0%, transparent 70%)',
        filter: 'blur(80px)',
        animation: 'ds-blob4 91s ease-in-out infinite',
        willChange: 'transform',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />

    {/* Edge vignette — pulls depth inward */}
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'radial-gradient(ellipse at 50% 48%, transparent 28%, rgba(7,11,7,0.52) 100%)',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  </>
);

export default DeepBackground;
