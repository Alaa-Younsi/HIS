# Utiliser le tableau de bord admin

Le tableau de bord permet de modifier le contenu du site (textes, photos,
services, réalisations, coordonnées) **sans toucher au code**, directement
depuis un navigateur. Cette fonctionnalité existe dans le code du site mais
n'est active qu'une fois Supabase connecté — voir `SUPABASE_SETUP.md` si ce
n'est pas encore fait. Tant qu'elle ne l'est pas, cette page reste la
référence pour comprendre ce que le tableau de bord fera une fois branché.

## Se connecter

`https://votre-site.com/admin/login` — avec l'e-mail et le mot de passe créés
lors de la configuration Supabase (voir `SUPABASE_SETUP.md`, étape 4). Ce
compte est le seul moyen d'accéder au tableau de bord : il n'y a pas de
formulaire d'inscription.

## Comment ça marche, en une phrase

Chaque modification enregistrée dans le tableau de bord est **immédiatement
visible sur le site public**, dès que la page est rechargée — pas besoin de
prévenir le développeur, pas de mise à jour à « publier » séparément, pas
d'attente.

## Les sections du tableau de bord

### Tableau de bord (accueil)

Vue d'ensemble : nombre de nouvelles demandes, demandes de la semaine, et les
dernières demandes reçues.

### Entreprise

Tous les textes qui ne sont liés à aucun service ou réalisation en
particulier : le slogan, le titre et le texte d'accueil, l'histoire de
l'entreprise, la mission, l'expertise, l'adresse, les téléphones, l'e-mail,
les horaires, les liens LinkedIn/Facebook, et les 4 chiffres clés affichés
sur la page d'accueil.

Chaque texte se modifie dans les trois langues du site (français, anglais,
arabe) — les trois champs sont toujours visibles côte à côte.

### Services

Les 9 services proposés (Climatisation, Ventilation, etc.). Pour chacun :
titre, accroche courte, description complète, domaines d'application, icône,
photo principale, et une galerie de photos supplémentaires affichée en bas
de la page du service.

- **Ajouter un service** : bouton « Ajouter un service » en haut de la page.
- **Lien (slug)** : c'est la partie de l'adresse web du service
  (`/services/climatisation`). Il se remplit automatiquement à partir du
  titre en français, mais peut être modifié — évitez de le changer sur un
  service déjà en ligne, cela changerait son adresse.
- **Statut « Brouillon »** : masque le service du site public sans le
  supprimer — pratique pour préparer un nouveau service avant de le publier.
- **Ordre d'affichage** : un nombre plus petit s'affiche en premier.

### Réalisations

La galerie de chantiers. Pour chacune : titre, lien (slug), lieu, année,
description, catégorie (Protection incendie, Climatisation, Ventilation,
Désenfumage, Chambres froides, Industriel — utilisée pour les filtres sur la
page publique), une photo principale, une galerie de photos supplémentaires
et des vidéos de chantier.

En cliquant sur une réalisation depuis la page publique, le visiteur accède à
une fiche détaillée (`/realisations/<lien>`) qui affiche la description
complète, toute la galerie de photos et les vidéos. La photo principale et la
catégorie restent seules affichées sur la vignette de la liste.

- **Lien (slug)** : l'adresse de la fiche détaillée. Se remplit
  automatiquement à partir du titre en français, modifiable — évitez de le
  changer sur une réalisation déjà en ligne.
- **Galerie de photos** et **Vidéos** : ajoutez plusieurs fichiers à la fois.
  Les vidéos sont limitées à 200 Mo par fichier (formats MP4, WebM, OGG,
  MOV) ; en cas d'échec d'envoi malgré une vidéo sous cette taille, vérifiez
  le plafond de taille de fichier réglé sur le projet Supabase
  (Storage → Settings → Upload file size limit).

### Secteurs

Les secteurs d'activité desservis (Industrie, Agroalimentaire, etc.),
affichés sur la page d'accueil et sur la page dédiée.

### Pourquoi HIS

Les points forts de l'entreprise, affichés sur l'accueil et sur la page
« Pourquoi HIS ? ».

### Partenaires

Les logos des clients et des fournisseurs, avec un onglet pour basculer entre
les deux catégories.

### Demandes

Toutes les demandes de devis et messages de contact reçus depuis le site.

- Cliquer sur une demande l'affiche en détail et la marque automatiquement
  comme « Lue ».
- Le statut (Nouvelle / Lue / Archivée) peut être changé manuellement — utile
  pour marquer une demande traitée.
- **Exporter en Excel** : télécharge la liste actuellement filtrée dans un
  fichier `.xlsx`, utilisable pour le suivi commercial.
- **Tout supprimer** : supprime définitivement toutes les demandes affichées.
  Pensez à exporter d'abord si vous voulez en garder une trace — cette action
  est irréversible.

## Les photos

Quand vous ajoutez une photo (bouton « Choisir une photo » ou galerie), elle
est automatiquement redimensionnée avant l'envoi — vous pouvez déposer une
photo prise directement avec un téléphone, pas besoin de la retoucher avant.

## Ce que le tableau de bord ne fait pas (pour l'instant)

Ce sont les évolutions listées dans le cahier des charges d'origine comme
« futures » — la structure du site les permettra facilement le moment venu,
mais elles ne sont pas construites aujourd'hui : espace actualités/blog,
catalogue de produits téléchargeables, espace client, chat en ligne.

## En cas de problème

Si une modification n'apparaît pas sur le site public après enregistrement :
rechargez complètement la page (Ctrl+F5 / Cmd+Shift+R) — certains navigateurs
gardent une ancienne version en mémoire quelques minutes. Si le problème
persiste, vérifiez le bandeau en haut du tableau de bord : s'il indique que
Supabase n'est pas connecté, voir `SUPABASE_SETUP.md`.
