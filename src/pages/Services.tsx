import { Link } from 'react-router-dom';
import { CtaBand } from '@/components/CtaBand';
import { Icon } from '@/components/Icon';
import { Img } from '@/components/Img';
import { PageHero } from '@/components/Section';
import { Seo } from '@/components/Seo';
import { company } from '@/content/company';
import { useServices } from '@/hooks/useContent';
import { useLang } from '@/i18n/LanguageProvider';
import { ui } from '@/i18n/ui';
import { href } from '@/routes';

export function Services() {
  const { lang, t } = useLang();
  const services = useServices();

  return (
    <>
      <Seo
        title={{ fr: 'Nos services', en: 'Our services', ar: 'خدماتنا' }}
        description={{
          fr: "Climatisation, ventilation, désenfumage, protection incendie, chambres froides, études et ingénierie : découvrez l'ensemble des prestations HIS.",
          en: 'Air conditioning, ventilation, smoke extraction, fire protection, cold rooms, studies and engineering: discover the full range of HIS services.',
          ar: 'التكييف والتهوية وتصريف الدخان والحماية من الحرائق وغرف التبريد والدراسات والهندسة: اكتشفوا كل خدمات HIS.',
        }}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          itemListElement: services.map((service, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: service.title[lang],
            url: `${company.siteUrl}${href(lang, 'services', service.slug)}`,
          })),
        }}
      />

      <PageHero
        title={ui.sections.services}
        intro={{
          fr: "HIS couvre l'ensemble du cycle de vie de vos installations techniques : de la conception à la maintenance, en passant par la fourniture et l'installation.",
          en: 'HIS covers the full life cycle of your technical installations: from design to maintenance, including supply and installation.',
          ar: 'تغطي HIS دورة حياة منشآتكم التقنية بالكامل: من التصميم إلى الصيانة، مرورًا بالتوريد والتركيب.',
        }}
      />

      <section className="section">
        <div className="container-his space-y-6">
          {services.map((service, index) => (
            <article
              key={service.slug}
              className="card grid overflow-hidden lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]"
            >
              <Img
                src={service.image}
                alt={t(service.title)}
                ratio="16/10"
                fallbackIcon={service.icon}
                priority={index === 0}
                sizes="(min-width: 1024px) 45vw, 100vw"
                className={`h-full ${index % 2 === 1 ? 'lg:order-2' : ''}`}
              />

              <div className="flex flex-col justify-center p-7 sm:p-10">
                <div className="mb-4 flex items-center gap-3">
                  <span className="grid h-11 w-11 flex-none place-items-center rounded-lg bg-flame-50 text-flame-600">
                    <Icon name={service.icon} size={22} />
                  </span>
                  <h2 className="text-2xl text-navy-900">{t(service.title)}</h2>
                </div>

                <p className="text-sm leading-relaxed text-navy-900/70 sm:text-base">
                  {t(service.description)}
                </p>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {service.applications[lang].map((application) => (
                    <li
                      key={application}
                      className="rounded-full bg-navy-50 px-3.5 py-1.5 text-xs font-medium text-navy-700"
                    >
                      {application}
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Link to={href(lang, 'services', service.slug)} className="btn-primary !py-3 !text-xs">
                    {t(ui.cta.discover)}
                    <Icon name="arrow" size={16} className="flip-rtl" />
                  </Link>
                  <Link to={href(lang, 'contact')} className="btn-ghost !py-3 !text-xs">
                    {t(ui.cta.quote)}
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
