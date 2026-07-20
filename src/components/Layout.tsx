import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useLang } from '@/i18n/LanguageProvider';
import { ui } from '@/i18n/ui';
import { Footer } from './Footer';
import { Header } from './Header';
import { organizationJsonLd } from './Seo';
import { WhatsAppButton } from './WhatsAppButton';

/** Remet la page en haut à chaque navigation (sauf retour navigateur). */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);

  return null;
}

export function Layout() {
  const { lang, t } = useLang();

  return (
    <>
      <ScrollToTop />

      {/* Fiche d'entreprise structurée, présente sur toutes les pages. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd(lang)) }}
      />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-100 focus:rounded-md focus:bg-flame-500 focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-white"
      >
        {t(ui.nav.skipToContent)}
      </a>

      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
