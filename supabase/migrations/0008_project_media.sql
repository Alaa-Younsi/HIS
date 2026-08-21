-- ─────────────────────────────────────────────────────────────
--  Fiches réalisations détaillées : galerie photos + vidéos
--
--  • Ajoute `slug` (adresse de la fiche détaillée /realisations/<slug>),
--    `gallery` (photos supplémentaires, même forme que services.gallery)
--    et `videos` (vidéos de chantier) aux réalisations.
--  • Génère un slug pour les 3 réalisations existantes à partir de leur
--    titre français (translittéré, sans accents) + un suffixe tiré de leur
--    id pour garantir l'unicité sans intervention manuelle.
--  • Relève la taille de fichier maximale du bucket "site-media" à 200 Mo
--    pour permettre l'envoi de vidéos depuis l'administration (sans effet
--    si le bucket n'existe pas encore — voir SUPABASE_SETUP.md). Le plafond
--    réel dépend aussi du réglage global du projet Supabase (Storage →
--    Settings → Upload file size limit) : à relever manuellement si besoin
--    pour de longues vidéos.
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

update storage.buckets
set file_size_limit = 209715200
where id = 'site-media' and (file_size_limit is null or file_size_limit < 209715200);
