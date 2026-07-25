import { useState } from 'react';
import { useSupabaseTable } from '@/hooks/useSupabaseTable';
import { ConfirmModal } from '@/admin/components/ConfirmModal';
import { Field, inputClass } from '@/admin/components/fields';
import { ImageUploader } from '@/admin/components/ImageUploader';
import { useAdminT } from '@/admin/i18n';
import type { PartnerRow } from '@/types/db';

type Draft = { kind: 'client' | 'supplier'; name: string; logo_url: string; website_url: string; sort_order: number };

const emptyDraft = (kind: 'client' | 'supplier'): Draft => ({ kind, name: '', logo_url: '', website_url: '', sort_order: 0 });

export function Partenaires() {
  const { t } = useAdminT();
  const { rows, loading, error, create, update, remove } = useSupabaseTable<PartnerRow>('partners');
  const [tab, setTab] = useState<'client' | 'supplier'>('client');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<PartnerRow | null>(null);

  const visible = rows.filter((row) => row.kind === tab);

  const startCreate = () => {
    setEditingId('new');
    setDraft({ ...emptyDraft(tab), sort_order: visible.length });
  };
  const startEdit = (row: PartnerRow) => {
    setEditingId(row.id);
    setDraft({ kind: row.kind, name: row.name, logo_url: row.logo_url, website_url: row.website_url, sort_order: row.sort_order });
  };
  const cancel = () => {
    setEditingId(null);
    setDraft(null);
    setSaveError(null);
  };

  const save = async () => {
    if (!draft) return;
    setSaving(true);
    setSaveError(null);
    try {
      if (editingId === 'new') await create(draft);
      else if (editingId) await update(editingId, draft);
      cancel();
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : t.common.saveFailed);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-navy-900">{t.partenaires.title}</h1>
          <p className="mt-1 text-sm text-navy-900/60">{t.partenaires.subtitle}</p>
        </div>
        {!editingId && (
          <button type="button" onClick={startCreate} className="btn-primary !py-2.5 !text-xs">
            {t.partenaires.add}
          </button>
        )}
      </div>

      <div className="mt-5 flex gap-2">
        {(['client', 'supplier'] as const).map((kind) => (
          <button
            key={kind}
            type="button"
            onClick={() => {
              setTab(kind);
              cancel();
            }}
            className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition ${
              tab === kind ? 'bg-flame-500 text-white' : 'bg-navy-50 text-navy-700 hover:bg-navy-100'
            }`}
          >
            {kind === 'client' ? t.partenaires.clients : t.partenaires.suppliers}
          </button>
        ))}
      </div>

      {error && <p className="mt-4 text-sm text-flame-600">{error}</p>}

      {editingId && draft && (
        <div className="mt-6 card space-y-5 p-6">
          <Field label={t.common.name} required>
            <input
              type="text"
              value={draft.name}
              onChange={(event) => setDraft({ ...draft, name: event.target.value })}
              className={inputClass}
            />
          </Field>
          <Field label={t.partenaires.logo}>
            <ImageUploader value={draft.logo_url} onChange={(logo_url) => setDraft({ ...draft, logo_url })} folder="partners" />
          </Field>
          <Field label={t.partenaires.website}>
            <input
              type="url"
              value={draft.website_url}
              onChange={(event) => setDraft({ ...draft, website_url: event.target.value })}
              placeholder="https://…"
              className={inputClass}
            />
          </Field>
          <Field label={t.common.displayOrder}>
            <input
              type="number"
              value={draft.sort_order}
              onChange={(event) => setDraft({ ...draft, sort_order: Number(event.target.value) })}
              className={`${inputClass} max-w-[8rem]`}
            />
          </Field>

          {saveError && <p className="text-sm text-flame-600">{saveError}</p>}

          <div className="flex gap-3">
            <button type="button" onClick={() => void save()} disabled={saving} className="btn-primary !py-2.5 !text-xs disabled:opacity-60">
              {saving ? t.common.saving : t.common.save}
            </button>
            <button type="button" onClick={cancel} className="btn-ghost !py-2.5 !text-xs">
              {t.common.cancel}
            </button>
          </div>
        </div>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <p className="text-sm text-navy-900/50">{t.common.loading}</p>
        ) : visible.length === 0 ? (
          <p className="text-sm text-navy-900/50">{t.partenaires.empty}</p>
        ) : (
          visible.map((row) => (
            <div key={row.id} className="card flex items-center gap-4 p-4">
              {row.logo_url ? (
                <img src={row.logo_url} alt="" className="h-12 w-12 flex-none rounded-lg border border-navy-100 object-contain p-1" />
              ) : (
                <div className="grid h-12 w-12 flex-none place-items-center rounded-lg bg-navy-50 text-xs font-bold text-navy-400">
                  {row.name.slice(0, 2).toUpperCase()}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-navy-900">{row.name}</p>
                <p className="text-xs text-navy-900/50">{t.partenaires.orderTag(row.sort_order)}</p>
              </div>
              <div className="flex flex-none flex-col items-end gap-1 text-xs font-bold">
                <button type="button" onClick={() => startEdit(row)} className="text-navy-600 hover:text-flame-600">
                  {t.common.edit}
                </button>
                <button type="button" onClick={() => setDeleteTarget(row)} className="text-navy-400 hover:text-flame-600">
                  {t.common.delete}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {deleteTarget && (
        <ConfirmModal
          title={t.partenaires.confirmTitle}
          description={t.partenaires.confirmDesc(deleteTarget.name)}
          onConfirm={() => remove(deleteTarget.id)}
          onClose={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
