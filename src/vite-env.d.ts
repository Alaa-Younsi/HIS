/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * Domaine public du site, sans barre oblique finale.
   * Sert aux URL canoniques, aux balises hreflang, au sitemap et aux partages
   * réseaux sociaux. À définir dans les variables d'environnement Vercel le
   * jour où le nom de domaine définitif est branché.
   */
  readonly VITE_SITE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
