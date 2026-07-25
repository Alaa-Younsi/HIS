import { Icon, type IconName } from '@/components/Icon';
import type { Localized, LocalizedList } from '@/i18n/types';
import { useAdminT } from '@/admin/i18n';

export const inputClass =
  'w-full rounded-lg border border-navy-200 bg-white px-4 py-2.5 text-sm text-navy-900 transition placeholder:text-navy-900/35 focus:border-flame-400 focus:outline-none focus:ring-2 focus:ring-flame-500/25';

const LANGS = ['fr', 'en', 'ar'] as const;

export function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-navy-900/70">
        {label}
        {required && <span className="text-flame-500"> *</span>}
      </span>
      {children}
      {hint && <span className="mt-1 block text-xs font-normal normal-case text-navy-900/45">{hint}</span>}
    </label>
  );
}

/** Un champ texte { fr, en, ar } — la forme Localized utilisée partout dans le contenu du site. */
export function LocalizedTextField({
  label,
  value,
  onChange,
  required,
  textarea,
  hint,
}: {
  label: string;
  value: Localized;
  onChange: (next: Localized) => void;
  required?: boolean;
  textarea?: boolean;
  hint?: string;
}) {
  return (
    <div>
      <p className="mb-1.5 text-xs font-bold uppercase tracking-wider text-navy-900/70">
        {label}
        {required && <span className="text-flame-500"> *</span>}
      </p>
      {hint && <p className="mb-1.5 text-xs text-navy-900/45">{hint}</p>}
      <div className="space-y-2">
        {LANGS.map((lang) => (
          <div key={lang} className="flex items-start gap-2">
            <span className="mt-2.5 w-7 flex-none text-[11px] font-bold uppercase text-navy-400">{lang}</span>
            {textarea ? (
              <textarea
                dir={lang === 'ar' ? 'rtl' : 'ltr'}
                rows={3}
                value={value[lang]}
                onChange={(event) => onChange({ ...value, [lang]: event.target.value })}
                className={`${inputClass} resize-y`}
              />
            ) : (
              <input
                type="text"
                dir={lang === 'ar' ? 'rtl' : 'ltr'}
                value={value[lang]}
                onChange={(event) => onChange({ ...value, [lang]: event.target.value })}
                className={inputClass}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Une liste de puces { fr: string[], en: string[], ar: string[] } — modélisée
 * comme des lignes répétables (une puce = trois traductions alignées par
 * position), plutôt que trois listes indépendantes qui pourraient dériver.
 */
export function LocalizedListField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: LocalizedList;
  onChange: (next: LocalizedList) => void;
}) {
  const { t } = useAdminT();
  const rowCount = Math.max(value.fr.length, value.en.length, value.ar.length);
  const rows = Array.from({ length: rowCount }, (_, index) => ({
    fr: value.fr[index] ?? '',
    en: value.en[index] ?? '',
    ar: value.ar[index] ?? '',
  }));

  const commit = (nextRows: readonly { fr: string; en: string; ar: string }[]) =>
    onChange({
      fr: nextRows.map((row) => row.fr),
      en: nextRows.map((row) => row.en),
      ar: nextRows.map((row) => row.ar),
    });

  const updateRow = (index: number, lang: (typeof LANGS)[number], text: string) =>
    commit(rows.map((row, i) => (i === index ? { ...row, [lang]: text } : row)));

  const addRow = () => commit([...rows, { fr: '', en: '', ar: '' }]);
  const removeRow = (index: number) => commit(rows.filter((_, i) => i !== index));

  return (
    <div>
      <p className="mb-2 text-xs font-bold uppercase tracking-wider text-navy-900/70">{label}</p>
      <div className="space-y-2">
        {rows.map((row, index) => (
          <div key={index} className="flex items-start gap-2 rounded-lg border border-navy-100 p-3">
            <div className="flex-1 space-y-1.5">
              {LANGS.map((lang) => (
                <input
                  key={lang}
                  type="text"
                  dir={lang === 'ar' ? 'rtl' : 'ltr'}
                  value={row[lang]}
                  onChange={(event) => updateRow(index, lang, event.target.value)}
                  placeholder={lang.toUpperCase()}
                  className={inputClass}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => removeRow(index)}
              aria-label={t.fields.removeRow}
              className="mt-1 flex-none text-navy-400 transition hover:text-flame-600"
            >
              <Icon name="close" size={16} />
            </button>
          </div>
        ))}
      </div>
      <button type="button" onClick={addRow} className="btn-ghost mt-2 !py-2 !text-xs">
        <Icon name="check" size={14} />
        {t.fields.addRow}
      </button>
    </div>
  );
}

/** Tous les pictogrammes de contenu disponibles — doit rester en phase avec src/components/Icon.tsx. */
const PICKABLE_ICONS: readonly IconName[] = [
  'snowflake', 'wind', 'smoke', 'fire', 'fridge', 'blueprint', 'truck', 'wrench', 'check',
  'factory', 'flask', 'hospital', 'wheat', 'bolt', 'crane', 'building', 'hotel', 'warehouse', 'school',
  'team', 'clock', 'medal', 'shield', 'chart', 'headset', 'experience', 'projects', 'clients', 'quality',
];

export function IconPicker({ value, onChange }: { value: IconName; onChange: (next: IconName) => void }) {
  return (
    <div className="grid grid-cols-8 gap-2 sm:grid-cols-10">
      {PICKABLE_ICONS.map((name) => (
        <button
          key={name}
          type="button"
          onClick={() => onChange(name)}
          aria-label={name}
          aria-pressed={value === name}
          title={name}
          className={`grid h-10 w-10 place-items-center rounded-lg border transition ${
            value === name
              ? 'border-flame-500 bg-flame-50 text-flame-600'
              : 'border-navy-100 text-navy-500 hover:border-navy-300'
          }`}
        >
          <Icon name={name} size={18} />
        </button>
      ))}
    </div>
  );
}
