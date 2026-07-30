import { useState } from 'react';
import type { Partner } from '@/content/partners';

/**
 * Grille de logos (clients ou fournisseurs).
 * Tant qu'un fichier logo n'est pas déposé dans public/images/logos/,
 * le nom de la marque s'affiche proprement à la place.
 */
export function PartnerStrip({
  partners,
  className = '',
  compact = false,
}: {
  partners: readonly Partner[];
  className?: string;
  compact?: boolean;
}) {
  return (
    // Séparateurs dessinés en `outline` (hors flux) plutôt qu'avec des
    // gouttières colorées : la dernière ligne peut être incomplète sans
    // laisser de case vide teintée.
    <ul
      className={`grid overflow-hidden rounded-xl bg-white ring-1 ring-navy-100 ${
        compact
          ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6'
          : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
      } ${className}`}
    >
      {partners.map((partner) => (
        <li key={partner.name} className="outline outline-navy-100">
          <PartnerLogo partner={partner} compact={compact} />
        </li>
      ))}
    </ul>
  );
}

function PartnerLogo({ partner, compact }: { partner: Partner; compact: boolean }) {
  const [failed, setFailed] = useState(false);

  // Sans fichier logo, le nom composé proprement fait office de logo :
  // c'est lisible et volontaire, contrairement à une image cassée.
  const content = failed ? (
    <span
      className={`text-center font-extrabold uppercase leading-tight tracking-[0.08em] text-navy-800/75 transition-colors duration-300 group-hover:text-flame-600 ${
        compact ? 'text-xs' : 'text-sm sm:text-base'
      }`}
    >
      {partner.name}
    </span>
  ) : (
    <img
      src={partner.logo}
      alt={partner.name}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={`w-auto object-contain opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 ${
        compact ? 'max-h-9' : 'max-h-20'
      }`}
    />
  );

  const wrapperClass = `group flex h-full items-center justify-center px-5 transition-colors duration-300 hover:bg-navy-50/70 ${
    compact ? 'py-6' : 'py-8'
  }`;

  return partner.url ? (
    <a href={partner.url} target="_blank" rel="noreferrer noopener" className={wrapperClass}>
      {content}
    </a>
  ) : (
    <div className={wrapperClass}>{content}</div>
  );
}
