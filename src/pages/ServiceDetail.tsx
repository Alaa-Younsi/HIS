import { Link, Navigate, useParams } from 'react-router-dom';
import { Icon } from '@/components/Icon';
import { Img } from '@/components/Img';
import { Seo, breadcrumbJsonLd } from '@/components/Seo';
import { company, telUrl, whatsappUrl } from '@/content/company';
import { useCompanyInfo, useServices } from '@/hooks/useContent';
import { useLang } from '@/i18n/LanguageProvider';
import { ui } from '@/i18n/ui';
import { href } from '@/routes';

export function ServiceDetail() {
  const { lang, t } = useLang();
  const { slug } = useParams();
  const companyInfo = useCompanyInfo();
  const services = useServices();
  const service = services.find((item) => item.slug === slug);

  if (!service) return <Navigate to={href(lang, 'services')} replace />;

  const others = services.filter((item) => item.slug !== service.slug).slice(0, 3);

  return (
    <>
      <Seo
        title={service.title}
        description={service.short}
        image={service.image}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: service.title[lang],
            description: service.description[lang],
            serviceType: service.title[lang],
            provider: { '@id': `${company.siteUrl}/#organization` },
            areaServed: { '@type': 'Country', name: 'Algeria' },
          },
          breadcrumbJsonLd([
            { name: t(ui.nav.home), path: href(lang, 'home') },
            { name: t(ui.nav.services), path: href(lang, 'services') },
            { name: t(service.title), path: href(lang, 'services', service.slug) },
          ]),
        ]}
      />

      <section className="relative overflow-hidden bg-navy-900">
        <div className="absolute inset-0">
          <Img src={service.image} alt="" ratio="16/9" priority fallbackIcon={service.icon} className="h-full w-full" />
          <div
            className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/90 to-navy-950/50"
            aria-hidden="true"
          />
        </div>

        <div className="container-his relative py-16 sm:py-20">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-white/60">
              <li>
                <Link to={href(lang, 'home')} className="transition hover:text-white">
                  {t(ui.nav.home)}
                </Link>
              </li>
              <li aria-hidden="true">
                <Icon name="chevron" size={12} className="flip-rtl" />
              </li>
              <li>
                <Link to={href(lang, 'services')} className="transition hover:text-white">
                  {t(ui.nav.services)}
                </Link>
              </li>
              <li aria-hidden="true">
                <Icon name="chevron" size={12} className="flip-rtl" />
              </li>
              <li className="font-semibold text-white">{t(service.title)}</li>
            </ol>
          </nav>

          <span className="mb-5 inline-grid h-14 w-14 place-items-center rounded-xl bg-flame-500 text-white">
            <Icon name={service.icon} size={28} />
          </span>
          <h1 className="max-w-3xl text-3xl leading-tight text-white sm:text-4xl lg:text-5xl">
            {t(service.title)}
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/75 sm:text-lg">{t(service.short)}</p>
        </div>
      </section>

      <section className="section">
        <div className="container-his grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
          <div>
            <p className="text-base leading-relaxed text-navy-900/75 sm:text-lg">
              {t(service.description)}
            </p>

            <h2 className="mt-10 text-2xl text-navy-900">{t(ui.sections.applications)}</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {service.applications[lang].map((application) => (
                <li key={application} className="card flex items-center gap-3 p-4">
                  <Icon name="check" size={20} className="flex-none text-flame-500" />
                  <span className="text-sm font-medium text-navy-900">{application}</span>
                </li>
              ))}
            </ul>

            {service.gallery && service.gallery.length > 0 && (
              <>
                <h2 className="mt-10 text-2xl text-navy-900">{t(ui.sections.gallery)}</h2>
                <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {service.gallery.map((photo) => (
                    <Img
                      key={photo}
                      src={photo}
                      alt=""
                      ratio="4/3"
                      fallbackIcon={service.icon}
                      className="rounded-lg"
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Encart contact */}
          <aside className="lg:sticky lg:top-32 lg:self-start">
            <div className="overflow-hidden rounded-xl bg-navy-900">
              <div className="grid-pattern relative p-7 sm:p-8">
                <h2 className="text-xl text-white">{t(ui.cta.quote)}</h2>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  {t({
                    fr: "Décrivez-nous votre besoin : nous revenons vers vous avec une proposition technique et chiffrée.",
                    en: 'Tell us about your needs: we will come back to you with a technical and costed proposal.',
                    ar: 'صِفوا لنا حاجتكم: سنعود إليكم باقتراح تقني ومسعّر.',
                  })}
                </p>

                <div className="mt-6 space-y-3">
                  <a
                    href={whatsappUrl(companyInfo.contact.whatsapp, t(companyInfo.whatsappMessage))}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="btn w-full bg-[#25D366] text-white hover:bg-[#1EBE5A]"
                  >
                    <Icon name="whatsapp" size={19} />
                    {t(ui.cta.whatsapp)}
                  </a>
                  <a href={telUrl(companyInfo.contact.phones[0] ?? '')} className="btn-primary w-full" dir="ltr">
                    <Icon name="phone" size={17} />
                    {companyInfo.contact.phones[0]}
                  </a>
                  <Link to={href(lang, 'contact')} className="btn-outline w-full">
                    {t(ui.cta.contact)}
                  </Link>
                </div>
              </div>
            </div>

            <h2 className="mt-10 text-sm font-bold uppercase tracking-widest text-navy-900/70">
              {t(ui.sections.otherServices)}
            </h2>
            <ul className="mt-4 space-y-2">
              {others.map((item) => (
                <li key={item.slug}>
                  <Link
                    to={href(lang, 'services', item.slug)}
                    className="card flex items-center gap-3 p-4 transition hover:border-flame-200 hover:bg-flame-50/40"
                  >
                    <Icon name={item.icon} size={20} className="flex-none text-flame-500" />
                    <span className="flex-1 text-sm font-semibold text-navy-900">
                      {t(item.title)}
                    </span>
                    <Icon name="chevron" size={15} className="flip-rtl text-navy-300" />
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              to={href(lang, 'services')}
              className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-flame-600 hover:text-flame-700"
            >
              <Icon name="arrow" size={15} className="ltr:rotate-180" />
              {t(ui.cta.backToServices)}
            </Link>
          </aside>
        </div>
      </section>
    </>
  );
}
