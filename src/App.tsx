import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { detectPreferredLang, LanguageProvider } from '@/i18n/LanguageProvider';
import { isLang } from '@/i18n/types';
import { paths } from '@/routes';
import { Home } from '@/pages/Home';

const AdminApp = lazy(() => import('@/admin/AdminApp').then((m) => ({ default: m.AdminApp })));

// La page d'accueil est dans le bundle initial ; le reste est chargé à la demande.
const About = lazy(() => import('@/pages/About').then((m) => ({ default: m.About })));
const Services = lazy(() => import('@/pages/Services').then((m) => ({ default: m.Services })));
const ServiceDetail = lazy(() =>
  import('@/pages/ServiceDetail').then((m) => ({ default: m.ServiceDetail })),
);
const Projects = lazy(() => import('@/pages/Projects').then((m) => ({ default: m.Projects })));
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

/** "/" → langue du navigateur (ou dernier choix mémorisé). */
function RootRedirect() {
  return <Navigate to={`/${detectPreferredLang()}`} replace />;
}

export function App() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route path="/" element={<RootRedirect />} />

        {/* Hors préfixe de langue et hors Layout public — tableau de bord interne. */}
        <Route path="/admin/*" element={<AdminApp />} />

        <Route path="/:lang" element={<LangLayout />}>
          <Route index element={<Home />} />
          <Route path={paths.about} element={<About />} />
          <Route path={paths.services} element={<Services />} />
          <Route path={`${paths.services}/:slug`} element={<ServiceDetail />} />
          <Route path={paths.projects} element={<Projects />} />
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
