import type { Localized } from '@/i18n/types';

export type ProjectCategory =
  | 'incendie'
  | 'climatisation'
  | 'ventilation'
  | 'desenfumage'
  | 'chambres-froides'
  | 'industriel';

export type Project = {
  id: string;
  category: ProjectCategory;
  /** Déposez le fichier dans public/images/realisations/. Un visuel de repli s'affiche si absent. */
  image: string;
  title: Localized;
  location: Localized;
  /** Année du chantier — affichée sur la vignette. Laissez vide pour masquer. */
  year: string;
  description: Localized;
};

export const projectCategories: readonly { id: ProjectCategory; label: Localized }[] = [
  { id: 'incendie', label: { fr: 'Protection incendie', en: 'Fire protection', ar: 'الحماية من الحرائق' } },
  { id: 'climatisation', label: { fr: 'Climatisation', en: 'Air conditioning', ar: 'التكييف' } },
  { id: 'ventilation', label: { fr: 'Ventilation', en: 'Ventilation', ar: 'التهوية' } },
  { id: 'desenfumage', label: { fr: 'Désenfumage', en: 'Smoke extraction', ar: 'تصريف الدخان' } },
  { id: 'chambres-froides', label: { fr: 'Chambres froides', en: 'Cold rooms', ar: 'غرف التبريد' } },
  { id: 'industriel', label: { fr: 'Industriel', en: 'Industrial', ar: 'صناعي' } },
];

/**
 * ─────────────────────────────────────────────────────────────
 *  NOS RÉALISATIONS
 *  Pour ajouter un chantier : copiez un bloc ci-dessous, changez
 *  l'`id`, déposez la photo dans public/images/realisations/ et
 *  pointez `image` dessus. C'est tout.
 * ─────────────────────────────────────────────────────────────
 */
export const projects: readonly Project[] = [
  {
    id: 'ria-parking-alger',
    category: 'incendie',
    image: '/images/realisations/ria-parking.jpg',
    title: {
      fr: "Réseau RIA — parking couvert",
      en: 'Hose reel network — covered car park',
      ar: 'شبكة بكرات خراطيم — موقف مغطى',
    },
    location: { fr: 'Alger', en: 'Algiers', ar: 'الجزائر العاصمة' },
    year: '2024',
    description: {
      fr: "Installation complète d'un réseau de robinets d'incendie armés avec armoires de protection et raccordement au surpresseur.",
      en: 'Complete installation of an armed fire hose reel network with protection cabinets and booster connection.',
      ar: 'تركيب كامل لشبكة بكرات خراطيم الحريق مع خزائن حماية وربط بمضخة التعزيز.',
    },
  },
  {
    id: 'coffret-incendie-entrepot',
    category: 'incendie',
    image: '/images/realisations/coffret-incendie.jpg',
    title: {
      fr: 'Coffrets incendie — entrepôt logistique',
      en: 'Fire cabinets — logistics warehouse',
      ar: 'خزائن الحريق — مستودع لوجستي',
    },
    location: { fr: 'Blida', en: 'Blida', ar: 'البليدة' },
    year: '2024',
    description: {
      fr: "Pose et mise en service de coffrets incendie muraux sur l'ensemble des zones de stockage.",
      en: 'Installation and commissioning of wall-mounted fire cabinets across all storage zones.',
      ar: 'تركيب وتشغيل خزائن حريق جدارية عبر كل مناطق التخزين.',
    },
  },
  {
    id: 'skid-pompage',
    category: 'incendie',
    image: '/images/realisations/skid-pompage.jpg',
    title: {
      fr: 'Skid de pompage incendie',
      en: 'Fire pumping skid',
      ar: 'وحدة ضخ الحريق',
    },
    location: { fr: 'Boufarik', en: 'Boufarik', ar: 'بوفاريك' },
    year: '2023',
    description: {
      fr: "Fourniture et installation d'un skid de pompage incendie complet avec armoire de commande et essais de performance.",
      en: 'Supply and installation of a complete fire pumping skid with control panel and performance testing.',
      ar: 'توريد وتركيب وحدة ضخ حريق كاملة مع لوحة تحكم واختبارات الأداء.',
    },
  },
  {
    id: 'reseau-incendie-exterieur',
    category: 'incendie',
    image: '/images/realisations/reseau-exterieur.jpg',
    title: {
      fr: 'Réseau incendie extérieur enterré',
      en: 'Buried external fire network',
      ar: 'شبكة حريق خارجية مدفونة',
    },
    location: { fr: "L'Arbaa", en: "L'Arbaa", ar: 'الأربعاء' },
    year: '2023',
    description: {
      fr: "Terrassement, pose du réseau enterré et installation des poteaux incendie sur site industriel.",
      en: 'Earthworks, buried network laying and fire hydrant installation on an industrial site.',
      ar: 'أشغال الحفر ومد الشبكة المدفونة وتركيب صنابير الحريق في موقع صناعي.',
    },
  },
  {
    id: 'cta-industrie',
    category: 'climatisation',
    image: '/images/realisations/cta-industrie.jpg',
    title: {
      fr: "Centrale de traitement d'air — site industriel",
      en: 'Air handling unit — industrial site',
      ar: 'وحدة معالجة الهواء — موقع صناعي',
    },
    location: { fr: 'Blida', en: 'Blida', ar: 'البليدة' },
    year: '2024',
    description: {
      fr: "Installation de centrales de traitement d'air en toiture avec réseaux de gaines calorifugées.",
      en: 'Rooftop air handling unit installation with insulated ductwork networks.',
      ar: 'تركيب وحدات معالجة الهواء على السطح مع شبكات قنوات معزولة.',
    },
  },
  {
    id: 'chambre-froide-agro',
    category: 'chambres-froides',
    image: '/images/realisations/chambre-froide.jpg',
    title: {
      fr: 'Chambre froide agroalimentaire',
      en: 'Food-industry cold room',
      ar: 'غرفة تبريد للصناعة الغذائية',
    },
    location: { fr: 'Blida', en: 'Blida', ar: 'البليدة' },
    year: '2023',
    description: {
      fr: "Conception et montage d'une chambre froide négative avec groupe frigorifique et régulation des températures.",
      en: 'Design and assembly of a freezer cold room with refrigeration unit and temperature control.',
      ar: 'تصميم وتركيب غرفة تبريد سالبة مع مجموعة تبريد وضبط درجات الحرارة.',
    },
  },
];

export const projectsByCategory = (category: ProjectCategory | 'all'): readonly Project[] =>
  category === 'all' ? projects : projects.filter((project) => project.category === category);

/** Réalisations mises en avant sur la page d'accueil. */
export const featuredProjects = projects.slice(0, 5);
