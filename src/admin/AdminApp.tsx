import { Route, Routes } from 'react-router-dom';
import { AdminLogin } from './AdminLogin';
import { AdminShell } from './AdminShell';
import { Dashboard } from './Dashboard';
import { Demandes } from './pages/Demandes';
import { Entreprise } from './pages/Entreprise';
import { Partenaires } from './pages/Partenaires';
import { PourquoiHis } from './pages/PourquoiHis';
import { Realisations } from './pages/Realisations';
import { Secteurs } from './pages/Secteurs';
import { Services } from './pages/Services';

/** Arborescence admin — hors du préfixe de langue /:lang, interface en français uniquement. */
export function AdminApp() {
  return (
    <Routes>
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
      </Route>
    </Routes>
  );
}
