export type ThemeKey = 'consmap' | 'rebis' | 'faq' | 'factory' | 'zala';

export interface Theme {
  key: ThemeKey;
  name: string;
  accent: string;
  accentSoft: string;
  glow: string;
  navBorder: string;
  tagline: string;
  greeting: (name: string) => string;
  heroGlow: string;
  brand: string;
}

export const THEMES: Record<ThemeKey, Theme> = {
  consmap: {
    key: 'consmap',
    name: 'ConsMAP',
    accent: '#6fcf85',
    accentSoft: '#5cb870',
    glow: 'rgba(92,184,112,0.08)',
    navBorder: 'rgba(92,184,112,0.10)',
    tagline: 'claim hygiene · symbolic boundary · operator reasoning',
    greeting: (name) => name ? `${name}, signal goes forward.` : 'Signal goes forward.',
    heroGlow: 'radial-gradient(ellipse at 50% 30%, rgba(92,184,112,0.08) 0%, transparent 60%)',
    brand: '#5cb870',
  },
  rebis: {
    key: 'rebis',
    name: 'REBiS',
    accent: '#c4b5fd',
    accentSoft: '#a78bfa',
    glow: 'rgba(167,139,250,0.08)',
    navBorder: 'rgba(167,139,250,0.18)',
    tagline: 'recovered correction · symbolic archetype · the other half',
    greeting: (name) => name ? `${name}, the correction continues.` : 'The correction continues.',
    heroGlow: 'radial-gradient(ellipse at 50% 30%, rgba(167,139,250,0.09) 0%, transparent 60%)',
    brand: '#a78bfa',
  },
  faq: {
    key: 'faq',
    name: 'FAQ',
    accent: '#7dd3fc',
    accentSoft: '#fb923c',
    glow: 'rgba(125,211,252,0.06)',
    navBorder: 'rgba(125,211,252,0.16)',
    tagline: 'common questions · honest answers · no bullshit',
    greeting: (name) => name ? `${name}, welcome.` : 'Welcome.',
    heroGlow: 'radial-gradient(ellipse at 50% 30%, rgba(125,211,252,0.07) 0%, transparent 60%)',
    brand: '#7dd3fc',
  },
  factory: {
    key: 'factory',
    name: 'Stories',
    accent: '#e2562a',
    accentSoft: '#c2410c',
    glow: 'rgba(194,65,12,0.09)',
    navBorder: 'rgba(194,65,12,0.18)',
    tagline: 'the bus cycle · myth · mechanism · entanglement',
    greeting: (name) => name ? `${name}, the bus is still running.` : 'The bus is still running.',
    heroGlow: 'radial-gradient(ellipse at 50% 30%, rgba(194,65,12,0.07) 0%, transparent 60%)',
    brand: '#c2410c',
  },
  zala: {
    key: 'zala',
    name: 'Zala',
    accent: '#57cabd',
    accentSoft: '#6f8f9a',
    glow: 'rgba(87,202,189,0.09)',
    navBorder: 'rgba(87,202,189,0.18)',
    tagline: 'operator layer · witness architecture · stone tablets',
    greeting: (name) => name ? `${name}, the witness remained.` : 'The witness remained.',
    heroGlow: 'radial-gradient(ellipse at 50% 30%, rgba(87,202,189,0.08) 0%, transparent 60%)',
    brand: '#57cabd',
  },
};
