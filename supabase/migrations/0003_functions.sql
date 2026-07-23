-- submit_lead : seul chemin d'écriture vers `leads`, accessible à `anon`.
-- La clé anon est publique (présente dans le bundle JS) : ce qui suit doit
-- être vrai même pour un appel direct au RPC, sans passer par le formulaire
-- React (qui n'apporte que l'anti-spam basique — honeypot + délai minimum).
create or replace function submit_lead(
  p_kind text,
  p_name text,
  p_organisation text,
  p_phone text,
  p_email text,
  p_service_slug text,
  p_message text,
  p_lang text
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_name text := btrim(coalesce(p_name, ''));
  v_organisation text := left(btrim(coalesce(p_organisation, '')), 120);
  v_phone text := btrim(coalesce(p_phone, ''));
  v_email text := left(btrim(coalesce(p_email, '')), 160);
  v_service_slug text := left(btrim(coalesce(p_service_slug, '')), 80);
  v_message text := btrim(coalesce(p_message, ''));
  v_lang text := coalesce(p_lang, 'fr');
  v_kind text := coalesce(p_kind, 'contact');
  v_recent_10min int;
  v_recent_24h int;
  v_id uuid;
begin
  if v_kind not in ('devis', 'contact') then
    raise exception 'ERR_INVALID_INPUT: kind';
  end if;

  if v_lang not in ('fr', 'en', 'ar') then
    v_lang := 'fr';
  end if;

  if char_length(v_name) < 2 or char_length(v_name) > 100 then
    raise exception 'ERR_INVALID_INPUT: name';
  end if;

  if v_phone !~ '^0[5-7][0-9]{8}$' then
    raise exception 'ERR_INVALID_INPUT: phone';
  end if;

  if v_email <> '' and v_email !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' then
    raise exception 'ERR_INVALID_INPUT: email';
  end if;

  if char_length(v_message) < 5 or char_length(v_message) > 2000 then
    raise exception 'ERR_INVALID_INPUT: message';
  end if;

  -- Limitation de débit par numéro de téléphone : l'identité d'un visiteur
  -- COD/B2B ici est un numéro joignable, pas un compte. Contre l'envoi
  -- automatisé en rafale via un appel direct au RPC (le honeypot React ne
  -- protège que le formulaire visible).
  select count(*) into v_recent_10min
  from leads
  where phone = v_phone and created_at > now() - interval '10 minutes';

  if v_recent_10min >= 3 then
    raise exception 'ERR_RATE_LIMIT: too many requests in 10 minutes';
  end if;

  select count(*) into v_recent_24h
  from leads
  where phone = v_phone and created_at > now() - interval '24 hours';

  if v_recent_24h >= 10 then
    raise exception 'ERR_RATE_LIMIT: too many requests in 24 hours';
  end if;

  insert into leads (kind, name, organisation, phone, email, service_slug, message, lang)
  values (v_kind, v_name, v_organisation, v_phone, v_email, v_service_slug, v_message, v_lang)
  returning id into v_id;

  return v_id;
end;
$$;

revoke all on function submit_lead from public;
grant execute on function submit_lead to anon;
grant execute on function submit_lead to authenticated;
