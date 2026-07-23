import { useEffect, useState } from 'react';
import { company, type Company } from '@/content/company';
import { clients as staticClients, clientsIntro, suppliers as staticSuppliers } from '@/content/partners';
import { projects as staticProjects, type Project } from '@/content/projects';
import { sectors as staticSectors, type Sector } from '@/content/sectors';
import { services as staticServices, type Service } from '@/content/services';
import { strengths as staticStrengths, type Strength } from '@/content/strengths';
import type { Partner } from '@/content/partners';
import { supabase } from '@/lib/supabase';
import {
  asLocalized,
  asLocalizedList,
  type CompanyInfoRow,
  type PartnerRow,
  type ProjectRow,
  type SectorRow,
  type ServiceRow,
  type StrengthRow,
} from '@/types/db';

/**
 * Chaque hook démarre avec le contenu statique de src/content/ (premier
 * affichage instantané, sans réseau) puis, si Supabase est connecté, tente
 * une lecture live et remplace les données au retour. En cas d'échec ou
 * d'absence de connexion, le contenu statique reste affiché — le site ne
 * casse jamais, avec ou sans backend. Voir SUPABASE_SETUP.md.
 */
function useLiveList<T>(
  fallback: readonly T[],
  fetcher: () => Promise<{ data: T[] | null; error: unknown }>,
): readonly T[] {
  const [data, setData] = useState<readonly T[]>(fallback);

  useEffect(() => {
    if (!supabase) return;
    let cancelled = false;

    fetcher().then((result) => {
      if (cancelled || result.error || !result.data) return;
      setData(result.data);
    });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- fetcher is a fresh closure each render by design; only run on mount
  }, []);

  return data;
}

function mapService(row: ServiceRow): Service {
  return {
    slug: row.slug,
    icon: row.icon as Service['icon'],
    image: row.image_url,
    gallery: Array.isArray(row.gallery) ? (row.gallery as string[]) : undefined,
    title: asLocalized(row.title),
    short: asLocalized(row.short),
    description: asLocalized(row.description),
    applications: asLocalizedList(row.applications),
  };
}

export function useServices(): readonly Service[] {
  return useLiveList<Service>(staticServices, async () => {
    const { data, error } = await supabase!
      .from('services')
      .select('*')
      .eq('status', 'published')
      .order('sort_order', { ascending: true });
    return { data: data ? (data as ServiceRow[]).map(mapService) : null, error };
  });
}

function mapProject(row: ProjectRow): Project {
  return {
    id: row.id,
    category: row.category as Project['category'],
    image: row.image_url,
    title: asLocalized(row.title),
    location: asLocalized(row.location),
    year: row.year,
    description: asLocalized(row.description),
  };
}

export function useProjects(): readonly Project[] {
  return useLiveList<Project>(staticProjects, async () => {
    const { data, error } = await supabase!
      .from('projects')
      .select('*')
      .eq('status', 'published')
      .order('sort_order', { ascending: true });
    return { data: data ? (data as ProjectRow[]).map(mapProject) : null, error };
  });
}

function mapSector(row: SectorRow): Sector {
  return {
    id: row.id,
    icon: row.icon as Sector['icon'],
    name: asLocalized(row.name),
    description: asLocalized(row.description),
  };
}

export function useSectors(): readonly Sector[] {
  return useLiveList<Sector>(staticSectors, async () => {
    const { data, error } = await supabase!.from('sectors').select('*').order('sort_order', { ascending: true });
    return { data: data ? (data as SectorRow[]).map(mapSector) : null, error };
  });
}

function mapStrength(row: StrengthRow): Strength {
  return {
    id: row.id,
    icon: row.icon as Strength['icon'],
    title: asLocalized(row.title),
    description: asLocalized(row.description),
  };
}

export function useStrengths(): readonly Strength[] {
  return useLiveList<Strength>(staticStrengths, async () => {
    const { data, error } = await supabase!.from('strengths').select('*').order('sort_order', { ascending: true });
    return { data: data ? (data as StrengthRow[]).map(mapStrength) : null, error };
  });
}

type PartnerWithKind = Partner & { kind: 'client' | 'supplier' };

function mapPartner(row: PartnerRow): PartnerWithKind {
  return { name: row.name, logo: row.logo_url, url: row.website_url || undefined, kind: row.kind };
}

const staticPartners: readonly PartnerWithKind[] = [
  ...staticClients.map((partner) => ({ ...partner, kind: 'client' as const })),
  ...staticSuppliers.map((partner) => ({ ...partner, kind: 'supplier' as const })),
];

/** Renvoie {clients, suppliers, clientsIntro} — même forme que les exports statiques de partners.ts. */
export function usePartners(): {
  clients: readonly Partner[];
  suppliers: readonly Partner[];
  clientsIntro: typeof clientsIntro;
} {
  const all = useLiveList<PartnerWithKind>(staticPartners, async () => {
    const { data, error } = await supabase!.from('partners').select('*').order('sort_order', { ascending: true });
    return { data: data ? (data as PartnerRow[]).map(mapPartner) : null, error };
  });

  return {
    clients: all.filter((p) => p.kind === 'client'),
    suppliers: all.filter((p) => p.kind === 'supplier'),
    clientsIntro,
  };
}

function mapCompanyInfo(row: CompanyInfoRow): Company {
  return {
    ...company,
    slogan: asLocalized(row.slogan),
    tagline: asLocalized(row.tagline),
    heroTitle: asLocalized(row.hero_title),
    heroHighlight: asLocalized(row.hero_highlight),
    heroSubtitle: asLocalized(row.hero_subtitle),
    intro: asLocalized(row.intro),
    story: asLocalized(row.story),
    mission: asLocalized(row.mission),
    expertise: asLocalized(row.expertise),
    closing: asLocalized(row.closing),
    whatsappMessage: asLocalized(row.whatsapp_message),
    contact: {
      ...company.contact,
      phones: row.phones,
      whatsapp: row.whatsapp,
      email: row.email,
      address: asLocalized(row.address),
      city: row.city,
      country: row.country,
      hours: asLocalized(row.hours),
      linkedin: row.linkedin_url,
      facebook: row.facebook_url,
    },
    stats: Array.isArray(row.stats) ? (row.stats as Company['stats']) : company.stats,
  };
}

/**
 * Identité et coordonnées de l'entreprise. `name`/`legalName`/`fullName`/`siteUrl`
 * restent toujours ceux de src/content/company.ts (configuration du site, pas du
 * contenu éditable) — seuls les champs de company_info sont pris en compte quand
 * Supabase répond.
 */
export function useCompanyInfo(): Company {
  const [data, setData] = useState<Company>(company);

  useEffect(() => {
    if (!supabase) return;
    let cancelled = false;

    supabase
      .from('company_info')
      .select('*')
      .eq('id', 1)
      .maybeSingle()
      .then(({ data: row, error }) => {
        if (cancelled || error || !row) return;
        setData(mapCompanyInfo(row as CompanyInfoRow));
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return data;
}
