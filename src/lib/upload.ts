import { compressImage, slugifyFilename } from './image';
import { SITE_MEDIA_BUCKET, supabase } from './supabase';

/**
 * Compresse puis envoie une photo vers le bucket public "site-media"
 * (voir supabase/migrations/0002_rls.sql — lecture publique, écriture admin
 * uniquement) et renvoie son URL publique, prête à stocker dans une colonne
 * `image_url`/`logo_url`/`gallery`.
 */
export async function uploadSiteImage(file: File, folder: string): Promise<string> {
  if (!supabase) throw new Error('Supabase non configuré — voir SUPABASE_SETUP.md');

  const compressed = await compressImage(file);
  const path = `${folder}/${slugifyFilename(compressed.name)}`;

  const { error } = await supabase.storage.from(SITE_MEDIA_BUCKET).upload(path, compressed, {
    cacheControl: '31536000',
    upsert: false,
  });
  if (error) throw error;

  return supabase.storage.from(SITE_MEDIA_BUCKET).getPublicUrl(path).data.publicUrl;
}
