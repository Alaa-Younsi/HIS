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
    <ul
      className={`grid gap-px overflow-hidden rounded-xl bg-navy-100 ${
        compact
          ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6'
          : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
      } ${className}`}
    >
      {partners.map((partner) => (
        <li key={partner.name} className="bg-white">
          <PartnerLogo partner={partner} compact={compact} />
        </li>
      ))}
    </ul>
  );
}

function PartnerLogo({ partner, compact }: { partner: Partner; compact: boolean }) {
  const [failed, setFailed] = useState(false);

  const content = failed ? (
    <span
      className={`font-bold uppercase tracking-wide text-navy-900/45 ${
        compact ? 'text-xs' : 'text-sm'
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
        compact ? 'max-h-9' : 'max-h-12'
      }`}
    />
  );

  const wrapperClass = `flex h-full items-center justify-center px-5 ${compact ? 'py-6' : 'py-8'}`;

  return partner.url ? (
    <a href={partner.url} target="_blank" rel="noreferrer noopener" className={wrapperClass}>
      {content}
    </a>
  ) : (
    <div className={wrapperClass}>{content}</div>
  );
}
