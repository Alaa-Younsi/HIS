import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@/components/Icon';
import { supabase } from '@/lib/supabase';
import type { LeadRow } from '@/types/db';
import { useAdminT } from './i18n';

function StatCard({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="card p-6">
      <p className="text-3xl font-extrabold text-navy-900">{value}</p>
      <p className="mt-1 text-sm text-navy-900/60">{label}</p>
    </div>
  );
}

export function Dashboard() {
  const { t, locale } = useAdminT();
  const [leads, setLeads] = useState<LeadRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(200)
      .then(({ data, error }) => {
        if (error) setLoadError(error.message);
        else setLeads((data ?? []) as LeadRow[]);
        setLoading(false);
      });
  }, []);

  const newCount = leads.filter((lead) => lead.status === 'new').length;
  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const weekCount = leads.filter((lead) => new Date(lead.created_at).getTime() > weekAgo).length;
  const recent = leads.slice(0, 6);

  return (
    <div>
      <h1 className="text-2xl text-navy-900">{t.dashboard.title}</h1>
      <p className="mt-1 text-sm text-navy-900/60">{t.dashboard.subtitle}</p>

      {loadError && <p className="mt-4 text-sm text-flame-600">{loadError}</p>}

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <StatCard label={t.dashboard.newRequests} value={loading ? '—' : newCount} />
        <StatCard label={t.dashboard.weekRequests} value={loading ? '—' : weekCount} />
        <StatCard label={t.dashboard.total} value={loading ? '—' : leads.length} />
      </div>

      <div className="mt-8 card p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg text-navy-900">{t.dashboard.recent}</h2>
          <Link to="/admin/demandes" className="text-xs font-bold uppercase tracking-wider text-flame-600">
            {t.dashboard.viewAll}
          </Link>
        </div>

        {recent.length === 0 ? (
          <p className="mt-4 text-sm text-navy-900/60">{loading ? t.common.loading : t.dashboard.empty}</p>
        ) : (
          <ul className="mt-4 divide-y divide-navy-100">
            {recent.map((lead) => (
              <li key={lead.id} className="flex items-center gap-3 py-3">
                <span
                  className={`grid h-9 w-9 flex-none place-items-center rounded-lg ${
                    lead.status === 'new' ? 'bg-flame-50 text-flame-600' : 'bg-navy-50 text-navy-500'
                  }`}
                >
                  <Icon name="mail" size={16} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-navy-900">{lead.name}</p>
                  <p className="truncate text-xs text-navy-900/50">
                    {lead.kind === 'devis' ? t.dashboard.devis : t.dashboard.contact} · {lead.phone}
                  </p>
                </div>
                <span className="flex-none text-xs text-navy-900/40">
                  {new Date(lead.created_at).toLocaleDateString(locale)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
