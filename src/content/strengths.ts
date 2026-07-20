import type { Localized } from '@/i18n/types';
import type { IconName } from '@/components/Icon';

export type Strength = {
  id: string;
  icon: IconName;
  title: Localized;
  description: Localized;
};

/**
 * ─────────────────────────────────────────────────────────────
 *  POURQUOI CHOISIR HIS ? — nos points forts
 * ─────────────────────────────────────────────────────────────
 */
export const strengths: readonly Strength[] = [
  {
    id: 'ingenieurs',
    icon: 'team',
    title: { fr: "Équipe d'ingénieurs qualifiés", en: 'Qualified engineering team', ar: 'فريق مهندسين مؤهلين' },
    description: {
      fr: "Des ingénieurs issus de l'ENP et de l'USTHB, épaulés par des techniciens expérimentés sur le terrain.",
      en: 'Engineers from ENP and USTHB, backed by experienced technicians in the field.',
      ar: 'مهندسون من ENP وUSTHB، مدعومون بتقنيين ذوي خبرة ميدانية.',
    },
  },
  {
    id: 'delais',
    icon: 'clock',
    title: { fr: 'Respect des délais', en: 'On-time delivery', ar: 'احترام الآجال' },
    description: {
      fr: 'Un planning tenu et communiqué à chaque étape du chantier.',
      en: 'A schedule that is respected and communicated at every stage of the project.',
      ar: 'برنامج زمني محترم ومُبلَّغ في كل مرحلة من الورشة.',
    },
  },
  {
    id: 'qualite',
    icon: 'medal',
    title: { fr: "Qualité d'exécution", en: 'Quality of execution', ar: 'جودة التنفيذ' },
    description: {
      fr: 'Un travail soigné, contrôlé et conforme aux règles de l’art.',
      en: 'Careful, inspected work delivered to professional standards.',
      ar: 'عمل متقن ومراقب ومطابق لأصول المهنة.',
    },
  },
  {
    id: 'sur-mesure',
    icon: 'blueprint',
    title: { fr: 'Solutions sur mesure', en: 'Tailor-made solutions', ar: 'حلول حسب الطلب' },
    description: {
      fr: 'Chaque installation est étudiée selon les contraintes réelles de votre site.',
      en: 'Every installation is designed around the real constraints of your site.',
      ar: 'تُدرس كل منشأة وفق القيود الفعلية لموقعكم.',
    },
  },
  {
    id: 'experience',
    icon: 'factory',
    title: { fr: 'Expérience industrielle', en: 'Industrial experience', ar: 'خبرة صناعية' },
    description: {
      fr: "Plus de 10 ans d'intervention sur des sites industriels exigeants.",
      en: 'Over 10 years working on demanding industrial sites.',
      ar: 'أكثر من 10 سنوات من التدخل في مواقع صناعية متطلبة.',
    },
  },
  {
    id: 'normes',
    icon: 'shield',
    title: { fr: 'Respect des normes', en: 'Standards compliance', ar: 'احترام المعايير' },
    description: {
      fr: 'Installations conformes à la réglementation technique et de sécurité en vigueur.',
      en: 'Installations compliant with current technical and safety regulations.',
      ar: 'منشآت مطابقة للتنظيمات التقنية وتنظيمات السلامة السارية.',
    },
  },
  {
    id: 'suivi',
    icon: 'chart',
    title: { fr: 'Suivi des projets', en: 'Project follow-up', ar: 'متابعة المشاريع' },
    description: {
      fr: "Un interlocuteur unique et un reporting régulier de l'étude à la réception.",
      en: 'A single point of contact and regular reporting from study to handover.',
      ar: 'مُحاور وحيد وتقارير منتظمة من الدراسة إلى الاستلام.',
    },
  },
  {
    id: 'sav',
    icon: 'headset',
    title: { fr: 'Service après-vente', en: 'After-sales service', ar: 'خدمة ما بعد البيع' },
    description: {
      fr: 'Une équipe joignable et réactive après la mise en service.',
      en: 'A reachable, responsive team after commissioning.',
      ar: 'فريق متاح وسريع الاستجابة بعد التشغيل.',
    },
  },
  {
    id: 'maintenance',
    icon: 'wrench',
    title: { fr: 'Maintenance', en: 'Maintenance', ar: 'الصيانة' },
    description: {
      fr: 'Contrats préventifs, correctifs et dépannage pour la continuité de vos opérations.',
      en: 'Preventive and corrective contracts plus breakdown support to keep operations running.',
      ar: 'عقود وقائية وتصحيحية وإصلاح لضمان استمرارية عملياتكم.',
    },
  },
];
