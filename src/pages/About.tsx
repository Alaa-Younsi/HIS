import { CtaBand } from '@/components/CtaBand';
import { Icon } from '@/components/Icon';
import { Img } from '@/components/Img';
import { PageHero, SectionHeading } from '@/components/Section';
import { Seo } from '@/components/Seo';
import { company } from '@/content/company';
import { useLang } from '@/i18n/LanguageProvider';
import { ui } from '@/i18n/ui';
import type { IconName } from '@/components/Icon';
import type { Localized } from '@/i18n/types';

const pillars: readonly { id: string; icon: IconName; title: Localized; body: Localized }[] = [
  { id: 'story', icon: 'crane', title: ui.sections.ourStory, body: company.story },
  { id: 'mission', icon: 'shield', title: ui.sections.ourMission, body: company.mission },
  { id: 'expertise', icon: 'medal', title: ui.sections.ourExpertise, body: company.expertise },
];

export function About() {
  const { t } = useLang();

  return (
    <>
      <Seo
        title={{ fr: 'À propos de HIS', en: 'About HIS', ar: 'من نحن' }}
        description={{
          fr: "Fondée par deux ingénieurs de l'ENP et de l'USTHB, HIS apporte des solutions techniques fiables aux secteurs industriel et du bâtiment en Algérie.",
          en: 'Founded by two engineers from ENP and USTHB, HIS delivers reliable technical solutions to the industrial and construction sectors in Algeria.',
          ar: 'تأسست HIS على يد مهندسَين من ENP وUSTHB، وتقدم حلولاً تقنية موثوقة لقطاعي الصناعة والبناء في الجزائر.',
        }}
      />

      <PageHero title={ui.sections.about} intro={company.intro} />

      <section className="section">
        <div className="container-his grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-start lg:gap-16">
          <div className="space-y-10">
            {pillars.map((pillar) => (
              <article key={pillar.id}>
                <div className="mb-4 flex items-center gap-3">
                  <span className="grid h-11 w-11 flex-none place-items-center rounded-lg bg-flame-50 text-flame-600">
                    <Icon name={pillar.icon} size={22} />
                  </span>
                  <h2 className="text-2xl text-navy-900">{t(pillar.title)}</h2>
                </div>
                <p className="text-base leading-relaxed text-navy-900/70">{t(pillar.body)}</p>
              </article>
            ))}
          </div>

          <div className="lg:sticky lg:top-32">
            <Img
              src="/images/a-propos.jpg"
              alt={t({
                fr: "Équipe HIS sur un chantier d'installation technique",
                en: 'HIS team on a technical installation site',
                ar: 'فريق HIS في ورشة تركيب تقني',
              })}
              ratio="4/5"
              fallbackIcon="team"
              className="rounded-xl"
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
            <ul className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-navy-100">
              {company.stats.map((stat) => (
                <li key={stat.value} className="bg-white px-4 py-6 text-center">
                  <p className="text-2xl font-extrabold text-flame-500">{stat.value}</p>
                  <p className="mt-1 text-xs leading-snug text-navy-900/60">{t(stat.label)}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section bg-navy-50/60">
        <div className="container-his">
          <SectionHeading
            eyebrow={{ fr: 'Notre approche', en: 'Our approach', ar: 'مقاربتنا' }}
            title={{
              fr: "De l'étude à la mise en service",
              en: 'From design study to commissioning',
              ar: 'من الدراسة إلى التشغيل',
            }}
            intro={{
              fr: "Un accompagnement continu, avec un interlocuteur unique à chaque étape de votre projet.",
              en: 'Continuous support, with a single point of contact at every stage of your project.',
              ar: 'مرافقة مستمرة، مع مُحاور وحيد في كل مرحلة من مشروعكم.',
            }}
            align="center"
          />

          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: 'blueprint' as IconName,
                title: { fr: 'Étude', en: 'Study', ar: 'الدراسة' },
                body: {
                  fr: 'Analyse du besoin, bilan thermique et note de calcul.',
                  en: 'Needs analysis, thermal load and calculation notes.',
                  ar: 'تحليل الحاجة، الموازنة الحرارية ومذكرة الحساب.',
                },
              },
              {
                icon: 'truck' as IconName,
                title: { fr: 'Fourniture', en: 'Supply', ar: 'التوريد' },
                body: {
                  fr: 'Sélection et approvisionnement des équipements adaptés.',
                  en: 'Selection and sourcing of the right equipment.',
                  ar: 'اختيار وتوفير المعدات الملائمة.',
                },
              },
              {
                icon: 'wrench' as IconName,
                title: { fr: 'Installation', en: 'Installation', ar: 'التركيب' },
                body: {
                  fr: 'Montage sur chantier par nos équipes qualifiées.',
                  en: 'On-site assembly by our qualified teams.',
                  ar: 'التركيب في الورشة من طرف فرقنا المؤهلة.',
                },
              },
              {
                icon: 'check' as IconName,
                title: { fr: 'Mise en service', en: 'Commissioning', ar: 'التشغيل' },
                body: {
                  fr: 'Essais, réglages, formation et contrat de maintenance.',
                  en: 'Testing, adjustment, training and maintenance contract.',
                  ar: 'الاختبارات والضبط والتكوين وعقد الصيانة.',
                },
              },
            ].map((step, index) => (
              <li key={step.icon} className="card relative bg-white p-6">
                <span className="absolute end-5 top-5 text-4xl font-extrabold text-navy-900/6">
                  0{index + 1}
                </span>
                <Icon name={step.icon} size={28} className="text-flame-500" />
                <h3 className="mt-4 text-lg text-navy-900">{t(step.title)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-900/65">{t(step.body)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
