import { useState } from 'react';
import { Icon, type IconName } from '@/components/Icon';
import { useSupabaseTable } from '@/hooks/useSupabaseTable';
import { ConfirmModal } from '@/admin/components/ConfirmModal';
import { Field, IconPicker, LocalizedTextField, inputClass } from '@/admin/components/fields';
import { useAdminT } from '@/admin/i18n';
import type { SectorRow } from '@/types/db';
import type { Localized } from '@/i18n/types';

const emptyLocalized: Localized = { fr: '', en: '', ar: '' };

type Draft = { icon: IconName; name: Localized; description: Localized; sort_order: number };

const emptyDraft: Draft = { icon: 'factory', name: emptyLocalized, description: emptyLocalized, sort_order: 0 };

export function Secteurs() {
  const { t } = useAdminT();
  const { rows, loading, error, create, update, remove } = useSupabaseTable<SectorRow>('sectors');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<SectorRow | null>(null);

  const startCreate = () => {
    setEditingId('new');
    setDraft({ ...emptyDraft, sort_order: rows.length });
  };
  const startEdit = (row: SectorRow) => {
    setEditingId(row.id);
    setDraft({
      icon: row.icon as IconName,
      name: row.name as Localized,
      description: row.description as Localized,
      sort_order: row.sort_order,
    });
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
          <h1 className="text-2xl text-navy-900">{t.secteurs.title}</h1>
          <p className="mt-1 text-sm text-navy-900/60">{t.secteurs.subtitle}</p>
        </div>
        {!editingId && (
          <button type="button" onClick={startCreate} className="btn-primary !py-2.5 !text-xs">
            {t.secteurs.add}
          </button>
        )}
      </div>

      {error && <p className="mt-4 text-sm text-flame-600">{error}</p>}

      {editingId && draft && (
        <div className="mt-6 card space-y-5 p-6">
          <Field label={t.common.icon}>
            <IconPicker value={draft.icon} onChange={(icon) => setDraft({ ...draft, icon })} />
          </Field>
          <LocalizedTextField label={t.common.name} required value={draft.name} onChange={(name) => setDraft({ ...draft, name })} />
          <LocalizedTextField
            label={t.common.description}
            value={draft.description}
            onChange={(description) => setDraft({ ...draft, description })}
            textarea
          />
          <Field label={t.common.displayOrder} hint={t.secteurs.orderHint}>
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

      <div className="mt-6 overflow-x-auto rounded-xl border border-navy-100 bg-white">
        <table className="w-full text-sm">
          <thead className="border-b border-navy-100 bg-navy-50/60 text-left text-xs font-bold uppercase tracking-wider text-navy-900/60">
            <tr>
              <th className="whitespace-nowrap px-4 py-3">{t.common.icon}</th>
              <th className="whitespace-nowrap px-4 py-3">{t.common.nameFr}</th>
              <th className="whitespace-nowrap px-4 py-3">{t.common.order}</th>
              <th className="whitespace-nowrap px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="px-4 py-6 text-navy-900/50" colSpan={4}>
                  {t.common.loading}
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td className="px-4 py-6 text-navy-900/50" colSpan={4}>
                  {t.secteurs.empty}
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="whitespace-nowrap border-b border-navy-50 last:border-0">
                  <td className="px-4 py-3">
                    <Icon name={row.icon as IconName} size={18} className="text-flame-500" />
                  </td>
                  <td className="px-4 py-3 font-medium text-navy-900">{(row.name as Localized).fr}</td>
                  <td className="px-4 py-3 text-navy-900/60">{row.sort_order}</td>
                  <td className="px-4 py-3 text-end">
                    <button type="button" onClick={() => startEdit(row)} className="text-xs font-bold text-navy-600 hover:text-flame-600">
                      {t.common.edit}
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteTarget(row)}
                      className="ms-4 text-xs font-bold text-navy-400 hover:text-flame-600"
                    >
                      {t.common.delete}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {deleteTarget && (
        <ConfirmModal
          title={t.secteurs.confirmTitle}
          description={t.secteurs.confirmDesc((deleteTarget.name as Localized).fr)}
          onConfirm={() => remove(deleteTarget.id)}
          onClose={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
