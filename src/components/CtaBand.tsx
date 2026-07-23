import { Link } from 'react-router-dom';
import { telUrl } from '@/content/company';
import { useCompanyInfo } from '@/hooks/useContent';
import { useLang } from '@/i18n/LanguageProvider';
import { ui } from '@/i18n/ui';
import { href } from '@/routes';
import { Icon } from './Icon';
import { Reveal } from './Reveal';

/** Bloc d'appel à l'action réutilisé en bas des pages intérieures. */
export function CtaBand() {
  const { lang, t } = useLang();
  const company = useCompanyInfo();

  return (
    <section className="relative overflow-hidden bg-flame-600">
      <div className="grid-pattern absolute inset-0 opacity-60" aria-hidden="true" />
      <Reveal className="container-his relative flex flex-col items-center gap-8 py-14 text-center sm:py-16 lg:flex-row lg:justify-between lg:text-start">
        <div className="flex items-center gap-5">
          <Icon name="shield" size={44} className="hidden flex-none text-white/80 sm:block" />
          {/* Accroche courte en titre, le paragraphe complet en appui :
              l'inverse donnait un pavé de texte dans le bandeau rouge. */}
          <div className="max-w-2xl">
            <h2 className="text-2xl text-white sm:text-3xl">{t(company.tagline)}</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/85">{t(company.closing)}</p>
          </div>
        </div>
        <div className="flex flex-none flex-col gap-3 sm:flex-row">
          <Link
            to={href(lang, 'contact')}
            className="btn bg-navy-900 text-white shadow-lg shadow-navy-950/25 hover:-translate-y-0.5 hover:bg-navy-800 hover:shadow-xl active:translate-y-0 active:scale-[0.96]"
          >
            {t(ui.cta.quote)}
            <Icon name="arrow" size={17} className="flip-rtl" />
          </Link>
          <a href={telUrl(company.contact.phones[0] ?? '')} className="btn-outline" dir="ltr">
            <Icon name="phone" size={17} />
            {company.contact.phones[0]}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
