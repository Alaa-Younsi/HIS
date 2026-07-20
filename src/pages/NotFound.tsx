import { Link } from 'react-router-dom';
import { Icon } from '@/components/Icon';
import { Seo } from '@/components/Seo';
import { useLang } from '@/i18n/LanguageProvider';
import { ui } from '@/i18n/ui';
import { href } from '@/routes';

export function NotFound() {
  const { lang, t } = useLang();

  return (
    <>
      <Seo title={ui.notFound.title} description={ui.notFound.body} noindex />

      <section className="relative overflow-hidden bg-navy-900">
        <div className="grid-pattern absolute inset-0" aria-hidden="true" />
        <div className="container-his relative flex min-h-[62vh] flex-col items-center justify-center py-20 text-center">
          <p className="text-7xl font-extrabold text-flame-500 sm:text-8xl">404</p>
          <h1 className="mt-4 text-3xl text-white sm:text-4xl">{t(ui.notFound.title)}</h1>
          <p className="mt-4 max-w-md text-white/70">{t(ui.notFound.body)}</p>
          <Link to={href(lang, 'home')} className="btn-primary mt-9">
            {/* Flèche « retour » : pointe à gauche en LTR, à droite en RTL. */}
            <Icon name="arrow" size={17} className="ltr:rotate-180" />
            {t(ui.notFound.back)}
          </Link>
        </div>
      </section>
    </>
  );
}
