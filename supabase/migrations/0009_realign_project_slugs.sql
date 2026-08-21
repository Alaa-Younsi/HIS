-- ─────────────────────────────────────────────────────────────
--  Aligne les slugs des 3 réalisations existantes avec le contenu statique
--
--  0008 a généré automatiquement un slug par réalisation à partir du titre
--  français + un suffixe d'id (ex. "...-31f41b23"). Le contenu statique de
--  secours (src/content/projects.ts, servi tant que la lecture Supabase
--  n'a pas encore répondu) utilise des adresses courtes choisies à la main
--  ("desenfumage-belle-colline"…), différentes.
--
--  Conséquence concrète : au premier chargement d'une page (lien partagé,
--  favori, moteur de recherche), le site affiche d'abord le contenu
--  statique — dont les slugs ne correspondaient plus aux vraies adresses —
--  puis redirigeait aussitôt vers la liste avant même que les données
--  Supabase n'aient le temps d'arriver. Cette migration fait correspondre
--  les deux sources pour ces 3 réalisations connues.
--
--  Idempotent : peut être rejouée sans effet de bord.
-- ─────────────────────────────────────────────────────────────

update projects set slug = 'desenfumage-belle-colline'
where title->>'fr' = 'Système de désenfumage — Résidence La Belle Colline';

update projects set slug = 'incendie-kalipap'
where title->>'fr' = $$Système de lutte contre l'incendie — Kalipap$$;

update projects set slug = 'ventilation-silos-ccls'
where title->>'fr' = 'Système de ventilation — silos de stockage de céréales';
