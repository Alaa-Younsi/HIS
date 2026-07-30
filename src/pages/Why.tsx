import { Icon } from '@/components/Icon';
import { PageHero } from '@/components/Section';
import { Seo } from '@/components/Seo';
import { company } from '@/content/company';
import { useCompanyInfo, useStrengths } from '@/hooks/useContent';
import { useLang } from '@/i18n/LanguageProvider';
import { ui } from '@/i18n/ui';

export function Why() {
  const { t } = useLang();
  const companyInfo = useCompanyInfo();
  const strengths = useStrengths();

  return (
    <>
      <Seo
        title={{ fr: 'Pourquoi choisir HIS ?', en: 'Why choose HIS?', ar: 'لماذا تختار HIS؟' }}
        description={{
          fr: "Ingénieurs qualifiés, respect des délais et des normes, solutions sur mesure, suivi de projet et maintenance : les raisons de confier vos installations à HIS.",
          en: 'Qualified engineers, on-time delivery, standards compliance, tailor-made solutions, project follow-up and maintenance: why entrust your installations to HIS.',
          ar: 'مهندسون مؤهلون، احترام الآجال والمعايير، حلول حسب الطلب، متابعة المشاريع والصيانة: أسباب تسليم منشآتكم إلى HIS.',
        }}
      />

      <PageHero
        title={ui.sections.why}
        intro={{
          fr: "Neuf raisons qui font la différence sur un chantier technique — et qui nous valent la confiance de nos clients.",
          en: 'Nine things that make the difference on a technical site — and that earn us our clients trust.',
          ar: 'تسعة أسباب تصنع الفارق في ورشة تقنية — وتكسبنا ثقة عملائنا.',
        }}
      />

      <section className="section">
        <div className="container-his">
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {strengths.map((strength, index) => (
              <li key={strength.id} className="card-hover relative overflow-hidden p-7">
                <span
                  className="absolute end-5 top-4 text-5xl font-extrabold text-navy-900/5"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="grid h-12 w-12 place-items-center rounded-lg bg-flame-50 text-flame-600">
                  <Icon name={strength.icon} size={24} />
                </span>
                <h2 className="mt-5 text-lg text-navy-900">{t(strength.title)}</h2>
                <p className="mt-2 text-sm leading-relaxed text-navy-900/65">
                  {t(strength.description)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-navy-950">
        <div className="container-his text-center">
          <blockquote className="mx-auto max-w-3xl">
            <Icon name="medal" size={40} className="mx-auto text-flame-500" />
            <p className="mt-6 text-2xl font-bold leading-snug text-white sm:text-3xl">
              « {t(companyInfo.tagline)} »
            </p>
            <footer className="mt-5 text-sm uppercase tracking-widest text-white/50">
              {company.legalName}
            </footer>
          </blockquote>

          <ul className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-xl bg-white/10 lg:grid-cols-4">
            {companyInfo.stats.map((stat) => (
              <li key={stat.value} className="bg-navy-950 px-4 py-8 text-center">
                <p className="text-3xl font-extrabold text-flame-500">{stat.value}</p>
                <p className="mt-2 text-xs leading-snug text-white/60">{t(stat.label)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
