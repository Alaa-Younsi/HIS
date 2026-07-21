import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLang } from '@/i18n/LanguageProvider';
import { LANG_META, LANGS, type Lang } from '@/i18n/types';
import { ui } from '@/i18n/ui';
import { swapLangInPath } from '@/routes';
import { Icon } from './Icon';

/** Sélecteur de langue — change l'URL (/fr → /ar) pour préserver le référencement. */
export function LanguageSwitcher({ variant = 'light' }: { variant?: 'light' | 'dark' }) {
  const { lang, t } = useLang();
  const { pathname } = useLocation();
  const navigate = useNavigate();
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
    setOpen(false);
    navigate(swapLangInPath(pathname, next));
  };

  const isLight = variant === 'light';

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="listbox"
        // Le nom accessible doit contenir le texte visible (« FR »), sinon la
        // commande vocale « cliquer sur FR » ne trouve pas le bouton.
        aria-label={`${t(ui.labels.language)} : ${lang.toUpperCase()}`}
        className={`flex items-center gap-1.5 rounded px-2 py-1 text-xs font-semibold transition ${
          isLight ? 'text-white/85 hover:text-white' : 'text-navy-800 hover:text-flame-600'
        }`}
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
                  option === lang
                    ? 'bg-flame-50 font-bold text-flame-600'
                    : 'text-navy-800 hover:bg-navy-50'
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
