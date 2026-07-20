import type { ReactNode } from 'react';
import type { Localized } from '@/i18n/types';
import { useLang } from '@/i18n/LanguageProvider';

/** Titre de section : sur-titre orange + titre + accroche optionnelle. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'start',
  tone = 'dark',
}: {
  eyebrow?: Localized;
  title: Localized;
  intro?: Localized;
  align?: 'start' | 'center';
  tone?: 'dark' | 'light';
}) {
  const { t } = useLang();
  const centered = align === 'center';

  return (
    <div className={`max-w-2xl ${centered ? 'mx-auto text-center' : ''}`}>
      {eyebrow && (
        <p className={`eyebrow ${centered ? 'justify-center' : ''}`}>{t(eyebrow)}</p>
      )}
      <h2
        className={`text-3xl leading-tight sm:text-4xl lg:text-[2.6rem] ${
          tone === 'light' ? 'text-white' : 'text-navy-900'
        }`}
      >
        {t(title)}
      </h2>
      {intro && (
        <p
          className={`mt-5 text-base leading-relaxed sm:text-lg ${
            tone === 'light' ? 'text-white/75' : 'text-navy-900/70'
          }`}
        >
          {t(intro)}
        </p>
      )}
    </div>
  );
}

/** En-tête de page intérieure — bandeau sombre sous le header. */
export function PageHero({
  title,
  intro,
  children,
}: {
  title: Localized;
  intro?: Localized;
  children?: ReactNode;
}) {
  const { t } = useLang();

  return (
    <section className="relative overflow-hidden bg-navy-900 py-16 sm:py-20">
      <div className="grid-pattern absolute inset-0" aria-hidden="true" />
      <div
        className="absolute -top-24 end-0 h-72 w-72 rounded-full bg-flame-500/15 blur-3xl"
        aria-hidden="true"
      />
      <div className="container-his relative">
        <h1 className="max-w-3xl text-3xl leading-tight text-white sm:text-4xl lg:text-5xl">
          {t(title)}
        </h1>
        {intro && (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
            {t(intro)}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
