import { useState } from 'react';
import { imageVariants } from '@/content/image-variants';
import { Icon, type IconName } from './Icon';

/** "/images/x.jpg" + 800 + "webp" → "/images/x-800.webp" */
const variantUrl = (src: string, width: number, ext: 'jpg' | 'webp') =>
  `${src.slice(0, -'.jpg'.length)}-${width}.${ext}`;

const srcSet = (src: string, widths: readonly number[], ext: 'jpg' | 'webp') =>
  widths.map((width) => `${variantUrl(src, width, ext)} ${width}w`).join(', ');

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

  // Déclinaisons générées par scripts/generate-image-variants.py. Absentes
  // (photo ajoutée depuis), on retombe sur le fichier pleine résolution.
  const widths = imageVariants[src];
  const resolution = sizes ?? '100vw';

  const image = (
    <img
      src={src}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : 'auto'}
      {...(widths ? { srcSet: srcSet(src, widths, 'jpg'), sizes: resolution } : {})}
      onLoad={() => setStatus('loaded')}
      onError={() => setStatus('error')}
      className={`h-full w-full object-cover transition-opacity duration-500 ${
        status === 'loaded' ? 'opacity-100' : 'opacity-0'
      } ${imgClassName}`}
    />
  );

  return (
    <div
      className={`relative overflow-hidden bg-navy-900 ${className}`}
      style={{ aspectRatio: ratio }}
    >
      {status !== 'error' &&
        (widths ? (
          <picture>
            <source type="image/webp" srcSet={srcSet(src, widths, 'webp')} sizes={resolution} />
            {image}
          </picture>
        ) : (
          image
        ))}

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
