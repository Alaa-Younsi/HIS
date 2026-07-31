-- ─────────────────────────────────────────────────────────────
--  Adresse e-mail professionnelle
--
--  Le domaine his-hvac.com est en service : l'adresse de contact passe de
--  l'ancienne boîte Gmail à contact@his-hvac.com.
--
--  Indispensable ici (et pas seulement dans src/content/company.ts) : le site
--  lit `company_info` depuis Supabase au chargement et cette ligne REMPLACE le
--  contenu statique. Sans cette migration, le site en ligne continuerait
--  d'afficher l'ancienne adresse.
--
--  Idempotent : peut être rejouée sans effet de bord.
-- ─────────────────────────────────────────────────────────────

update company_info
set email = 'contact@his-hvac.com'
where id = 1;
