import { useEffect, useRef, useState } from 'react';
import { Icon } from '@/components/Icon';
import { LANG_META, LANGS, type Lang } from '@/i18n/types';
import { useAdminT } from '@/admin/i18n';

/**
 * Sélecteur de langue de l'INTERFACE admin — change uniquement l'habillage du
 * tableau de bord (réglage mémorisé dans le navigateur), sans toucher à l'URL
 * ni au contenu trilingue. À ne pas confondre avec le sélecteur de langue du
 * site public (src/components/LanguageSwitcher.tsx), qui, lui, change l'URL.
 */
export function AdminLangSwitcher() {
  const { lang, setLang, t } = useAdminT();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const select = (next: Lang) => {
    setLang(next);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={`${t.nav.language} : ${lang.toUpperCase()}`}
        className="flex items-center gap-1.5 rounded-lg border border-navy-200 px-2.5 py-1.5 text-xs font-semibold text-navy-700 transition hover:bg-navy-50"
      >
        <span className="uppercase">{lang}</span>
        <Icon name="chevronDown" size={13} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute end-0 z-50 mt-2 min-w-[9.5rem] overflow-hidden rounded-lg border border-navy-100 bg-white py-1 shadow-xl shadow-navy-900/10"
        >
          {LANGS.map((option) => (
            <li key={option}>
              <button
                type="button"
                role="option"
                aria-selected={option === lang}
                onClick={() => select(option)}
                lang={LANG_META[option].htmlLang}
                dir={LANG_META[option].dir}
                className={`flex w-full items-center justify-between gap-3 px-4 py-2 text-start text-sm transition ${
                  option === lang ? 'bg-flame-50 font-bold text-flame-600' : 'text-navy-800 hover:bg-navy-50'
                }`}
              >
                <span>{LANG_META[option].label}</span>
                <span className="text-[10px] font-bold uppercase opacity-50">{option}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
