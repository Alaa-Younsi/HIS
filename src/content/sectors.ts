import type { Localized } from '@/i18n/types';
import type { IconName } from '@/components/Icon';

export type Sector = {
  id: string;
  icon: IconName;
  name: Localized;
  description: Localized;
};

/**
 * ─────────────────────────────────────────────────────────────
 *  SECTEURS D'ACTIVITÉ DESSERVIS
 * ─────────────────────────────────────────────────────────────
 */
export const sectors: readonly Sector[] = [
  {
    id: 'industrie',
    icon: 'factory',
    name: { fr: 'Industries manufacturières', en: 'Manufacturing', ar: 'الصناعات التحويلية' },
    description: {
      fr: 'Lignes de production, ateliers et sites industriels.',
      en: 'Production lines, workshops and industrial sites.',
      ar: 'خطوط الإنتاج والورشات والمواقع الصناعية.',
    },
  },
  {
    id: 'pharmaceutique',
    icon: 'flask',
    name: { fr: 'Pharmaceutique et laboratoires', en: 'Pharmaceutical & laboratories', ar: 'الصيدلة والمخابر' },
    description: {
      fr: 'Salles propres, zones à atmosphère contrôlée et laboratoires.',
      en: 'Cleanrooms, controlled-atmosphere zones and laboratories.',
      ar: 'الغرف النظيفة والمناطق ذات الأجواء المتحكم بها والمخابر.',
    },
  },
  {
    id: 'sante',
    icon: 'hospital',
    name: { fr: 'Hôpitaux et cliniques', en: 'Hospitals & clinics', ar: 'المستشفيات والعيادات' },
    description: {
      fr: "Blocs opératoires, services de soins et établissements de santé.",
      en: 'Operating theatres, care units and healthcare facilities.',
      ar: 'غرف العمليات وأقسام العلاج والمؤسسات الصحية.',
    },
  },
  {
    id: 'agroalimentaire',
    icon: 'wheat',
    name: { fr: 'Agroalimentaire', en: 'Food processing', ar: 'الصناعات الغذائية' },
    description: {
      fr: 'Chaîne du froid, zones de production et de conditionnement.',
      en: 'Cold chain, production and packaging areas.',
      ar: 'سلسلة التبريد ومناطق الإنتاج والتعبئة.',
    },
  },
  {
    id: 'energie',
    icon: 'bolt',
    name: { fr: 'Énergie et hydrocarbures', en: 'Energy & hydrocarbons', ar: 'الطاقة والمحروقات' },
    description: {
      fr: 'Sites sensibles nécessitant une sécurité renforcée.',
      en: 'Sensitive sites requiring reinforced safety.',
      ar: 'مواقع حساسة تتطلب سلامة معززة.',
    },
  },
  {
    id: 'immobilier',
    icon: 'crane',
    name: { fr: 'Promotion immobilière', en: 'Real estate development', ar: 'الترقية العقارية' },
    description: {
      fr: 'Promoteurs et entreprises de construction.',
      en: 'Developers and construction companies.',
      ar: 'المرقّون العقاريون وشركات البناء.',
    },
  },
  {
    id: 'administrations',
    icon: 'building',
    name: { fr: 'Administrations et collectivités', en: 'Public administrations', ar: 'الإدارات والجماعات' },
    description: {
      fr: 'Bâtiments administratifs et équipements publics.',
      en: 'Administrative buildings and public facilities.',
      ar: 'المباني الإدارية والمرافق العمومية.',
    },
  },
  {
    id: 'hotellerie',
    icon: 'hotel',
    name: { fr: 'Hôtels et centres commerciaux', en: 'Hotels & shopping centres', ar: 'الفنادق والمراكز التجارية' },
    description: {
      fr: 'Bâtiments tertiaires recevant du public.',
      en: 'Commercial buildings open to the public.',
      ar: 'المباني الخدمية المستقبلة للجمهور.',
    },
  },
  {
    id: 'logistique',
    icon: 'warehouse',
    name: { fr: 'Entrepôts logistiques', en: 'Logistics warehouses', ar: 'المستودعات اللوجستية' },
    description: {
      fr: 'Plateformes de stockage et de distribution.',
      en: 'Storage and distribution platforms.',
      ar: 'منصات التخزين والتوزيع.',
    },
  },
  {
    id: 'education',
    icon: 'school',
    name: { fr: 'Établissements scolaires', en: 'Educational institutions', ar: 'المؤسسات التعليمية' },
    description: {
      fr: 'Écoles, universités et centres de formation.',
      en: 'Schools, universities and training centres.',
      ar: 'المدارس والجامعات ومراكز التكوين.',
    },
  },
];
