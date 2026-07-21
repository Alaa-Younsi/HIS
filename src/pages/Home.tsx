import { Link } from 'react-router-dom';
import { CtaBand } from '@/components/CtaBand';
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
import { Swoosh } from '@/components/Swoosh';

/**
 * Titre du hero avec le mot-clé en rouge, comme sur la charte.
 * Si le mot n'apparaît pas dans le titre traduit, le titre s'affiche tel quel.
 */
function HeroTitle({ title, highlight }: { title: string; highlight: string }) {
  const at = highlight ? title.toLowerCase().indexOf(highlight.toLowerCase()) : -1;
  if (at === -1) return <>{title}</>;

  return (
    <>
      {title.slice(0, at)}
      <span className="text-flame-500">{title.slice(at, at + highlight.length)}</span>
      {title.slice(at + highlight.length)}
    </>
  );
}

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
        <div className="absolute inset-0" aria-hidden="true">
          <Img
            src="/images/hero-chantier.jpg"
            alt=""
            ratio="16/9"
            priority
            fallbackIcon="factory"
            className="h-full w-full"
          />
          {/* Sous la courbe (mobile / tablette) : simple voile pour la lisibilité. */}
          <div className="absolute inset-0 bg-gradient-to-b from-navy-950/95 via-navy-950/85 to-navy-950/95 lg:hidden" />
          {/* À partir de lg : la courbe de marque remplace le voile.
              `flip-rtl` la retourne en arabe, sinon le texte passerait sur la photo. */}
          <Swoosh className="flip-rtl absolute inset-0 hidden h-full w-full lg:block" />
        </div>

        <div className="container-his relative py-20 sm:py-24 lg:py-32">
          <div className="animate-rise max-w-xl lg:max-w-[44%]">
            <p className="eyebrow eyebrow-on-dark">{t(company.slogan)}</p>
            <h1 className="text-4xl uppercase leading-[1.08] text-white sm:text-5xl lg:text-[3.4rem]">
              <HeroTitle title={t(company.heroTitle)} highlight={t(company.heroHighlight)} />
            </h1>
            <p className="mt-6 text-base leading-relaxed text-white/80 sm:text-lg">
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
      </section>

      {/* ── Services phares : carte blanche chevauchant le hero ── */}
      {/* `flow-root` isole la marge négative de la carte : sans lui elle
          remonterait la section entière et son fond viendrait teinter le hero. */}
      <section className="relative flow-root bg-navy-50 pb-16 sm:pb-20 lg:pb-24">
        <div className="container-his">
          {/* Séparateurs en `outline` : ils suivent la grille à tous les
              formats sans dépendre du rang de chaque case. */}
          <ul className="card-float -mt-12 grid grid-cols-2 overflow-hidden lg:-mt-16 lg:grid-cols-4">
            {featuredServices.map((service) => (
              <li key={service.slug} className="relative outline outline-navy-100">
                <Link
                  to={href(lang, 'services', service.slug)}
                  className="group flex h-full flex-col items-center gap-3 px-4 py-7 text-center sm:px-6 sm:py-8 lg:px-5"
                >
                  {/* Liseré rouge qui se révèle au survol */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-6 top-0 h-0.5 origin-center scale-x-0 bg-flame-500 transition-transform duration-300 ease-[var(--ease-out-soft)] group-hover:scale-x-100"
                  />
                  <span className="grid h-14 w-14 flex-none place-items-center rounded-xl bg-navy-50 text-navy-700 transition duration-300 group-hover:bg-flame-500 group-hover:text-white">
                    <Icon name={service.icon} size={28} />
                  </span>
                  <span className="text-[0.95rem] font-bold leading-snug text-navy-900 transition-colors group-hover:text-flame-600">
                    {t(service.title)}
                  </span>
                  <span className="text-xs leading-relaxed text-navy-900/70">
                    {t(service.short)}
                  </span>
                  <span className="mt-auto pt-3 text-flame-500 opacity-0 transition duration-300 group-hover:opacity-100">
                    <Icon name="arrow" size={16} className="flip-rtl" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Engagement + chiffres clés ───────────────────────── */}
      <section className="section bg-navy-50">
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
                <span className="text-xs leading-snug text-navy-900/70">{t(stat.label)}</span>
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
                    sizes="(min-width: 1240px) 372px, (min-width: 1024px) 31vw, (min-width: 640px) 47vw, 92vw"
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
      <section className="section">
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
          />

          {/* Bandeau de vignettes — 5 de front sur grand écran, comme la charte. */}
          <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {featuredProjects.map((project) => (
              <li key={project.id}>
                <Link
                  to={href(lang, 'projects')}
                  className="group block overflow-hidden rounded-xl shadow-md shadow-navy-900/10 ring-1 ring-navy-900/5 transition duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:shadow-xl hover:shadow-navy-900/20"
                >
                  <div className="relative">
                    <Img
                      src={project.image}
                      alt={t(project.title)}
                      ratio="4/3"
                      fallbackIcon="fire"
                      sizes="(min-width: 1240px) 220px, (min-width: 1024px) 18vw, (min-width: 640px) 30vw, 45vw"
                      imgClassName="transition-transform duration-700 group-hover:scale-110"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/25 to-transparent opacity-80 transition group-hover:opacity-95"
                      aria-hidden="true"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-3.5">
                      <p className="text-xs font-bold leading-snug text-white sm:text-sm">
                        {t(project.title)}
                      </p>
                      <p className="mt-1 text-[11px] text-white/70">
                        {t(project.location)}
                        {project.year && ` · ${project.year}`}
                      </p>
                    </div>
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
      <section className="section bg-navy-50">
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

          <h3 className="mt-16 text-center text-sm font-bold uppercase tracking-[0.18em] text-navy-900/70">
            {t(ui.sections.suppliers)}
          </h3>
          <PartnerStrip partners={suppliers} className="mt-6" compact />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
