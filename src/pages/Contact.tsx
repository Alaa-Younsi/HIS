import { useRef, useState, type FormEvent } from 'react';
import { Icon } from '@/components/Icon';
import { PageHero } from '@/components/Section';
import { Seo } from '@/components/Seo';
import { company, mailtoUrl, telUrl, whatsappUrl } from '@/content/company';
import { useCompanyInfo, useServices } from '@/hooks/useContent';
import { useHoneypot } from '@/hooks/useHoneypot';
import { useLang } from '@/i18n/LanguageProvider';
import { ui } from '@/i18n/ui';
import { leadErrorMessage } from '@/lib/leadErrors';
import { submitLead } from '@/lib/leads';
import { isSupabaseConfigured } from '@/lib/supabase';
import type { Localized } from '@/i18n/types';

/**
 * Ramène un numéro algérien saisi librement (+213…, 00213…, espaces) au format
 * local `0XXXXXXXXX` attendu par la validation du RPC `submit_lead`
 * (`^0[5-7][0-9]{8}$`). Sans ça, une saisie « +213 550 70 00 36 » serait
 * rejetée côté serveur et la demande n'atteindrait pas le tableau de bord.
 */
function normalizePhone(raw: string): string {
  let d = raw.replace(/[^\d+]/g, '');
  if (d.startsWith('+')) d = d.slice(1);
  if (d.startsWith('00')) d = d.slice(2);
  if (d.startsWith('213')) d = d.slice(3);
  if (!d.startsWith('0')) d = `0${d}`;
  return d;
}

const form = {
  title: { fr: 'Demander un devis', en: 'Request a quote', ar: 'اطلب عرض سعر' },
  intro: {
    fr: "Renseignez votre besoin : envoyez-le en un clic via WhatsApp, ou transmettez-le directement à notre équipe. Nous vous recontactons rapidement.",
    en: "Tell us what you need: send it in one click via WhatsApp, or submit it directly to our team. We'll get back to you quickly.",
    ar: 'صِف حاجتك: أرسلها بنقرة واحدة عبر واتساب، أو أرسلها مباشرةً إلى فريقنا. سنتواصل معك قريبًا.',
  },
  name: { fr: 'Nom et prénom', en: 'Full name', ar: 'الاسم واللقب' },
  organisation: { fr: 'Société (optionnel)', en: 'Company (optional)', ar: 'الشركة (اختياري)' },
  phone: { fr: 'Téléphone', en: 'Phone', ar: 'الهاتف' },
  phonePlaceholder: { fr: '0550 70 00 36', en: '0550 70 00 36', ar: '0550 70 00 36' },
  email: { fr: 'E-mail (optionnel)', en: 'Email (optional)', ar: 'البريد الإلكتروني (اختياري)' },
  service: { fr: 'Service concerné', en: 'Service needed', ar: 'الخدمة المطلوبة' },
  servicePlaceholder: { fr: 'Choisir un service…', en: 'Choose a service…', ar: 'اختر خدمة…' },
  message: { fr: 'Votre projet', en: 'Your project', ar: 'مشروعك' },
  messagePlaceholder: {
    fr: 'Décrivez brièvement votre besoin, le site et les délais souhaités…',
    en: 'Briefly describe your needs, the site and your expected timeline…',
    ar: 'صِف باختصار حاجتك والموقع والآجال المرغوبة…',
  },
  sendWhatsapp: { fr: 'Envoyer via WhatsApp', en: 'Send via WhatsApp', ar: 'أرسل عبر واتساب' },
  sendMail: { fr: 'Envoyer la demande', en: 'Send the request', ar: 'إرسال الطلب' },
  sending: { fr: 'Envoi…', en: 'Sending…', ar: 'جارٍ الإرسال…' },
  sent: {
    fr: 'Votre demande a bien été envoyée. Notre équipe vous recontactera rapidement.',
    en: 'Your request has been sent. Our team will get back to you shortly.',
    ar: 'تم إرسال طلبك بنجاح. سيتواصل معك فريقنا قريبًا.',
  },
} satisfies Record<string, Localized>;

export function Contact() {
  const { lang, t } = useLang();
  const companyInfo = useCompanyInfo();
  const services = useServices();
  const { isSpam } = useHoneypot();
  const formRef = useRef<HTMLFormElement>(null);
  const [fields, setFields] = useState({
    name: '',
    organisation: '',
    phone: '',
    email: '',
    service: '',
    message: '',
    // Champ piège : jamais rempli par un visiteur humain (masqué visuellement,
    // pas avec display:none — un lecteur d'écran ou un bot un peu plus soigné
    // l'ignorerait sinon différemment).
    website: '',
  });
  const [leadNotice, setLeadNotice] = useState<Localized | null>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const update = (key: keyof typeof fields) => (event: { target: { value: string } }) => {
    setFields((current) => ({ ...current, [key]: event.target.value }));
    // Toute modification après un envoi réussi réarme le formulaire.
    if (status === 'sent') setStatus('idle');
  };

  /** Récapitulatif texte envoyé vers WhatsApp. */
  const buildSummary = () => {
    const lines = [
      `${t(form.name)}: ${fields.name}`,
      fields.organisation && `${t(form.organisation)}: ${fields.organisation}`,
      `${t(form.phone)}: ${fields.phone}`,
      fields.email && `${t(form.email)}: ${fields.email}`,
      fields.service && `${t(form.service)}: ${fields.service}`,
      '',
      fields.message,
    ].filter(Boolean);
    return lines.join('\n');
  };

  /**
   * Enregistre la demande dans le tableau de bord via le RPC `submit_lead`.
   * Lève une erreur en cas d'échec (validation, limite de débit, réseau) :
   * l'appelant décide quoi en faire selon le canal choisi.
   */
  const persistLead = () =>
    submitLead({
      kind: fields.service ? 'devis' : 'contact',
      name: fields.name,
      organisation: fields.organisation,
      phone: normalizePhone(fields.phone),
      email: fields.email,
      serviceSlug: services.find((service) => t(service.title) === fields.service)?.slug ?? '',
      message: fields.message,
      lang,
    });

  /**
   * Bouton WhatsApp : ouvre une conversation WhatsApp adressée au numéro de
   * l'entreprise, avec le récapitulatif pré-rempli (le visiteur n'a plus qu'à
   * appuyer sur « Envoyer »). En parallèle, la demande est aussi consignée dans
   * le tableau de bord — mais sans jamais bloquer l'ouverture de WhatsApp.
   */
  const sendViaWhatsapp = (event: FormEvent) => {
    event.preventDefault();
    if (!isSpam(fields.website)) void persistLead().catch(() => undefined);
    window.open(
      whatsappUrl(companyInfo.contact.whatsapp, buildSummary()),
      '_blank',
      'noopener,noreferrer',
    );
  };

  /**
   * Bouton « Envoyer la demande » : soumission directe via le site. La demande
   * part dans le tableau de bord (rubrique « Demandes »), sans ouvrir WhatsApp
   * ni la messagerie. Un message de confirmation s'affiche à l'écran.
   */
  const sendViaSite = async () => {
    // Le bouton est de type "button" : on déclenche nous-mêmes la validation
    // native des champs requis (nom, téléphone, message).
    if (formRef.current && !formRef.current.reportValidity()) return;
    if (isSpam(fields.website)) return;

    // Garde-fou : sans backend connecté, on retombe sur la messagerie plutôt
    // que de prétendre un envoi qui n'aurait enregistré nulle part.
    if (!isSupabaseConfigured) {
      window.location.href = mailtoUrl(
        companyInfo.contact.email,
        `${t(form.title)} — ${fields.name}`,
        buildSummary(),
      );
      return;
    }

    setStatus('sending');
    setLeadNotice(null);
    try {
      await persistLead();
      setStatus('sent');
      setFields({ name: '', organisation: '', phone: '', email: '', service: '', message: '', website: '' });
    } catch (error) {
      // La bannière affichée au visiteur est volontairement générique (voir
      // leadErrors.ts). On journalise l'erreur brute pour pouvoir diagnostiquer
      // un échec inattendu — réseau bloqué, cache de schéma PostgREST, etc. —
      // qui retombe sur le message par défaut.
      console.error('[lead] échec de submit_lead :', error);
      setStatus('idle');
      setLeadNotice(leadErrorMessage(error));
    }
  };

  const mapQuery = encodeURIComponent("Haouch Ben Chergui, L'Arbaa, Blida, Algérie");

  return (
    <>
      <Seo
        title={{ fr: 'Contact', en: 'Contact', ar: 'اتصل بنا' }}
        description={{
          fr: "Contactez HIS — HVAC & Industrial Solution : Haouch Ben Chergui, L'Arbaa, Blida. Téléphone, WhatsApp et e-mail pour toute demande de devis.",
          en: "Contact HIS — HVAC & Industrial Solution: Haouch Ben Chergui, L'Arbaa, Blida, Algeria. Phone, WhatsApp and email for any quote request.",
          ar: 'اتصلوا بـ HIS — حوش بن شرقي، الأربعاء، البليدة. الهاتف وواتساب والبريد لأي طلب عرض سعر.',
        }}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          mainEntity: { '@id': `${company.siteUrl}/#organization` },
        }}
      />

      <PageHero
        title={ui.sections.contact}
        intro={{
          fr: "Une question, un projet, une intervention urgente ? Nos équipes vous répondent rapidement.",
          en: 'A question, a project, an urgent intervention? Our teams reply quickly.',
          ar: 'سؤال، مشروع، أو تدخل عاجل؟ فرقنا ترد عليكم بسرعة.',
        }}
      />

      <section className="section">
        <div className="container-his grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
          {/* Coordonnées */}
          <div className="space-y-4">
            <ContactCard icon="pin" label={t(ui.labels.address)}>
              <address className="not-italic leading-relaxed">{t(companyInfo.contact.address)}</address>
            </ContactCard>

            <ContactCard icon="phone" label={t(ui.labels.phone)}>
              <div className="flex flex-col gap-1" dir="ltr">
                {companyInfo.contact.phones.map((phone) => (
                  <a
                    key={phone}
                    href={telUrl(phone)}
                    className="font-semibold transition hover:text-flame-600"
                  >
                    {phone}
                  </a>
                ))}
              </div>
            </ContactCard>

            <ContactCard icon="mail" label={t(ui.labels.emailLabel)}>
              {/* Ouvre la messagerie du visiteur avec objet + canevas déjà remplis. */}
              <a
                href={mailtoUrl(companyInfo.contact.email, t(ui.email.subject), t(ui.email.body))}
                className="break-all font-semibold transition hover:text-flame-600"
              >
                {companyInfo.contact.email}
              </a>
            </ContactCard>

            <ContactCard icon="clock" label={t(ui.labels.hours)}>
              {t(companyInfo.contact.hours)}
            </ContactCard>

            <a
              href={whatsappUrl(companyInfo.contact.whatsapp, t(companyInfo.whatsappMessage))}
              target="_blank"
              rel="noreferrer noopener"
              className="btn w-full bg-[#25D366] text-white hover:bg-[#1EBE5A]"
            >
              <Icon name="whatsapp" size={20} />
              {t(ui.cta.whatsapp)}
            </a>
          </div>

          {/* Formulaire */}
          <div className="card p-7 sm:p-9">
            <h2 className="text-2xl text-navy-900">{t(form.title)}</h2>
            <p className="mt-2 text-sm leading-relaxed text-navy-900/65">{t(form.intro)}</p>

            <form ref={formRef} onSubmit={sendViaWhatsapp} className="mt-7 space-y-5">
              {/* Piège anti-spam : un champ qu'un visiteur humain ne peut pas voir ni atteindre au clavier. */}
              <input
                type="text"
                name="website"
                value={fields.website}
                onChange={update('website')}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px] h-0 w-0 opacity-0"
              />

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label={t(form.name)} required>
                  <input
                    type="text"
                    required
                    value={fields.name}
                    onChange={update('name')}
                    autoComplete="name"
                    className={inputClass}
                  />
                </Field>
                <Field label={t(form.organisation)}>
                  <input
                    type="text"
                    value={fields.organisation}
                    onChange={update('organisation')}
                    autoComplete="organization"
                    className={inputClass}
                  />
                </Field>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label={t(form.phone)} required>
                  <input
                    type="tel"
                    required
                    value={fields.phone}
                    onChange={update('phone')}
                    autoComplete="tel"
                    dir="ltr"
                    placeholder={t(form.phonePlaceholder)}
                    className={inputClass}
                  />
                </Field>
                <Field label={t(form.email)}>
                  <input
                    type="email"
                    value={fields.email}
                    onChange={update('email')}
                    autoComplete="email"
                    dir="ltr"
                    className={inputClass}
                  />
                </Field>
              </div>

              <Field label={t(form.service)}>
                <select value={fields.service} onChange={update('service')} className={inputClass}>
                  <option value="">{t(form.servicePlaceholder)}</option>
                  {services.map((service) => (
                    <option key={service.slug} value={service.title[lang]}>
                      {t(service.title)}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label={t(form.message)} required>
                <textarea
                  required
                  rows={5}
                  value={fields.message}
                  onChange={update('message')}
                  placeholder={t(form.messagePlaceholder)}
                  className={`${inputClass} resize-y`}
                />
              </Field>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button type="submit" disabled={status === 'sending'} className="btn-primary flex-1 disabled:opacity-60">
                  <Icon name="whatsapp" size={18} />
                  {t(form.sendWhatsapp)}
                </button>
                <button
                  type="button"
                  onClick={() => void sendViaSite()}
                  disabled={status === 'sending'}
                  className="btn-ghost flex-1 disabled:opacity-60"
                >
                  <Icon name="mail" size={18} />
                  {status === 'sending' ? t(form.sending) : t(form.sendMail)}
                </button>
              </div>

              {status === 'sent' && (
                <p
                  role="status"
                  className="flex items-center gap-2 rounded-lg bg-[#e9f9ef] px-4 py-3 text-sm font-medium text-[#1a7f45]"
                >
                  <Icon name="check" size={16} className="flex-none" />
                  {t(form.sent)}
                </p>
              )}

              {leadNotice && (
                <p role="status" className="text-sm text-flame-600">
                  {t(leadNotice)}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Carte */}
      <section aria-label={t(ui.labels.address)} className="h-[380px] w-full bg-navy-100 sm:h-[440px]">
        <iframe
          title={`${company.legalName} — ${t(ui.labels.address)}`}
          src={`https://maps.google.com/maps?q=${mapQuery}&z=14&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-full w-full border-0 grayscale-[35%]"
        />
      </section>
    </>
  );
}

const inputClass =
  'w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-900 transition placeholder:text-navy-900/35 focus:border-flame-400 focus:outline-none focus:ring-2 focus:ring-flame-500/25';

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-navy-900/70">
        {label}
        {required && <span className="text-flame-500"> *</span>}
      </span>
      {children}
    </label>
  );
}

function ContactCard({
  icon,
  label,
  children,
}: {
  icon: 'pin' | 'phone' | 'mail' | 'clock';
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="card flex gap-4 p-5">
      <span className="grid h-11 w-11 flex-none place-items-center rounded-lg bg-flame-50 text-flame-600">
        <Icon name={icon} size={21} />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-bold uppercase tracking-wider text-navy-900/70">{label}</p>
        <div className="mt-1 text-sm text-navy-900/80">{children}</div>
      </div>
    </div>
  );
}
