# Photos du site

Déposez les photos ici. **Tant qu'un fichier est absent, le site affiche
automatiquement un visuel de repli aux couleurs HIS** — rien ne casse.

> ⚠️ **Les photos actuellement en place sont des images libres de droits
> provisoires** (source : Pexels), mises là en attendant vos vraies photos de
> chantier. Remplacez chaque fichier par le vôtre **en gardant le même nom**,
> puis relancez la commande de l'étape 4 ci-dessous.

## Après avoir remplacé une photo — étape 4, obligatoire

```bash
python scripts/generate-image-variants.py
```

Cette commande fabrique automatiquement les versions 400 / 600 / 800 / 1200 px
(en JPEG et en WebP) que le site envoie selon la taille de l'écran du visiteur.
C'est ce qui permet à un téléphone de télécharger 30 Ko au lieu de 250 Ko.

Si vous oubliez cette étape, le site fonctionne quand même : il enverra
simplement la photo en pleine résolution à tout le monde, donc plus lentement.

*(Prérequis, une seule fois : `pip install Pillow`.)*

## Où va quoi

| Dossier                    | Contenu                              | Format conseillé            |
| -------------------------- | ------------------------------------ | --------------------------- |
| `/images/hero-chantier.jpg`| Grande image d'accueil (Hero Banner) | 1920 × 1080, paysage        |
| `/images/a-propos.jpg`     | Photo équipe / chantier (page À propos) | 1000 × 1250, portrait    |
| `/images/services/`        | Une photo par service                | 1200 × 750, paysage         |
| `/images/realisations/`    | Photos de chantiers                  | 1200 × 900                  |
| `/images/logos/`           | Logos clients et fournisseurs        | PNG transparent, hauteur 200 px |
| `/og-image.jpg`            | Image de partage Facebook / LinkedIn | 1200 × 630                  |

Les noms de fichiers attendus sont ceux indiqués dans `src/content/services.ts`
et `src/content/projects.ts` (champ `image`).

## Avant de déposer une photo — important pour la vitesse du site

1. **Redimensionner** : jamais plus de 1920 px de large. Une photo de
   téléphone fait 4000 px et pèse 6 Mo — c'est 20× trop lourd.
2. **Compresser** : passez le fichier sur [squoosh.app](https://squoosh.app)
   ou [tinypng.com](https://tinypng.com). Visez **moins de 250 Ko** par photo.
3. **Format** : JPG pour les photos, PNG pour les logos (fond transparent),
   SVG si vous l'avez.

Une page qui charge vite est mieux classée par Google. Ces trois étapes sont
ce qui compte le plus.
