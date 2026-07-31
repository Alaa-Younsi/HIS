import { LANGS, type Lang } from '@/i18n/types';

/**
 * Chemins du site, sans le préfixe de langue.
 * Les URL réelles sont /fr/…, /en/…, /ar/… — un préfixe par langue,
 * ce qui permet à Google d'indexer chaque version séparément (hreflang).
 */
export const paths = {
  home: '',
  about: 'a-propos',
  services: 'services',
  projects: 'realisations',
  sectors: 'secteurs',
  why: 'pourquoi-his',
  contact: 'contact',
} as const;

export type PathKey = keyof typeof paths;

/** Construit une URL absolue au sein du site : href('en', 'about') → "/en/a-propos". */
export function href(lang: Lang, key: PathKey, sub?: string): string {
  const segments = [lang, paths[key], sub].filter((segment): segment is string => Boolean(segment));
  return `/${segments.join('/')}`;
}

/**
 * Le segment correspond-il à une page du site (hors préfixe de langue) ?
 * Sert à rattraper les adresses tapées ou partagées sans préfixe — "/contact"
 * plutôt que "/fr/contact".
 */
export function isKnownPath(segment: string): boolean {
  return Object.values(paths).some((path) => path !== '' && path === segment);
}

/** Toutes les URL du site — utilisé pour le sitemap et les balises hreflang. */
export function allRoutes(serviceSlugs: readonly string[]): string[] {
  const keys = Object.keys(paths) as PathKey[];
  return LANGS.flatMap((lang) => [
    ...keys.map((key) => href(lang, key)),
    ...serviceSlugs.map((slug) => href(lang, 'services', slug)),
  ]);
}

/** Même page, autre langue : "/fr/services/ventilation" → "/ar/services/ventilation". */
export function swapLangInPath(pathname: string, nextLang: Lang): string {
  const segments = pathname.split('/').filter(Boolean);
  segments[0] = nextLang;
  return `/${segments.join('/')}`;
}
