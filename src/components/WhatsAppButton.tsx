import { useEffect, useState } from 'react';
import { company, whatsappUrl } from '@/content/company';
import { useLang } from '@/i18n/LanguageProvider';
import { ui } from '@/i18n/ui';
import { Icon } from './Icon';

/** Bouton WhatsApp flottant — apparaît après un premier défilement. */
export function WhatsAppButton() {
  const { t } = useLang();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 220);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <a
      href={whatsappUrl(t(company.whatsappMessage))}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={t(ui.cta.whatsapp)}
      className={`group fixed bottom-5 end-5 z-40 flex items-center gap-3 rounded-full bg-[#25D366] py-3.5 ps-3.5 pe-4 text-white shadow-xl shadow-black/25 transition-all duration-300 ease-[var(--ease-out-soft)] hover:bg-[#1EBE5A] focus-visible:opacity-100 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <Icon name="whatsapp" size={26} className="flex-none" />
      <span className="hidden text-sm font-bold sm:inline">{t(ui.cta.whatsapp)}</span>
    </a>
  );
}
