import { useState } from 'react';
import { useSupabaseTable } from '@/hooks/useSupabaseTable';
import { ConfirmModal } from '@/admin/components/ConfirmModal';
import { Field, LocalizedTextField, inputClass } from '@/admin/components/fields';
import { ImageUploader } from '@/admin/components/ImageUploader';
import { projectCategories, type ProjectCategory } from '@/content/projects';
import type { ProjectRow } from '@/types/db';
import type { Localized } from '@/i18n/types';

const emptyLocalized: Localized = { fr: '', en: '', ar: '' };

type Draft = {
  category: ProjectCategory;
  image_url: string;
  title: Localized;
  location: Localized;
  description: Localized;
  year: string;
  sort_order: number;
  status: 'published' | 'draft';
};

const emptyDraft: Draft = {
  category: 'incendie',
  image_url: '',
  title: emptyLocalized,
  location: emptyLocalized,
  description: emptyLocalized,
  year: '',
  sort_order: 0,
  status: 'published',
};

export function Realisations() {
  const { rows, loading, error, create, update, remove } = useSupabaseTable<ProjectRow>('projects');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ProjectRow | null>(null);

  const startCreate = () => {
    setEditingId('new');
    setDraft({ ...emptyDraft, sort_order: rows.length });
  };
  const startEdit = (row: ProjectRow) => {
    setEditingId(row.id);
    setDraft({
      category: row.category as ProjectCategory,
      image_url: row.image_url,
      title: row.title as Localized,
      location: row.location as Localized,
      description: row.description as Localized,
      year: row.year,
      sort_order: row.sort_order,
      status: row.status,
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
      setSaveError(err instanceof Error ? err.message : 'Échec de l’enregistrement');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-navy-900">Réalisations</h1>
          <p className="mt-1 text-sm text-navy-900/60">La galerie de chantiers affichée sur le site.</p>
        </div>
        {!editingId && (
          <button type="button" onClick={startCreate} className="btn-primary !py-2.5 !text-xs">
            Ajouter une réalisation
          </button>
        )}
      </div>

      {error && <p className="mt-4 text-sm text-flame-600">{error}</p>}

      {editingId && draft && (
        <div className="mt-6 card space-y-5 p-6">
          <LocalizedTextField label="Titre" required value={draft.title} onChange={(title) => setDraft({ ...draft, title })} />
          <LocalizedTextField label="Lieu" value={draft.location} onChange={(location) => setDraft({ ...draft, location })} />
          <LocalizedTextField
            label="Description"
            value={draft.description}
            onChange={(description) => setDraft({ ...draft, description })}
            textarea
          />

          <Field label="Photo">
            <ImageUploader value={draft.image_url} onChange={(image_url) => setDraft({ ...draft, image_url })} folder="realisations" />
          </Field>

          <div className="grid gap-5 sm:grid-cols-3">
            <Field label="Catégorie">
              <select
                value={draft.category}
                onChange={(event) => setDraft({ ...draft, category: event.target.value as ProjectCategory })}
                className={inputClass}
              >
                {projectCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.label.fr}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Année">
              <input
                type="text"
                value={draft.year}
                onChange={(event) => setDraft({ ...draft, year: event.target.value })}
                className={inputClass}
              />
            </Field>
            <Field label="Ordre d'affichage">
              <input
                type="number"
                value={draft.sort_order}
                onChange={(event) => setDraft({ ...draft, sort_order: Number(event.target.value) })}
                className={inputClass}
              />
            </Field>
          </div>

          <Field label="Statut">
            <select
              value={draft.status}
              onChange={(event) => setDraft({ ...draft, status: event.target.value as Draft['status'] })}
              className={`${inputClass} max-w-xs`}
            >
              <option value="published">Publié</option>
              <option value="draft">Brouillon (masqué du site)</option>
            </select>
          </Field>

          {saveError && <p className="text-sm text-flame-600">{saveError}</p>}

          <div className="flex gap-3">
            <button type="button" onClick={() => void save()} disabled={saving} className="btn-primary !py-2.5 !text-xs disabled:opacity-60">
              {saving ? 'Enregistrement…' : 'Enregistrer'}
            </button>
            <button type="button" onClick={cancel} className="btn-ghost !py-2.5 !text-xs">
              Annuler
            </button>
          </div>
        </div>
      )}

      <div className="mt-6 overflow-x-auto rounded-xl border border-navy-100 bg-white">
        <table className="w-full text-sm">
          <thead className="border-b border-navy-100 bg-navy-50/60 text-left text-xs font-bold uppercase tracking-wider text-navy-900/60">
            <tr>
              <th className="whitespace-nowrap px-4 py-3">Titre (FR)</th>
              <th className="whitespace-nowrap px-4 py-3">Catégorie</th>
              <th className="whitespace-nowrap px-4 py-3">Année</th>
              <th className="whitespace-nowrap px-4 py-3">Statut</th>
              <th className="whitespace-nowrap px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="px-4 py-6 text-navy-900/50" colSpan={5}>
                  Chargement…
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td className="px-4 py-6 text-navy-900/50" colSpan={5}>
                  Aucune réalisation.
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="whitespace-nowrap border-b border-navy-50 last:border-0">
                  <td className="px-4 py-3 font-medium text-navy-900">{(row.title as Localized).fr}</td>
                  <td className="px-4 py-3 text-navy-900/60">
                    {projectCategories.find((c) => c.id === row.category)?.label.fr ?? row.category}
                  </td>
                  <td className="px-4 py-3 text-navy-900/60">{row.year}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                        row.status === 'published' ? 'bg-navy-50 text-navy-700' : 'bg-flame-50 text-flame-600'
                      }`}
                    >
                      {row.status === 'published' ? 'Publié' : 'Brouillon'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-end">
                    <button type="button" onClick={() => startEdit(row)} className="text-xs font-bold text-navy-600 hover:text-flame-600">
                      Modifier
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteTarget(row)}
                      className="ms-4 text-xs font-bold text-navy-400 hover:text-flame-600"
                    >
                      Supprimer
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
          title="Supprimer cette réalisation ?"
          description={`« ${(deleteTarget.title as Localized).fr} » sera retirée du site immédiatement.`}
          onConfirm={() => remove(deleteTarget.id)}
          onClose={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
