import { Link } from 'react-router-dom';
import { useLang } from '@/i18n/LanguageProvider';
import { href } from '@/routes';

/** Pastille du logo officiel HIS (public/logo-his.png), fond transparent. */
function Mark({ size = 44 }: { size?: number }) {
  return <img src="/logo-his.png" alt="" width={size} height={size} className="flex-none" />;
}

export function Logo({ variant = 'dark' }: { variant?: 'dark' | 'light' }) {
  const { lang } = useLang();
  const isLight = variant === 'light';

  return (
    // Pas d'aria-label ici : le texte du lien (« HIS · HVAC and Industrial
    // Solution Algeria ») nomme déjà correctement la cible, et un aria-label
    // différent du texte visible casse la commande vocale.
    <Link to={href(lang, 'home')} className="group flex items-center gap-3 rounded-md">
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
