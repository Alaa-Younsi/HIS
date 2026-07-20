# HIS — HVAC and Industrial Solution

Site vitrine de HIS (Blida, Algérie) : études, installation et maintenance de
systèmes HVAC, désenfumage et protection incendie.

**Bun · Vite · React 19 · TypeScript · Tailwind CSS v4**

## Démarrer

```bash
bun install
bun run dev        # http://localhost:5173
bun run build      # → dist/  (typecheck + build + sitemap)
bun run preview    # prévisualise le build de production
```

## Structure

```
src/
├── content/     ← TOUT le contenu éditable (voir CONTENU.md)
├── i18n/        ← langues : types, contexte, libellés d'interface
├── components/  ← briques réutilisables (Header, Footer, Seo, Img…)
├── pages/       ← une page = un fichier
├── routes.ts    ← plan des URL
└── App.tsx      ← routage
public/images/   ← photos et logos (voir public/images/README.md)
scripts/         ← génération du sitemap au build
```

Le client modifie le site depuis `src/content/` uniquement. **[→ CONTENU.md](./CONTENU.md)**

## Langues

Trois langues, une URL par langue : `/fr/…`, `/en/…`, `/ar/…`.
L'arabe bascule automatiquement l'interface en RTL (`dir="rtl"`).

Cette séparation par URL n'est pas cosmétique : elle permet à Google
d'indexer les trois versions séparément via les balises `hreflang`, ce qu'un
sélecteur de langue en JavaScript seul ne permet pas.

`/` redirige vers la langue du navigateur (ou le dernier choix mémorisé).

## SEO

| Élément | Où |
| --- | --- |
| `<title>`, description, canonical, Open Graph, Twitter Card | `src/components/Seo.tsx`, par page |
| `hreflang` fr / en / ar + `x-default` | `Seo.tsx`, automatique |
| JSON-LD `LocalBusiness` | `Seo.tsx` → `organizationJsonLd`, sur toutes les pages |
| JSON-LD `Service` + fil d'Ariane | pages service |
| `sitemap.xml` (48 URL, avec alternates) + `robots.txt` | générés au build par `scripts/generate-seo-files.ts` |
| Titres `h1`/`h2` hiérarchisés, `alt` sur les images, liens `<a>` réels | dans les pages |

**Avant la mise en ligne**, remplacez le domaine `https://his-dz.com` par le
domaine réel à deux endroits : `src/content/company.ts` (`siteUrl`) et rien
d'autre — le sitemap et les balises canoniques s'y réfèrent.

### Une limite à connaître

Le site est une SPA : le HTML initial est vide et le contenu est rendu par
JavaScript. Google exécute le JavaScript et indexe correctement ce type de
site, mais les aperçus de partage de Facebook, LinkedIn et WhatsApp, eux,
ne l'exécutent pas — ils liront toujours les balises statiques de
`index.html`, identiques sur toutes les pages.

Si le partage sur les réseaux sociaux devient important, la solution est le
prérendu (`vite-react-ssg`) : chaque page est alors générée en HTML complet
au build. C'est une évolution d'une demi-journée, sans réécriture — les
composants restent les mêmes.

## Performance

- Pages chargées à la demande (`lazy`) — seule l'accueil est dans le bundle initial
- Bibliothèques dans un chunk `vendor` séparé, mis en cache longue durée
- Polices système : zéro requête réseau pour le texte
- Images : `loading="lazy"`, `decoding="async"`, ratio réservé (pas de saut de
  mise en page), `fetchpriority="high"` sur le hero uniquement
- Carte Google chargée uniquement sur la page Contact, en `lazy`

Poids actuel : **~26 Ko gzip** pour l'application + 74 Ko de bibliothèques.

## Déploiement

`vercel.json` est prêt (réécritures SPA, en-têtes de cache, HSTS). Sur Vercel :
importez le dépôt, la configuration est détectée automatiquement. Le HTTPS est
fourni par la plateforme.

Pour un autre hébergeur, la seule exigence est de rediriger toutes les routes
inconnues vers `index.html`.

## Évolutions prévues au cahier des charges

L'architecture est prête pour ces ajouts, sans réécriture :

- **Formulaire de devis avec envoi serveur** — le formulaire actuel compose le
  message et l'ouvre dans WhatsApp ou la messagerie ; il ne stocke rien. Le
  brancher sur Supabase ou Resend est un ajout localisé dans `Contact.tsx`.
- **Espace actualités / blog, catalogue produits, espace client** — nouvelles
  entrées dans `src/routes.ts` + un fichier dans `src/pages/`.
- **Administration du contenu par le client** — les données sont déjà
  centralisées et typées dans `src/content/` ; le passage à Supabase consiste
  à remplacer les imports par des requêtes, la forme des données ne change pas.
