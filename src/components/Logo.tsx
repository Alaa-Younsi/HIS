import { Link } from 'react-router-dom';
import { company } from '@/content/company';
import { useLang } from '@/i18n/LanguageProvider';
import { href } from '@/routes';

/**
 * Marque HIS : pastille flamme + flocon (chaud / froid) et signature.
 *
 * Pour utiliser le logo officiel du client à la place du symbole dessiné ici,
 * déposez-le dans public/logo-his.svg et remplacez <Mark /> par
 * <img src="/logo-his.svg" alt="HIS" width={44} height={44} />.
 */
function Mark({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true" focusable="false" className="flex-none">
      <circle cx="24" cy="24" r="22.5" className="fill-white" />
      <circle cx="24" cy="24" r="22.5" className="fill-none stroke-navy-800" strokeWidth="2.5" />
      {/* Moitié froide */}
      <path
        d="M24 6a18 18 0 0 0 0 36Z"
        className="fill-navy-600/12"
      />
      {/* Flamme */}
      <path
        d="M30.5 12.5c.8 3.6 3.2 4.8 4.8 6.6a8.6 8.6 0 0 1 2.2 5.8 7.1 7.1 0 0 1-14.2 0c0-2.1.9-3.9 2.2-5.2-.1 1.8.8 3 2 3.4.8-3.9 1.2-8.1 3-11.4Z"
        className="fill-flame-500"
      />
      {/* Flocon */}
      <g className="stroke-navy-600" strokeWidth="2" strokeLinecap="round" fill="none">
        <path d="M16 24v14M16 24l-3.4 3.4M16 24l3.4 3.4M16 38l-3.4-3.4M16 38l3.4-3.4" />
        <path d="M10 27.5 22 34.5M10 27.5l.3 4.6M10 27.5l4.6-.3M22 34.5l-4.6.3M22 34.5l-.3-4.6" />
      </g>
    </svg>
  );
}

export function Logo({ variant = 'dark' }: { variant?: 'dark' | 'light' }) {
  const { lang } = useLang();
  const isLight = variant === 'light';

  return (
    <Link
      to={href(lang, 'home')}
      className="group flex items-center gap-3 rounded-md"
      aria-label={`${company.legalName} — ${company.fullName}`}
    >
      <Mark />
      <span className="flex flex-col leading-none">
        <span
          className={`text-2xl font-extrabold tracking-tight ${isLight ? 'text-white' : 'text-navy-900'}`}
        >
          H<span className="text-flame-500">I</span>S
        </span>
        <span
          className={`mt-1 text-[8.5px] font-semibold uppercase leading-tight tracking-[0.12em] ${
            isLight ? 'text-white/70' : 'text-navy-700/70'
          }`}
        >
          HVAC and Industrial
          <br />
          Solution Algeria
        </span>
      </span>
    </Link>
  );
}
