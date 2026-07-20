import type { Localized } from '@/i18n/types';

export type Partner = {
  name: string;
  /** Déposez le logo dans public/images/logos/ (PNG/SVG transparent). Sinon le nom s'affiche en toutes lettres. */
  logo: string;
  url?: string;
};

/**
 * ─────────────────────────────────────────────────────────────
 *  CLIENTS — « Ils nous ont fait confiance »
 * ─────────────────────────────────────────────────────────────
 */
export const clients: readonly Partner[] = [
  { name: 'Kalipap', logo: '/images/logos/kalipap.png' },
  { name: 'Bessa Promotion', logo: '/images/logos/bessa.png' },
  { name: 'Baytimod Construction', logo: '/images/logos/baytimod.png' },
  { name: 'ONAB', logo: '/images/logos/onab.png' },
];

/**
 * ─────────────────────────────────────────────────────────────
 *  FOURNISSEURS / MARQUES PARTENAIRES
 * ─────────────────────────────────────────────────────────────
 */
export const suppliers: readonly Partner[] = [
  { name: 'LG', logo: '/images/logos/lg.png' },
  { name: 'Carrier', logo: '/images/logos/carrier.png' },
  { name: 'Mitsubishi', logo: '/images/logos/mitsubishi.png' },
  { name: 'Daikin', logo: '/images/logos/daikin.png' },
  { name: 'Midea', logo: '/images/logos/midea.png' },
  { name: 'Hisense', logo: '/images/logos/hisense.png' },
  { name: 'Trane', logo: '/images/logos/trane.png' },
  { name: 'Haier', logo: '/images/logos/haier.png' },
  { name: 'Condor', logo: '/images/logos/condor.png' },
  { name: 'Proclim', logo: '/images/logos/proclim.png' },
  { name: 'Ideal Duct', logo: '/images/logos/ideal-duct.png' },
];

export const clientsIntro: Localized = {
  fr: "Leur confiance témoigne de notre engagement à fournir des prestations de qualité, réalisées dans le respect des exigences techniques, des délais et des normes en vigueur.",
  en: 'Their trust reflects our commitment to delivering quality work that respects technical requirements, deadlines and applicable standards.',
  ar: 'ثقتهم تشهد على التزامنا بتقديم خدمات ذات جودة، منجزة وفق المتطلبات التقنية والآجال والمعايير السارية.',
};
