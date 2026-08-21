import { useState } from 'react';
import { Field, inputClass } from '@/admin/components/fields';
import { useAdminT } from '@/admin/i18n';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';

/**
 * Change le mot de passe du compte connecté. `supabase.auth.updateUser()` ne
 * demande à lui seul aucune preuve de l'ancien mot de passe — sans la
 * ré-authentification ci-dessous, un tableau de bord laissé ouvert et sans
 * surveillance suffirait à quelqu'un pour verrouiller le véritable
 * propriétaire hors de son propre compte.
 */
export function Account() {
  const { t } = useAdminT();
  const { session } = useAuth();
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ tone: 'success' | 'error'; text: string } | null>(null);

  const email = session?.user.email ?? '';

  const save = async () => {
    setStatus(null);

    if (next.length < 8) {
      setStatus({ tone: 'error', text: t.account.errorTooShort });
      return;
    }
    if (next !== confirm) {
      setStatus({ tone: 'error', text: t.account.errorMismatch });
      return;
    }
    if (next === current) {
      setStatus({ tone: 'error', text: t.account.errorSamePassword });
      return;
    }
    if (!supabase || !email) return;

    setSaving(true);
    try {
      const { error: authError } = await supabase.auth.signInWithPassword({ email, password: current });
      if (authError) {
        setStatus({ tone: 'error', text: t.account.errorWrongPassword });
        return;
      }

      const { error } = await supabase.auth.updateUser({ password: next });
      if (error) {
        setStatus({ tone: 'error', text: t.account.errorGeneric });
        return;
      }

      setStatus({ tone: 'success', text: t.account.success });
      setCurrent('');
      setNext('');
      setConfirm('');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl text-navy-900">{t.account.title}</h1>
      <p className="mt-1 text-sm text-navy-900/60">{t.account.subtitle}</p>
      {email && (
        <p className="mt-1 text-sm text-navy-900/60">
          {t.account.signedInAs} <span className="font-semibold text-navy-900">{email}</span>
        </p>
      )}

      <div className="mt-6 card max-w-md space-y-5 p-6">
        <Field label={t.account.currentPassword}>
          <input
            type="password"
            autoComplete="current-password"
            value={current}
            onChange={(event) => setCurrent(event.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label={t.account.newPassword} hint={t.account.passwordHint}>
          <input
            type="password"
            autoComplete="new-password"
            value={next}
            onChange={(event) => setNext(event.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label={t.account.confirmPassword}>
          <input
            type="password"
            autoComplete="new-password"
            value={confirm}
            onChange={(event) => setConfirm(event.target.value)}
            className={inputClass}
          />
        </Field>

        {status && (
          <p className={`text-sm ${status.tone === 'success' ? 'text-navy-600' : 'text-flame-600'}`}>{status.text}</p>
        )}

        <button
          type="button"
          onClick={() => void save()}
          disabled={saving || !current || !next || !confirm}
          className="btn-primary !py-2.5 !text-xs disabled:opacity-60"
        >
          {saving ? t.account.changing : t.account.changePassword}
        </button>
      </div>
    </div>
  );
}
