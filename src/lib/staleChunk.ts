/**
 * Gestion des chunks « périmés » après un redéploiement.
 *
 * Chaque build Vercel renomme les fichiers JS découpés par route (hash de
 * contenu). Un onglet ouvert avant un déploiement — ou un navigateur intégré
 * (Telegram, Instagram…) qui garde un index.html légèrement en cache — demande
 * alors un ancien chunk devenu introuvable (404). L'import dynamique échoue et
 * l'application affiche un écran blanc si personne ne rattrape l'erreur.
 *
 * La parade standard : recharger la page UNE fois pour récupérer le dernier
 * index.html et ses nouveaux chunks. Un horodatage empêche toute boucle de
 * rechargement si le vrai problème est ailleurs (réseau coupé, etc.).
 */

const RELOAD_KEY = 'his:stale-chunk-reload';
const COOLDOWN_MS = 10_000;

/** Repli mémoire si sessionStorage est indisponible (certains navigateurs intégrés). */
let memoryLast = 0;

function readLast(): number {
  try {
    return Number(sessionStorage.getItem(RELOAD_KEY) ?? '0') || memoryLast;
  } catch {
    return memoryLast;
  }
}

function writeLast(ts: number): void {
  memoryLast = ts;
  try {
    sessionStorage.setItem(RELOAD_KEY, String(ts));
  } catch {
    /* stockage bloqué : le garde-fou mémoire suffit pour ce chargement de page */
  }
}

/**
 * Vrai si l'erreur provient d'un import dynamique (chunk) introuvable —
 * typiquement un chunk renommé par un redéploiement.
 */
export function isStaleChunkError(error: unknown): boolean {
  const text = error instanceof Error ? `${error.name}: ${error.message}` : String(error ?? '');
  return /ChunkLoadError|Failed to fetch dynamically imported module|Importing a module script failed|error loading dynamically imported module|Loading (?:CSS )?chunk [^ ]+ failed/i.test(
    text,
  );
}

/**
 * Recharge la page une seule fois pour récupérer les fichiers à jour.
 * Ne retente pas dans les 10 s (évite une boucle si le rechargement ne résout
 * pas le problème).
 * @returns true si un rechargement a été déclenché.
 */
export function reloadOnceForStaleChunk(): boolean {
  if (Date.now() - readLast() < COOLDOWN_MS) return false;
  writeLast(Date.now());
  window.location.reload();
  return true;
}
