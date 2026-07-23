import { supabase } from './supabase';

export type LeadKind = 'devis' | 'contact';

export type LeadPayload = {
  kind: LeadKind;
  name: string;
  organisation?: string;
  phone: string;
  email?: string;
  serviceSlug?: string;
  message: string;
  lang: string;
};

/**
 * Best-effort : si Supabase n'est pas encore connecté, ne fait rien plutôt
 * que d'échouer bruyamment — le bouton WhatsApp/e-mail du formulaire reste
 * le chemin garanti, cet appel n'est qu'un enregistrement supplémentaire
 * pour le tableau de bord.
 */
export async function submitLead(payload: LeadPayload): Promise<void> {
  if (!supabase) return;

  const { error } = await supabase.rpc('submit_lead', {
    p_kind: payload.kind,
    p_name: payload.name,
    p_organisation: payload.organisation ?? '',
    p_phone: payload.phone,
    p_email: payload.email ?? '',
    p_service_slug: payload.serviceSlug ?? '',
    p_message: payload.message,
    p_lang: payload.lang,
  });

  if (error) throw error;
}
