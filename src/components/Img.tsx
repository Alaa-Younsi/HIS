import { useCallback, useState } from 'react';
import { imageVariants } from '@/content/image-variants';
import { supabaseSrcSet } from '@/lib/image';
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
  // Repli si le service de transformation Supabase refuse la requête (projet
  // sans transformations actives, objet inexistant…) : les navigateurs ne
  // retombent PAS sur `src` quand un candidat de `srcset` échoue, il faut le
  // faire nous-mêmes en désactivant le srcset et en relançant le chargement
  // sur le fichier plein format.
  const [storageSrcSetFailed, setStorageSrcSetFailed] = useState(false);

  // Remise a zero au changement de `src` PENDANT le rendu, et non dans un
  // effet : un effet s'execute apres la peinture, donc potentiellement apres
  // l'evenement `load` d'une image deja en cache. Il remettait alors `status`
  // a 'loading' une fois l'image chargee et, aucun second `load` ne venant
  // jamais, le visuel de repli restait affiche pour toujours. Cas typique :
  // la liste des realisations se remonte quand les donnees Supabase
  // remplacent le contenu statique, avec des photos deja en cache.
  const [renderedSrc, setRenderedSrc] = useState(src);
  if (renderedSrc !== src) {
    setRenderedSrc(src);
    setStorageSrcSetFailed(false);
    setStatus('loading');
  }

  // Filet de securite : si l'image est deja complete au moment ou React pose
  // la ref, son `load` a pu passer avant que l'ecouteur ne soit en place.
  const captureAlreadyLoaded = useCallback((node: HTMLImageElement | null) => {
    if (node?.complete && node.naturalWidth > 0) setStatus('loaded');
  }, []);

  // Déclinaisons générées par scripts/generate-image-variants.py pour les
  // photos statiques du dépôt (public/images/…). Pour une photo envoyée
  // depuis l'admin (Supabase Storage), on demande les déclinaisons à la volée
  // au service de transformation — voir supabaseSrcSet(). Ni l'un ni l'autre
  // (photo tierce, ou service indisponible) : on sert le fichier tel quel.
  const widths = imageVariants[src];
  const storageSrcSet = !widths && !storageSrcSetFailed ? supabaseSrcSet(src) : undefined;
  const resolution = sizes ?? '100vw';

  const handleError = () => {
    if (storageSrcSet) {
      setStorageSrcSetFailed(true);
      return;
    }
    setStatus('error');
  };

  const image = (
    <img
      ref={captureAlreadyLoaded}
      src={src}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : 'auto'}
      {...(widths
        ? { srcSet: srcSet(src, widths, 'jpg'), sizes: resolution }
        : storageSrcSet
          ? { srcSet: storageSrcSet, sizes: resolution }
          : {})}
      onLoad={() => setStatus('loaded')}
      onError={handleError}
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
