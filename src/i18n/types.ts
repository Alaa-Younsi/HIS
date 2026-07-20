export const LANGS = ['fr', 'en', 'ar'] as const;

export type Lang = (typeof LANGS)[number];

/** A piece of text written in all three site languages. */
export type Localized = Record<Lang, string>;

/** A list written in all three site languages. */
export type LocalizedList = Record<Lang, readonly string[]>;

export const LANG_META: Record<Lang, { label: string; dir: 'ltr' | 'rtl'; htmlLang: string }> = {
  fr: { label: 'Français', dir: 'ltr', htmlLang: 'fr' },
  en: { label: 'English', dir: 'ltr', htmlLang: 'en' },
  ar: { label: 'العربية', dir: 'rtl', htmlLang: 'ar' },
};

export const DEFAULT_LANG: Lang = 'fr';

export function isLang(value: string): value is Lang {
  return (LANGS as readonly string[]).includes(value);
}
