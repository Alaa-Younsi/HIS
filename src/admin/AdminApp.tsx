import { lazy } from 'react';
import { Outlet, Route } from 'react-router-dom';
import { AdminLogin } from './AdminLogin';
import { AdminShell } from './AdminShell';
import { Dashboard } from './Dashboard';
import { AdminLangProvider } from './i18n';

// Pages de contenu chargées à la demande — le squelette (shell + tableau de bord
// + connexion) reste dans le même bundle, le reste se charge à l'ouverture.
const Account = lazy(() => import('./pages/Account').then((m) => ({ default: m.Account })));
const Demandes = lazy(() => import('./pages/Demandes').then((m) => ({ default: m.Demandes })));
const Entreprise = lazy(() => import('./pages/Entreprise').then((m) => ({ default: m.Entreprise })));
const Partenaires = lazy(() => import('./pages/Partenaires').then((m) => ({ default: m.Partenaires })));
const PourquoiHis = lazy(() => import('./pages/PourquoiHis').then((m) => ({ default: m.PourquoiHis })));
const Realisations = lazy(() => import('./pages/Realisations').then((m) => ({ default: m.Realisations })));
const Secteurs = lazy(() => import('./pages/Secteurs').then((m) => ({ default: m.Secteurs })));
const Services = lazy(() => import('./pages/Services').then((m) => ({ default: m.Services })));

/**
 * Arborescence admin — déclarée avec des segments STATIQUES (`admin/services`…)
 * et injectée directement dans le `<Routes>` racine (voir src/App.tsx), et non
 * via un `<Route path="/admin/*">` avec un `<Routes>` imbriqué.
 *
 * Pourquoi : React Router choisit une route par score de spécificité, pas par
 * ordre. Un `/admin/*` (splat) obtient un score plus faible que la route
 * publique `/:lang/services` — si bien que `/admin/services` était capturé par
 * le site public avec `lang = "admin"`, jugé invalide, puis redirigé vers `/fr`.
 * Des segments statiques (`/admin/services`) l'emportent sur `/:lang/services`
 * et suppriment définitivement cette collision.
 *
 * Hors du préfixe de langue /:lang — interface admin en français par défaut,
 * langue réglable depuis le tableau de bord.
 */
/** Fournit la langue de l'interface admin à tout le sous-arbre (connexion incluse). */
function AdminLangLayout() {
  return (
    <AdminLangProvider>
      <Outlet />
    </AdminLangProvider>
  );
}

export const adminRoutes = (
  <Route path="admin" element={<AdminLangLayout />}>
    <Route path="login" element={<AdminLogin />} />
    <Route element={<AdminShell />}>
      <Route index element={<Dashboard />} />
      <Route path="entreprise" element={<Entreprise />} />
      <Route path="services" element={<Services />} />
      <Route path="realisations" element={<Realisations />} />
      <Route path="secteurs" element={<Secteurs />} />
      <Route path="pourquoi-his" element={<PourquoiHis />} />
      <Route path="partenaires" element={<Partenaires />} />
      <Route path="demandes" element={<Demandes />} />
      <Route path="compte" element={<Account />} />
    </Route>
  </Route>
);
