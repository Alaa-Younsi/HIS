import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { socialLinks, telUrl } from '@/content/company';
import { useCompanyInfo, useServices } from '@/hooks/useContent';
import { useLang } from '@/i18n/LanguageProvider';
import { ui } from '@/i18n/ui';
import { href, type PathKey } from '@/routes';
import { Icon } from './Icon';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Logo } from './Logo';

const navItems: readonly { key: PathKey; label: keyof typeof ui.nav }[] = [
  { key: 'home', label: 'home' },
  { key: 'about', label: 'about' },
  { key: 'services', label: 'services' },
  { key: 'projects', label: 'projects' },
  { key: 'sectors', label: 'sectors' },
  { key: 'why', label: 'why' },
  { key: 'contact', label: 'contact' },
];

export function Header() {
  const { lang, t } = useLang();
  const { pathname } = useLocation();
  const company = useCompanyInfo();
  const services = useServices();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Referme le menu à chaque changement de page.
  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Bloque le défilement de la page derrière le menu mobile ouvert.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `relative py-2 text-[13px] font-bold uppercase tracking-wide transition-colors ${
      isActive ? 'text-flame-600' : 'text-navy-900 hover:text-flame-600'
    }`;

  return (
    <header className="sticky top-0 z-50">
      {/* Bandeau de contact */}
      <div className="hidden bg-navy-900 text-white lg:block">
        <div className="container-his flex h-10 items-center justify-between gap-6 text-xs">
          <div className="flex items-center gap-6">
            <a
              href={`mailto:${company.contact.email}`}
              className="flex items-center gap-2 text-white/80 transition hover:text-white"
            >
              <Icon name="mail" size={15} />
              <span>{company.contact.email}</span>
            </a>
            <a
              href={telUrl(company.contact.phones[0] ?? '')}
              className="flex items-center gap-2 text-white/80 transition hover:text-white"
            >
              <Icon name="phone" size={15} />
              <span dir="ltr">{company.contact.phones.join(' / ')}</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 text-white/70">
              <Icon name="pin" size={15} />
              {company.contact.city}, {lang === 'fr' ? 'Algérie' : lang === 'ar' ? 'الجزائر' : 'Algeria'}
            </span>
            <span className="h-4 w-px bg-white/20" />
            <LanguageSwitcher variant="light" />
            <span className="h-4 w-px bg-white/20" />
            <div className="flex items-center gap-2.5">
              {socialLinks(company.contact).map((social) => (
                <a
                  key={social.icon}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={social.label}
                  className="text-white/70 transition hover:text-white"
                >
                  <Icon name={social.icon} size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Barre principale */}
      <div
        className={`border-b bg-white/95 backdrop-blur transition-shadow duration-300 ${
          scrolled ? 'border-navy-100 shadow-md shadow-navy-900/5' : 'border-transparent'
        }`}
      >
        <div className="container-his flex h-18 items-center justify-between gap-4 py-2.5">
          <Logo />

          <nav aria-label={t(ui.nav.menu)} className="hidden items-center gap-7 xl:flex">
            {navItems.map((item) =>
              item.key === 'services' ? (
                <div
                  key={item.key}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <NavLink to={href(lang, 'services')} className={navLinkClass} end={false}>
                    <span className="flex items-center gap-1.5">
                      {t(ui.nav.services)}
                      <Icon name="chevronDown" size={13} />
                    </span>
                  </NavLink>
                  {servicesOpen && (
                    <div className="absolute start-0 top-full z-50 w-72 pt-3">
                      <ul className="overflow-hidden rounded-xl border border-navy-100 bg-white py-2 shadow-xl shadow-navy-900/10">
                        {services.map((service) => (
                          <li key={service.slug}>
                            <Link
                              to={href(lang, 'services', service.slug)}
                              className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-navy-800 transition hover:bg-navy-50 hover:text-flame-600"
                            >
                              <Icon name={service.icon} size={18} className="flex-none text-flame-500" />
                              {t(service.title)}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  key={item.key}
                  to={href(lang, item.key)}
                  end={item.key === 'home'}
                  className={navLinkClass}
                >
                  {t(ui.nav[item.label])}
                </NavLink>
              ),
            )}
          </nav>

          <div className="flex items-center gap-3">
            <Link to={href(lang, 'contact')} className="btn-primary hidden !px-5 !py-3 !text-xs lg:inline-flex">
              {t(ui.cta.quote)}
            </Link>

            <div className="lg:hidden">
              <LanguageSwitcher variant="dark" />
            </div>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label={t(ui.nav.openMenu)}
              aria-expanded={mobileOpen}
              className="grid h-11 w-11 place-items-center rounded-md border border-navy-200 text-navy-900 transition hover:border-flame-400 hover:text-flame-600 xl:hidden"
            >
              <Icon name="menu" size={22} />
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 xl:hidden">
          <button
            type="button"
            aria-label={t(ui.nav.closeMenu)}
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
          />
          <nav
            aria-label={t(ui.nav.menu)}
            className="absolute end-0 top-0 flex h-full w-[86%] max-w-sm flex-col bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-navy-100 px-5 py-4">
              <Logo />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label={t(ui.nav.closeMenu)}
                className="grid h-10 w-10 place-items-center rounded-md text-navy-900 transition hover:bg-navy-50"
              >
                <Icon name="close" size={22} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-4">
              <ul className="space-y-1">
                {navItems.map((item) => (
                  <li key={item.key}>
                    <NavLink
                      to={href(lang, item.key)}
                      end={item.key === 'home'}
                      className={({ isActive }) =>
                        `block rounded-lg px-4 py-3.5 text-base font-bold transition ${
                          isActive ? 'bg-flame-50 text-flame-600' : 'text-navy-900 hover:bg-navy-50'
                        }`
                      }
                    >
                      {t(ui.nav[item.label])}
                    </NavLink>
                  </li>
                ))}
              </ul>

              <p className="mb-2 mt-6 px-4 text-xs font-bold uppercase tracking-widest text-navy-400">
                {t(ui.sections.services)}
              </p>
              <ul className="space-y-0.5">
                {services.map((service) => (
                  <li key={service.slug}>
                    <Link
                      to={href(lang, 'services', service.slug)}
                      className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm text-navy-700 transition hover:bg-navy-50"
                    >
                      <Icon name={service.icon} size={17} className="flex-none text-flame-500" />
                      {t(service.title)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3 border-t border-navy-100 p-5">
              <Link to={href(lang, 'contact')} className="btn-primary w-full">
                {t(ui.cta.quote)}
              </Link>
              <a
                href={telUrl(company.contact.phones[0] ?? '')}
                className="btn-ghost w-full"
                dir="ltr"
              >
                <Icon name="phone" size={16} />
                {company.contact.phones[0]}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
