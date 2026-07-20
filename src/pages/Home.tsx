import { Link } from 'react-router-dom';
import { Icon } from '@/components/Icon';
import { Img } from '@/components/Img';
import { SectionHeading } from '@/components/Section';
import { Seo } from '@/components/Seo';
import { company } from '@/content/company';
import { clients, clientsIntro, suppliers } from '@/content/partners';
import { featuredProjects } from '@/content/projects';
import { sectors } from '@/content/sectors';
import { featuredServices, services } from '@/content/services';
import { strengths } from '@/content/strengths';
import { useLang } from '@/i18n/LanguageProvider';
import { ui } from '@/i18n/ui';
import { href } from '@/routes';
import { PartnerStrip } from '@/components/PartnerStrip';

export function Home() {
  const { lang, t } = useLang();

  return (
    <>
      <Seo
        title={{
          fr: 'HVAC, désenfumage et protection incendie en Algérie',
          en: 'HVAC, smoke extraction and fire protection in Algeria',
          ar: 'التكييف وتصريف الدخان والحماية من الحرائق في الجزائر',
        }}
        description={{
          fr: "HIS conçoit, installe et entretient vos systèmes de climatisation, ventilation, désenfumage et protection incendie. Bureau d'études et équipes qualifiées basés à Blida.",
          en: 'HIS designs, installs and maintains your air conditioning, ventilation, smoke extraction and fire protection systems. Design office and qualified teams based in Blida, Algeria.',
          ar: 'تصمم HIS وتركب وتصون أنظمة التكييف والتهوية وتصريف الدخان والحماية من الحرائق. مكتب دراسات وفرق مؤهلة مقرها البليدة.',
        }}
      />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-navy-900">
        <div className="absolute inset-0">
          <Img
            src="/images/hero-chantier.jpg"
            alt=""
            ratio="16/9"
            priority
            fallbackIcon="factory"
            className="h-full w-full"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/92 to-navy-950/45"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent"
            aria-hidden="true"
          />
        </div>

        <div className="container-his relative py-20 sm:py-28 lg:py-36">
          <div className="max-w-2xl animate-rise">
            <p className="eyebrow">{t(company.slogan)}</p>
            <h1 className="text-4xl leading-[1.1] text-white sm:text-5xl lg:text-6xl">
              {t(company.heroTitle)}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
              {t(company.heroSubtitle)}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link to={href(lang, 'services')} className="btn-primary">
                {t(ui.cta.ourServices)}
                <Icon name="arrow" size={17} className="flip-rtl" />
              </Link>
              <Link to={href(lang, 'contact')} className="btn-outline">
                {t(ui.cta.contact)}
              </Link>
            </div>
          </div>
        </div>

        {/* Bandeau des 4 services phares, chevauchant le hero */}
        <div className="container-his relative pb-px">
          <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-t-xl bg-navy-100 lg:grid-cols-4">
            {featuredServices.map((service) => (
              <li key={service.slug}>
                <Link
                  to={href(lang, 'services', service.slug)}
                  className="group flex h-full flex-col items-center gap-2.5 bg-white px-4 py-7 text-center transition hover:bg-flame-50 sm:px-6"
                >
                  <Icon
                    name={service.icon}
                    size={34}
                    className="text-navy-600 transition-transform duration-300 group-hover:scale-110 group-hover:text-flame-500"
                  />
                  <span className="text-sm font-bold text-navy-900 sm:text-base">
                    {t(service.title)}
                  </span>
                  <span className="text-xs leading-relaxed text-navy-900/55">{t(service.short)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Engagement + chiffres clés ───────────────────────── */}
      <section className="section bg-navy-50/60">
        <div className="container-his grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-center lg:gap-16">
          <div>
            <SectionHeading
              eyebrow={{ fr: 'Notre engagement', en: 'Our commitment', ar: 'التزامنا' }}
              title={{
                fr: 'Notre engagement, votre sécurité',
                en: 'Our commitment, your safety',
                ar: 'التزامنا، سلامتكم',
              }}
              intro={company.intro}
            />
            <Link to={href(lang, 'about')} className="btn-primary mt-8">
              {t(ui.cta.learnMore)}
              <Icon name="arrow" size={17} className="flip-rtl" />
            </Link>
          </div>

          <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-navy-100 lg:grid-cols-4">
            {company.stats.map((stat) => (
              <li
                key={stat.value}
                className="flex flex-col items-center gap-2 bg-white px-3 py-9 text-center"
              >
                <Icon name={stat.icon} size={30} className="text-flame-500" />
                <span className="text-3xl font-extrabold text-navy-900">{stat.value}</span>
                <span className="text-xs leading-snug text-navy-900/60">{t(stat.label)}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Services ─────────────────────────────────────────── */}
      <section className="section">
        <div className="container-his">
          <SectionHeading
            eyebrow={{ fr: 'Ce que nous faisons', en: 'What we do', ar: 'ما نقوم به' }}
            title={ui.sections.expertise}
            intro={{
              fr: "De l'étude à la maintenance, nous couvrons l'ensemble du cycle de vie de vos installations techniques.",
              en: 'From design study to maintenance, we cover the full life cycle of your technical installations.',
              ar: 'من الدراسة إلى الصيانة، نغطي دورة حياة منشآتكم التقنية بالكامل.',
            }}
            align="center"
          />

          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  to={href(lang, 'services', service.slug)}
                  className="card-hover group flex h-full flex-col overflow-hidden"
                >
                  <Img
                    src={service.image}
                    alt={t(service.title)}
                    ratio="16/10"
                    fallbackIcon={service.icon}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    imgClassName="transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-3 flex items-center gap-3">
                      <span className="grid h-10 w-10 flex-none place-items-center rounded-lg bg-navy-50 text-navy-600 transition group-hover:bg-flame-500 group-hover:text-white">
                        <Icon name={service.icon} size={21} />
                      </span>
                      <h3 className="text-lg text-navy-900">{t(service.title)}</h3>
                    </div>
                    <p className="flex-1 text-sm leading-relaxed text-navy-900/65">
                      {t(service.short)}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-flame-600">
                      {t(ui.cta.discover)}
                      <Icon
                        name="chevron"
                        size={14}
                        className="flip-rtl transition-transform group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Réalisations ─────────────────────────────────────── */}
      <section className="section bg-navy-950">
        <div className="container-his">
          <SectionHeading
            eyebrow={{ fr: 'Sur le terrain', en: 'On site', ar: 'في الميدان' }}
            title={ui.sections.projects}
            intro={{
              fr: 'Quelques chantiers récents livrés par nos équipes.',
              en: 'A few recent projects delivered by our teams.',
              ar: 'بعض الورشات الأخيرة التي أنجزتها فرقنا.',
            }}
            align="center"
            tone="light"
          />

          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project, index) => (
              <li
                key={project.id}
                className={index === 0 ? 'sm:col-span-2 sm:row-span-2' : undefined}
              >
                <Link
                  to={href(lang, 'projects')}
                  className="group relative block h-full overflow-hidden rounded-xl"
                >
                  <Img
                    src={project.image}
                    alt={t(project.title)}
                    ratio={index === 0 ? '4/3' : '4/3'}
                    fallbackIcon="fire"
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="h-full"
                    imgClassName="transition-transform duration-700 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-transparent opacity-85 transition group-hover:opacity-95"
                    aria-hidden="true"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="text-sm font-bold text-white sm:text-base">{t(project.title)}</p>
                    <p className="mt-1 text-xs text-white/65">
                      {t(project.location)}
                      {project.year && ` · ${project.year}`}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-10 text-center">
            <Link to={href(lang, 'projects')} className="btn-primary">
              {t(ui.cta.allProjects)}
              <Icon name="arrow" size={17} className="flip-rtl" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Secteurs ─────────────────────────────────────────── */}
      <section className="section">
        <div className="container-his">
          <SectionHeading
            eyebrow={{ fr: 'Nos clients', en: 'Our clients', ar: 'عملاؤنا' }}
            title={ui.sections.sectors}
            align="center"
          />
          <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {sectors.map((sector) => (
              <li
                key={sector.id}
                className="card flex flex-col items-center gap-3 px-4 py-7 text-center hover:border-flame-200 hover:shadow-lg hover:shadow-navy-900/5"
              >
                <Icon name={sector.icon} size={30} className="text-flame-500" />
                <span className="text-sm font-semibold leading-snug text-navy-900">
                  {t(sector.name)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-8 text-center">
            <Link to={href(lang, 'sectors')} className="btn-ghost">
              {t(ui.cta.learnMore)}
            </Link>
          </div>
        </div>
      </section>

      {/* ── Pourquoi HIS ─────────────────────────────────────── */}
      <section className="section bg-navy-50/60">
        <div className="container-his">
          <SectionHeading
            eyebrow={{ fr: 'Nos atouts', en: 'Our strengths', ar: 'نقاط قوتنا' }}
            title={ui.sections.why}
            align="center"
          />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {strengths.slice(0, 6).map((strength) => (
              <li key={strength.id} className="card flex gap-4 bg-white p-6">
                <span className="grid h-11 w-11 flex-none place-items-center rounded-lg bg-flame-50 text-flame-600">
                  <Icon name={strength.icon} size={22} />
                </span>
                <div>
                  <h3 className="text-base text-navy-900">{t(strength.title)}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-navy-900/65">
                    {t(strength.description)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-9 text-center">
            <Link to={href(lang, 'why')} className="btn-primary">
              {t(ui.cta.learnMore)}
              <Icon name="arrow" size={17} className="flip-rtl" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Confiance ────────────────────────────────────────── */}
      <section className="section">
        <div className="container-his">
          <SectionHeading
            eyebrow={{ fr: 'Références', en: 'References', ar: 'مراجع' }}
            title={ui.sections.clients}
            intro={clientsIntro}
            align="center"
          />
          <PartnerStrip partners={clients} className="mt-10" />

          <h3 className="mt-16 text-center text-sm font-bold uppercase tracking-[0.18em] text-navy-900/45">
            {t(ui.sections.suppliers)}
          </h3>
          <PartnerStrip partners={suppliers} className="mt-6" compact />
        </div>
      </section>
    </>
  );
}
