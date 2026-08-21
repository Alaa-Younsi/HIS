/**
 * Vidéos YouTube (recommandées pour les vidéos de chantier — hébergement
 * gratuit et illimité, hors du forfait de bande passante Supabase). Une même
 * colonne `videos` (string[]) accepte à la fois des liens YouTube et des
 * fichiers envoyés vers Supabase Storage — on les distingue à l'affichage
 * par la forme de l'URL, sans colonne séparée.
 */
const YOUTUBE_RE = /(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

export function youtubeId(url: string): string | null {
  const match = url.match(YOUTUBE_RE);
  return match?.[1] ?? null;
}

export function isYoutubeUrl(url: string): boolean {
  return youtubeId(url) !== null;
}

/** youtube-nocookie.com : pas de cookie de suivi tant que la vidéo n'est pas lancée. */
export function youtubeEmbedUrl(id: string): string {
  return `https://www.youtube-nocookie.com/embed/${id}`;
}

export function youtubeThumbnailUrl(id: string): string {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}
