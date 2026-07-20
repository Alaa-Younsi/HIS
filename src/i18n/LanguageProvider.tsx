import { createContext, use, useEffect, useMemo, type ReactNode } from 'react';
import { DEFAULT_LANG, isLang, LANG_META, type Lang, type Localized, type LocalizedList } from './types';

const STORAGE_KEY = 'his-lang';

type LanguageContextValue = {
  lang: Lang;
  dir: 'ltr' | 'rtl';
  /** Resolve a localized string for the active language. */
  t: (value: Localized) => string;
  /** Resolve a localized list for the active language. */
  tl: (value: LocalizedList) => readonly string[];
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

/** Best-guess language for a first-time visitor landing on "/". */
export function detectPreferredLang(): Lang {
  if (typeof window === 'undefined') return DEFAULT_LANG;

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored && isLang(stored)) return stored;

  for (const candidate of window.navigator.languages ?? []) {
    const base = candidate.split('-')[0]?.toLowerCase() ?? '';
    if (isLang(base)) return base;
  }
  return DEFAULT_LANG;
}

export function LanguageProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  const dir = LANG_META[lang].dir;

  useEffect(() => {
    const root = document.documentElement;
    root.lang = LANG_META[lang].htmlLang;
    root.dir = dir;
    window.localStorage.setItem(STORAGE_KEY, lang);
  }, [lang, dir]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      dir,
      t: (localized) => localized[lang],
      tl: (localized) => localized[lang],
    }),
    [lang, dir],
  );

  return <LanguageContext value={value}>{children}</LanguageContext>;
}

export function useLang(): LanguageContextValue {
  const ctx = use(LanguageContext);
  if (!ctx) throw new Error('useLang must be used inside <LanguageProvider>');
  return ctx;
}
