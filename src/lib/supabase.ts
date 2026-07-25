import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/**
 * Vrai uniquement si l'URL est une adresse http(s) complète. `createClient`
 * lève une exception synchrone (« Invalid supabaseUrl ») sur une valeur
 * tronquée — p. ex. la seule référence de projet « xxxx » au lieu de
 * « https://xxxx.supabase.co ». Comme le client est instancié au chargement du
 * module, cette exception surviendrait AVANT le montage de React : l'error
 * boundary ne peut pas l'attraper et tout le site s'affiche en blanc. On valide
 * donc l'URL en amont pour, au pire, retomber sur le contenu statique.
 */
function isValidHttpUrl(value: string | undefined): value is string {
  if (!value) return false;
  try {
    const parsed = new URL(value);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

function createSupabaseClient(): SupabaseClient | null {
  if (!isValidHttpUrl(url) || !anonKey) {
    // URL présente mais invalide = variable d'environnement mal renseignée
    // (souvent sur Vercel). On le signale sans faire planter la page.
    if (url && !isValidHttpUrl(url)) {
      console.error(
        `[supabase] VITE_SUPABASE_URL invalide (« ${url} ») : attendu une URL complète du type https://<projet>.supabase.co. Backend désactivé, le site sert le contenu statique.`,
      );
    }
    return null;
  }
  try {
    return createClient(url, anonKey);
  } catch (error) {
    console.error('[supabase] Échec de l’initialisation du client :', error);
    return null;
  }
}

/**
 * `null` tant que le projet Supabase n'est pas connecté (voir SUPABASE_SETUP.md)
 * ou si la configuration est invalide. Tout code qui lit `supabase` doit gérer
 * ce cas — c'est ce qui permet au site de fonctionner sans backend en ne lisant
 * que le contenu statique de src/content/.
 */
export const supabase: SupabaseClient | null = createSupabaseClient();

export const isSupabaseConfigured = supabase !== null;

export const SITE_MEDIA_BUCKET = 'site-media';
