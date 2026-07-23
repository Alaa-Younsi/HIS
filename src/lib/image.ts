/**
 * Compresse une photo avant envoi vers Supabase Storage : redimensionne au
 * format le plus grand utilisé par le site (voir public/images/README.md —
 * jamais plus de 1920px) et convertit en WebP. Sans transformation d'image
 * côté Supabase (fonctionnalité payante), c'est le seul endroit où la taille
 * du fichier peut être maîtrisée avant qu'il ne devienne définitivement
 * l'image envoyée à chaque visiteur.
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
