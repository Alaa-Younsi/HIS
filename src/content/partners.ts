import type { Localized } from '@/i18n/types';

export type Partner = {
  name: string;
  /** Déposez le logo dans public/images/logos/ (PNG/SVG transparent). Sinon le nom s'affiche en toutes lettres. */
  logo: string;
  url?: string;
};

/**
 * ─────────────────────────────────────────────────────────────
 *  CLIENTS — « Ils nous ont fait confiance »
 * ─────────────────────────────────────────────────────────────
 */
export const clients: readonly Partner[] = [
  { name: 'Kalipap', logo: '/images/logos/kalipap.png' },
  { name: 'Bessa Promotion', logo: '/images/logos/bessa.png' },
  { name: 'Baytimod Construction', logo: '/images/logos/baytimod.png' },
  { name: 'CCLS', logo: '/images/logos/ccls.png' },
];

/**
 * ─────────────────────────────────────────────────────────────
 *  FOURNISSEURS / MARQUES PARTENAIRES
 * ─────────────────────────────────────────────────────────────
 */
export const suppliers: readonly Partner[] = [
  { name: 'LG', logo: '/images/logos/lg.png' },
  { name: 'Carrier', logo: '/images/logos/carrier.png' },
  { name: 'Mitsubishi', logo: '/images/logos/mitsubishi.png' },
  { name: 'Daikin', logo: '/images/logos/daikin.png' },
  { name: 'Midea', logo: '/images/logos/midea.png' },
  { name: 'Hisense', logo: '/images/logos/hisense.png' },
  { name: 'Trane', logo: '/images/logos/trane.png' },
  { name: 'Haier', logo: '/images/logos/haier.png' },
  { name: 'Condor', logo: '/images/logos/condor.png' },
  { name: 'Proclim', logo: '/images/logos/proclim.png' },
  { name: 'Ideal Duct', logo: '/images/logos/ideal-duct.png' },
];

/**
 * Texte de présentation affiché juste au-dessus des logos clients.
 * Les paragraphes sont séparés par une ligne vide (`\n\n`) et rendus
 * séparément par le composant (voir Home.tsx, section « Confiance »).
 */
export const clientsIntro: Localized = {
  fr: "Chez HIS – HVAC & Industrial Solution Algeria, chaque projet est le reflet de notre engagement à fournir des solutions techniques fiables, performantes et adaptées aux besoins de nos clients. Nos réalisations couvrent différents secteurs d'activité, notamment l'industrie, l'agroalimentaire et l'immobilier, en collaboration avec des entreprises et des organismes reconnus à l'échelle nationale.\n\nParmi nos références figurent Kalipap, entreprise spécialisée dans la transformation du papier depuis 1984, les Coopératives des Céréales et des Légumes Secs (CCLS), qui jouent un rôle stratégique dans le stockage des produits agricoles en Algérie, ainsi que la Promotion Immobilière Bessa, reconnue pour la réalisation de projets résidentiels de haut standing.\n\nCes collaborations témoignent de la confiance accordée à HIS pour la conception, l'installation et la mise en service de systèmes techniques répondant aux exigences les plus élevées en matière de qualité, de sécurité et de performance.",
  en: "At HIS – HVAC & Industrial Solution Algeria, every project reflects our commitment to delivering reliable, high-performance technical solutions tailored to our clients' needs. Our work spans several sectors — industry, agri-food and real estate — in partnership with companies and organisations recognised nationwide.\n\nOur references include Kalipap, a company specialised in paper processing since 1984; the Cereals and Dry Legumes Cooperatives (CCLS), which play a strategic role in storing agricultural products in Algeria; and Bessa Real Estate Development, renowned for its high-end residential projects.\n\nThese partnerships reflect the trust placed in HIS to design, install and commission technical systems that meet the highest standards of quality, safety and performance.",
  ar: "في HIS – HVAC & Industrial Solution Algeria، يعكس كل مشروع التزامنا بتقديم حلول تقنية موثوقة وعالية الأداء ومكيّفة مع احتياجات عملائنا. تغطي إنجازاتنا قطاعات متعددة، لا سيما الصناعة والصناعات الغذائية والعقار، بالتعاون مع مؤسسات وهيئات معترف بها على المستوى الوطني.\n\nمن بين مراجعنا نذكر Kalipap، وهي مؤسسة متخصصة في تحويل الورق منذ 1984، وتعاونيات الحبوب والخضر الجافة (CCLS) التي تؤدي دوراً استراتيجياً في تخزين المنتجات الفلاحية في الجزائر، إضافة إلى الترقية العقارية Bessa المعروفة بإنجاز مشاريع سكنية راقية.\n\nتشهد هذه الشراكات على الثقة الممنوحة لـ HIS في تصميم وتركيب وتشغيل الأنظمة التقنية التي تلبي أعلى متطلبات الجودة والسلامة والأداء.",
};
