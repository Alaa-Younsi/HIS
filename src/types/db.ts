import type { Localized, LocalizedList } from '@/i18n/types';

/**
 * Colonnes `jsonb` : Postgres ne garantit pas leur forme, seul le code
 * applicatif (formulaires admin) le fait à l'écriture — d'où le `unknown`
 * plutôt qu'un cast optimiste vers `Localized`.
 */
export type Json = unknown;

export type CompanyInfoRow = {
  id: number;
  slogan: Json;
  tagline: Json;
  hero_title: Json;
  hero_highlight: Json;
  hero_subtitle: Json;
  intro: Json;
  story: Json;
  mission: Json;
  expertise: Json;
  closing: Json;
  address: Json;
  hours: Json;
  phones: string[];
  whatsapp: string;
  email: string;
  city: string;
  country: string;
  linkedin_url: string;
  facebook_url: string;
  whatsapp_message: Json;
  stats: Json;
  updated_at: string;
};

export type ServiceRow = {
  id: string;
  slug: string;
  icon: string;
  image_url: string;
  gallery: Json;
  title: Json;
  short: Json;
  description: Json;
  applications: Json;
  sort_order: number;
  status: 'published' | 'draft';
  created_at: string;
  updated_at: string;
};

export type ProjectRow = {
  id: string;
  category: string;
  image_url: string;
  title: Json;
  location: Json;
  /** Optionnel : présent seulement si la colonne existe côté base. */
  client?: Json;
  description: Json;
  year: string;
  sort_order: number;
  status: 'published' | 'draft';
  created_at: string;
  updated_at: string;
};

export type SectorRow = {
  id: string;
  icon: string;
  name: Json;
  description: Json;
  sort_order: number;
  created_at: string;
};

export type StrengthRow = {
  id: string;
  icon: string;
  title: Json;
  description: Json;
  sort_order: number;
  created_at: string;
};

export type PartnerRow = {
  id: string;
  kind: 'client' | 'supplier';
  name: string;
  logo_url: string;
  website_url: string;
  sort_order: number;
  created_at: string;
};

export type LeadRow = {
  id: string;
  kind: 'devis' | 'contact';
  name: string;
  organisation: string;
  phone: string;
  email: string;
  service_slug: string;
  message: string;
  lang: string;
  status: 'new' | 'read' | 'archived';
  created_at: string;
};

/** Forme attendue d'un jsonb `{fr, en, ar}` — utilisée pour caster après lecture. */
export function asLocalized(value: Json): Localized {
  return value as Localized;
}

export function asLocalizedList(value: Json): LocalizedList {
  return value as LocalizedList;
}
