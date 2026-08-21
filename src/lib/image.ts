/**
 * Compresse une photo avant envoi vers Supabase Storage : redimensionne au
 * format le plus grand utilisé par le site (voir public/images/README.md —
 * jamais plus de 1920px) et convertit en WebP. C'est ce qui maîtrise la
 * taille du FICHIER STOCKÉ. Ce que chaque visiteur télécharge ensuite est
 * maîtrisé séparément, à la lecture, par `supabaseSrcSet()` ci-dessous —
 * les deux sont nécessaires (voir sa documentation).
 */
export async function compressImage(file: File, maxEdge = 1600): Promise<File> {
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, maxEdge / Math.max(bitmap.width, bitmap.height));
    const width = Math.round(bitmap.width * scale);
    const height = Math.round(bitmap.height * scale);

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return file;
    ctx.drawImage(bitmap, 0, 0, width, height);

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, 'image/webp', 0.82),
    );
    if (!blob || blob.size >= file.size) return file;

    const webpName = file.name.replace(/\.[^.]+$/, '') + '.webp';
    return new File([blob], webpName, { type: 'image/webp' });
  } catch {
    return file;
  }
}

const SUPABASE_PUBLIC_MARKER = '/storage/v1/object/public/';
const SUPABASE_RENDER_MARKER = '/storage/v1/render/image/public/';
/**
 * Largeurs proposées pour toute image hébergée sur Supabase Storage (photos
 * envoyées depuis l'admin — réalisations, services, partenaires, avis…).
 * Plus fines que celles utilisées pour les images statiques du dépôt
 * (`scripts/generate-image-variants.py`) : la transformation étant calculée
 * à la demande (pas de génération à l'avance), plus de paliers ne coûte
 * rien et réduit d'autant plus l'écart entre la taille réellement affichée
 * et celle envoyée.
 */
const STORAGE_SRCSET_WIDTHS = [200, 400, 600, 900, 1400] as const;
/** 70 = net gain de poids sans perte visible, déjà validé en production sur ce même usage (photos de site web). */
const STORAGE_QUALITY = 70;

export function isSupabaseStorageUrl(src: string): boolean {
  return src.includes(SUPABASE_PUBLIC_MARKER);
}

/**
 * URL vers la même image, redimensionnée à `width` par le service de
 * transformation d'images de Supabase Storage (actif sur ce projet — vérifié
 * par requête directe ; y compris sur le plan gratuit). `resize=contain` est
 * obligatoire : sans lui, l'API renvoie la largeur demandée mais conserve la
 * hauteur d'origine — une image écrasée qui pèse quand même son plein poids.
 */
export function supabaseRenderUrl(src: string, width: number): string {
  const base = src.replace(SUPABASE_PUBLIC_MARKER, SUPABASE_RENDER_MARKER);
  const separator = base.includes('?') ? '&' : '?';
  return `${base}${separator}width=${width}&resize=contain&quality=${STORAGE_QUALITY}`;
}

/**
 * `srcset` pour une photo hébergée sur Supabase Storage — `undefined` pour
 * toute autre origine (photo statique du dépôt, URL externe), auquel cas
 * <Img> retombe sur le fichier plein format. C'est ce qui évite d'envoyer la
 * même image pleine résolution à une vignette de 200px qu'à un visuel plein
 * écran : sans ce srcset, la compression à l'envoi (`compressImage`
 * ci-dessus) réduit ce qui est STOCKÉ mais pas ce qui est ENVOYÉ à chaque
 * visiteur — c'est ce second poste qui consomme le forfait de bande passante
 * Supabase.
 */
export function supabaseSrcSet(src: string): string | undefined {
  if (!isSupabaseStorageUrl(src)) return undefined;
  return STORAGE_SRCSET_WIDTHS.map((width) => `${supabaseRenderUrl(src, width)} ${width}w`).join(', ');
}

export function slugifyFilename(name: string): string {
  const base = name.replace(/\.[^.]+$/, '');
  const ext = name.match(/\.[^.]+$/)?.[0] ?? '';
  const slug = base
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  return `${slug || 'photo'}-${Date.now().toString(36)}${ext}`;
}
