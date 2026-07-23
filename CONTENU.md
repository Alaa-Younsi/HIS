# Modifier le contenu du site

> **Si Supabase est connecté** (voir `SUPABASE_SETUP.md`), la façon normale
> de modifier le contenu est le tableau de bord admin (`/admin`, voir
> `ADMIN_GUIDE.md`) — plus besoin de toucher aux fichiers ci-dessous, et les
> modifications sont visibles immédiatement, sans reconstruire le site.
>
> Tant que Supabase n'est pas connecté (ou pour tout modifier d'un coup avant
> de brancher le tableau de bord), le contenu reste éditable directement dans
> ces fichiers, comme décrit ci-dessous.

Tout le texte, les photos et les coordonnées du site se trouvent dans **six
fichiers**, dans le dossier `src/content/`. Aucune autre partie du code n'a
besoin d'être touchée pour changer le contenu.

| Fichier         | Ce qu'il contient                                              |
| --------------- | -------------------------------------------------------------- |
| `company.ts`    | Coordonnées, slogan, textes « Notre histoire / mission / expertise », chiffres clés |
| `services.ts`   | Les 9 services : titre, description, domaines d'application     |
| `projects.ts`   | La galerie des réalisations et leurs catégories                 |
| `sectors.ts`    | Les secteurs d'activité desservis                               |
| `partners.ts`   | Logos des clients et des fournisseurs                           |
| `strengths.ts`  | Les points forts de la page « Pourquoi HIS ? »                  |

Les libellés d'interface (boutons, menu) sont dans `src/i18n/ui.ts`.

---

## La règle à connaître : trois langues, toujours

Chaque texte s'écrit dans les trois langues du site. Vous verrez partout cette
forme :

```ts
title: {
  fr: 'Climatisation HVAC',
  en: 'HVAC Air Conditioning',
  ar: 'التكييف الهوائي',
},
```

**Modifiez le texte entre les apostrophes, jamais le `fr:` / `en:` / `ar:`.**
Si vous supprimez une des trois langues, le site refusera de se construire —
c'est volontaire, cela évite qu'une page reste vide en arabe ou en anglais.

> Si une apostrophe fait partie du texte (`l'installation`), écrivez le texte
> entre guillemets doubles : `"Notre savoir-faire en l'état"`.

---

## Cas courants

### Changer un numéro de téléphone ou une adresse

`src/content/company.ts`, section `contact`. Le premier numéro de la liste
`phones` est celui utilisé par le bouton « Appeler ».

Le champ `whatsapp` est un format spécial : international, **sans espaces ni
`+`** → `213550700036`.

### Ajouter une réalisation

Dans `src/content/projects.ts`, copiez un bloc complet (de `{` à `},`) et
changez :

- `id` — un identifiant unique, en minuscules avec des tirets
- `category` — une des catégories listées en haut du fichier
- `image` — le chemin de la photo (voir `public/images/README.md`)
- `title`, `location`, `year`, `description`

Les filtres par catégorie de la page Réalisations se mettent à jour tout
seuls : seules les catégories qui contiennent au moins une réalisation
s'affichent.

### Ajouter un logo client

Déposez le logo dans `public/images/logos/`, puis ajoutez une ligne dans
`src/content/partners.ts` :

```ts
{ name: 'Nom du client', logo: '/images/logos/nom-du-client.png' },
```

Tant que le fichier image n'existe pas, le nom du client s'affiche en toutes
lettres — le site reste propre.

### Modifier un service

`src/content/services.ts`. Attention à un seul champ : **`slug`**. Il forme
l'adresse de la page (`/fr/services/climatisation`). Le changer casse les
liens déjà partagés et fait perdre le référencement Google acquis sur cette
page. Ne le modifiez que si c'est vraiment nécessaire — et prévenez pour
qu'une redirection soit mise en place.

---

## Vérifier avant de publier

```bash
bun run typecheck   # signale toute erreur de syntaxe ou langue manquante
bun run dev         # ouvre le site en local sur http://localhost:5173
```

Si `typecheck` passe, le site se construira sans problème.
