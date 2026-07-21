import { CtaBand } from '@/components/CtaBand';
import { Icon } from '@/components/Icon';
import { PartnerStrip } from '@/components/PartnerStrip';
import { PageHero, SectionHeading } from '@/components/Section';
import { Seo } from '@/components/Seo';
import { clients, clientsIntro, suppliers } from '@/content/partners';
import { sectors } from '@/content/sectors';
import { useLang } from '@/i18n/LanguageProvider';
import { ui } from '@/i18n/ui';

export function Sectors() {
  const { t } = useLang();

  return (
    <>
      <Seo
        title={{ fr: "Nos secteurs d'activité", en: 'Sectors we serve', ar: 'قطاعات نشاطنا' }}
        description={{
          fr: "HIS intervient dans l'industrie, l'agroalimentaire, le pharmaceutique, les hôpitaux, les hôtels, la promotion immobilière, l'énergie et la logistique en Algérie.",
          en: 'HIS serves industry, food processing, pharmaceuticals, hospitals, hotels, real estate development, energy and logistics across Algeria.',
          ar: 'تتدخل HIS في الصناعة والصناعات الغذائية والصيدلة والمستشفيات والفنادق والترقية العقارية والطاقة واللوجستيك في الجزائر.',
        }}
      />

      <PageHero
        title={ui.sections.sectors}
        intro={{
          fr: "Chaque secteur impose ses propres contraintes techniques et réglementaires. Nous adaptons nos solutions à votre environnement de travail.",
          en: 'Every sector carries its own technical and regulatory constraints. We adapt our solutions to your working environment.',
          ar: 'كل قطاع يفرض قيوده التقنية والتنظيمية. نكيّف حلولنا مع بيئة عملكم.',
        }}
      />

      <section className="section">
        <div className="container-his">
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sectors.map((sector) => (
              <li key={sector.id} className="card-hover flex gap-4 p-6">
                <span className="grid h-12 w-12 flex-none place-items-center rounded-lg bg-navy-50 text-navy-600">
                  <Icon name={sector.icon} size={24} />
                </span>
                <div>
                  <h2 className="text-base text-navy-900">{t(sector.name)}</h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-navy-900/65">
                    {t(sector.description)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-navy-50/60">
        <div className="container-his">
          <SectionHeading title={ui.sections.clients} intro={clientsIntro} align="center" />
          <PartnerStrip partners={clients} className="mt-10" />

          <h2 className="mt-16 text-center text-sm font-bold uppercase tracking-[0.18em] text-navy-900/70">
            {t(ui.sections.suppliers)}
          </h2>
          <PartnerStrip partners={suppliers} className="mt-6" compact />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
