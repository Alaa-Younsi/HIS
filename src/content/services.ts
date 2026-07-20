import type { Localized, LocalizedList } from '@/i18n/types';
import type { IconName } from '@/components/Icon';

export type Service = {
  /** Utilisé dans l'URL : /services/<slug>. Ne le changez qu'en connaissance de cause (SEO). */
  slug: string;
  icon: IconName;
  /** Déposez le fichier dans public/images/services/. Un visuel de repli s'affiche si absent. */
  image: string;
  title: Localized;
  short: Localized;
  description: Localized;
  applications: LocalizedList;
};

/**
 * ─────────────────────────────────────────────────────────────
 *  NOS SERVICES — ajoutez / retirez / réordonnez librement.
 *  Les 4 premiers sont mis en avant sur la page d'accueil.
 * ─────────────────────────────────────────────────────────────
 */
export const services: readonly Service[] = [
  {
    slug: 'climatisation',
    icon: 'snowflake',
    image: '/images/services/climatisation.jpg',
    title: { fr: 'Climatisation HVAC', en: 'HVAC Air Conditioning', ar: 'التكييف الهوائي' },
    short: {
      fr: 'Solutions pour tous types de bâtiments',
      en: 'Solutions for every type of building',
      ar: 'حلول لجميع أنواع المباني',
    },
    description: {
      fr: "Étude, dimensionnement et installation de systèmes de climatisation adaptés à chaque bâtiment : centrales de traitement d'air, systèmes VRV/VRF, groupes d'eau glacée, splits et cassettes. Nous optimisons le confort thermique tout en maîtrisant la consommation énergétique de vos installations.",
      en: 'Design, sizing and installation of air conditioning systems adapted to every building: air handling units, VRV/VRF systems, chillers, splits and cassettes. We optimise thermal comfort while keeping energy consumption under control.',
      ar: 'دراسة وتصميم وتركيب أنظمة تكييف ملائمة لكل مبنى: وحدات معالجة الهواء، أنظمة VRV/VRF، مجموعات المياه المثلجة، الأجهزة المنفصلة والكاسيت. نحسّن الراحة الحرارية مع التحكم في استهلاك الطاقة.',
    },
    applications: {
      fr: ['Bâtiments tertiaires et administratifs', 'Hôtels et centres commerciaux', 'Sites industriels', 'Établissements de santé'],
      en: ['Commercial and administrative buildings', 'Hotels and shopping centres', 'Industrial sites', 'Healthcare facilities'],
      ar: ['المباني الخدمية والإدارية', 'الفنادق والمراكز التجارية', 'المواقع الصناعية', 'المؤسسات الصحية'],
    },
  },
  {
    slug: 'ventilation',
    icon: 'wind',
    image: '/images/services/ventilation.jpg',
    title: { fr: 'Ventilation', en: 'Ventilation', ar: 'التهوية' },
    short: {
      fr: 'Air sain, environnement maîtrisé',
      en: 'Clean air, controlled environment',
      ar: 'هواء نقي وبيئة متحكم بها',
    },
    description: {
      fr: "Conception et réalisation de réseaux de ventilation mécanique garantissant un renouvellement d'air permanent et conforme aux normes. Nous traitons aussi bien la ventilation de confort que la ventilation de process en environnement industriel ou en salle propre.",
      en: 'Design and installation of mechanical ventilation networks ensuring permanent, standards-compliant air renewal. We handle both comfort ventilation and process ventilation in industrial environments and cleanrooms.',
      ar: 'تصميم وإنجاز شبكات تهوية ميكانيكية تضمن تجديدًا دائمًا للهواء مطابقًا للمعايير. نعالج تهوية الراحة وتهوية العمليات في البيئات الصناعية والغرف النظيفة.',
    },
    applications: {
      fr: ['Parkings couverts', 'Laboratoires et salles propres', 'Cuisines professionnelles', 'Ateliers et entrepôts'],
      en: ['Underground car parks', 'Laboratories and cleanrooms', 'Professional kitchens', 'Workshops and warehouses'],
      ar: ['المواقف المغطاة', 'المخابر والغرف النظيفة', 'المطابخ المهنية', 'الورشات والمستودعات'],
    },
  },
  {
    slug: 'desenfumage',
    icon: 'smoke',
    image: '/images/services/desenfumage.jpg',
    title: { fr: 'Désenfumage', en: 'Smoke Extraction', ar: 'تصريف الدخان' },
    short: {
      fr: 'Évacuation des fumées, conformité assurée',
      en: 'Smoke evacuation, compliance assured',
      ar: 'إجلاء الدخان مع ضمان المطابقة',
    },
    description: {
      fr: "Mise en œuvre de systèmes de désenfumage naturel et mécanique conformes à la réglementation en vigueur : exutoires, volets, conduits, ventilateurs de désenfumage et centrales de commande. Un maillon essentiel de la sécurité incendie de vos bâtiments.",
      en: 'Implementation of natural and mechanical smoke extraction systems compliant with current regulations: smoke vents, dampers, ducts, extraction fans and control panels. An essential link in your building fire safety chain.',
      ar: 'إنجاز أنظمة تصريف دخان طبيعية وميكانيكية مطابقة للتنظيمات السارية: فتحات التصريف، الصمامات، القنوات، مراوح التصريف ولوحات التحكم. حلقة أساسية في سلامة مبانيكم من الحرائق.',
    },
    applications: {
      fr: ['Établissements recevant du public', 'Immeubles de grande hauteur', 'Entrepôts logistiques', 'Circulations et escaliers encloisonnés'],
      en: ['Public-access buildings', 'High-rise buildings', 'Logistics warehouses', 'Corridors and enclosed stairwells'],
      ar: ['المنشآت المستقبلة للجمهور', 'المباني العالية', 'مستودعات اللوجستيك', 'الممرات وبيوت الدرج المغلقة'],
    },
  },
  {
    slug: 'protection-incendie',
    icon: 'fire',
    image: '/images/services/protection-incendie.jpg',
    title: {
      fr: "Protection et lutte contre l'incendie",
      en: 'Fire Protection & Firefighting',
      ar: 'الحماية ومكافحة الحرائق',
    },
    short: {
      fr: 'Sécurité et conformité garanties',
      en: 'Safety and compliance guaranteed',
      ar: 'سلامة ومطابقة مضمونة',
    },
    description: {
      fr: "Étude et réalisation complète de vos installations de sécurité incendie : réseaux incendie, robinets d'incendie armés (RIA), poteaux incendie, skids de pompage, sprinklers et systèmes de détection. Nous garantissons la conformité aux normes et la fiabilité dans la durée.",
      en: 'Complete design and delivery of your fire safety installations: fire networks, hose reels (RIA), fire hydrants, pumping skids, sprinklers and detection systems. We guarantee standards compliance and long-term reliability.',
      ar: 'دراسة وإنجاز كامل لمنشآت السلامة من الحرائق: شبكات الحريق، بكرات الخراطيم (RIA)، صنابير الحريق، وحدات الضخ، الرشاشات وأنظمة الكشف. نضمن المطابقة للمعايير والموثوقية على المدى الطويل.',
    },
    applications: {
      fr: ['Réseaux incendie et RIA', 'Poteaux incendie et skids de pompage', 'Détection incendie', 'Sites industriels et entrepôts'],
      en: ['Fire networks and hose reels', 'Hydrants and pumping skids', 'Fire detection', 'Industrial sites and warehouses'],
      ar: ['شبكات الحريق وبكرات الخراطيم', 'صنابير الحريق ووحدات الضخ', 'كشف الحرائق', 'المواقع الصناعية والمستودعات'],
    },
  },
  {
    slug: 'chambres-froides',
    icon: 'fridge',
    image: '/images/services/chambres-froides.jpg',
    title: { fr: 'Chambres froides', en: 'Cold Rooms', ar: 'غرف التبريد' },
    short: {
      fr: 'Installations frigorifiques sur mesure',
      en: 'Tailor-made refrigeration systems',
      ar: 'منشآت تبريد حسب الطلب',
    },
    description: {
      fr: "Conception, fourniture et installation de chambres froides positives et négatives, ainsi que d'installations frigorifiques industrielles. Panneaux isothermes, groupes frigorifiques, régulation et suivi des températures : nous assurons la continuité de votre chaîne du froid.",
      en: 'Design, supply and installation of chilled and frozen cold rooms as well as industrial refrigeration systems. Insulated panels, refrigeration units, temperature control and monitoring: we keep your cold chain unbroken.',
      ar: 'تصميم وتوريد وتركيب غرف تبريد موجبة وسالبة، وكذلك منشآت التبريد الصناعية. ألواح عازلة، مجموعات تبريد، ضبط ومتابعة درجات الحرارة: نضمن استمرارية سلسلة التبريد لديكم.',
    },
    applications: {
      fr: ['Industries agroalimentaires', 'Pharmacie et santé', 'Grande distribution', 'Plateformes logistiques'],
      en: ['Food processing industries', 'Pharmaceutical and healthcare', 'Retail distribution', 'Logistics platforms'],
      ar: ['الصناعات الغذائية', 'الصيدلة والصحة', 'التوزيع الكبير', 'منصات اللوجستيك'],
    },
  },
  {
    slug: 'etudes-ingenierie',
    icon: 'blueprint',
    image: '/images/services/etudes-ingenierie.jpg',
    title: { fr: 'Études et ingénierie', en: 'Studies & Engineering', ar: 'الدراسات والهندسة' },
    short: {
      fr: 'De la note de calcul aux plans d’exécution',
      en: 'From calculation notes to execution drawings',
      ar: 'من مذكرة الحساب إلى مخططات التنفيذ',
    },
    description: {
      fr: "Notre bureau d'études réalise les bilans thermiques, les notes de calcul, les schémas de principe et les plans d'exécution de vos installations techniques. Nous analysons les contraintes de chaque site pour proposer des solutions innovantes, fiables et sur mesure.",
      en: 'Our design office produces thermal load calculations, calculation notes, schematic diagrams and execution drawings for your technical installations. We analyse each site constraint to propose innovative, reliable and tailor-made solutions.',
      ar: 'يقوم مكتب الدراسات لدينا بإعداد الموازنات الحرارية ومذكرات الحساب والمخططات المبدئية ومخططات التنفيذ لمنشآتكم التقنية. نحلل قيود كل موقع لاقتراح حلول مبتكرة وموثوقة ومصممة خصيصًا.',
    },
    applications: {
      fr: ['Bilans thermiques et dimensionnement', "Plans d'exécution et schémas", 'Assistance technique', 'Optimisation énergétique'],
      en: ['Thermal load and sizing studies', 'Execution drawings and schematics', 'Technical assistance', 'Energy optimisation'],
      ar: ['الموازنات الحرارية والتصميم', 'مخططات التنفيذ والرسوم', 'المساعدة التقنية', 'تحسين الطاقة'],
    },
  },
  {
    slug: 'fourniture',
    icon: 'truck',
    image: '/images/services/fourniture.jpg',
    title: { fr: "Fourniture d'équipements", en: 'Equipment Supply', ar: 'توريد المعدات' },
    short: {
      fr: 'Matériel des plus grandes marques',
      en: 'Equipment from leading brands',
      ar: 'معدات من أكبر العلامات',
    },
    description: {
      fr: "Nous sélectionnons et fournissons des équipements industriels et HVAC issus des plus grands constructeurs mondiaux. Chaque matériel est choisi selon les exigences techniques du projet, les délais et le budget, avec la garantie constructeur et un approvisionnement fiable.",
      en: 'We select and supply industrial and HVAC equipment from the world leading manufacturers. Every item is chosen according to the project technical requirements, lead times and budget, with manufacturer warranty and reliable sourcing.',
      ar: 'نختار ونورّد معدات صناعية وتكييف من كبار المصنّعين العالميين. يُختار كل عتاد وفق المتطلبات التقنية للمشروع والآجال والميزانية، مع ضمان المصنّع وتموين موثوق.',
    },
    applications: {
      fr: ['Groupes froids et unités de traitement d’air', 'Pompes et matériel incendie', 'Gaines, réseaux et accessoires', 'Pièces de rechange'],
      en: ['Chillers and air handling units', 'Pumps and firefighting equipment', 'Ducting, networks and accessories', 'Spare parts'],
      ar: ['مجموعات التبريد ووحدات معالجة الهواء', 'المضخات ومعدات الحريق', 'القنوات والشبكات واللواحق', 'قطع الغيار'],
    },
  },
  {
    slug: 'installation',
    icon: 'wrench',
    image: '/images/services/installation.jpg',
    title: { fr: 'Installation', en: 'Installation', ar: 'التركيب' },
    short: {
      fr: 'Une exécution rigoureuse sur chantier',
      en: 'Rigorous on-site execution',
      ar: 'تنفيذ دقيق في الورشة',
    },
    description: {
      fr: "Nos équipes de techniciens qualifiés assurent le montage complet de vos installations : réseaux aérauliques et hydrauliques, calorifugeage, électricité courant fort, plomberie et plâtrerie sèche. Chaque chantier est piloté dans le respect des délais et des règles de sécurité.",
      en: 'Our qualified technicians handle the full assembly of your installations: air and hydraulic networks, thermal insulation, high-current electrical work, plumbing and drywall. Every site is managed with respect for deadlines and safety rules.',
      ar: 'تتكفل فرقنا من التقنيين المؤهلين بالتركيب الكامل لمنشآتكم: الشبكات الهوائية والمائية، العزل الحراري، الكهرباء ذات التيار القوي، السباكة والجبس. تُدار كل ورشة مع احترام الآجال وقواعد السلامة.',
    },
    applications: {
      fr: ['Réseaux aérauliques et hydrauliques', 'Calorifugeage', 'Électricité courant fort et plomberie', 'Cloisons, doublages et faux plafonds'],
      en: ['Air and hydraulic networks', 'Thermal insulation', 'High-current electrical work and plumbing', 'Partitions, linings and suspended ceilings'],
      ar: ['الشبكات الهوائية والمائية', 'العزل الحراري', 'الكهرباء والسباكة', 'الجدران والأسقف المستعارة'],
    },
  },
  {
    slug: 'mise-en-service',
    icon: 'check',
    image: '/images/services/mise-en-service.jpg',
    title: {
      fr: 'Mise en service et maintenance',
      en: 'Commissioning & Maintenance',
      ar: 'التشغيل والصيانة',
    },
    short: {
      fr: 'Performance vérifiée, installations suivies',
      en: 'Verified performance, monitored installations',
      ar: 'أداء مُتحقق ومنشآت متابَعة',
    },
    description: {
      fr: "Réglages, équilibrage, essais et mise en service de vos installations, suivis de contrats de maintenance préventive et corrective. Nous intervenons également en dépannage pour garantir la disponibilité de vos équipements et la continuité de vos opérations.",
      en: 'Adjustment, balancing, testing and commissioning of your installations, followed by preventive and corrective maintenance contracts. We also provide breakdown support to keep your equipment available and your operations running.',
      ar: 'الضبط والموازنة والاختبارات وتشغيل منشآتكم، متبوعة بعقود صيانة وقائية وتصحيحية. نتدخل كذلك في الإصلاح لضمان جاهزية معداتكم واستمرارية عملياتكم.',
    },
    applications: {
      fr: ['Essais et équilibrage', 'Maintenance préventive', 'Maintenance corrective et dépannage', 'Suivi et reporting'],
      en: ['Testing and balancing', 'Preventive maintenance', 'Corrective maintenance and repairs', 'Monitoring and reporting'],
      ar: ['الاختبارات والموازنة', 'الصيانة الوقائية', 'الصيانة التصحيحية والإصلاح', 'المتابعة والتقارير'],
    },
  },
];

export const getService = (slug: string | undefined): Service | undefined =>
  services.find((service) => service.slug === slug);

/** Services mis en avant sur la page d'accueil. */
export const featuredServices = services.slice(0, 4);
