import { useEffect, useState } from 'react';
import { ConfirmModal } from '@/admin/components/ConfirmModal';
import { inputClass } from '@/admin/components/fields';
import { useAdminT } from '@/admin/i18n';
import { exportLeadsToExcel } from '@/lib/exportLeads';
import { supabase } from '@/lib/supabase';
import type { LeadRow } from '@/types/db';

type StatusFilter = 'all' | LeadRow['status'];
type KindFilter = 'all' | LeadRow['kind'];

export function Demandes() {
  const { t, locale } = useAdminT();
  const statusLabel: Record<LeadRow['status'], string> = {
    new: t.demandes.statusNew,
    read: t.demandes.statusRead,
    archived: t.demandes.statusArchived,
  };
  const [leads, setLeads] = useState<LeadRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [kindFilter, setKindFilter] = useState<KindFilter>('all');
  const [selected, setSelected] = useState<LeadRow | null>(null);
  const [confirmingDeleteAll, setConfirmingDeleteAll] = useState(false);
  const [statusError, setStatusError] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  const reload = async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data, error } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
    // En cas d'échec, on ne touche pas à `leads` : afficher une liste vidée
    // se lirait comme « aucune demande » plutôt que comme une erreur réseau.
    if (error) setLoadError(error.message);
    else {
      setLoadError(null);
      setLeads((data ?? []) as LeadRow[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    void reload();
  }, []);

  const visible = leads.filter(
    (lead) => (statusFilter === 'all' || lead.status === statusFilter) && (kindFilter === 'all' || lead.kind === kindFilter),
  );

  const setStatus = async (lead: LeadRow, status: LeadRow['status']) => {
    if (!supabase) return;
    setStatusError(null);
    const { error } = await supabase.from('leads').update({ status }).eq('id', lead.id);
    if (error) {
      // Ne pas corriger l'affichage sur un échec : le panneau de détail
      // resterait sinon bloqué sur un statut jamais réellement enregistré.
      setStatusError(t.common.saveFailed);
      return;
    }
    setSelected((current) => (current?.id === lead.id ? { ...current, status } : current));
    await reload();
  };

  const deleteAll = async () => {
    if (!supabase) return;
    const { error } = await supabase.from('leads').delete().not('id', 'is', null);
    if (error) throw error;
    setSelected(null);
    await reload();
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl text-navy-900">{t.demandes.title}</h1>
          <p className="mt-1 text-sm text-navy-900/60">{t.demandes.subtitle}</p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => exportLeadsToExcel(leads)}
            disabled={leads.length === 0}
            className="btn-ghost !py-2 !text-xs disabled:opacity-50"
          >
            {t.demandes.exportExcel}
          </button>
          <button
            type="button"
            onClick={() => setConfirmingDeleteAll(true)}
            disabled={leads.length === 0}
            className="btn-ghost !py-2 !text-xs text-flame-600 disabled:opacity-50"
          >
            {t.demandes.deleteAll}
          </button>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {(['all', 'new', 'read', 'archived'] as const).map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => setStatusFilter(status)}
            className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition ${
              statusFilter === status ? 'bg-flame-500 text-white' : 'bg-navy-50 text-navy-700 hover:bg-navy-100'
            }`}
          >
            {status === 'all' ? t.demandes.filterAll : statusLabel[status]}
          </button>
        ))}
        <span className="mx-1 h-6 w-px self-center bg-navy-100" />
        {(['all', 'devis', 'contact'] as const).map((kind) => (
          <button
            key={kind}
            type="button"
            onClick={() => setKindFilter(kind)}
            className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition ${
              kindFilter === kind ? 'bg-navy-800 text-white' : 'bg-navy-50 text-navy-700 hover:bg-navy-100'
            }`}
          >
            {kind === 'all' ? t.demandes.filterAllKinds : kind === 'devis' ? t.demandes.devis : t.demandes.contact}
          </button>
        ))}
      </div>

      {loadError && <p className="mt-4 text-sm text-flame-600">{loadError}</p>}

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <div className="overflow-x-auto rounded-xl border border-navy-100 bg-white">
          <table className="w-full text-sm">
            <thead className="border-b border-navy-100 bg-navy-50/60 text-left text-xs font-bold uppercase tracking-wider text-navy-900/60">
              <tr>
                <th className="whitespace-nowrap px-4 py-3">{t.demandes.colName}</th>
                <th className="whitespace-nowrap px-4 py-3">{t.demandes.colType}</th>
                <th className="whitespace-nowrap px-4 py-3">{t.demandes.colStatus}</th>
                <th className="whitespace-nowrap px-4 py-3">{t.demandes.colDate}</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td className="px-4 py-6 text-navy-900/50" colSpan={4}>
                    {t.common.loading}
                  </td>
                </tr>
              ) : visible.length === 0 ? (
                <tr>
                  <td className="px-4 py-6 text-navy-900/50" colSpan={4}>
                    {t.demandes.empty}
                  </td>
                </tr>
              ) : (
                visible.map((lead) => (
                  <tr
                    key={lead.id}
                    onClick={() => {
                      setSelected(lead);
                      if (lead.status === 'new') void setStatus(lead, 'read');
                    }}
                    className={`cursor-pointer whitespace-nowrap border-b border-navy-50 transition last:border-0 hover:bg-navy-50/60 ${
                      selected?.id === lead.id ? 'bg-flame-50/60' : ''
                    }`}
                  >
                    <td className="px-4 py-3 font-medium text-navy-900">
                      {lead.status === 'new' && <span className="me-2 inline-block h-2 w-2 rounded-full bg-flame-500" />}
                      {lead.name}
                    </td>
                    <td className="px-4 py-3 text-navy-900/60">{lead.kind === 'devis' ? t.demandes.devis : t.demandes.contact}</td>
                    <td className="px-4 py-3 text-navy-900/60">{statusLabel[lead.status]}</td>
                    <td className="px-4 py-3 text-navy-900/50">{new Date(lead.created_at).toLocaleDateString(locale)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="card p-6">
          {!selected ? (
            <p className="text-sm text-navy-900/50">{t.demandes.selectPrompt}</p>
          ) : (
            <div>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg text-navy-900">{selected.name}</h2>
                  <p className="text-xs text-navy-900/50">
                    {new Date(selected.created_at).toLocaleString(locale)} ·{' '}
                    {selected.kind === 'devis' ? t.demandes.devis : t.demandes.contact}
                  </p>
                </div>
                <select
                  value={selected.status}
                  onChange={(event) => void setStatus(selected, event.target.value as LeadRow['status'])}
                  className={`${inputClass} max-w-[9rem]`}
                >
                  <option value="new">{t.demandes.statusNew}</option>
                  <option value="read">{t.demandes.statusRead}</option>
                  <option value="archived">{t.demandes.statusArchived}</option>
                </select>
              </div>

              {statusError && <p className="mt-2 text-sm text-flame-600">{statusError}</p>}

              <dl className="mt-5 space-y-3 text-sm">
                {selected.organisation && (
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-wider text-navy-900/50">{t.demandes.organisation}</dt>
                    <dd className="text-navy-900">{selected.organisation}</dd>
                  </div>
                )}
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wider text-navy-900/50">{t.demandes.phone}</dt>
                  <dd className="text-navy-900" dir="ltr">
                    <a href={`tel:${selected.phone}`} className="hover:text-flame-600">
                      {selected.phone}
                    </a>
                  </dd>
                </div>
                {selected.email && (
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-wider text-navy-900/50">{t.demandes.email}</dt>
                    <dd className="text-navy-900">
                      <a href={`mailto:${selected.email}`} className="hover:text-flame-600">
                        {selected.email}
                      </a>
                    </dd>
                  </div>
                )}
                {selected.service_slug && (
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-wider text-navy-900/50">{t.demandes.service}</dt>
                    <dd className="text-navy-900">{selected.service_slug}</dd>
                  </div>
                )}
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wider text-navy-900/50">{t.demandes.message}</dt>
                  <dd className="whitespace-pre-wrap text-navy-900">{selected.message}</dd>
                </div>
              </dl>
            </div>
          )}
        </div>
      </div>

      {confirmingDeleteAll && (
        <ConfirmModal
          title={t.demandes.confirmAllTitle}
          description={t.demandes.confirmAllDesc(leads.length)}
          confirmLabel={t.demandes.deleteAll}
          onConfirm={deleteAll}
          onClose={() => setConfirmingDeleteAll(false)}
        />
      )}
    </div>
  );
}
