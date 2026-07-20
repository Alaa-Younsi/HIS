import { useState } from 'react';
import { Icon, type IconName } from './Icon';

type ImgProps = {
  src: string;
  alt: string;
  /** Rapport largeur/hauteur du cadre, ex. "16/9" ou "4/3". Réserve la place → pas de saut de mise en page (CLS). */
  ratio?: string;
  className?: string;
  imgClassName?: string;
  /** Icône affichée dans le visuel de repli quand la photo n'existe pas encore. */
  fallbackIcon?: IconName;
  /** true uniquement pour l'image du hero : elle se charge en priorité. */
  priority?: boolean;
  sizes?: string;
};

/**
 * Image du site.
 *
 * • réserve son espace via aspect-ratio → aucun décalage au chargement
 * • chargement différé + décodage asynchrone hors du hero
 * • si le fichier n'existe pas encore dans /public, affiche un visuel de
 *   repli aux couleurs HIS au lieu d'une icône cassée
 */
export function Img({
  src,
  alt,
  ratio = '16/9',
  className = '',
  imgClassName = '',
  fallbackIcon = 'factory',
  priority = false,
  sizes,
}: ImgProps) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  return (
    <div
      className={`relative overflow-hidden bg-navy-900 ${className}`}
      style={{ aspectRatio: ratio }}
    >
      {status !== 'error' && (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : 'auto'}
          {...(sizes ? { sizes } : {})}
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
          className={`h-full w-full object-cover transition-opacity duration-500 ${
            status === 'loaded' ? 'opacity-100' : 'opacity-0'
          } ${imgClassName}`}
        />
      )}

      {status !== 'loaded' && (
        <div
          aria-hidden="true"
          className="absolute inset-0 grid place-items-center bg-gradient-to-br from-navy-800 via-navy-900 to-ink"
        >
          <div className="grid-pattern absolute inset-0" />
          <Icon name={fallbackIcon} size={44} className="relative text-white/25" />
        </div>
      )}
    </div>
  );
}
