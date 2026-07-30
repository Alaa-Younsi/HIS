import type { Localized } from '@/i18n/types';

/**
 * `submit_lead` (voir supabase/migrations/0003_functions.sql) préfixe chaque
 * échec par un code stable — on ne peut pas afficher le même message générique
 * pour "champ invalide" et pour "trop de demandes en peu de temps".
 */
// Ordre important : les clés sont testées par `includes` dans l'ordre
// d'insertion — la variante spécifique « ERR_INVALID_INPUT: phone » doit
// précéder la générique « ERR_INVALID_INPUT », sinon cette dernière l'attrape.
const messages: Record<string, Localized> = {
  'ERR_INVALID_INPUT: phone': {
    fr: "Numéro de téléphone invalide. Saisissez un numéro mobile algérien à 10 chiffres (ex. 0550 70 00 36).",
    en: 'Invalid phone number. Enter a 10-digit Algerian mobile number (e.g. 0550 70 00 36).',
    ar: 'رقم هاتف غير صالح. أدخل رقم هاتف جزائري محمول من 10 أرقام (مثال: 0550 70 00 36).',
  },
  ERR_INVALID_INPUT: {
    fr: "Certaines informations semblent invalides. Vérifiez le formulaire et réessayez.",
    en: 'Some information looks invalid. Please check the form and try again.',
    ar: 'تبدو بعض المعلومات غير صالحة. تحقق من النموذج وأعد المحاولة.',
  },
  ERR_RATE_LIMIT: {
    fr: "Trop de demandes envoyées récemment avec ce numéro. Merci de réessayer dans quelques minutes, ou contactez-nous directement.",
    en: 'Too many requests sent recently with this number. Please try again in a few minutes, or contact us directly.',
    ar: 'عدد كبير من الطلبات أُرسلت مؤخرًا بهذا الرقم. يرجى المحاولة بعد بضع دقائق أو الاتصال بنا مباشرة.',
  },
};

const fallback: Localized = {
  fr: "Une erreur est survenue. Merci de réessayer, ou contactez-nous par téléphone/WhatsApp.",
  en: 'Something went wrong. Please try again, or contact us by phone/WhatsApp.',
  ar: 'حدث خطأ ما. يرجى إعادة المحاولة أو الاتصال بنا عبر الهاتف/واتساب.',
};

/**
 * Extrait le texte d'erreur. Un échec du RPC via supabase-js n'est PAS une
 * instance d'`Error` mais un objet `PostgrestError` ({ message, code, ... }) :
 * se fier à `instanceof Error` donnait « [object Object] », qui ne contient
 * aucun de nos codes → le message générique s'affichait même pour un simple
 * numéro de téléphone invalide. On lit donc `.message` sur tout objet.
 */
function rawMessage(error: unknown): string {
  if (typeof error === 'string') return error;
  if (error && typeof error === 'object' && 'message' in error) {
    const message = (error as { message?: unknown }).message;
    if (typeof message === 'string') return message;
  }
  return String(error);
}

export function leadErrorMessage(error: unknown): Localized {
  const raw = rawMessage(error);
  const code = Object.keys(messages).find((key) => raw.includes(key));
  return code ? messages[code]! : fallback;
}
