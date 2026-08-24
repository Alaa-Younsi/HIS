import { Link } from 'react-router-dom';
import { company, mailtoUrl, socialLinks, telUrl } from '@/content/company';
import { useCompanyInfo, useServices } from '@/hooks/useContent';
import { useLang } from '@/i18n/LanguageProvider';
import { ui } from '@/i18n/ui';
import { href, type PathKey } from '@/routes';
import { Icon } from './Icon';
import { Logo } from './Logo';

const footerNav: readonly { key: PathKey; label: keyof typeof ui.nav }[] = [
  { key: 'about', label: 'about' },
  { key: 'services', label: 'services' },
  { key: 'projects', label: 'projects' },
  { key: 'sectors', label: 'sectors' },
  { key: 'why', label: 'why' },
  { key: 'contact', label: 'contact' },
];

export function Footer() {
  const { lang, t } = useLang();
  const companyInfo = useCompanyInfo();
  const services = useServices();

  return (
    <footer className="bg-ink text-white/70">
      {/* Bandeau d'appel à l'action */}
      <div className="bg-flame-500">
        <div className="container-his flex flex-col items-center justify-between gap-6 py-8 text-center sm:flex-row sm:text-start">
          <div className="flex items-center gap-4">
            <Icon name="shield" size={38} className="hidden flex-none text-white sm:block" />
            <p className="text-lg font-bold uppercase leading-snug tracking-wide text-white sm:text-xl">
              {t(companyInfo.slogan)}
            </p>
          </div>
          <Link
            to={href(lang, 'contact')}
            className="btn shrink-0 bg-navy-900 text-white hover:bg-ink"
          >
            {t(ui.cta.contact)}
            <Icon name="arrow" size={17} className="flip-rtl" />
          </Link>
        </div>
      </div>

      <div className="container-his grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="[&_a]:!text-white">
            <Logo variant="light" />
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed">{t(ui.footer.tagline)}</p>
          <div className="mt-5 flex items-center gap-3">
            {socialLinks(companyInfo.contact).map((social) => (
              <a
                key={social.icon}
                href={social.url}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={social.label}
                className="grid h-9 w-9 place-items-center rounded-md bg-white/8 transition hover:bg-flame-500 hover:text-white"
              >
                <Icon name={social.icon} size={17} />
              </a>
            ))}
          </div>
        </div>

        <nav aria-label={t(ui.labels.quickLinks)}>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-white">
            {t(ui.labels.quickLinks)}
          </h2>
          <ul className="space-y-2.5 text-sm">
            {footerNav.map((item) => (
              <li key={item.key}>
                <Link to={href(lang, item.key)} className="transition hover:text-flame-400">
                  {t(ui.nav[item.label])}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={t(ui.sections.services)}>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-white">
            {t(ui.sections.services)}
          </h2>
          <ul className="space-y-2.5 text-sm">
            {services.slice(0, 6).map((service) => (
              <li key={service.slug}>
                <Link
                  to={href(lang, 'services', service.slug)}
                  className="transition hover:text-flame-400"
                >
                  {t(service.title)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-white">
            {t(ui.sections.contact)}
          </h2>
          <ul className="space-y-4 text-sm">
            <li className="flex gap-3">
              <Icon name="pin" size={18} className="mt-0.5 flex-none text-flame-500" />
              <address className="not-italic leading-relaxed">{t(companyInfo.contact.address)}</address>
            </li>
            <li className="flex gap-3">
              <Icon name="phone" size={18} className="mt-0.5 flex-none text-flame-500" />
              <div className="flex flex-col gap-1" dir="ltr">
                {companyInfo.contact.phones.map((phone) => (
                  <a key={phone} href={telUrl(phone)} className="transition hover:text-flame-400">
                    {phone}
                  </a>
                ))}
              </div>
            </li>
            <li className="flex gap-3">
              <Icon name="mail" size={18} className="mt-0.5 flex-none text-flame-500" />
              <a
                href={mailtoUrl(companyInfo.contact.email, t(ui.email.subject), t(ui.email.body))}
                className="break-all transition hover:text-flame-400"
              >
                {companyInfo.contact.email}
              </a>
            </li>
            <li className="flex gap-3">
              <Icon name="clock" size={18} className="mt-0.5 flex-none text-flame-500" />
              <span>{t(companyInfo.contact.hours)}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-his flex flex-col items-center justify-between gap-2 py-5 text-xs sm:flex-row">
          <p>
            © {new Date().getFullYear()} {company.legalName}. {t(ui.footer.rights)}
          </p>
          <p className="text-white/45">
            Website Developer by{' '}
            <a
              href="https://alaayounsi.vercel.app/"
              target="_blank"
              rel="noreferrer noopener"
              className="transition hover:text-flame-400"
            >
              Alaa Younsi
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
