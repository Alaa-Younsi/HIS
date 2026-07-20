import type { Localized } from './types';

/**
 * Interface strings (navigation, buttons, section headings).
 * Page *content* lives in src/content/ — this file is only for UI chrome.
 */
export const ui = {
  nav: {
    home: { fr: 'Accueil', en: 'Home', ar: 'الرئيسية' },
    about: { fr: 'À propos', en: 'About', ar: 'من نحن' },
    services: { fr: 'Services', en: 'Services', ar: 'خدماتنا' },
    projects: { fr: 'Réalisations', en: 'Projects', ar: 'إنجازاتنا' },
    sectors: { fr: "Secteurs d'activité", en: 'Sectors', ar: 'قطاعات النشاط' },
    why: { fr: 'Pourquoi HIS ?', en: 'Why HIS?', ar: 'لماذا HIS؟' },
    contact: { fr: 'Contact', en: 'Contact', ar: 'اتصل بنا' },
    menu: { fr: 'Menu', en: 'Menu', ar: 'القائمة' },
    closeMenu: { fr: 'Fermer le menu', en: 'Close menu', ar: 'إغلاق القائمة' },
    openMenu: { fr: 'Ouvrir le menu', en: 'Open menu', ar: 'فتح القائمة' },
    skipToContent: { fr: 'Aller au contenu', en: 'Skip to content', ar: 'تخطَّ إلى المحتوى' },
  },
  cta: {
    quote: { fr: 'Demander un devis', en: 'Request a quote', ar: 'اطلب عرض سعر' },
    contact: { fr: 'Nous contacter', en: 'Contact us', ar: 'اتصل بنا' },
    ourServices: { fr: 'Nos services', en: 'Our services', ar: 'خدماتنا' },
    learnMore: { fr: 'En savoir plus', en: 'Learn more', ar: 'اعرف المزيد' },
    discover: { fr: 'Découvrir', en: 'Discover', ar: 'اكتشف' },
    allProjects: { fr: 'Voir toutes nos réalisations', en: 'See all projects', ar: 'شاهد كل الإنجازات' },
    whatsapp: { fr: 'Discuter sur WhatsApp', en: 'Chat on WhatsApp', ar: 'تحدث عبر واتساب' },
    call: { fr: 'Appeler', en: 'Call', ar: 'اتصل' },
    email: { fr: 'Envoyer un e-mail', en: 'Send an email', ar: 'أرسل بريدًا' },
    backToServices: { fr: 'Tous les services', en: 'All services', ar: 'كل الخدمات' },
  },
  sections: {
    about: { fr: 'À propos de HIS', en: 'About HIS', ar: 'عن HIS' },
    ourStory: { fr: 'Notre histoire', en: 'Our story', ar: 'قصتنا' },
    ourMission: { fr: 'Notre mission', en: 'Our mission', ar: 'مهمتنا' },
    ourExpertise: { fr: 'Notre expertise', en: 'Our expertise', ar: 'خبرتنا' },
    services: { fr: 'Nos services', en: 'Our services', ar: 'خدماتنا' },
    expertise: { fr: "Nos domaines d'expertise", en: 'Our areas of expertise', ar: 'مجالات خبرتنا' },
    projects: { fr: 'Nos réalisations', en: 'Our projects', ar: 'إنجازاتنا' },
    sectors: { fr: "Nos secteurs d'activité", en: 'Sectors we serve', ar: 'القطاعات التي نخدمها' },
    clients: { fr: 'Ils nous ont fait confiance', en: 'They trusted us', ar: 'وثقوا بنا' },
    suppliers: { fr: 'Nos fournisseurs', en: 'Our suppliers', ar: 'موردونا' },
    why: { fr: 'Pourquoi choisir HIS ?', en: 'Why choose HIS?', ar: 'لماذا تختار HIS؟' },
    contact: { fr: 'Contactez-nous', en: 'Get in touch', ar: 'اتصل بنا' },
    applications: { fr: "Domaines d'application", en: 'Areas of application', ar: 'مجالات التطبيق' },
    otherServices: { fr: "D'autres services", en: 'Other services', ar: 'خدمات أخرى' },
  },
  labels: {
    address: { fr: 'Adresse', en: 'Address', ar: 'العنوان' },
    phone: { fr: 'Téléphone', en: 'Phone', ar: 'الهاتف' },
    emailLabel: { fr: 'E-mail', en: 'Email', ar: 'البريد الإلكتروني' },
    hours: { fr: "Horaires", en: 'Opening hours', ar: 'أوقات العمل' },
    all: { fr: 'Toutes', en: 'All', ar: 'الكل' },
    filterBy: { fr: 'Filtrer par catégorie', en: 'Filter by category', ar: 'تصفية حسب الفئة' },
    quickLinks: { fr: 'Navigation', en: 'Navigation', ar: 'روابط' },
    followUs: { fr: 'Suivez-nous', en: 'Follow us', ar: 'تابعنا' },
    language: { fr: 'Langue', en: 'Language', ar: 'اللغة' },
    noProjects: {
      fr: 'Aucune réalisation dans cette catégorie pour le moment.',
      en: 'No projects in this category yet.',
      ar: 'لا توجد إنجازات في هذه الفئة حاليًا.',
    },
  },
  notFound: {
    title: { fr: 'Page introuvable', en: 'Page not found', ar: 'الصفحة غير موجودة' },
    body: {
      fr: "La page que vous cherchez n'existe pas ou a été déplacée.",
      en: 'The page you are looking for does not exist or has been moved.',
      ar: 'الصفحة التي تبحث عنها غير موجودة أو تم نقلها.',
    },
    back: { fr: "Retour à l'accueil", en: 'Back to home', ar: 'العودة للرئيسية' },
  },
  footer: {
    rights: {
      fr: 'Tous droits réservés.',
      en: 'All rights reserved.',
      ar: 'جميع الحقوق محفوظة.',
    },
    tagline: {
      fr: "L'expertise au service de vos installations techniques.",
      en: 'Expertise at the service of your technical installations.',
      ar: 'الخبرة في خدمة منشآتكم التقنية.',
    },
  },
} satisfies Record<string, Record<string, Localized>>;
