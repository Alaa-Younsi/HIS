import type { Localized } from '@/i18n/types';

/**
 * `submit_lead` (voir supabase/migrations/0003_functions.sql) préfixe chaque
 * échec par un code stable — on ne peut pas afficher le même message générique
 * pour "champ invalide" et pour "trop de demandes en peu de temps".
 */
const messages: Record<string, Localized> = {
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

export function leadErrorMessage(error: unknown): Localized {
  const raw = error instanceof Error ? error.message : String(error);
  const code = Object.keys(messages).find((key) => raw.includes(key));
  return code ? messages[code]! : fallback;
}
