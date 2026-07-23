import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/**
 * `null` tant que le projet Supabase n'est pas connecté (voir SUPABASE_SETUP.md).
 * Tout code qui lit `supabase` doit gérer ce cas — c'est ce qui permet au site
 * de fonctionner sans backend aujourd'hui, en ne lisant que le contenu statique
 * de src/content/.
 */
export const supabase: SupabaseClient | null =
  url && anonKey ? createClient(url, anonKey) : null;

export const isSupabaseConfigured = supabase !== null;

export const SITE_MEDIA_BUCKET = 'site-media';
