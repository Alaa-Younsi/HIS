import { useEffect, useState } from 'react';
import { ConfirmModal } from '@/admin/components/ConfirmModal';
import { inputClass } from '@/admin/components/fields';
import { exportLeadsToExcel } from '@/lib/exportLeads';
import { supabase } from '@/lib/supabase';
import type { LeadRow } from '@/types/db';

type StatusFilter = 'all' | LeadRow['status'];
type KindFilter = 'all' | LeadRow['kind'];

const statusLabel: Record<LeadRow['status'], string> = { new: 'Nouvelle', read: 'Lue', archived: 'Archivée' };

export function Demandes() {
  const [leads, setLeads] = useState<LeadRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [kindFilter, setKindFilter] = useState<KindFilter>('all');
  const [selected, setSelected] = useState<LeadRow | null>(null);
  const [confirmingDeleteAll, setConfirmingDeleteAll] = useState(false);

  const reload = async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
    setLeads((data ?? []) as LeadRow[]);
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
    await supabase.from('leads').update({ status }).eq('id', lead.id);
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
          <h1 className="text-2xl text-navy-900">Demandes</h1>
          <p className="mt-1 text-sm text-navy-900/60">Demandes de devis et messages reçus depuis le formulaire de contact.</p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => exportLeadsToExcel(leads)}
            disabled={leads.length === 0}
            className="btn-ghost !py-2 !text-xs disabled:opacity-50"
          >
            Exporter en Excel
          </button>
          <button
            type="button"
            onClick={() => setConfirmingDeleteAll(true)}
            disabled={leads.length === 0}
            className="btn-ghost !py-2 !text-xs text-flame-600 disabled:opacity-50"
          >
            Tout supprimer
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
            {status === 'all' ? 'Toutes' : statusLabel[status]}
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
            {kind === 'all' ? 'Tous types' : kind === 'devis' ? 'Devis' : 'Contact'}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <div className="overflow-x-auto rounded-xl border border-navy-100 bg-white">
          <table className="w-full text-sm">
            <thead className="border-b border-navy-100 bg-navy-50/60 text-left text-xs font-bold uppercase tracking-wider text-navy-900/60">
              <tr>
                <th className="whitespace-nowrap px-4 py-3">Nom</th>
                <th className="whitespace-nowrap px-4 py-3">Type</th>
                <th className="whitespace-nowrap px-4 py-3">Statut</th>
                <th className="whitespace-nowrap px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td className="px-4 py-6 text-navy-900/50" colSpan={4}>
                    Chargement…
                  </td>
                </tr>
              ) : visible.length === 0 ? (
                <tr>
                  <td className="px-4 py-6 text-navy-900/50" colSpan={4}>
                    Aucune demande.
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
                    <td className="px-4 py-3 text-navy-900/60">{lead.kind === 'devis' ? 'Devis' : 'Contact'}</td>
                    <td className="px-4 py-3 text-navy-900/60">{statusLabel[lead.status]}</td>
                    <td className="px-4 py-3 text-navy-900/50">{new Date(lead.created_at).toLocaleDateString('fr-FR')}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="card p-6">
          {!selected ? (
            <p className="text-sm text-navy-900/50">Sélectionnez une demande pour voir le détail.</p>
          ) : (
            <div>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg text-navy-900">{selected.name}</h2>
                  <p className="text-xs text-navy-900/50">
                    {new Date(selected.created_at).toLocaleString('fr-FR')} · {selected.kind === 'devis' ? 'Devis' : 'Contact'}
                  </p>
                </div>
                <select
                  value={selected.status}
                  onChange={(event) => void setStatus(selected, event.target.value as LeadRow['status'])}
                  className={`${inputClass} max-w-[9rem]`}
                >
                  <option value="new">Nouvelle</option>
                  <option value="read">Lue</option>
                  <option value="archived">Archivée</option>
                </select>
              </div>

              <dl className="mt-5 space-y-3 text-sm">
                {selected.organisation && (
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-wider text-navy-900/50">Société</dt>
                    <dd className="text-navy-900">{selected.organisation}</dd>
                  </div>
                )}
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wider text-navy-900/50">Téléphone</dt>
                  <dd className="text-navy-900" dir="ltr">
                    <a href={`tel:${selected.phone}`} className="hover:text-flame-600">
                      {selected.phone}
                    </a>
                  </dd>
                </div>
                {selected.email && (
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-wider text-navy-900/50">E-mail</dt>
                    <dd className="text-navy-900">
                      <a href={`mailto:${selected.email}`} className="hover:text-flame-600">
                        {selected.email}
                      </a>
                    </dd>
                  </div>
                )}
                {selected.service_slug && (
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-wider text-navy-900/50">Service concerné</dt>
                    <dd className="text-navy-900">{selected.service_slug}</dd>
                  </div>
                )}
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wider text-navy-900/50">Message</dt>
                  <dd className="whitespace-pre-wrap text-navy-900">{selected.message}</dd>
                </div>
              </dl>
            </div>
          )}
        </div>
      </div>

      {confirmingDeleteAll && (
        <ConfirmModal
          title="Supprimer toutes les demandes ?"
          description={`${leads.length} demande(s) seront supprimées définitivement. Pensez à exporter en Excel d'abord si vous voulez en garder une trace.`}
          confirmLabel="Tout supprimer"
          onConfirm={deleteAll}
          onClose={() => setConfirmingDeleteAll(false)}
        />
      )}
    </div>
  );
}
