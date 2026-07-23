-- Politique : le visiteur anonyme (rôle `anon`) ne peut lire que le contenu
-- publié ; le tableau de bord (rôle `authenticated`) peut tout lire et tout
-- écrire. Cette politique n'est sûre que si l'inscription publique est
-- désactivée dans Supabase (Authentication → Settings) — sans quoi n'importe
-- qui peut créer un compte avec la clé anon (déjà présente dans le bundle JS
-- envoyé au navigateur) et obtenir un accès admin complet. Voir
-- SUPABASE_SETUP.md, étape « Désactiver l'inscription publique ».

alter table company_info enable row level security;
alter table services enable row level security;
alter table projects enable row level security;
alter table sectors enable row level security;
alter table strengths enable row level security;
alter table partners enable row level security;
alter table leads enable row level security;

-- company_info : lecture publique, écriture admin (jamais d'insert/delete —
-- ligne singleton créée par le seed).
create policy "company_info_select_anon" on company_info
  for select to anon using (true);
create policy "company_info_all_authenticated" on company_info
  for all to authenticated using (true) with check (true);

-- services / projects : lecture publique limitée aux fiches publiées.
create policy "services_select_published" on services
  for select to anon using (status = 'published');
create policy "services_all_authenticated" on services
  for all to authenticated using (true) with check (true);

create policy "projects_select_published" on projects
  for select to anon using (status = 'published');
create policy "projects_all_authenticated" on projects
  for all to authenticated using (true) with check (true);

-- sectors / strengths / partners : pas de statut brouillon, toujours publics.
create policy "sectors_select_anon" on sectors
  for select to anon using (true);
create policy "sectors_all_authenticated" on sectors
  for all to authenticated using (true) with check (true);

create policy "strengths_select_anon" on strengths
  for select to anon using (true);
create policy "strengths_all_authenticated" on strengths
  for all to authenticated using (true) with check (true);

create policy "partners_select_anon" on partners
  for select to anon using (true);
create policy "partners_all_authenticated" on partners
  for all to authenticated using (true) with check (true);

-- leads : AUCUN accès anon, pas même en insertion — cette table contient des
-- numéros de téléphone. L'écriture passe exclusivement par le RPC
-- submit_lead (SECURITY DEFINER, voir 0003_functions.sql), qui contourne RLS
-- après avoir validé et limité le débit. Seul le tableau de bord y accède.
create policy "leads_all_authenticated" on leads
  for all to authenticated using (true) with check (true);

-- ─────────────────────────────────────────────────────────────
-- Stockage : bucket public en lecture, écriture réservée à l'admin.
-- Le bucket "site-media" doit être créé manuellement dans le tableau de
-- bord Supabase (Storage → New bucket, "Public bucket" coché) — voir
-- SUPABASE_SETUP.md. Ces politiques s'appliquent une fois le bucket créé.
-- ─────────────────────────────────────────────────────────────
create policy "site_media_public_read" on storage.objects
  for select to public using (bucket_id = 'site-media');

create policy "site_media_authenticated_write" on storage.objects
  for insert to authenticated with check (bucket_id = 'site-media');

create policy "site_media_authenticated_update" on storage.objects
  for update to authenticated using (bucket_id = 'site-media');

create policy "site_media_authenticated_delete" on storage.objects
  for delete to authenticated using (bucket_id = 'site-media');
