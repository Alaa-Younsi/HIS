import { useState } from 'react';
import { Icon, type IconName } from '@/components/Icon';
import { useSupabaseTable } from '@/hooks/useSupabaseTable';
import { ConfirmModal } from '@/admin/components/ConfirmModal';
import { Field, IconPicker, LocalizedListField, LocalizedTextField, inputClass } from '@/admin/components/fields';
import { GalleryManager } from '@/admin/components/GalleryManager';
import { ImageUploader } from '@/admin/components/ImageUploader';
import type { ServiceRow } from '@/types/db';
import type { Localized, LocalizedList } from '@/i18n/types';

const emptyLocalized: Localized = { fr: '', en: '', ar: '' };
const emptyList: LocalizedList = { fr: [], en: [], ar: [] };

type Draft = {
  slug: string;
  icon: IconName;
  image_url: string;
  gallery: readonly string[];
  title: Localized;
  short: Localized;
  description: Localized;
  applications: LocalizedList;
  sort_order: number;
  status: 'published' | 'draft';
};

const emptyDraft: Draft = {
  slug: '',
  icon: 'wrench',
  image_url: '',
  gallery: [],
  title: emptyLocalized,
  short: emptyLocalized,
  description: emptyLocalized,
  applications: emptyList,
  sort_order: 0,
  status: 'published',
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function Services() {
  const { rows, loading, error, create, update, remove } = useSupabaseTable<ServiceRow>('services');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ServiceRow | null>(null);

  const startCreate = () => {
    setEditingId('new');
    setDraft({ ...emptyDraft, sort_order: rows.length });
  };
  const startEdit = (row: ServiceRow) => {
    setEditingId(row.id);
    setDraft({
      slug: row.slug,
      icon: row.icon as IconName,
      image_url: row.image_url,
      gallery: Array.isArray(row.gallery) ? (row.gallery as string[]) : [],
      title: row.title as Localized,
      short: row.short as Localized,
      description: row.description as Localized,
      applications: row.applications as LocalizedList,
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
    if (!draft.slug.trim()) {
      setSaveError('Le lien (slug) est obligatoire.');
      return;
    }
    setSaving(true);
    setSaveError(null);
    try {
      if (editingId === 'new') await create(draft);
      else if (editingId) await update(editingId, draft);
      cancel();
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Échec de l’enregistrement — le lien (slug) est peut-être déjà utilisé.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-navy-900">Services</h1>
          <p className="mt-1 text-sm text-navy-900/60">Les prestations présentées sur l'accueil et leurs pages dédiées.</p>
        </div>
        {!editingId && (
          <button type="button" onClick={startCreate} className="btn-primary !py-2.5 !text-xs">
            Ajouter un service
          </button>
        )}
      </div>

      {error && <p className="mt-4 text-sm text-flame-600">{error}</p>}

      {editingId && draft && (
        <div className="mt-6 card space-y-5 p-6">
          <LocalizedTextField
            label="Titre"
            required
            value={draft.title}
            onChange={(title) =>
              setDraft({
                ...draft,
                title,
                slug: editingId === 'new' && !draft.slug ? slugify(title.fr) : draft.slug,
              })
            }
          />

          <Field label="Lien (slug)" required hint="Utilisé dans l'URL /services/<lien> — sans espaces ni accents.">
            <input
              type="text"
              value={draft.slug}
              onChange={(event) => setDraft({ ...draft, slug: slugify(event.target.value) })}
              dir="ltr"
              className={inputClass}
            />
          </Field>

          <LocalizedTextField
            label="Accroche courte"
            value={draft.short}
            onChange={(short) => setDraft({ ...draft, short })}
          />

          <LocalizedTextField
            label="Description"
            value={draft.description}
            onChange={(description) => setDraft({ ...draft, description })}
            textarea
          />

          <LocalizedListField
            label="Domaines d'application"
            value={draft.applications}
            onChange={(applications) => setDraft({ ...draft, applications })}
          />

          <Field label="Icône">
            <IconPicker value={draft.icon} onChange={(icon) => setDraft({ ...draft, icon })} />
          </Field>

          <Field label="Photo principale">
            <ImageUploader value={draft.image_url} onChange={(image_url) => setDraft({ ...draft, image_url })} folder="services" />
          </Field>

          <Field label="Galerie de photos" hint="Affichée en bas de la page du service.">
            <GalleryManager
              value={draft.gallery}
              onChange={(gallery) => setDraft({ ...draft, gallery })}
              folder="services/gallery"
            />
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Ordre d'affichage">
              <input
                type="number"
                value={draft.sort_order}
                onChange={(event) => setDraft({ ...draft, sort_order: Number(event.target.value) })}
                className={inputClass}
              />
            </Field>
            <Field label="Statut">
              <select
                value={draft.status}
                onChange={(event) => setDraft({ ...draft, status: event.target.value as Draft['status'] })}
                className={inputClass}
              >
                <option value="published">Publié</option>
                <option value="draft">Brouillon (masqué du site)</option>
              </select>
            </Field>
          </div>

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
              <th className="whitespace-nowrap px-4 py-3">Icône</th>
              <th className="whitespace-nowrap px-4 py-3">Titre (FR)</th>
              <th className="whitespace-nowrap px-4 py-3">Lien</th>
              <th className="whitespace-nowrap px-4 py-3">Statut</th>
              <th className="whitespace-nowrap px-4 py-3">Ordre</th>
              <th className="whitespace-nowrap px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="px-4 py-6 text-navy-900/50" colSpan={6}>
                  Chargement…
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td className="px-4 py-6 text-navy-900/50" colSpan={6}>
                  Aucun service.
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="whitespace-nowrap border-b border-navy-50 last:border-0">
                  <td className="px-4 py-3">
                    <Icon name={row.icon as IconName} size={18} className="text-flame-500" />
                  </td>
                  <td className="px-4 py-3 font-medium text-navy-900">{(row.title as Localized).fr}</td>
                  <td className="px-4 py-3 text-navy-900/50" dir="ltr">
                    /{row.slug}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                        row.status === 'published' ? 'bg-navy-50 text-navy-700' : 'bg-flame-50 text-flame-600'
                      }`}
                    >
                      {row.status === 'published' ? 'Publié' : 'Brouillon'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-navy-900/60">{row.sort_order}</td>
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
          title="Supprimer ce service ?"
          description={`« ${(deleteTarget.title as Localized).fr} » sera retiré du site immédiatement, y compris sa page dédiée.`}
          onConfirm={() => remove(deleteTarget.id)}
          onClose={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
