import { Link } from 'react-router-dom';
import { company, telUrl } from '@/content/company';
import { useLang } from '@/i18n/LanguageProvider';
import { ui } from '@/i18n/ui';
import { href } from '@/routes';
import { Icon } from './Icon';

/** Bloc d'appel à l'action réutilisé en bas des pages intérieures. */
export function CtaBand() {
  const { lang, t } = useLang();

  return (
    <section className="relative overflow-hidden bg-navy-900">
      <div className="grid-pattern absolute inset-0" aria-hidden="true" />
      <div
        className="absolute -bottom-32 -start-16 h-80 w-80 rounded-full bg-flame-500/12 blur-3xl"
        aria-hidden="true"
      />
      <div className="container-his relative flex flex-col items-center gap-8 py-16 text-center sm:py-20">
        <div className="max-w-2xl">
          <h2 className="text-3xl text-white sm:text-4xl">{t(company.closing)}</h2>
          <p className="mt-4 text-base text-white/70 sm:text-lg">{t(company.tagline)}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link to={href(lang, 'contact')} className="btn-primary">
            {t(ui.cta.quote)}
            <Icon name="arrow" size={17} className="flip-rtl" />
          </Link>
          <a href={telUrl(company.contact.phones[0])} className="btn-outline" dir="ltr">
            <Icon name="phone" size={17} />
            {company.contact.phones[0]}
          </a>
        </div>
      </div>
    </section>
  );
}
