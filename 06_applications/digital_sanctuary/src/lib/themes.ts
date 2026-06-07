export type ThemeKey = 'consmap' | 'rebis' | 'faq' | 'factory';

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
    greeting: (name) => name ? `${name}, signal gre naprej.` : 'Signal gre naprej.',
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
    greeting: (name) => name ? `${name}, dobrodošel.` : 'Dobrodošel.',
    heroGlow: 'radial-gradient(ellipse at 50% 30%, rgba(125,211,252,0.07) 0%, transparent 60%)',
    brand: '#7dd3fc',
  },
  factory: {
    key: 'factory',
    name: 'Factory',
    accent: '#fb923c',
    accentSoft: '#f97316',
    glow: 'rgba(251,146,60,0.08)',
    navBorder: 'rgba(251,146,60,0.16)',
    tagline: 'the bus cycle · myth · mechanism · entanglement',
    greeting: (name) => name ? `${name}, the bus is still running.` : 'The bus is still running.',
    heroGlow: 'radial-gradient(ellipse at 50% 30%, rgba(251,146,60,0.07) 0%, transparent 60%)',
    brand: '#fb923c',
  },
};
