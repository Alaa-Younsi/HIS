import { Link, Navigate, useParams } from 'react-router-dom';
import { Icon } from '@/components/Icon';
import { Img } from '@/components/Img';
import { Seo, breadcrumbJsonLd } from '@/components/Seo';
import { telUrl, whatsappUrl } from '@/content/company';
import { projectCategories } from '@/content/projects';
import { useCompanyInfo, useProjects } from '@/hooks/useContent';
import { useLang } from '@/i18n/LanguageProvider';
import { ui } from '@/i18n/ui';
import { href } from '@/routes';

export function ProjectDetail() {
  const { lang, t } = useLang();
  const { slug } = useParams();
  const companyInfo = useCompanyInfo();
  const projects = useProjects();
  const project = projects.find((item) => item.slug === slug);

  if (!project) return <Navigate to={href(lang, 'projects')} replace />;

  const category = projectCategories.find((item) => item.id === project.category);
  const others = projects.filter((item) => item.slug !== project.slug).slice(0, 3);

  return (
    <>
      <Seo
        title={project.title}
        description={project.description}
        image={project.image}
        jsonLd={breadcrumbJsonLd([
          { name: t(ui.nav.home), path: href(lang, 'home') },
          { name: t(ui.nav.projects), path: href(lang, 'projects') },
          { name: t(project.title), path: href(lang, 'projects', project.slug) },
        ])}
      />

      <section className="relative overflow-hidden bg-navy-900">
        <div className="absolute inset-0">
          <Img src={project.image} alt="" ratio="16/9" priority fallbackIcon="fire" className="h-full w-full" />
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
                <Link to={href(lang, 'projects')} className="transition hover:text-white">
                  {t(ui.nav.projects)}
                </Link>
              </li>
              <li aria-hidden="true">
                <Icon name="chevron" size={12} className="flip-rtl" />
              </li>
              <li className="font-semibold text-white">{t(project.title)}</li>
            </ol>
          </nav>

          {category && (
            <span className="mb-5 inline-block rounded-full bg-flame-500 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
              {t(category.label)}
            </span>
          )}
          <h1 className="max-w-3xl text-3xl leading-tight text-white sm:text-4xl lg:text-5xl">
            {t(project.title)}
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/75">
            <span className="flex items-center gap-1.5">
              <Icon name="pin" size={16} className="flex-none text-flame-500" />
              {t(project.location)}
              {project.year && <span className="text-white/40">·</span>}
              {project.year}
            </span>
            {project.client && (
              <span className="flex items-center gap-1.5">
                <Icon name="building" size={16} className="flex-none text-flame-500" />
                <span className="font-semibold text-white/90">{t(ui.labels.client)} : </span>
                {t(project.client)}
              </span>
            )}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-his grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
          <div>
            <p className="text-base leading-relaxed text-navy-900/75 sm:text-lg">
              {t(project.description)}
            </p>

            {project.gallery && project.gallery.length > 0 && (
              <>
                <h2 className="mt-10 text-2xl text-navy-900">{t(ui.sections.gallery)}</h2>
                <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {project.gallery.map((photo) => (
                    <Img key={photo} src={photo} alt="" ratio="4/3" fallbackIcon="fire" className="rounded-lg" />
                  ))}
                </div>
              </>
            )}

            {project.videos && project.videos.length > 0 && (
              <>
                <h2 className="mt-10 text-2xl text-navy-900">{t(ui.sections.videos)}</h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {project.videos.map((videoUrl) => (
                    <video
                      key={videoUrl}
                      src={videoUrl}
                      controls
                      preload="metadata"
                      className="w-full rounded-lg bg-navy-900"
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
                    fr: 'Un projet similaire en tête ? Décrivez-nous votre besoin, nous revenons vers vous avec une proposition technique et chiffrée.',
                    en: 'A similar project in mind? Tell us about your needs and we will come back to you with a technical and costed proposal.',
                    ar: 'هل لديكم مشروع مشابه؟ صِفوا لنا حاجتكم وسنعود إليكم باقتراح تقني ومسعّر.',
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

            {others.length > 0 && (
              <>
                <h2 className="mt-10 text-sm font-bold uppercase tracking-widest text-navy-900/70">
                  {t(ui.sections.otherProjects)}
                </h2>
                <ul className="mt-4 space-y-2">
                  {others.map((item) => (
                    <li key={item.slug}>
                      <Link
                        to={href(lang, 'projects', item.slug)}
                        className="card flex items-center gap-3 p-3 transition hover:border-flame-200 hover:bg-flame-50/40"
                      >
                        <Img src={item.image} alt="" ratio="1/1" fallbackIcon="fire" className="w-14 flex-none rounded-md" />
                        <span className="flex-1 text-sm font-semibold text-navy-900">{t(item.title)}</span>
                        <Icon name="chevron" size={15} className="flip-rtl text-navy-300" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}

            <Link
              to={href(lang, 'projects')}
              className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-flame-600 hover:text-flame-700"
            >
              <Icon name="arrow" size={15} className="ltr:rotate-180" />
              {t(ui.cta.backToProjects)}
            </Link>
          </aside>
        </div>
      </section>
    </>
  );
}
