/**
 * Génère public/og-image.png (1200×630) — le visuel de partage réseaux sociaux
 * (Telegram, WhatsApp, Facebook, LinkedIn, X…) référencé par index.html et
 * src/components/Seo.tsx.
 *
 * Image vectorielle de marque (fond navy, emblème HIS, accent rouge) plutôt
 * qu'une photo générique : elle porte le logo et le message, comme l'aperçu de
 * référence. Rendu SVG → PNG via @resvg/resvg-js (aucun navigateur requis).
 *
 * Régénérer après un changement de logo/couleurs :  bun run scripts/generate-og-image.ts
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';

const root = new URL('../', import.meta.url);
const logo = `data:image/png;base64,${readFileSync(
  fileURLToPath(new URL('public/logo-his.png', root)),
).toString('base64')}`;
const outPath = fileURLToPath(new URL('public/og-image.png', root));

// Palette de marque (src/styles/index.css).
const NAVY_950 = '#00122a';
const NAVY_900 = '#001e42';
const NAVY_DEEP = '#000d1f';
const FLAME = '#d80612';
const FLAME_400 = '#ef5a64';
const MUTED = '#a9bcda';

const esc = (s: string) => s.replace(/&/g, '&amp;');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="${NAVY_950}"/>
      <stop offset="0.55" stop-color="${NAVY_900}"/>
      <stop offset="1" stop-color="${NAVY_DEEP}"/>
    </linearGradient>
    <radialGradient id="glow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1050 540) scale(560)">
      <stop offset="0" stop-color="${FLAME}" stop-opacity="0.38"/>
      <stop offset="1" stop-color="${FLAME}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(120 90) scale(420)">
      <stop offset="0" stop-color="#2755a1" stop-opacity="0.35"/>
      <stop offset="1" stop-color="#2755a1" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect width="1200" height="630" fill="url(#glow2)"/>

  <!-- Emblème filigrane, profondeur à droite -->
  <image xlink:href="${logo}" x="880" y="175" width="380" height="380" opacity="0.08"/>

  <!-- Liseré de marque haut et bas -->
  <rect x="0" y="0" width="1200" height="7" fill="${FLAME}"/>
  <rect x="0" y="623" width="1200" height="7" fill="${FLAME}"/>

  <!-- En-tête : emblème + logotype -->
  <image xlink:href="${logo}" x="90" y="66" width="104" height="104"/>
  <text x="212" y="128" font-family="Arial, sans-serif" font-weight="800" font-size="64" letter-spacing="1">
    <tspan fill="#ffffff">H</tspan><tspan fill="${FLAME}">I</tspan><tspan fill="#ffffff">S</tspan>
  </text>
  <text x="214" y="160" font-family="Arial, sans-serif" font-weight="700" font-size="17" letter-spacing="4" fill="${MUTED}">HVAC AND INDUSTRIAL SOLUTION</text>

  <!-- Titre -->
  <text x="90" y="318" font-family="Arial, sans-serif" font-weight="800" font-size="54" fill="#ffffff">Climatisation · Ventilation</text>
  <text x="90" y="388" font-family="Arial, sans-serif" font-weight="800" font-size="54">
    <tspan fill="#ffffff">Désenfumage · </tspan><tspan fill="${FLAME_400}">Protection incendie</tspan>
  </text>

  <!-- Accent -->
  <rect x="93" y="424" width="96" height="7" rx="3.5" fill="${FLAME}"/>

  <!-- Sous-titre -->
  <text x="90" y="492" font-family="Arial, sans-serif" font-weight="600" font-size="30" fill="${MUTED}">${esc(
    "Bureau d'études & solutions techniques industrielles",
  )}</text>

  <!-- Pied : localisation + domaine -->
  <text x="90" y="576" font-family="Arial, sans-serif" font-weight="700" font-size="27" fill="#ffffff">Blida — Algérie</text>
  <text x="1110" y="576" text-anchor="end" font-family="Arial, sans-serif" font-weight="700" font-size="27" fill="${FLAME_400}">his-steel.vercel.app</text>
</svg>`;

const png = new Resvg(svg, {
  fitTo: { mode: 'width', value: 1200 },
  font: { loadSystemFonts: true, defaultFontFamily: 'Arial' },
  background: NAVY_950,
})
  .render()
  .asPng();

writeFileSync(outPath, png);
console.log(`✓ public/og-image.png — ${(png.length / 1024).toFixed(0)} KB (1200×630)`);
