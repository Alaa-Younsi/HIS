import { Link } from 'react-router-dom';
import { Icon } from '@/components/Icon';
import { Img } from '@/components/Img';
import { SectionHeading } from '@/components/Section';
import { Seo } from '@/components/Seo';
import { useCompanyInfo, usePartners, useProjects, useSectors, useServices, useStrengths } from '@/hooks/useContent';
import { useLang } from '@/i18n/LanguageProvider';
import { ui } from '@/i18n/ui';
import { href } from '@/routes';
import { PartnerStrip } from '@/components/PartnerStrip';
import { Swoosh } from '@/components/Swoosh';
import { Reveal } from '@/components/Reveal';
import { TiltCard } from '@/components/TiltCard';

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
  const company = useCompanyInfo();
  const services = useServices();
  const projects = useProjects();
  const sectors = useSectors();
  const strengths = useStrengths();
  const { clients, suppliers, clientsIntro } = usePartners();

  const featuredServices = services.slice(0, 4);
  const featuredProjects = projects.slice(0, 5);

  // Les deux badges flottants du hero pointent sur les deux premiers chiffres
  // clés — un repli vide évite un crash si la liste est momentanément plus
  // courte (ex. juste après une modification depuis le tableau de bord).
  const emptyStat = { value: '', label: { fr: '', en: '', ar: '' } };
  const heroStatA = company.stats[0] ?? emptyStat;
  const heroStatB = company.stats[1] ?? emptyStat;

  return (
    <>
      <Seo
        title={{
          fr: 'HVAC, désenfumage et protection incendie en Algérie',
          en: 'HVAC, smoke extraction and fire protection in Algeria',
          ar: 'التكييف وتصريف الدخان والحماية من الحرائق في الجزائر',
        }}
        description={{
          fr: "HIS conçoit, installe et entretient vos systèmes de climatisation, ventilation, désenfumage et protection incendie. Bureau d'études et équipes qualifiées basés à Blida. Devis gratuit.",
          en: 'HIS designs, installs and maintains your air conditioning, ventilation, smoke extraction and fire protection systems. Design office and qualified teams based in Blida, Algeria. Free quote.',
          ar: 'تصمم HIS وتركب وتصون أنظمة التكييف والتهوية وتصريف الدخان والحماية من الحرائق. مكتب دراسات وفرق مؤهلة مقرها البليدة. عرض سعر مجاني.',
        }}
      />

      {/* ── Hero ─────────────────────────────────────────────── */}
      {/* min-h calé sur (viewport − header) + flex items-center : le contenu
          est toujours centré verticalement et les boutons restent visibles
          sans scroll, quelle que soit la hauteur d'écran. */}
      <section className="relative flex min-h-[calc(100svh-4.5rem)] items-center overflow-hidden bg-navy-900 lg:min-h-[calc(100svh-7rem)]">
        <div className="absolute inset-0" aria-hidden="true">
          <Img
            src="/images/hero-chantier.jpg"
            alt=""
            ratio="16/9"
            priority
            fallbackIcon="factory"
            className="h-full w-full"
          />
          {/* Sous la courbe (mobile / tablette) : voile dégradé — plus léger en
              haut (la photo respire sous le header), plus dense en bas pour que
              les cartes blanches qui chevauchent le hero ressortent nettement.
              Un halo radial chaud ajoute de la profondeur derrière le texte. */}
          <div className="absolute inset-0 bg-gradient-to-b from-navy-950/75 via-navy-900/80 to-navy-950/97 lg:hidden" />
          <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_15%_25%,rgba(224,75,45,0.14),transparent_60%)] lg:hidden" />
          {/* À partir de lg : la courbe de marque remplace le voile.
              `flip-rtl` la retourne en arabe, sinon le texte passerait sur la photo. */}
          <Swoosh className="flip-rtl absolute inset-0 hidden h-full w-full lg:block" />

          {/* Halos flottants — profondeur derrière le texte */}
          <div className="float-slow absolute -start-24 top-1/4 h-72 w-72 rounded-full bg-flame-500/20 blur-3xl" />
          <div className="float-slower absolute end-[8%] top-[12%] hidden h-56 w-56 rounded-full bg-white/10 blur-3xl lg:block" />
        </div>

        {/* pb plus généreux que pt : la carte blanche qui suit chevauche le
            hero via une marge négative (voir `-mt-12 lg:-mt-16` plus bas) —
            il faut garder de la marge sous les boutons pour qu'elle ne les
            recouvre jamais, même sur un écran bas. */}
        <div className="container-his relative pb-20 pt-10 sm:pb-28 sm:pt-20 lg:pb-32 lg:pt-14">
          <div className="animate-rise max-w-xl lg:max-w-[44%]">
            <p className="eyebrow eyebrow-on-dark">{t(company.slogan)}</p>
            <h1 className="text-[2.1rem] uppercase leading-[1.1] tracking-tight text-white sm:text-5xl sm:leading-[1.08] sm:tracking-normal lg:text-[3.4rem]">
              <HeroTitle title={t(company.heroTitle)} highlight={t(company.heroHighlight)} />
            </h1>
            <p className="mt-5 max-w-md text-[0.975rem] leading-relaxed text-white/80 sm:mt-6 sm:max-w-none sm:text-lg">
              {t(company.heroSubtitle)}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row">
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

        {/* Badges flottants — effet de profondeur au-dessus de la photo */}
        <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
          <div className="float-slow pointer-events-auto absolute bottom-[14%] end-[9%]">
            <TiltCard strength={10} className="glass-badge flex items-center gap-3 px-5 py-4">
              <span className="grid h-11 w-11 flex-none place-items-center rounded-lg bg-flame-500 text-white">
                <Icon name="experience" size={22} />
              </span>
              <div>
                <p className="text-xl font-extrabold leading-none text-white">
                  {heroStatA.value}
                </p>
                <p className="mt-1 text-[11px] leading-snug text-white/70">
                  {t(heroStatA.label)}
                </p>
              </div>
            </TiltCard>
          </div>
          <div className="float-slower pointer-events-auto absolute end-[26%] top-[18%]">
            <TiltCard strength={10} className="glass-badge flex items-center gap-3 px-5 py-4">
              <span className="grid h-11 w-11 flex-none place-items-center rounded-lg bg-navy-700 text-white">
                <Icon name="projects" size={22} />
              </span>
              <div>
                <p className="text-xl font-extrabold leading-none text-white">
                  {heroStatB.value}
                </p>
                <p className="mt-1 text-[11px] leading-snug text-white/70">
                  {t(heroStatB.label)}
                </p>
              </div>
            </TiltCard>
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
            {featuredServices.map((service, index) => (
              <li key={service.slug} className="relative outline outline-navy-100">
                <TiltCard strength={5} className="h-full">
                  <Reveal delay={index * 80} className="h-full">
                    <Link
                      to={href(lang, 'services', service.slug)}
                      className="group flex h-full flex-col items-center gap-3 px-4 py-6 text-center active:scale-[0.97] sm:px-6 sm:py-8 lg:px-5"
                    >
                      {/* Liseré rouge qui se révèle au survol */}
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-6 top-0 h-0.5 origin-center scale-x-0 bg-flame-500 transition-transform duration-300 ease-[var(--ease-out-soft)] group-hover:scale-x-100"
                      />
                      <span className="grid h-14 w-14 flex-none place-items-center rounded-xl bg-navy-50 text-navy-700 transition duration-300 group-hover:-translate-y-1 group-hover:rotate-6 group-hover:bg-flame-500 group-hover:text-white">
                        <Icon name={service.icon} size={28} />
                      </span>
                      <span className="text-[0.95rem] font-bold leading-snug text-navy-900 transition-colors group-hover:text-flame-600">
                        {t(service.title)}
                      </span>
                      <span className="text-xs leading-relaxed text-navy-900/70">
                        {t(service.short)}
                      </span>
                      {/* Sur écran tactile (pas de survol) la flèche reste
                          visible : elle occupe l'espace bas de la carte au lieu
                          de le laisser vide, et signale que la case est cliquable. */}
                      <span className="mt-auto pt-3 text-flame-500 opacity-70 transition duration-300 group-hover:opacity-100 lg:opacity-0 lg:group-hover:opacity-100">
                        <Icon name="arrow" size={16} className="flip-rtl" />
                      </span>
                    </Link>
                  </Reveal>
                </TiltCard>
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
            {company.stats.map((stat, index) => (
              <Reveal
                as="li"
                key={stat.value}
                delay={index * 90}
                className="group flex flex-col items-center gap-2 bg-white px-3 py-9 text-center transition-colors duration-300 hover:bg-flame-50"
              >
                <Icon
                  name={stat.icon}
                  size={30}
                  className="text-flame-500 transition-transform duration-300 group-hover:scale-110"
                />
                <span className="text-3xl font-extrabold text-navy-900">{stat.value}</span>
                <span className="text-xs leading-snug text-navy-900/70">{t(stat.label)}</span>
              </Reveal>
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
            {services.map((service, index) => (
              <Reveal as="li" key={service.slug} delay={(index % 3) * 90}>
                <Link
                  to={href(lang, 'services', service.slug)}
                  className="card-hover group flex h-full flex-col overflow-hidden active:scale-[0.98]"
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
                      <span className="grid h-10 w-10 flex-none place-items-center rounded-lg bg-navy-50 text-navy-600 transition group-hover:-translate-y-0.5 group-hover:bg-flame-500 group-hover:text-white">
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
              </Reveal>
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
            {featuredProjects.map((project, index) => (
              <Reveal as="li" key={project.id} delay={(index % 5) * 70}>
                <TiltCard strength={6}>
                  <Link
                    to={href(lang, 'projects')}
                    className="group block overflow-hidden rounded-xl shadow-md shadow-navy-900/10 ring-1 ring-navy-900/5 transition-shadow duration-300 ease-[var(--ease-out-soft)] hover:shadow-xl hover:shadow-navy-900/20 active:scale-[0.97]"
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
                </TiltCard>
              </Reveal>
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
            {sectors.map((sector, index) => (
              <Reveal
                as="li"
                key={sector.id}
                delay={(index % 5) * 70}
                className="card group flex flex-col items-center gap-3 px-4 py-7 text-center hover:border-flame-200 hover:shadow-lg hover:shadow-navy-900/5"
              >
                <Icon
                  name={sector.icon}
                  size={30}
                  className="text-flame-500 transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110"
                />
                <span className="text-sm font-semibold leading-snug text-navy-900">
                  {t(sector.name)}
                </span>
              </Reveal>
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
            {strengths.slice(0, 6).map((strength, index) => (
              <Reveal
                as="li"
                key={strength.id}
                delay={(index % 3) * 90}
                className="card group flex gap-4 bg-white p-6 hover:border-flame-200 hover:shadow-lg hover:shadow-navy-900/5"
              >
                <span className="grid h-11 w-11 flex-none place-items-center rounded-lg bg-flame-50 text-flame-600 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
                  <Icon name={strength.icon} size={22} />
                </span>
                <div>
                  <h3 className="text-base text-navy-900">{t(strength.title)}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-navy-900/65">
                    {t(strength.description)}
                  </p>
                </div>
              </Reveal>
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
            align="center"
          />

          {/* Paragraphe de présentation, juste au-dessus des logos clients. */}
          <div className="mx-auto mt-6 max-w-3xl space-y-4 text-center text-sm leading-relaxed text-navy-900/70 sm:text-base">
            {t(clientsIntro)
              .split('\n\n')
              .map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
          </div>

          <PartnerStrip partners={clients} className="mt-10" />

          <h3 className="mt-16 text-center text-sm font-bold uppercase tracking-[0.18em] text-navy-900/70">
            {t(ui.sections.suppliers)}
          </h3>
          <PartnerStrip partners={suppliers} className="mt-6" compact />
        </div>
      </section>
    </>
  );
}
