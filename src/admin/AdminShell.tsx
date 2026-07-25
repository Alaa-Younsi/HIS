import { Navigate, NavLink, Outlet } from 'react-router-dom';
import { Icon, type IconName } from '@/components/Icon';
import { useAuth } from '@/hooks/useAuth';
import { isSupabaseConfigured } from '@/lib/supabase';
import { AdminLangSwitcher } from './components/AdminLangSwitcher';
import { useAdminT } from './i18n';

const navItems: readonly { to: string; key: keyof ReturnType<typeof useAdminT>['t']['nav']; icon: IconName }[] = [
  { to: '/admin', key: 'dashboard', icon: 'chart' },
  { to: '/admin/entreprise', key: 'entreprise', icon: 'building' },
  { to: '/admin/services', key: 'services', icon: 'wrench' },
  { to: '/admin/realisations', key: 'realisations', icon: 'projects' },
  { to: '/admin/secteurs', key: 'secteurs', icon: 'factory' },
  { to: '/admin/pourquoi-his', key: 'pourquoiHis', icon: 'medal' },
  { to: '/admin/partenaires', key: 'partenaires', icon: 'clients' },
  { to: '/admin/demandes', key: 'demandes', icon: 'mail' },
];

/** Bandeau visible tant que Supabase n'a pas été connecté — voir SUPABASE_SETUP.md. */
function NotConfiguredBanner({ message }: { message: string }) {
  return (
    <div className="border-b border-flame-200 bg-flame-50 px-6 py-3 text-sm text-flame-700">{message}</div>
  );
}

export function AdminShell() {
  const { session, loading, signOut } = useAuth();
  const { t, lang } = useAdminT();

  if (loading) return <div className="min-h-screen" aria-busy="true" />;
  if (!session) return <Navigate to="/admin/login" replace />;

  return (
    <div className="flex min-h-screen flex-col bg-navy-50">
      {!isSupabaseConfigured && <NotConfiguredBanner message={t.notConfigured} />}

      <div className="flex flex-1">
        <aside className="hidden w-64 flex-none flex-col border-e border-navy-100 bg-white lg:flex">
          <div className="flex items-center justify-between border-b border-navy-100 p-5">
            <div>
              <p className="text-lg font-extrabold text-navy-900">
                H<span className="text-flame-500">I</span>S
              </p>
              <p className="text-xs text-navy-900/50">{t.nav.subtitle}</p>
            </div>
            <AdminLangSwitcher />
          </div>
          <nav className="flex-1 space-y-1 p-3">
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
                {t.nav[item.key]}
              </NavLink>
            ))}
          </nav>
          <div className="border-t border-navy-100 p-3">
            <a
              href={`/${lang}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-navy-700 transition hover:bg-navy-50"
            >
              <Icon name="arrow" size={18} className="flex-none rotate-180" />
              {t.nav.viewSite}
            </a>
            <button
              type="button"
              onClick={() => void signOut()}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-navy-700 transition hover:bg-navy-50"
            >
              <Icon name="close" size={18} className="flex-none" />
              {t.nav.signOut}
            </button>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="flex items-center justify-between border-b border-navy-100 bg-white px-5 py-3 lg:hidden">
            <p className="text-lg font-extrabold text-navy-900">
              H<span className="text-flame-500">I</span>S — Admin
            </p>
            <div className="flex items-center gap-3">
              <AdminLangSwitcher />
              <button type="button" onClick={() => void signOut()} className="text-sm font-semibold text-navy-700">
                {t.nav.signOutShort}
              </button>
            </div>
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
                {t.nav[item.key]}
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
