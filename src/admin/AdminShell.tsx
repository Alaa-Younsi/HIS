import { Navigate, NavLink, Outlet } from 'react-router-dom';
import { Icon, type IconName } from '@/components/Icon';
import { useAuth } from '@/hooks/useAuth';
import { isSupabaseConfigured } from '@/lib/supabase';

const navItems: readonly { to: string; label: string; icon: IconName }[] = [
  { to: '/admin', label: 'Tableau de bord', icon: 'chart' },
  { to: '/admin/entreprise', label: 'Entreprise', icon: 'building' },
  { to: '/admin/services', label: 'Services', icon: 'wrench' },
  { to: '/admin/realisations', label: 'Réalisations', icon: 'projects' },
  { to: '/admin/secteurs', label: 'Secteurs', icon: 'factory' },
  { to: '/admin/pourquoi-his', label: 'Pourquoi HIS', icon: 'medal' },
  { to: '/admin/partenaires', label: 'Partenaires', icon: 'clients' },
  { to: '/admin/demandes', label: 'Demandes', icon: 'mail' },
];

/** Bandeau visible tant que Supabase n'a pas été connecté — voir SUPABASE_SETUP.md. */
function NotConfiguredBanner() {
  return (
    <div className="border-b border-flame-200 bg-flame-50 px-6 py-3 text-sm text-flame-700">
      Supabase n'est pas encore connecté : le tableau de bord ne peut ni lire ni écrire de contenu.
      Suivez <code className="rounded bg-white/60 px-1.5 py-0.5">SUPABASE_SETUP.md</code> pour l'activer.
    </div>
  );
}

export function AdminShell() {
  const { session, loading, signOut } = useAuth();

  if (loading) return <div className="min-h-screen" aria-busy="true" />;
  if (!session) return <Navigate to="/admin/login" replace />;

  return (
    <div className="min-h-screen bg-navy-50">
      {!isSupabaseConfigured && <NotConfiguredBanner />}

      <div className="flex">
        <aside className="hidden w-64 flex-none border-e border-navy-100 bg-white lg:block">
          <div className="border-b border-navy-100 p-5">
            <p className="text-lg font-extrabold text-navy-900">
              H<span className="text-flame-500">I</span>S
            </p>
            <p className="text-xs text-navy-900/50">Tableau de bord</p>
          </div>
          <nav className="space-y-1 p-3">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/admin'}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
                    isActive ? 'bg-flame-50 text-flame-600' : 'text-navy-700 hover:bg-navy-50'
                  }`
                }
              >
                <Icon name={item.icon} size={18} className="flex-none" />
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="border-t border-navy-100 p-3">
            <a
              href="/fr"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-navy-700 transition hover:bg-navy-50"
            >
              <Icon name="arrow" size={18} className="flex-none rotate-180" />
              Voir le site
            </a>
            <button
              type="button"
              onClick={() => void signOut()}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-navy-700 transition hover:bg-navy-50"
            >
              <Icon name="close" size={18} className="flex-none" />
              Se déconnecter
            </button>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="flex items-center justify-between border-b border-navy-100 bg-white px-5 py-3 lg:hidden">
            <p className="text-lg font-extrabold text-navy-900">
              H<span className="text-flame-500">I</span>S — Admin
            </p>
            <button type="button" onClick={() => void signOut()} className="text-sm font-semibold text-navy-700">
              Déconnexion
            </button>
          </header>

          <nav className="flex gap-1 overflow-x-auto border-b border-navy-100 bg-white px-3 py-2 lg:hidden">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/admin'}
                className={({ isActive }) =>
                  `flex-none whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-bold ${
                    isActive ? 'bg-flame-50 text-flame-600' : 'text-navy-600'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <main className="p-5 sm:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
