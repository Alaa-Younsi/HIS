-- ─────────────────────────────────────────────────────────────
--  Fiches réalisations détaillées : galerie photos + vidéos
--
--  • Ajoute `slug` (adresse de la fiche détaillée /realisations/<slug>),
--    `gallery` (photos supplémentaires, même forme que services.gallery)
--    et `videos` (vidéos de chantier — fichiers Supabase Storage OU liens
--    YouTube, distingués à l'affichage par la forme de l'URL) aux
--    réalisations.
--  • Génère un slug pour les 3 réalisations existantes à partir de leur
--    titre français (translittéré, sans accents) + un suffixe tiré de leur
--    id pour garantir l'unicité sans intervention manuelle.
--  • Crée le bucket de stockage "site-media" s'il n'existe pas encore
--    (lecture publique, 50 Mo max par fichier) — REMPLACE l'étape manuelle
--    « Storage → New bucket » de SUPABASE_SETUP.md, qui n'avait pas été
--    faite sur ce projet : sans bucket, aucun envoi de photo/vidéo depuis
--    l'admin ne fonctionne, sur AUCUN formulaire (services, réalisations,
--    partenaires, avis), pas seulement les nouveaux champs galerie/vidéos.
--    Plafond volontairement bas (voir src/lib/upload.ts) : le plan Supabase
--    de ce projet est gratuit — ~1 Go de stockage et ~5 Go de bande passante
--    PAR MOIS, partagés avec tout le reste du site. Pour une vidéo plus
--    longue, l'admin dispose d'un champ « lien YouTube » à la place (hors
--    forfait, gratuit et illimité). Le plafond global du projet (Storage →
--    Settings → Upload file size limit) prévaut si plus bas que celui du
--    bucket — à vérifier une fois si un envoi de 50 Mo échoue.
--
--  Idempotent : peut être rejouée sans créer de doublons ni écraser des
--  slugs déjà personnalisés.
-- ─────────────────────────────────────────────────────────────

create extension if not exists unaccent;

alter table projects add column if not exists slug text;
alter table projects add column if not exists gallery jsonb not null default '[]';
alter table projects add column if not exists videos jsonb not null default '[]';

update projects
set slug = trim(both '-' from regexp_replace(lower(unaccent(title->>'fr')), '[^a-z0-9]+', '-', 'g'))
           || '-' || substr(id::text, 1, 8)
where slug is null or slug = '';

alter table projects alter column slug set not null;

create unique index if not exists projects_slug_key on projects (slug);

insert into storage.buckets (id, name, public, file_size_limit)
values ('site-media', 'site-media', true, 52428800)
on conflict (id) do update
set public = true,
    file_size_limit = 52428800;
