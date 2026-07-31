-- ─────────────────────────────────────────────────────────────
--  Réseaux sociaux : Instagram + TikTok, LinkedIn retiré
--
--  • Ajoute les colonnes `instagram_url` et `tiktok_url` (mêmes règles que
--    `facebook_url` : chaîne vide = réseau masqué sur le site).
--  • Renseigne les trois comptes actifs.
--  • Vide `linkedin_url` : pas de page LinkedIn pour l'instant. La colonne est
--    conservée — le jour où la page existe, il suffira de coller l'adresse
--    depuis le tableau de bord, sans nouvelle migration.
--
--  Les adresses sont volontairement NUES : les liens copiés depuis le bouton
--  « Partager » de Facebook/TikTok traînent des jetons de session
--  (`share_url`, `sec_uid`, `_r`…) propres à l'appareil qui les a copiés.
--
--  Indispensable ici et pas seulement dans src/content/company.ts : le site lit
--  `company_info` depuis Supabase et cette ligne REMPLACE le contenu statique.
--  Sans cette migration, le site en ligne continuerait d'afficher l'icône
--  LinkedIn et ignorerait Instagram et TikTok.
--
--  Idempotent : peut être rejouée sans effet de bord.
-- ─────────────────────────────────────────────────────────────

alter table company_info add column if not exists instagram_url text not null default '';
alter table company_info add column if not exists tiktok_url text not null default '';

update company_info
set linkedin_url = '',
    facebook_url = 'https://www.facebook.com/profile.php?id=61572968753708',
    instagram_url = 'https://www.instagram.com/hvac_industrial_solution',
    tiktok_url = 'https://www.tiktok.com/@hvac.industrial.solution'
where id = 1;
