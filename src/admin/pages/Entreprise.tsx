import { useEffect, useState } from 'react';
import { Icon, type IconName } from '@/components/Icon';
import { Field, IconPicker, LocalizedTextField, inputClass } from '@/admin/components/fields';
import { supabase } from '@/lib/supabase';
import type { CompanyInfoRow } from '@/types/db';
import type { Localized } from '@/i18n/types';

const emptyLocalized: Localized = { fr: '', en: '', ar: '' };

type StatDraft = { value: string; icon: IconName; label: Localized };

type Draft = {
  slogan: Localized;
  tagline: Localized;
  hero_title: Localized;
  hero_highlight: Localized;
  hero_subtitle: Localized;
  intro: Localized;
  story: Localized;
  mission: Localized;
  expertise: Localized;
  closing: Localized;
  address: Localized;
  hours: Localized;
  phones: string[];
  whatsapp: string;
  email: string;
  city: string;
  country: string;
  linkedin_url: string;
  facebook_url: string;
  whatsapp_message: Localized;
  stats: StatDraft[];
};

function fromRow(row: CompanyInfoRow): Draft {
  return {
    slogan: row.slogan as Localized,
    tagline: row.tagline as Localized,
    hero_title: row.hero_title as Localized,
    hero_highlight: row.hero_highlight as Localized,
    hero_subtitle: row.hero_subtitle as Localized,
    intro: row.intro as Localized,
    story: row.story as Localized,
    mission: row.mission as Localized,
    expertise: row.expertise as Localized,
    closing: row.closing as Localized,
    address: row.address as Localized,
    hours: row.hours as Localized,
    phones: row.phones,
    whatsapp: row.whatsapp,
    email: row.email,
    city: row.city,
    country: row.country,
    linkedin_url: row.linkedin_url,
    facebook_url: row.facebook_url,
    whatsapp_message: row.whatsapp_message as Localized,
    stats: (row.stats as StatDraft[]) ?? [],
  };
}

function PhoneList({ value, onChange }: { value: string[]; onChange: (next: string[]) => void }) {
  return (
    <div>
      <p className="mb-1.5 text-xs font-bold uppercase tracking-wider text-navy-900/70">
        Téléphones <span className="text-flame-500">*</span>
      </p>
      <p className="mb-2 text-xs text-navy-900/45">Le premier numéro est celui utilisé par le bouton « Appeler ».</p>
      <div className="space-y-2">
        {value.map((phone, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="text"
              dir="ltr"
              value={phone}
              onChange={(event) => onChange(value.map((p, i) => (i === index ? event.target.value : p)))}
              className={inputClass}
            />
            <button
              type="button"
              onClick={() => onChange(value.filter((_, i) => i !== index))}
              aria-label="Retirer ce numéro"
              className="flex-none text-navy-400 hover:text-flame-600"
            >
              <Icon name="close" size={16} />
            </button>
          </div>
        ))}
      </div>
      <button type="button" onClick={() => onChange([...value, ''])} className="btn-ghost mt-2 !py-2 !text-xs">
        Ajouter un numéro
      </button>
    </div>
  );
}

function StatsEditor({ value, onChange }: { value: StatDraft[]; onChange: (next: StatDraft[]) => void }) {
  const update = (index: number, patch: Partial<StatDraft>) =>
    onChange(value.map((stat, i) => (i === index ? { ...stat, ...patch } : stat)));

  return (
    <div>
      <p className="mb-2 text-xs font-bold uppercase tracking-wider text-navy-900/70">
        Chiffres clés <span className="font-normal normal-case text-navy-900/45">(page d'accueil, max. 4 utilisés)</span>
      </p>
      <div className="space-y-4">
        {value.map((stat, index) => (
          <div key={index} className="rounded-lg border border-navy-100 p-4">
            <div className="flex items-start gap-3">
              <input
                type="text"
                value={stat.value}
                onChange={(event) => update(index, { value: event.target.value })}
                placeholder="10+"
                className={`${inputClass} max-w-[7rem]`}
              />
              <div className="flex-1">
                <IconPicker value={stat.icon} onChange={(icon) => update(index, { icon })} />
              </div>
              <button
                type="button"
                onClick={() => onChange(value.filter((_, i) => i !== index))}
                aria-label="Retirer ce chiffre"
                className="flex-none text-navy-400 hover:text-flame-600"
              >
                <Icon name="close" size={16} />
              </button>
            </div>
            <div className="mt-3">
              <LocalizedTextField label="Libellé" value={stat.label} onChange={(label) => update(index, { label })} />
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => onChange([...value, { value: '', icon: 'medal', label: emptyLocalized }])}
        className="btn-ghost mt-2 !py-2 !text-xs"
      >
        Ajouter un chiffre
      </button>
    </div>
  );
}

export function Entreprise() {
  const [draft, setDraft] = useState<Draft | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    supabase
      .from('company_info')
      .select('*')
      .eq('id', 1)
      .maybeSingle()
      .then(({ data, error }) => {
        if (error) setLoadError(error.message);
        else if (data) setDraft(fromRow(data as CompanyInfoRow));
        setLoading(false);
      });
  }, []);

  const save = async () => {
    if (!draft || !supabase) return;
    setSaving(true);
    setSaveError(null);
    setSaved(false);
    const { error } = await supabase.from('company_info').update(draft).eq('id', 1);
    setSaving(false);
    if (error) setSaveError(error.message);
    else setSaved(true);
  };

  if (loading) return <p className="text-sm text-navy-900/50">Chargement…</p>;
  if (loadError) return <p className="text-sm text-flame-600">{loadError}</p>;
  if (!draft) return <p className="text-sm text-navy-900/50">Supabase non configuré — voir SUPABASE_SETUP.md.</p>;

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl text-navy-900">Entreprise</h1>
      <p className="mt-1 text-sm text-navy-900/60">
        Textes, coordonnées et chiffres clés affichés sur l'ensemble du site.
      </p>

      <div className="mt-6 space-y-8">
        <section className="card space-y-5 p-6">
          <h2 className="text-sm font-bold uppercase tracking-widest text-navy-900/70">Accroche</h2>
          <LocalizedTextField label="Slogan" value={draft.slogan} onChange={(slogan) => setDraft({ ...draft, slogan })} />
          <LocalizedTextField label="Sous-titre du logo" value={draft.tagline} onChange={(tagline) => setDraft({ ...draft, tagline })} />
          <LocalizedTextField label="Titre du hero" value={draft.hero_title} onChange={(hero_title) => setDraft({ ...draft, hero_title })} />
          <LocalizedTextField
            label="Mot mis en avant dans le titre"
            value={draft.hero_highlight}
            onChange={(hero_highlight) => setDraft({ ...draft, hero_highlight })}
            hint="Doit apparaître tel quel dans le titre du hero ci-dessus pour être coloré."
          />
          <LocalizedTextField
            label="Paragraphe sous le titre (hero)"
            value={draft.hero_subtitle}
            onChange={(hero_subtitle) => setDraft({ ...draft, hero_subtitle })}
            textarea
          />
        </section>

        <section className="card space-y-5 p-6">
          <h2 className="text-sm font-bold uppercase tracking-widest text-navy-900/70">Présentation</h2>
          <LocalizedTextField label="Présentation rapide" value={draft.intro} onChange={(intro) => setDraft({ ...draft, intro })} textarea />
          <LocalizedTextField label="Notre histoire" value={draft.story} onChange={(story) => setDraft({ ...draft, story })} textarea />
          <LocalizedTextField label="Notre mission" value={draft.mission} onChange={(mission) => setDraft({ ...draft, mission })} textarea />
          <LocalizedTextField
            label="Notre expertise"
            value={draft.expertise}
            onChange={(expertise) => setDraft({ ...draft, expertise })}
            textarea
          />
          <LocalizedTextField
            label="Texte de conclusion (bandeau d'appel à l'action)"
            value={draft.closing}
            onChange={(closing) => setDraft({ ...draft, closing })}
            textarea
          />
        </section>

        <section className="card space-y-5 p-6">
          <h2 className="text-sm font-bold uppercase tracking-widest text-navy-900/70">Coordonnées</h2>
          <LocalizedTextField label="Adresse" value={draft.address} onChange={(address) => setDraft({ ...draft, address })} />
          <LocalizedTextField label="Horaires" value={draft.hours} onChange={(hours) => setDraft({ ...draft, hours })} />
          <PhoneList value={draft.phones} onChange={(phones) => setDraft({ ...draft, phones })} />
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="E-mail" required>
              <input
                type="email"
                value={draft.email}
                onChange={(event) => setDraft({ ...draft, email: event.target.value })}
                dir="ltr"
                className={inputClass}
              />
            </Field>
            <Field label="Numéro WhatsApp" hint="Format international sans espaces ni « + » (ex. 213550700036).">
              <input
                type="text"
                value={draft.whatsapp}
                onChange={(event) => setDraft({ ...draft, whatsapp: event.target.value })}
                dir="ltr"
                className={inputClass}
              />
            </Field>
            <Field label="Ville">
              <input
                type="text"
                value={draft.city}
                onChange={(event) => setDraft({ ...draft, city: event.target.value })}
                className={inputClass}
              />
            </Field>
            <Field label="Pays (code ISO)">
              <input
                type="text"
                value={draft.country}
                onChange={(event) => setDraft({ ...draft, country: event.target.value })}
                dir="ltr"
                className={inputClass}
              />
            </Field>
            <Field label="LinkedIn (optionnel)">
              <input
                type="url"
                value={draft.linkedin_url}
                onChange={(event) => setDraft({ ...draft, linkedin_url: event.target.value })}
                dir="ltr"
                className={inputClass}
              />
            </Field>
            <Field label="Facebook (optionnel)">
              <input
                type="url"
                value={draft.facebook_url}
                onChange={(event) => setDraft({ ...draft, facebook_url: event.target.value })}
                dir="ltr"
                className={inputClass}
              />
            </Field>
          </div>
          <LocalizedTextField
            label="Message pré-rempli WhatsApp"
            value={draft.whatsapp_message}
            onChange={(whatsapp_message) => setDraft({ ...draft, whatsapp_message })}
            textarea
          />
        </section>

        <section className="card p-6">
          <h2 className="mb-5 text-sm font-bold uppercase tracking-widest text-navy-900/70">Chiffres clés</h2>
          <StatsEditor value={draft.stats} onChange={(stats) => setDraft({ ...draft, stats })} />
        </section>

        {saveError && <p className="text-sm text-flame-600">{saveError}</p>}
        {saved && <p className="text-sm text-navy-600">Modifications enregistrées.</p>}

        <button
          type="button"
          onClick={() => void save()}
          disabled={saving}
          className="btn-primary !py-3 !text-xs disabled:opacity-60"
        >
          {saving ? 'Enregistrement…' : 'Enregistrer les modifications'}
        </button>
      </div>
    </div>
  );
}
