import type { Localized } from '@/i18n/types';

/**
 * ─────────────────────────────────────────────────────────────
 *  IDENTITÉ & COORDONNÉES — modifiez librement ce fichier.
 *  Chaque texte s'écrit dans les trois langues : fr / en / ar.
 * ─────────────────────────────────────────────────────────────
 */

export const company = {
  name: 'HIS',
  legalName: 'HIS — HVAC and Industrial Solution',
  fullName: 'HVAC and Industrial Solution Algeria',

  /** URL de production. Sert aux balises canoniques, au sitemap et aux partages réseaux sociaux. */
  siteUrl: 'https://his-dz.com',

  slogan: {
    fr: 'La performance commence par la confiance',
    en: 'Performance starts with trust',
    ar: 'الأداء يبدأ بالثقة',
  } satisfies Localized,

  tagline: {
    fr: "L'expertise au service de vos installations techniques",
    en: 'Expertise at the service of your technical installations',
    ar: 'الخبرة في خدمة منشآتكم التقنية',
  } satisfies Localized,

  heroTitle: {
    fr: 'Des solutions techniques pour un avenir performant',
    en: 'Technical solutions for a high-performance future',
    ar: 'حلول تقنية لمستقبل عالي الأداء',
  } satisfies Localized,

  /** Le mot mis en avant dans le titre du hero (coloré en orange). */
  heroHighlight: {
    fr: 'techniques',
    en: 'solutions',
    ar: 'تقنية',
  } satisfies Localized,

  heroSubtitle: {
    fr: "HIS — HVAC & Industrial Solution Algeria accompagne les entreprises dans la conception, l'installation et la maintenance de systèmes fiables et durables.",
    en: 'HIS — HVAC & Industrial Solution Algeria supports companies in the design, installation and maintenance of reliable, long-lasting systems.',
    ar: 'ترافق HIS — حلول التكييف والصناعة الجزائر الشركات في تصميم وتركيب وصيانة أنظمة موثوقة ومستدامة.',
  } satisfies Localized,

  intro: {
    fr: "HVAC AND Industrial Solutions (HIS) est une entreprise spécialisée dans les études, l'ingénierie, l'installation, la mise en service, la maintenance, la gestion de projets techniques et le développement de solutions adaptées aux besoins de ses clients.",
    en: 'HVAC AND Industrial Solutions (HIS) specialises in engineering studies, installation, commissioning, maintenance, technical project management and the development of solutions tailored to each client.',
    ar: 'شركة HVAC AND Industrial Solutions (HIS) متخصصة في الدراسات والهندسة والتركيب والتشغيل والصيانة وإدارة المشاريع التقنية وتطوير حلول ملائمة لاحتياجات عملائها.',
  } satisfies Localized,

  story: {
    fr: "Fondée par deux ingénieurs issus de l'École Nationale Polytechnique (ENP) et de l'USTHB, HIS — HVAC & Industrial Solutions est née de la volonté d'apporter des solutions techniques innovantes et fiables aux secteurs industriel et du bâtiment. Grâce à une expertise reconnue en HVAC et systèmes industriels, nous accompagnons nos clients avec passion, rigueur et engagement dans la réussite de leurs projets.",
    en: 'Founded by two engineers from the École Nationale Polytechnique (ENP) and USTHB, HIS — HVAC & Industrial Solutions was born from the desire to bring innovative, reliable technical solutions to the industrial and construction sectors. With recognised expertise in HVAC and industrial systems, we support our clients with passion, rigour and commitment.',
    ar: 'تأسست HIS — HVAC & Industrial Solutions على يد مهندسَين من المدرسة الوطنية المتعددة التقنيات (ENP) وجامعة USTHB، انطلاقًا من الرغبة في تقديم حلول تقنية مبتكرة وموثوقة لقطاعي الصناعة والبناء. وبفضل خبرة معترف بها في التكييف والأنظمة الصناعية، نرافق عملاءنا بشغف وصرامة والتزام لإنجاح مشاريعهم.',
  } satisfies Localized,

  mission: {
    fr: 'Accompagner nos clients dans la réussite de leurs projets en proposant des solutions fiables, innovantes et adaptées à leurs besoins, tout en garantissant les plus hauts standards de qualité, de sécurité et de satisfaction.',
    en: 'Support our clients in the success of their projects with reliable, innovative solutions tailored to their needs, while guaranteeing the highest standards of quality, safety and satisfaction.',
    ar: 'مرافقة عملائنا لإنجاح مشاريعهم من خلال حلول موثوقة ومبتكرة وملائمة لاحتياجاتهم، مع ضمان أعلى معايير الجودة والسلامة والرضا.',
  } satisfies Localized,

  expertise: {
    fr: "Plus de 10 ans d'expérience pour chacun de nos ingénieurs fondateurs dans les secteurs industriel, tertiaire et du bâtiment. HIS met à votre disposition un savoir-faire reconnu en HVAC, désenfumage, protection incendie et solutions techniques industrielles, avec une approche axée sur la qualité, la performance et l'innovation.",
    en: 'Over 10 years of experience for each of our founding engineers across industrial, commercial and building sectors. HIS offers recognised know-how in HVAC, smoke extraction, fire protection and industrial technical solutions, with a focus on quality, performance and innovation.',
    ar: 'أكثر من 10 سنوات خبرة لكل من مهندسينا المؤسسين في القطاعات الصناعية والخدمية والبناء. تضع HIS بين أيديكم دراية معترفًا بها في التكييف وتصريف الدخان والحماية من الحرائق والحلول التقنية الصناعية، بمقاربة تركز على الجودة والأداء والابتكار.',
  } satisfies Localized,

  closing: {
    fr: "Que vous souhaitiez réaliser une nouvelle installation, moderniser vos équipements, renforcer la sécurité de vos infrastructures ou assurer la maintenance de vos installations techniques, HIS met son expertise à votre service.",
    en: 'Whether you want to build a new installation, modernise your equipment, strengthen the safety of your infrastructure or maintain your technical installations, HIS puts its expertise at your service.',
    ar: 'سواء رغبتم في إنجاز منشأة جديدة أو تحديث معداتكم أو تعزيز سلامة بنيتكم التحتية أو ضمان صيانة منشآتكم التقنية، تضع HIS خبرتها في خدمتكم.',
  } satisfies Localized,

  contact: {
    /** Numéros affichés. Le premier sert de numéro principal (bouton « Appeler »). */
    phones: ['+213 550 70 00 36', '+213 550 70 00 38', '+213 550 70 00 46'],
    /** Format international sans espaces ni « + » — utilisé par le lien WhatsApp. */
    whatsapp: '213550700036',
    email: 'hvac.industrial.solution@gmail.com',
    address: {
      fr: "Haouch Ben Chergui SEC 09 GP13 N°38, L'Arbaa — Blida, Algérie",
      en: "Haouch Ben Chergui SEC 09 GP13 N°38, L'Arbaa — Blida, Algeria",
      ar: 'حوش بن شرقي، القسم 09 GP13 رقم 38، الأربعاء — البليدة، الجزائر',
    } satisfies Localized,
    city: 'Blida',
    country: 'DZ',
    hours: {
      fr: 'Dimanche — Jeudi : 08h00 — 17h00',
      en: 'Sunday — Thursday: 8:00 AM — 5:00 PM',
      ar: 'الأحد — الخميس: 08:00 — 17:00',
    } satisfies Localized,
    /** Laissez la chaîne vide pour masquer l'icône dans le header et le footer. */
    linkedin: 'https://www.linkedin.com/company/his-hvac-industrial-solution',
    facebook: 'https://www.facebook.com/his.hvac.industrial.solution',
  },

  /** Message pré-rempli à l'ouverture de WhatsApp. */
  whatsappMessage: {
    fr: 'Bonjour HIS, je souhaite obtenir un devis pour mon projet.',
    en: 'Hello HIS, I would like a quote for my project.',
    ar: 'مرحبًا HIS، أود الحصول على عرض سعر لمشروعي.',
  } satisfies Localized,

  /** Chiffres clés affichés sur la page d'accueil. */
  stats: [
    {
      value: '10+',
      label: { fr: "Années d'expérience", en: 'Years of experience', ar: 'سنوات خبرة' } satisfies Localized,
      icon: 'experience' as const,
    },
    {
      value: '100+',
      label: { fr: 'Projets réalisés', en: 'Projects delivered', ar: 'مشروع منجز' } satisfies Localized,
      icon: 'projects' as const,
    },
    {
      value: '50+',
      label: { fr: 'Clients satisfaits', en: 'Satisfied clients', ar: 'عميل راضٍ' } satisfies Localized,
      icon: 'clients' as const,
    },
    {
      value: '100%',
      label: { fr: 'Qualité garantie', en: 'Guaranteed quality', ar: 'جودة مضمونة' } satisfies Localized,
      icon: 'quality' as const,
    },
  ],
} as const;

export const whatsappUrl = (message: string) =>
  `https://wa.me/${company.contact.whatsapp}?text=${encodeURIComponent(message)}`;

export const telUrl = (phone: string) => `tel:${phone.replace(/[^\d+]/g, '')}`;
