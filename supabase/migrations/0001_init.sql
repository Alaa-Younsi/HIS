-- Schéma initial du CMS HIS. Champs `jsonb` : toujours de la forme
-- {"fr": "...", "en": "...", "ar": "..."} pour un texte, ou
-- {"fr": [...], "en": [...], "ar": [...]} pour une liste de textes —
-- exactement la forme des types Localized / LocalizedList du frontend
-- (src/i18n/types.ts), pour que la lecture ne demande aucune transformation.

create extension if not exists pgcrypto;

create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- ─────────────────────────────────────────────────────────────
-- Identité de l'entreprise — une seule ligne (id = 1)
-- ─────────────────────────────────────────────────────────────
create table company_info (
  id smallint primary key default 1 check (id = 1),
  slogan jsonb not null,
  tagline jsonb not null,
  hero_title jsonb not null,
  hero_highlight jsonb not null,
  hero_subtitle jsonb not null,
  intro jsonb not null,
  story jsonb not null,
  mission jsonb not null,
  expertise jsonb not null,
  closing jsonb not null,
  address jsonb not null,
  hours jsonb not null,
  phones text[] not null default '{}',
  whatsapp text not null default '',
  email text not null default '',
  city text not null default '',
  country text not null default 'DZ',
  linkedin_url text not null default '',
  facebook_url text not null default '',
  whatsapp_message jsonb not null,
  -- [{value: "10+", icon: "experience", label: {fr,en,ar}}, ...]
  stats jsonb not null default '[]',
  updated_at timestamptz not null default now()
);

create trigger company_info_updated_at
  before update on company_info
  for each row execute function update_updated_at();

-- ─────────────────────────────────────────────────────────────
-- Services
-- ─────────────────────────────────────────────────────────────
create table services (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  icon text not null,
  image_url text not null default '',
  -- string[] de chemins/URLs de photos supplémentaires
  gallery jsonb not null default '[]',
  title jsonb not null,
  short jsonb not null,
  description jsonb not null,
  -- {fr: string[], en: string[], ar: string[]}
  applications jsonb not null default '{"fr":[],"en":[],"ar":[]}',
  sort_order int not null default 0,
  status text not null default 'published' check (status in ('published', 'draft')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index services_status_sort_idx on services (status, sort_order);

create trigger services_updated_at
  before update on services
  for each row execute function update_updated_at();

-- ─────────────────────────────────────────────────────────────
-- Réalisations
-- ─────────────────────────────────────────────────────────────
create table projects (
  id uuid primary key default gen_random_uuid(),
  category text not null check (
    category in ('incendie', 'climatisation', 'ventilation', 'desenfumage', 'chambres-froides', 'industriel')
  ),
  image_url text not null default '',
  title jsonb not null,
  location jsonb not null,
  description jsonb not null,
  year text not null default '',
  sort_order int not null default 0,
  status text not null default 'published' check (status in ('published', 'draft')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index projects_status_sort_idx on projects (status, sort_order);
create index projects_category_idx on projects (category);

create trigger projects_updated_at
  before update on projects
  for each row execute function update_updated_at();

-- ─────────────────────────────────────────────────────────────
-- Secteurs d'activité
-- ─────────────────────────────────────────────────────────────
create table sectors (
  id uuid primary key default gen_random_uuid(),
  icon text not null,
  name jsonb not null,
  description jsonb not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create index sectors_sort_idx on sectors (sort_order);

-- ─────────────────────────────────────────────────────────────
-- Pourquoi HIS ? (points forts)
-- ─────────────────────────────────────────────────────────────
create table strengths (
  id uuid primary key default gen_random_uuid(),
  icon text not null,
  title jsonb not null,
  description jsonb not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create index strengths_sort_idx on strengths (sort_order);

-- ─────────────────────────────────────────────────────────────
-- Clients et fournisseurs (logos)
-- ─────────────────────────────────────────────────────────────
create table partners (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('client', 'supplier')),
  name text not null,
  logo_url text not null default '',
  website_url text not null default '',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create index partners_kind_sort_idx on partners (kind, sort_order);

-- ─────────────────────────────────────────────────────────────
-- Demandes (formulaire devis / contact unifiés) — écriture uniquement via
-- le RPC submit_lead (0003_functions.sql), jamais en insertion directe.
-- ─────────────────────────────────────────────────────────────
create table leads (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('devis', 'contact')),
  name text not null,
  organisation text not null default '',
  phone text not null,
  email text not null default '',
  service_slug text not null default '',
  message text not null,
  lang text not null default 'fr' check (lang in ('fr', 'en', 'ar')),
  status text not null default 'new' check (status in ('new', 'read', 'archived')),
  created_at timestamptz not null default now()
);

-- Utilisé par submit_lead pour la limitation de débit par numéro.
create index leads_phone_created_idx on leads (phone, created_at desc);
create index leads_status_created_idx on leads (status, created_at desc);
