import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@/components/Icon';
import { Img } from '@/components/Img';
import { PageHero } from '@/components/Section';
import { Seo } from '@/components/Seo';
import { projectCategories, type ProjectCategory } from '@/content/projects';
import { useProjects } from '@/hooks/useContent';
import { useLang } from '@/i18n/LanguageProvider';
import { ui } from '@/i18n/ui';
import { href } from '@/routes';

type Filter = ProjectCategory | 'all';

export function Projects() {
  const { t, lang } = useLang();
  const projects = useProjects();
  const [filter, setFilter] = useState<Filter>('all');

  const visible = useMemo(
    () => (filter === 'all' ? projects : projects.filter((project) => project.category === filter)),
    [filter, projects],
  );

  // N'affiche que les catégories qui contiennent au moins une réalisation.
  const availableCategories = useMemo(
    () => projectCategories.filter((category) => projects.some((p) => p.category === category.id)),
    [projects],
  );

  return (
    <>
      <Seo
        title={{ fr: 'Nos réalisations', en: 'Our projects', ar: 'إنجازاتنا' }}
        description={{
          fr: "Galerie des chantiers HIS : réseaux incendie, RIA, skids de pompage, centrales de traitement d'air et chambres froides réalisés en Algérie.",
          en: 'HIS project gallery: fire networks, hose reels, pumping skids, air handling units and cold rooms delivered across Algeria.',
          ar: 'معرض ورشات HIS: شبكات الحريق، بكرات الخراطيم، وحدات الضخ، وحدات معالجة الهواء وغرف التبريد المنجزة في الجزائر.',
        }}
      />

      <PageHero
        title={ui.sections.projects}
        intro={{
          fr: "Chaque chantier illustre notre exigence technique et notre respect des normes en vigueur.",
          en: 'Every project reflects our technical standards and compliance with current regulations.',
          ar: 'كل ورشة تعكس صرامتنا التقنية واحترامنا للمعايير السارية.',
        }}
      />

      <section className="section">
        <div className="container-his">
          {/* Filtres par catégorie */}
          <div
            role="group"
            aria-label={t(ui.labels.filterBy)}
            className="flex flex-wrap items-center gap-2"
          >
            <Icon name="filter" size={18} className="me-1 hidden text-navy-400 sm:block" />
            <FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>
              {t(ui.labels.all)}
            </FilterButton>
            {availableCategories.map((category) => (
              <FilterButton
                key={category.id}
                active={filter === category.id}
                onClick={() => setFilter(category.id)}
              >
                {t(category.label)}
              </FilterButton>
            ))}
          </div>

          {visible.length === 0 ? (
            <p className="mt-12 text-center text-navy-900/70">{t(ui.labels.noProjects)}</p>
          ) : (
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((project) => (
                <li key={project.id} className="card-hover group overflow-hidden">
                  <Link to={href(lang, 'projects', project.slug)} className="block">
                    <div className="relative">
                      <Img
                        src={project.image}
                        alt={t(project.title)}
                        ratio="4/3"
                        fallbackIcon="fire"
                        sizes="(min-width: 1240px) 372px, (min-width: 1024px) 31vw, (min-width: 640px) 47vw, 92vw"
                        imgClassName="transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute start-4 top-4 rounded-full bg-flame-500 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                        {t(
                          projectCategories.find((category) => category.id === project.category)?.label ?? {
                            fr: '',
                            en: '',
                            ar: '',
                          },
                        )}
                      </span>
                      {project.videos && project.videos.length > 0 && (
                        <span className="absolute end-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-navy-950/70 text-white backdrop-blur-sm">
                          <Icon name="play" size={15} />
                        </span>
                      )}
                    </div>

                    <div className="p-6">
                      <h2 className="text-lg leading-snug text-navy-900 transition group-hover:text-flame-600">
                        {t(project.title)}
                      </h2>
                      <div className="mt-2 space-y-1.5">
                        <p className="flex items-center gap-1.5 text-xs text-navy-900/70">
                          <Icon name="pin" size={14} className="flex-none text-flame-500" />
                          {t(project.location)}
                          {project.year && <span className="text-navy-300">·</span>}
                          {project.year}
                        </p>
                        {project.client && (
                          <p className="flex items-center gap-1.5 text-xs text-navy-900/70">
                            <Icon name="building" size={14} className="flex-none text-flame-500" />
                            <span>
                              <span className="font-semibold text-navy-900/80">{t(ui.labels.client)} : </span>
                              {t(project.client)}
                            </span>
                          </p>
                        )}
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-navy-900/65">
                        {t(project.description)}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-flame-600">
                        {t(ui.cta.viewProject)}
                        <Icon name="arrow" size={13} className="flip-rtl" />
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition ${
        active
          ? 'bg-flame-500 text-white shadow-md shadow-flame-500/25'
          : 'bg-navy-50 text-navy-700 hover:bg-navy-100'
      }`}
    >
      {children}
    </button>
  );
}
