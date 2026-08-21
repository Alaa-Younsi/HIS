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
  /** Utilisé dans l'URL de la fiche détaillée : /realisations/<slug>. */
  slug: string;
  category: ProjectCategory;
  /** Déposez le fichier dans public/images/realisations/. Un visuel de repli s'affiche si absent. */
  image: string;
  /** Photos supplémentaires affichées dans la galerie de la fiche détaillée. */
  gallery?: readonly string[];
  /** Vidéos de chantier affichées sur la fiche détaillée. */
  videos?: readonly string[];
  title: Localized;
  location: Localized;
  /** Client / maître d'ouvrage — affiché sur la fiche. Laissez vide pour masquer. */
  client?: Localized;
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
    id: 'desenfumage-belle-colline',
    slug: 'desenfumage-belle-colline',
    category: 'desenfumage',
    image: '/images/realisations/belle-colline.jpg',
    title: {
      fr: 'Système de désenfumage — Résidence La Belle Colline',
      en: 'Smoke extraction system — La Belle Colline residence',
      ar: 'نظام تصريف الدخان — إقامة La Belle Colline',
    },
    location: { fr: 'Jnane Sfari, Alger', en: 'Jnane Sfari, Algiers', ar: 'جنان سفاري، الجزائر العاصمة' },
    client: {
      fr: 'Promotion Immobilière Bessa',
      en: 'Bessa Real Estate Development',
      ar: 'الترقية العقارية Bessa',
    },
    year: '',
    description: {
      fr: "HIS – HVAC & Industrial Solution Algeria a réalisé l'étude, la fabrication et l'installation du système de désenfumage de la résidence La Belle Colline, située à Jnane Sfari (Alger). Ce projet concerne deux tours d'habitation d'environ 90 mètres de hauteur chacune. Nos équipes ont assuré la fabrication des gaines de désenfumage, l'installation complète du réseau ainsi que la mise en œuvre des différents équipements du système. Cette réalisation garantit une évacuation efficace des fumées en cas d'incendie et répond aux exigences en matière de sécurité incendie, contribuant ainsi à la protection des occupants et des bâtiments.",
      en: 'HIS – HVAC & Industrial Solution Algeria carried out the design, fabrication and installation of the smoke extraction system for the La Belle Colline residence in Jnane Sfari (Algiers). The project covers two residential towers of about 90 metres in height each. Our teams handled the fabrication of the smoke extraction ducts, the full installation of the network and the commissioning of the various system components. The work ensures efficient smoke evacuation in the event of a fire and meets fire-safety requirements, protecting both occupants and buildings.',
      ar: 'أنجزت HIS – HVAC & Industrial Solution Algeria دراسة وتصنيع وتركيب نظام تصريف الدخان لإقامة La Belle Colline الواقعة في جنان سفاري (الجزائر العاصمة). يشمل هذا المشروع برجين سكنيين بارتفاع نحو 90 متراً لكل منهما. تكفّلت فرقنا بتصنيع قنوات تصريف الدخان والتركيب الكامل للشبكة وتشغيل مختلف تجهيزات النظام. يضمن هذا الإنجاز إخلاءً فعالاً للدخان في حال نشوب حريق ويستجيب لمتطلبات السلامة من الحرائق، مساهماً في حماية الساكنين والمباني.',
    },
  },
  {
    id: 'incendie-kalipap',
    slug: 'incendie-kalipap',
    category: 'incendie',
    image: '/images/realisations/skid-pompage.jpg',
    title: {
      fr: "Système de lutte contre l'incendie — Kalipap",
      en: 'Fire-fighting system — Kalipap',
      ar: 'نظام مكافحة الحرائق — Kalipap',
    },
    location: { fr: 'Boumedfaa, Aïn Defla', en: 'Boumedfaa, Aïn Defla', ar: 'بومدفع، عين الدفلى' },
    client: { fr: 'Kalipap', en: 'Kalipap', ar: 'Kalipap' },
    year: '',
    description: {
      fr: "HIS – HVAC & Industrial Solution Algeria a réalisé l'étude, la fourniture et l'installation d'un système complet de lutte contre l'incendie sur le site industriel de Kalipap, situé à Boumedfaa (Aïn Defla). Kalipap est une entreprise algérienne de référence, spécialisée dans la transformation du papier depuis 1984. Dans le cadre de ce projet, nos équipes ont assuré la conception du réseau de protection incendie, l'installation des équipements ainsi que la mise en service de l'ensemble du système, garantissant une protection efficace des installations conformément aux exigences de sécurité incendie.",
      en: 'HIS – HVAC & Industrial Solution Algeria carried out the design, supply and installation of a complete fire-fighting system at the Kalipap industrial site in Boumedfaa (Aïn Defla). Kalipap is a leading Algerian company specialised in paper processing since 1984. As part of this project, our teams handled the design of the fire-protection network, the installation of the equipment and the commissioning of the entire system, ensuring effective protection of the facilities in line with fire-safety requirements.',
      ar: 'أنجزت HIS – HVAC & Industrial Solution Algeria دراسة وتوريد وتركيب نظام كامل لمكافحة الحرائق في الموقع الصناعي لمؤسسة Kalipap الواقع في بومدفع (عين الدفلى). تُعدّ Kalipap مؤسسة جزائرية رائدة متخصصة في تحويل الورق منذ 1984. في إطار هذا المشروع، تكفّلت فرقنا بتصميم شبكة الحماية من الحرائق وتركيب التجهيزات وتشغيل النظام بأكمله، بما يضمن حماية فعّالة للمنشآت وفق متطلبات السلامة من الحرائق.',
    },
  },
  {
    id: 'ventilation-silos-ccls',
    slug: 'ventilation-silos-ccls',
    category: 'ventilation',
    image: '/images/realisations/cta-industrie.jpg',
    title: {
      fr: 'Système de ventilation — silos de stockage de céréales',
      en: 'Ventilation system — grain storage silos',
      ar: 'نظام تهوية — صوامع تخزين الحبوب',
    },
    location: { fr: "Sud de l'Algérie", en: 'Southern Algeria', ar: 'جنوب الجزائر' },
    client: {
      fr: 'Coopérative des Céréales et des Légumes Secs (CCLS)',
      en: 'Cereals and Dry Legumes Cooperative (CCLS)',
      ar: 'تعاونية الحبوب والخضر الجافة (CCLS)',
    },
    year: '',
    description: {
      fr: "HIS – HVAC & Industrial Solution Algeria a réalisé l'étude, la fabrication et l'installation d'un système de ventilation pour des silos de stockage de céréales appartenant à une Coopérative des Céréales et des Légumes Secs (CCLS), située dans le sud de l'Algérie. Les CCLS jouent un rôle essentiel dans la collecte, le stockage et la conservation des céréales à l'échelle nationale. Ce projet avait pour objectif d'assurer une ventilation efficace des silos afin de préserver la qualité des céréales, de limiter les risques liés à l'humidité et à l'échauffement des grains, et de garantir des conditions de stockage conformes aux exigences du secteur agricole.",
      en: 'HIS – HVAC & Industrial Solution Algeria carried out the design, fabrication and installation of a ventilation system for grain storage silos belonging to a Cereals and Dry Legumes Cooperative (CCLS) located in southern Algeria. The CCLS play an essential role in the collection, storage and preservation of cereals nationwide. The project aimed to ensure efficient ventilation of the silos in order to preserve grain quality, limit the risks linked to moisture and grain heating, and guarantee storage conditions that comply with the requirements of the agricultural sector.',
      ar: 'أنجزت HIS – HVAC & Industrial Solution Algeria دراسة وتصنيع وتركيب نظام تهوية لصوامع تخزين الحبوب تابعة لتعاونية الحبوب والخضر الجافة (CCLS) الواقعة في جنوب الجزائر. تؤدي تعاونيات CCLS دوراً أساسياً في جمع الحبوب وتخزينها والحفاظ عليها على المستوى الوطني. هدف هذا المشروع إلى ضمان تهوية فعّالة للصوامع للحفاظ على جودة الحبوب والحدّ من المخاطر المرتبطة بالرطوبة وارتفاع حرارة الحبوب، وضمان ظروف تخزين مطابقة لمتطلبات القطاع الفلاحي.',
    },
  },
];

