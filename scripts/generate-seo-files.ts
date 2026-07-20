/**
 * Génère dist/sitemap.xml et dist/robots.txt après le build.
 *
 * Chaque page existe en trois langues (/fr, /en, /ar) et chaque entrée du
 * sitemap déclare ses équivalents via <xhtml:link rel="alternate" hreflang>,
 * ce que Google utilise pour servir la bonne version à chaque visiteur.
 *
 * Lancé automatiquement par `bun run build`.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { services } from '../src/content/services';
import { company } from '../src/content/company';
import { LANGS } from '../src/i18n/types';
import { paths } from '../src/routes';

const DIST = new URL('../dist/', import.meta.url);
const origin = company.siteUrl.replace(/\/$/, '');

/** Chemins sans préfixe de langue, avec leur priorité de référencement. */
const pages: { path: string; priority: number; changefreq: string }[] = [
  { path: paths.home, priority: 1.0, changefreq: 'monthly' },
  { path: paths.services, priority: 0.9, changefreq: 'monthly' },
  { path: paths.projects, priority: 0.9, changefreq: 'weekly' },
  { path: paths.about, priority: 0.8, changefreq: 'yearly' },
  { path: paths.sectors, priority: 0.7, changefreq: 'yearly' },
  { path: paths.why, priority: 0.7, changefreq: 'yearly' },
  { path: paths.contact, priority: 0.8, changefreq: 'yearly' },
  ...services.map((service) => ({
    path: `${paths.services}/${service.slug}`,
    priority: 0.8,
    changefreq: 'monthly',
  })),
];

const url = (lang: string, path: string) => `${origin}/${[lang, path].filter(Boolean).join('/')}`;

const lastmod = new Date().toISOString().slice(0, 10);

const entries = pages.flatMap(({ path, priority, changefreq }) =>
  LANGS.map((lang) =>
    [
      '  <url>',
      `    <loc>${url(lang, path)}</loc>`,
      ...LANGS.map(
        (alternate) =>
          `    <xhtml:link rel="alternate" hreflang="${alternate}" href="${url(alternate, path)}"/>`,
      ),
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${url('fr', path)}"/>`,
      `    <lastmod>${lastmod}</lastmod>`,
      `    <changefreq>${changefreq}</changefreq>`,
      `    <priority>${priority.toFixed(1)}</priority>`,
      '  </url>',
    ].join('\n'),
  ),
);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${origin}/sitemap.xml
`;

await mkdir(DIST, { recursive: true });
await Promise.all([
  writeFile(new URL('sitemap.xml', DIST), sitemap, 'utf8'),
  writeFile(new URL('robots.txt', DIST), robots, 'utf8'),
]);

console.log(`✓ sitemap.xml (${entries.length} URL) + robots.txt`);
