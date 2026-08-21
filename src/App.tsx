import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom';
import { adminRoutes } from '@/admin/AdminApp';
import { Layout } from '@/components/Layout';
import { detectPreferredLang, LanguageProvider } from '@/i18n/LanguageProvider';
import { isLang } from '@/i18n/types';
import { isKnownPath, paths } from '@/routes';
import { Home } from '@/pages/Home';

// La page d'accueil est dans le bundle initial ; le reste est chargé à la demande.
const About = lazy(() => import('@/pages/About').then((m) => ({ default: m.About })));
const Services = lazy(() => import('@/pages/Services').then((m) => ({ default: m.Services })));
const ServiceDetail = lazy(() =>
  import('@/pages/ServiceDetail').then((m) => ({ default: m.ServiceDetail })),
);
const Projects = lazy(() => import('@/pages/Projects').then((m) => ({ default: m.Projects })));
const ProjectDetail = lazy(() =>
  import('@/pages/ProjectDetail').then((m) => ({ default: m.ProjectDetail })),
);
const Sectors = lazy(() => import('@/pages/Sectors').then((m) => ({ default: m.Sectors })));
const Why = lazy(() => import('@/pages/Why').then((m) => ({ default: m.Why })));
const Contact = lazy(() => import('@/pages/Contact').then((m) => ({ default: m.Contact })));
const NotFound = lazy(() => import('@/pages/NotFound').then((m) => ({ default: m.NotFound })));

/** Réserve la hauteur d'un écran pendant le chargement d'une page — évite un saut de mise en page. */
function PageFallback() {
  return <div className="min-h-[70vh]" aria-busy="true" />;
}

/**
 * Valide le segment de langue de l'URL (/fr, /en, /ar) et installe le contexte
 * de traduction. Une langue inconnue renvoie vers la version française.
 */
function LangLayout() {
  const { lang } = useParams();

  if (!lang || !isLang(lang)) return <Navigate to="/fr" replace />;

  return (
    <LanguageProvider lang={lang}>
      <Layout />
    </LanguageProvider>
  );
}

/**
 * URL sans préfixe de langue → même page, dans la langue du navigateur (ou le
 * dernier choix mémorisé) : "/" → "/fr", "/contact" → "/fr/contact".
 *
 * Conserver la page demandée compte : un lien partagé ou une adresse tapée à la
 * main sans le préfixe ("his-hvac.com/contact") amenait tout le monde à
 * l'accueil — visiteur perdu, et redirection vers l'accueil que Google
 * interprète comme une page inexistante.
 */
function RootRedirect() {
  const { pathname } = useLocation();
  const [first, ...rest] = pathname.split('/').filter(Boolean);
  const kept = first && isKnownPath(first) ? [first, ...rest] : [];

  return <Navigate to={`/${[detectPreferredLang(), ...kept].join('/')}`} replace />;
}

export function App() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route path="/" element={<RootRedirect />} />

        {/* Hors préfixe de langue et hors Layout public — tableau de bord interne.
            Segments statiques : doivent l'emporter sur /:lang/services (voir AdminApp.tsx). */}
        {adminRoutes}

        <Route path="/:lang" element={<LangLayout />}>
          <Route index element={<Home />} />
          <Route path={paths.about} element={<About />} />
          <Route path={paths.services} element={<Services />} />
          <Route path={`${paths.services}/:slug`} element={<ServiceDetail />} />
          <Route path={paths.projects} element={<Projects />} />
          <Route path={`${paths.projects}/:slug`} element={<ProjectDetail />} />
          <Route path={paths.sectors} element={<Sectors />} />
          <Route path={paths.why} element={<Why />} />
          <Route path={paths.contact} element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="*" element={<RootRedirect />} />
      </Routes>
    </Suspense>
  );
}
