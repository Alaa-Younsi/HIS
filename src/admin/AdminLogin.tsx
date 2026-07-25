import { useState, type FormEvent } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { isSupabaseConfigured } from '@/lib/supabase';
import { AdminLangSwitcher } from './components/AdminLangSwitcher';
import { inputClass } from './components/fields';
import { useAdminT } from './i18n';

export function AdminLogin() {
  const { session, loading, signIn } = useAuth();
  const { t } = useAdminT();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  if (loading) return <div className="min-h-screen" aria-busy="true" />;
  if (session) return <Navigate to="/admin" replace />;

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await signIn(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : t.login.error);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="grid min-h-screen place-items-center bg-navy-950 px-4">
      <div className="w-full max-w-sm rounded-xl bg-white p-8 shadow-2xl">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-2xl font-extrabold text-navy-900">
              H<span className="text-flame-500">I</span>S
            </p>
            <p className="mt-1 text-sm text-navy-900/60">{t.login.subtitle}</p>
          </div>
          <AdminLangSwitcher />
        </div>

        {!isSupabaseConfigured && (
          <p className="mt-4 rounded-lg bg-flame-50 p-3 text-xs text-flame-700">{t.login.notConfigured}</p>
        )}

        <form onSubmit={(event) => void submit(event)} className="mt-6 space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-navy-900/70">
              {t.login.email}
            </span>
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={inputClass}
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-navy-900/70">
              {t.login.password}
            </span>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={inputClass}
            />
          </label>

          {error && <p className="text-sm text-flame-600">{error}</p>}

          <button type="submit" disabled={busy} className="btn-primary w-full disabled:opacity-60">
            {busy ? t.login.signingIn : t.login.signIn}
          </button>
        </form>
      </div>
    </div>
  );
}
