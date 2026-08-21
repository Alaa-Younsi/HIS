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

const ACCEPTED_VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'];
/** Garde-fou côté client — le plafond réel du bucket (voir 0008_project_media.sql) est de 200 Mo. */
const MAX_VIDEO_BYTES = 200 * 1024 * 1024;

/**
 * Envoie une vidéo de chantier vers le bucket public "site-media", sans
 * compression (contrairement aux photos — la compression vidéo côté
 * navigateur n'est pas fiable). Voir 0008_project_media.sql pour le plafond
 * de taille du bucket.
 */
export async function uploadSiteVideo(file: File, folder: string): Promise<string> {
  if (!supabase) throw new Error('Supabase non configuré — voir SUPABASE_SETUP.md');

  if (!ACCEPTED_VIDEO_TYPES.includes(file.type)) {
    throw new Error('Format vidéo non pris en charge — utilisez MP4, WebM, OGG ou MOV.');
  }
  if (file.size > MAX_VIDEO_BYTES) {
    throw new Error('Vidéo trop volumineuse — 200 Mo maximum.');
  }

  const path = `${folder}/${slugifyFilename(file.name)}`;

  const { error } = await supabase.storage.from(SITE_MEDIA_BUCKET).upload(path, file, {
    cacheControl: '31536000',
    upsert: false,
  });
  if (error) throw error;

  return supabase.storage.from(SITE_MEDIA_BUCKET).getPublicUrl(path).data.publicUrl;
}
