import { useLocation } from 'react-router-dom';
import { company, type Company } from '@/content/company';
import { useLang } from '@/i18n/LanguageProvider';
import { LANG_META, LANGS, type Localized } from '@/i18n/types';
import { swapLangInPath } from '@/routes';

type SeoProps = {
  title: Localized;
  description: Localized;
  /** Image de partage réseaux sociaux (chemin absolu depuis /public). */
  image?: string;
  /** JSON-LD supplémentaire propre à la page (fil d'Ariane, service…). */
  jsonLd?: Record<string, unknown> | readonly Record<string, unknown>[];
  /** true sur les pages qui ne doivent pas être indexées (404). */
  noindex?: boolean;
};

/**
 * Métadonnées de page. React 19 remonte automatiquement <title>, <meta>
 * et <link> dans le <head> du document, sans librairie externe.
 */
export function Seo({ title, description, image, jsonLd, noindex = false }: SeoProps) {
  const { lang, t } = useLang();
  const { pathname } = useLocation();

  const pageTitle = `${t(title)} | ${company.legalName}`;
  const pageDescription = t(description);
  const canonical = `${company.siteUrl}${pathname}`;
  // Une image de page (ex. la photo d'un service) n'a pas forcément le format
  // 1200×630 du visuel de partage par défaut : on ne déclare og:image:width/
  // height que pour ce dernier, jamais pour une image dont on ne connaît pas
  // les dimensions réelles.
  const usingDefaultImage = !image;
  // Une photo de service peut venir de Supabase Storage (URL absolue,
  // https://<projet>.supabase.co/...) une fois modifiée depuis le tableau de
  // bord, plutôt que d'un chemin local /images/... — ne préfixer par
  // siteUrl que dans ce second cas.
  const resolvedImage = image ?? '/og-image.jpg';
  const imageUrl = resolvedImage.startsWith('http') ? resolvedImage : `${company.siteUrl}${resolvedImage}`;

  return (
    <>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <link rel="canonical" href={canonical} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Une URL par langue : Google indexe et sert la bonne version. */}
      {LANGS.map((alternate) => (
        <link
          key={alternate}
          rel="alternate"
          hrefLang={LANG_META[alternate].htmlLang}
          href={`${company.siteUrl}${swapLangInPath(pathname, alternate)}`}
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`${company.siteUrl}${swapLangInPath(pathname, 'fr')}`} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={company.legalName} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={imageUrl} />
      {usingDefaultImage && (
        <>
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
        </>
      )}
      <meta property="og:image:alt" content={pageTitle} />
      <meta property="og:locale" content={lang === 'ar' ? 'ar_DZ' : lang === 'en' ? 'en_US' : 'fr_DZ'} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={imageUrl} />

      {jsonLd && (
        <script
          type="application/ld+json"
          // Contenu statique issu de src/content — aucune donnée utilisateur.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </>
  );
}

/**
 * Fiche d'entreprise — injectée une fois, sur toutes les pages.
 * `info` vient de useCompanyInfo() (Layout.tsx) : reflète les coordonnées
 * modifiées depuis le tableau de bord une fois Supabase connecté.
 */
export function organizationJsonLd(info: Company, lang: 'fr' | 'en' | 'ar') {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${company.siteUrl}/#organization`,
    name: company.legalName,
    alternateName: company.fullName,
    description: info.intro[lang],
    url: company.siteUrl,
    logo: `${company.siteUrl}/logo-his.png`,
    image: `${company.siteUrl}/og-image.jpg`,
    email: info.contact.email,
    telephone: info.contact.phones[0],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Haouch Ben Chergui SEC 09 GP13 N°38',
      addressLocality: "L'Arbaa",
      addressRegion: info.contact.city,
      addressCountry: info.contact.country,
    },
    areaServed: { '@type': 'Country', name: 'Algeria' },
    sameAs: [info.contact.linkedin, info.contact.facebook].filter(Boolean),
    slogan: info.slogan[lang],
  };
}

/** Fil d'Ariane structuré, pour l'affichage enrichi dans Google. */
export function breadcrumbJsonLd(items: readonly { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${company.siteUrl}${item.path}`,
    })),
  };
}
