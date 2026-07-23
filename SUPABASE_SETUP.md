# Connecter Supabase

Le site et le tableau de bord admin (`/admin`) sont déjà entièrement codés et
fonctionnent **sans Supabase** : tant que rien n'est connecté, le site public
lit le contenu statique de `src/content/*.ts` (exactement comme avant), et
`/admin` affiche un message expliquant qu'il faut le connecter. Ce document
explique comment passer à un contenu réellement modifiable depuis le
tableau de bord.

## 1. Créer le projet Supabase

1. [supabase.com](https://supabase.com) → New project. Notez le mot de passe
   de la base — vous n'en aurez pas besoin ailleurs, mais gardez-le.
2. Une fois le projet prêt : **Project Settings → API**. Vous y trouverez
   deux valeurs :
   - `Project URL` → variable `VITE_SUPABASE_URL`
   - `anon public` key → variable `VITE_SUPABASE_ANON_KEY`

## 2. Exécuter les migrations SQL

Dans le tableau de bord Supabase : **SQL Editor → New query**. Collez et
exécutez, **dans cet ordre exact**, le contenu de chaque fichier de
`supabase/migrations/` :

1. `0001_init.sql` — crée les tables (services, réalisations, secteurs,
   points forts, partenaires, demandes, entreprise).
2. `0002_rls.sql` — active la sécurité au niveau des lignes (RLS) : qui peut
   lire quoi, qui peut écrire quoi.
3. `0003_functions.sql` — crée `submit_lead`, la seule porte d'entrée pour
   enregistrer une demande de devis/contact (validation + anti-spam côté
   serveur).
4. `0004_seed.sql` — remplit les tables avec **le contenu actuellement en
   ligne** (les mêmes textes/services/réalisations que le site affiche
   aujourd'hui) — rien à ressaisir avant de pouvoir commencer à éditer.

Ne renumérotez jamais un fichier déjà exécuté sur un projet réel — une
modification future s'ajoute toujours dans un nouveau fichier
`0005_...sql`.

## 3. Créer le bucket de stockage des photos

**Storage → New bucket** :

- Nom : `site-media` (exactement ce nom — c'est celui utilisé par le code)
- **Public bucket** : coché (les photos doivent être visibles par tous les
  visiteurs du site)

Les politiques de lecture/écriture de ce bucket sont déjà créées par
`0002_rls.sql` (lecture publique, écriture réservée aux comptes connectés) —
il n'y a rien d'autre à configurer.

## 4. Créer le compte administrateur

**Authentication → Users → Add user** (créez le compte manuellement — ne
passez pas par un formulaire d'inscription public, il n'y en a pas dans ce
projet). Renseignez l'e-mail et le mot de passe qui serviront à se connecter
sur `/admin/login`.

## 5. Désactiver l'inscription publique — étape de sécurité importante

**Authentication → Sign In / Providers → Email → décochez "Allow new users
to sign up"** (le libellé exact varie selon la version de Supabase — cherchez
l'option d'inscription publique et désactivez-la).

**Pourquoi c'est important** : la clé `anon` est publique (elle est incluse
dans le code envoyé au navigateur de chaque visiteur — c'est normal et
nécessaire). Toute personne qui « se connecte » via ce compte obtient un
accès complet en écriture au tableau de bord (services, réalisations, textes,
demandes…), car il n'y a pas de rôle « admin » séparé dans ce projet — un
compte authentifié = un administrateur. Si l'inscription publique reste
ouverte, n'importe qui peut créer un compte avec la clé `anon` (déjà visible
dans le code du site) et obtenir cet accès sans jamais passer par
`/admin/login`. Désactiver l'inscription publique est ce qui empêche
concrètement cela — c'est gratuit et ça prend dix secondes.

## 6. Renseigner les variables d'environnement

**En local**, copiez `.env.example` vers `.env` et renseignez les deux
valeurs récupérées à l'étape 1.

**Sur Vercel** (obligatoire pour que le site en ligne fonctionne, `.env`
local n'est jamais déployé) : Project Settings → Environment Variables,
ajoutez `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY`, puis redéployez.

## 7. Vérifier

1. Ouvrez `/admin/login` sur le site, connectez-vous avec le compte créé à
   l'étape 4.
2. Le tableau de bord doit afficher les services, réalisations, etc.
   provenant du seed (étape 2.4) — les mêmes qu'aujourd'hui sur le site.
3. Modifiez un texte (ex. le slogan dans « Entreprise »), enregistrez,
   rechargez le site public dans un autre onglet : la modification doit
   apparaître, sans avoir besoin de reconstruire ni redéployer le site.
4. Depuis un navigateur **non connecté** (navigation privée), remplissez le
   formulaire de contact du site public et envoyez-le. Il doit apparaître
   dans « Demandes » côté admin.

### Vérification plus poussée (recommandée avant d'annoncer le site aux clients)

- **Tester `submit_lead` directement**, sans passer par le formulaire —
  c'est ce qui protège contre un envoi automatisé qui contournerait le
  formulaire. Depuis un terminal :
  ```bash
  curl -X POST "https://<votre-projet>.supabase.co/rest/v1/rpc/submit_lead" \
    -H "apikey: <votre clé anon>" \
    -H "Authorization: Bearer <votre clé anon>" \
    -H "Content-Type: application/json" \
    -d '{"p_kind":"contact","p_name":"","p_organisation":"","p_phone":"000","p_email":"","p_service_slug":"","p_message":"test","p_lang":"fr"}'
  ```
  Un nom vide et un téléphone invalide (`"000"`) doivent renvoyer une erreur
  commençant par `ERR_INVALID_INPUT` — jamais un succès, jamais une erreur
  Postgres brute. Envoyez ensuite 4 demandes valides de suite avec le même
  numéro de téléphone : la 4ᵉ doit échouer avec `ERR_RATE_LIMIT`.
- **Vérifier que `leads` est bien inaccessible à un visiteur anonyme** :
  ```bash
  curl "https://<votre-projet>.supabase.co/rest/v1/leads?select=*" \
    -H "apikey: <votre clé anon>"
  ```
  Doit renvoyer une liste vide ou une erreur de permission — jamais les
  vraies demandes (elles contiennent des numéros de téléphone de clients).
- Supprimez les demandes de test créées ci-dessus depuis l'admin avant de
  considérer le site prêt.

## Ce qui se passe si vous ne faites rien de tout ça

Rien de cassé : le site continue de fonctionner exactement comme avant,
avec le contenu de `src/content/*.ts`. `/admin` reste accessible mais
affiche un message indiquant que Supabase n'est pas connecté. Vous pouvez
connecter Supabase à tout moment, sans risque pour le site déjà en ligne.
