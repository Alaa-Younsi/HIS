-- Reprend intégralement le contenu actuellement codé en dur dans
-- src/content/*.ts, pour que le tableau de bord et le site (une fois
-- connecté) affichent exactement ce qui est en ligne aujourd'hui — rien à
-- ressaisir avant de pouvoir commencer à éditer depuis l'admin.

-- ─────────────────────────────────────────────────────────────
-- Entreprise
-- ─────────────────────────────────────────────────────────────
insert into company_info (
  id, slogan, tagline, hero_title, hero_highlight, hero_subtitle, intro, story, mission, expertise, closing,
  address, hours, phones, whatsapp, email, city, country, linkedin_url, facebook_url, whatsapp_message, stats
) values (
  1,
  jsonb_build_object('fr', $$La performance commence par la confiance$$, 'en', $$Performance starts with trust$$, 'ar', $$الأداء يبدأ بالثقة$$),
  jsonb_build_object('fr', $$L'expertise au service de vos installations techniques$$, 'en', $$Expertise at the service of your technical installations$$, 'ar', $$الخبرة في خدمة منشآتكم التقنية$$),
  jsonb_build_object('fr', $$Des solutions techniques pour un avenir performant$$, 'en', $$Technical solutions for a high-performance future$$, 'ar', $$حلول تقنية لمستقبل عالي الأداء$$),
  jsonb_build_object('fr', $$techniques$$, 'en', $$solutions$$, 'ar', $$تقنية$$),
  jsonb_build_object(
    'fr', $$Parce que votre entreprise mérite des installations fiables, performantes et durables, HIS vous accompagne à chaque étape de vos projets : étude, conception, installation, mise en service et maintenance.$$,
    'en', $$Because your business deserves reliable, high-performance and long-lasting installations, HIS supports you at every step of your projects: study, design, installation, commissioning and maintenance.$$,
    'ar', $$لأن شركتكم تستحق منشآت موثوقة وعالية الأداء ومستدامة، ترافقكم HIS في كل مرحلة من مراحل مشاريعكم: الدراسة والتصميم والتركيب والتشغيل والصيانة.$$
  ),
  jsonb_build_object(
    'fr', $$HVAC AND Industrial Solutions (HIS) est une entreprise spécialisée dans les études, l'ingénierie, l'installation, la mise en service, la maintenance, la gestion de projets techniques et le développement de solutions adaptées aux besoins de ses clients.$$,
    'en', $$HVAC AND Industrial Solutions (HIS) specialises in engineering studies, installation, commissioning, maintenance, technical project management and the development of solutions tailored to each client.$$,
    'ar', $$شركة HVAC AND Industrial Solutions (HIS) متخصصة في الدراسات والهندسة والتركيب والتشغيل والصيانة وإدارة المشاريع التقنية وتطوير حلول ملائمة لاحتياجات عملائها.$$
  ),
  jsonb_build_object(
    'fr', $$Fondée par deux ingénieurs issus de l'École Nationale Polytechnique (ENP) et de l'USTHB, HIS — HVAC & Industrial Solutions est née de la volonté d'apporter des solutions techniques innovantes et fiables aux secteurs industriel et du bâtiment. Grâce à une expertise reconnue en HVAC et systèmes industriels, nous accompagnons nos clients avec passion, rigueur et engagement dans la réussite de leurs projets.$$,
    'en', $$Founded by two engineers from the École Nationale Polytechnique (ENP) and USTHB, HIS — HVAC & Industrial Solutions was born from the desire to bring innovative, reliable technical solutions to the industrial and construction sectors. With recognised expertise in HVAC and industrial systems, we support our clients with passion, rigour and commitment.$$,
    'ar', $$تأسست HIS — HVAC & Industrial Solutions على يد مهندسَين من المدرسة الوطنية المتعددة التقنيات (ENP) وجامعة USTHB، انطلاقًا من الرغبة في تقديم حلول تقنية مبتكرة وموثوقة لقطاعي الصناعة والبناء. وبفضل خبرة معترف بها في التكييف والأنظمة الصناعية، نرافق عملاءنا بشغف وصرامة والتزام لإنجاح مشاريعهم.$$
  ),
  jsonb_build_object(
    'fr', $$Accompagner nos clients dans la réussite de leurs projets en proposant des solutions fiables, innovantes et adaptées à leurs besoins, tout en garantissant les plus hauts standards de qualité, de sécurité et de satisfaction.$$,
    'en', $$Support our clients in the success of their projects with reliable, innovative solutions tailored to their needs, while guaranteeing the highest standards of quality, safety and satisfaction.$$,
    'ar', $$مرافقة عملائنا لإنجاح مشاريعهم من خلال حلول موثوقة ومبتكرة وملائمة لاحتياجاتهم، مع ضمان أعلى معايير الجودة والسلامة والرضا.$$
  ),
  jsonb_build_object(
    'fr', $$Plus de 10 ans d'expérience pour chacun de nos ingénieurs fondateurs dans les secteurs industriel, tertiaire et du bâtiment. HIS met à votre disposition un savoir-faire reconnu en HVAC, désenfumage, protection incendie et solutions techniques industrielles, avec une approche axée sur la qualité, la performance et l'innovation.$$,
    'en', $$Over 10 years of experience for each of our founding engineers across industrial, commercial and building sectors. HIS offers recognised know-how in HVAC, smoke extraction, fire protection and industrial technical solutions, with a focus on quality, performance and innovation.$$,
    'ar', $$أكثر من 10 سنوات خبرة لكل من مهندسينا المؤسسين في القطاعات الصناعية والخدمية والبناء. تضع HIS بين أيديكم دراية معترفًا بها في التكييف وتصريف الدخان والحماية من الحرائق والحلول التقنية الصناعية، بمقاربة تركز على الجودة والأداء والابتكار.$$
  ),
  jsonb_build_object(
    'fr', $$Que vous souhaitiez réaliser une nouvelle installation, moderniser vos équipements, renforcer la sécurité de vos infrastructures ou assurer la maintenance de vos installations techniques, HIS met son expertise à votre service.$$,
    'en', $$Whether you want to build a new installation, modernise your equipment, strengthen the safety of your infrastructure or maintain your technical installations, HIS puts its expertise at your service.$$,
    'ar', $$سواء رغبتم في إنجاز منشأة جديدة أو تحديث معداتكم أو تعزيز سلامة بنيتكم التحتية أو ضمان صيانة منشآتكم التقنية، تضع HIS خبرتها في خدمتكم.$$
  ),
  jsonb_build_object(
    'fr', $$Haouch Ben Chergui SEC 09 GP13 N°38, L'Arbaa — Blida, Algérie$$,
    'en', $$Haouch Ben Chergui SEC 09 GP13 N°38, L'Arbaa — Blida, Algeria$$,
    'ar', $$حوش بن شرقي، القسم 09 GP13 رقم 38، الأربعاء — البليدة، الجزائر$$
  ),
  jsonb_build_object('fr', $$Dimanche — Jeudi : 08h00 — 17h00$$, 'en', $$Sunday — Thursday: 8:00 AM — 5:00 PM$$, 'ar', $$الأحد — الخميس: 08:00 — 17:00$$),
  array['+213 550 70 00 36', '+213 550 70 00 38', '+213 550 70 00 46'],
  '213550700036',
  'hvac.industrial.solution@gmail.com',
  'Blida',
  'DZ',
  'https://www.linkedin.com/company/his-hvac-industrial-solution',
  'https://www.facebook.com/his.hvac.industrial.solution',
  jsonb_build_object(
    'fr', $$Bonjour HIS, je souhaite obtenir un devis pour mon projet.$$,
    'en', $$Hello HIS, I would like a quote for my project.$$,
    'ar', $$مرحبًا HIS، أود الحصول على عرض سعر لمشروعي.$$
  ),
  jsonb_build_array(
    jsonb_build_object('value', '10+', 'icon', 'experience', 'label', jsonb_build_object('fr', $$Années d'expérience$$, 'en', $$Years of experience$$, 'ar', $$سنوات خبرة$$)),
    jsonb_build_object('value', '100+', 'icon', 'projects', 'label', jsonb_build_object('fr', $$Projets réalisés$$, 'en', $$Projects delivered$$, 'ar', $$مشروع منجز$$)),
    jsonb_build_object('value', '50+', 'icon', 'clients', 'label', jsonb_build_object('fr', $$Clients satisfaits$$, 'en', $$Satisfied clients$$, 'ar', $$عميل راضٍ$$)),
    jsonb_build_object('value', '100%', 'icon', 'quality', 'label', jsonb_build_object('fr', $$Qualité garantie$$, 'en', $$Guaranteed quality$$, 'ar', $$جودة مضمونة$$))
  )
);

-- ─────────────────────────────────────────────────────────────
-- Services
-- ─────────────────────────────────────────────────────────────
insert into services (slug, icon, image_url, gallery, title, short, description, applications, sort_order, status) values
(
  'climatisation', 'snowflake', '/images/services/climatisation.jpg',
  jsonb_build_array('/images/services/gallery/climatisation-groupe-unique.jpg'),
  jsonb_build_object('fr', $$Climatisation HVAC$$, 'en', $$HVAC Air Conditioning$$, 'ar', $$التكييف الهوائي$$),
  jsonb_build_object('fr', $$Solutions pour tous types de bâtiments$$, 'en', $$Solutions for every type of building$$, 'ar', $$حلول لجميع أنواع المباني$$),
  jsonb_build_object(
    'fr', $$Étude, dimensionnement et installation de systèmes de climatisation adaptés à chaque bâtiment : centrales de traitement d'air, systèmes VRV/VRF, groupes d'eau glacée, splits et cassettes. Nous optimisons le confort thermique tout en maîtrisant la consommation énergétique de vos installations.$$,
    'en', $$Design, sizing and installation of air conditioning systems adapted to every building: air handling units, VRV/VRF systems, chillers, splits and cassettes. We optimise thermal comfort while keeping energy consumption under control.$$,
    'ar', $$دراسة وتصميم وتركيب أنظمة تكييف ملائمة لكل مبنى: وحدات معالجة الهواء، أنظمة VRV/VRF، مجموعات المياه المثلجة، الأجهزة المنفصلة والكاسيت. نحسّن الراحة الحرارية مع التحكم في استهلاك الطاقة.$$
  ),
  jsonb_build_object(
    'fr', jsonb_build_array('Bâtiments tertiaires et administratifs', 'Hôtels et centres commerciaux', 'Sites industriels', 'Établissements de santé'),
    'en', jsonb_build_array('Commercial and administrative buildings', 'Hotels and shopping centres', 'Industrial sites', 'Healthcare facilities'),
    'ar', jsonb_build_array('المباني الخدمية والإدارية', 'الفنادق والمراكز التجارية', 'المواقع الصناعية', 'المؤسسات الصحية')
  ),
  0, 'published'
),
(
  'ventilation', 'wind', '/images/services/ventilation.jpg',
  jsonb_build_array(
    '/images/services/gallery/ventilation-ensemble-chantier.jpg',
    '/images/services/gallery/ventilation-duct-run-jour.jpg',
    '/images/services/gallery/ventilation-ventilateur-face.jpg',
    '/images/services/gallery/ventilation-ventilateur-profil.jpg',
    '/images/services/gallery/ventilation-duct-run-nuit.jpg',
    '/images/services/gallery/ventilation-duct-perspective.jpg',
    '/images/services/gallery/ventilation-ensemble-chantier-alt.jpg',
    '/images/services/gallery/ventilation-ventilateur-face-alt.jpg',
    '/images/services/gallery/ventilation-duct-run-nuit-bis.jpg'
  ),
  jsonb_build_object('fr', $$Ventilation$$, 'en', $$Ventilation$$, 'ar', $$التهوية$$),
  jsonb_build_object('fr', $$Air sain, environnement maîtrisé$$, 'en', $$Clean air, controlled environment$$, 'ar', $$هواء نقي وبيئة متحكم بها$$),
  jsonb_build_object(
    'fr', $$Conception et réalisation de réseaux de ventilation mécanique garantissant un renouvellement d'air permanent et conforme aux normes. Nous traitons aussi bien la ventilation de confort que la ventilation de process en environnement industriel ou en salle propre.$$,
    'en', $$Design and installation of mechanical ventilation networks ensuring permanent, standards-compliant air renewal. We handle both comfort ventilation and process ventilation in industrial environments and cleanrooms.$$,
    'ar', $$تصميم وإنجاز شبكات تهوية ميكانيكية تضمن تجديدًا دائمًا للهواء مطابقًا للمعايير. نعالج تهوية الراحة وتهوية العمليات في البيئات الصناعية والغرف النظيفة.$$
  ),
  jsonb_build_object(
    'fr', jsonb_build_array('Parkings couverts', 'Laboratoires et salles propres', 'Cuisines professionnelles', 'Ateliers et entrepôts'),
    'en', jsonb_build_array('Underground car parks', 'Laboratories and cleanrooms', 'Professional kitchens', 'Workshops and warehouses'),
    'ar', jsonb_build_array('المواقف المغطاة', 'المخابر والغرف النظيفة', 'المطابخ المهنية', 'الورشات والمستودعات')
  ),
  1, 'published'
),
(
  'desenfumage', 'smoke', '/images/services/desenfumage.jpg', '[]'::jsonb,
  jsonb_build_object('fr', $$Désenfumage$$, 'en', $$Smoke Extraction$$, 'ar', $$تصريف الدخان$$),
  jsonb_build_object('fr', $$Évacuation des fumées, conformité assurée$$, 'en', $$Smoke evacuation, compliance assured$$, 'ar', $$إجلاء الدخان مع ضمان المطابقة$$),
  jsonb_build_object(
    'fr', $$Mise en œuvre de systèmes de désenfumage naturel et mécanique conformes à la réglementation en vigueur : exutoires, volets, conduits, ventilateurs de désenfumage et centrales de commande. Un maillon essentiel de la sécurité incendie de vos bâtiments.$$,
    'en', $$Implementation of natural and mechanical smoke extraction systems compliant with current regulations: smoke vents, dampers, ducts, extraction fans and control panels. An essential link in your building fire safety chain.$$,
    'ar', $$إنجاز أنظمة تصريف دخان طبيعية وميكانيكية مطابقة للتنظيمات السارية: فتحات التصريف، الصمامات، القنوات، مراوح التصريف ولوحات التحكم. حلقة أساسية في سلامة مبانيكم من الحرائق.$$
  ),
  jsonb_build_object(
    'fr', jsonb_build_array('Établissements recevant du public', 'Immeubles de grande hauteur', 'Entrepôts logistiques', 'Circulations et escaliers encloisonnés'),
    'en', jsonb_build_array('Public-access buildings', 'High-rise buildings', 'Logistics warehouses', 'Corridors and enclosed stairwells'),
    'ar', jsonb_build_array('المنشآت المستقبلة للجمهور', 'المباني العالية', 'مستودعات اللوجستيك', 'الممرات وبيوت الدرج المغلقة')
  ),
  2, 'published'
),
(
  'protection-incendie', 'fire', '/images/services/protection-incendie.jpg',
  jsonb_build_array('/images/services/gallery/protection-incendie-livraison.jpg'),
  jsonb_build_object('fr', $$Protection et lutte contre l'incendie$$, 'en', $$Fire Protection & Firefighting$$, 'ar', $$الحماية ومكافحة الحرائق$$),
  jsonb_build_object('fr', $$Sécurité et conformité garanties$$, 'en', $$Safety and compliance guaranteed$$, 'ar', $$سلامة ومطابقة مضمونة$$),
  jsonb_build_object(
    'fr', $$Étude et réalisation complète de vos installations de sécurité incendie : réseaux incendie, robinets d'incendie armés (RIA), poteaux incendie, skids de pompage, sprinklers et systèmes de détection. Nous garantissons la conformité aux normes et la fiabilité dans la durée.$$,
    'en', $$Complete design and delivery of your fire safety installations: fire networks, hose reels (RIA), fire hydrants, pumping skids, sprinklers and detection systems. We guarantee standards compliance and long-term reliability.$$,
    'ar', $$دراسة وإنجاز كامل لمنشآت السلامة من الحرائق: شبكات الحريق، بكرات الخراطيم (RIA)، صنابير الحريق، وحدات الضخ، الرشاشات وأنظمة الكشف. نضمن المطابقة للمعايير والموثوقية على المدى الطويل.$$
  ),
  jsonb_build_object(
    'fr', jsonb_build_array('Réseaux incendie et RIA', 'Poteaux incendie et skids de pompage', 'Détection incendie', 'Sites industriels et entrepôts'),
    'en', jsonb_build_array('Fire networks and hose reels', 'Hydrants and pumping skids', 'Fire detection', 'Industrial sites and warehouses'),
    'ar', jsonb_build_array('شبكات الحريق وبكرات الخراطيم', 'صنابير الحريق ووحدات الضخ', 'كشف الحرائق', 'المواقع الصناعية والمستودعات')
  ),
  3, 'published'
),
(
  'chambres-froides', 'fridge', '/images/services/chambres-froides.jpg', '[]'::jsonb,
  jsonb_build_object('fr', $$Chambres froides$$, 'en', $$Cold Rooms$$, 'ar', $$غرف التبريد$$),
  jsonb_build_object('fr', $$Installations frigorifiques sur mesure$$, 'en', $$Tailor-made refrigeration systems$$, 'ar', $$منشآت تبريد حسب الطلب$$),
  jsonb_build_object(
    'fr', $$Conception, fourniture et installation de chambres froides positives et négatives, ainsi que d'installations frigorifiques industrielles. Panneaux isothermes, groupes frigorifiques, régulation et suivi des températures : nous assurons la continuité de votre chaîne du froid.$$,
    'en', $$Design, supply and installation of chilled and frozen cold rooms as well as industrial refrigeration systems. Insulated panels, refrigeration units, temperature control and monitoring: we keep your cold chain unbroken.$$,
    'ar', $$تصميم وتوريد وتركيب غرف تبريد موجبة وسالبة، وكذلك منشآت التبريد الصناعية. ألواح عازلة، مجموعات تبريد، ضبط ومتابعة درجات الحرارة: نضمن استمرارية سلسلة التبريد لديكم.$$
  ),
  jsonb_build_object(
    'fr', jsonb_build_array('Industries agroalimentaires', 'Pharmacie et santé', 'Grande distribution', 'Plateformes logistiques'),
    'en', jsonb_build_array('Food processing industries', 'Pharmaceutical and healthcare', 'Retail distribution', 'Logistics platforms'),
    'ar', jsonb_build_array('الصناعات الغذائية', 'الصيدلة والصحة', 'التوزيع الكبير', 'منصات اللوجستيك')
  ),
  4, 'published'
),
(
  'etudes-ingenierie', 'blueprint', '/images/services/etudes-ingenierie.jpg', '[]'::jsonb,
  jsonb_build_object('fr', $$Études et ingénierie$$, 'en', $$Studies & Engineering$$, 'ar', $$الدراسات والهندسة$$),
  jsonb_build_object('fr', $$De la note de calcul aux plans d'exécution$$, 'en', $$From calculation notes to execution drawings$$, 'ar', $$من مذكرة الحساب إلى مخططات التنفيذ$$),
  jsonb_build_object(
    'fr', $$Notre bureau d'études réalise les bilans thermiques, les notes de calcul, les schémas de principe et les plans d'exécution de vos installations techniques. Nous analysons les contraintes de chaque site pour proposer des solutions innovantes, fiables et sur mesure.$$,
    'en', $$Our design office produces thermal load calculations, calculation notes, schematic diagrams and execution drawings for your technical installations. We analyse each site constraint to propose innovative, reliable and tailor-made solutions.$$,
    'ar', $$يقوم مكتب الدراسات لدينا بإعداد الموازنات الحرارية ومذكرات الحساب والمخططات المبدئية ومخططات التنفيذ لمنشآتكم التقنية. نحلل قيود كل موقع لاقتراح حلول مبتكرة وموثوقة ومصممة خصيصًا.$$
  ),
  jsonb_build_object(
    'fr', jsonb_build_array('Bilans thermiques et dimensionnement', 'Plans d''exécution et schémas', 'Assistance technique', 'Optimisation énergétique'),
    'en', jsonb_build_array('Thermal load and sizing studies', 'Execution drawings and schematics', 'Technical assistance', 'Energy optimisation'),
    'ar', jsonb_build_array('الموازنات الحرارية والتصميم', 'مخططات التنفيذ والرسوم', 'المساعدة التقنية', 'تحسين الطاقة')
  ),
  5, 'published'
),
(
  'fourniture', 'truck', '/images/services/fourniture.jpg', '[]'::jsonb,
  jsonb_build_object('fr', $$Fourniture d'équipements$$, 'en', $$Equipment Supply$$, 'ar', $$توريد المعدات$$),
  jsonb_build_object('fr', $$Matériel des plus grandes marques$$, 'en', $$Equipment from leading brands$$, 'ar', $$معدات من أكبر العلامات$$),
  jsonb_build_object(
    'fr', $$Nous sélectionnons et fournissons des équipements industriels et HVAC issus des plus grands constructeurs mondiaux. Chaque matériel est choisi selon les exigences techniques du projet, les délais et le budget, avec la garantie constructeur et un approvisionnement fiable.$$,
    'en', $$We select and supply industrial and HVAC equipment from the world leading manufacturers. Every item is chosen according to the project technical requirements, lead times and budget, with manufacturer warranty and reliable sourcing.$$,
    'ar', $$نختار ونورّد معدات صناعية وتكييف من كبار المصنّعين العالميين. يُختار كل عتاد وفق المتطلبات التقنية للمشروع والآجال والميزانية، مع ضمان المصنّع وتموين موثوق.$$
  ),
  jsonb_build_object(
    'fr', jsonb_build_array('Groupes froids et unités de traitement d''air', 'Pompes et matériel incendie', 'Gaines, réseaux et accessoires', 'Pièces de rechange'),
    'en', jsonb_build_array('Chillers and air handling units', 'Pumps and firefighting equipment', 'Ducting, networks and accessories', 'Spare parts'),
    'ar', jsonb_build_array('مجموعات التبريد ووحدات معالجة الهواء', 'المضخات ومعدات الحريق', 'القنوات والشبكات واللواحق', 'قطع الغيار')
  ),
  6, 'published'
),
(
  'installation', 'wrench', '/images/services/installation.jpg', '[]'::jsonb,
  jsonb_build_object('fr', $$Installation$$, 'en', $$Installation$$, 'ar', $$التركيب$$),
  jsonb_build_object('fr', $$Une exécution rigoureuse sur chantier$$, 'en', $$Rigorous on-site execution$$, 'ar', $$تنفيذ دقيق في الورشة$$),
  jsonb_build_object(
    'fr', $$Nos équipes de techniciens qualifiés assurent le montage complet de vos installations : réseaux aérauliques et hydrauliques, calorifugeage, électricité courant fort, plomberie et plâtrerie sèche. Chaque chantier est piloté dans le respect des délais et des règles de sécurité.$$,
    'en', $$Our qualified technicians handle the full assembly of your installations: air and hydraulic networks, thermal insulation, high-current electrical work, plumbing and drywall. Every site is managed with respect for deadlines and safety rules.$$,
    'ar', $$تتكفل فرقنا من التقنيين المؤهلين بالتركيب الكامل لمنشآتكم: الشبكات الهوائية والمائية، العزل الحراري، الكهرباء ذات التيار القوي، السباكة والجبس. تُدار كل ورشة مع احترام الآجال وقواعد السلامة.$$
  ),
  jsonb_build_object(
    'fr', jsonb_build_array('Réseaux aérauliques et hydrauliques', 'Calorifugeage', 'Électricité courant fort et plomberie', 'Cloisons, doublages et faux plafonds'),
    'en', jsonb_build_array('Air and hydraulic networks', 'Thermal insulation', 'High-current electrical work and plumbing', 'Partitions, linings and suspended ceilings'),
    'ar', jsonb_build_array('الشبكات الهوائية والمائية', 'العزل الحراري', 'الكهرباء والسباكة', 'الجدران والأسقف المستعارة')
  ),
  7, 'published'
),
(
  'mise-en-service', 'check', '/images/services/mise-en-service.jpg', '[]'::jsonb,
  jsonb_build_object('fr', $$Mise en service et maintenance$$, 'en', $$Commissioning & Maintenance$$, 'ar', $$التشغيل والصيانة$$),
  jsonb_build_object('fr', $$Performance vérifiée, installations suivies$$, 'en', $$Verified performance, monitored installations$$, 'ar', $$أداء مُتحقق ومنشآت متابَعة$$),
  jsonb_build_object(
    'fr', $$Réglages, équilibrage, essais et mise en service de vos installations, suivis de contrats de maintenance préventive et corrective. Nous intervenons également en dépannage pour garantir la disponibilité de vos équipements et la continuité de vos opérations.$$,
    'en', $$Adjustment, balancing, testing and commissioning of your installations, followed by preventive and corrective maintenance contracts. We also provide breakdown support to keep your equipment available and your operations running.$$,
    'ar', $$الضبط والموازنة والاختبارات وتشغيل منشآتكم، متبوعة بعقود صيانة وقائية وتصحيحية. نتدخل كذلك في الإصلاح لضمان جاهزية معداتكم واستمرارية عملياتكم.$$
  ),
  jsonb_build_object(
    'fr', jsonb_build_array('Essais et équilibrage', 'Maintenance préventive', 'Maintenance corrective et dépannage', 'Suivi et reporting'),
    'en', jsonb_build_array('Testing and balancing', 'Preventive maintenance', 'Corrective maintenance and repairs', 'Monitoring and reporting'),
    'ar', jsonb_build_array('الاختبارات والموازنة', 'الصيانة الوقائية', 'الصيانة التصحيحية والإصلاح', 'المتابعة والتقارير')
  ),
  8, 'published'
);

-- ─────────────────────────────────────────────────────────────
-- Réalisations
-- ─────────────────────────────────────────────────────────────
insert into projects (category, image_url, title, location, client, description, year, sort_order, status) values
(
  'desenfumage', '/images/realisations/belle-colline.jpg',
  jsonb_build_object('fr', $$Système de désenfumage — Résidence La Belle Colline$$, 'en', $$Smoke extraction system — La Belle Colline residence$$, 'ar', $$نظام تصريف الدخان — إقامة La Belle Colline$$),
  jsonb_build_object('fr', $$Jnane Sfari, Alger$$, 'en', $$Jnane Sfari, Algiers$$, 'ar', $$جنان سفاري، الجزائر العاصمة$$),
  jsonb_build_object('fr', $$Promotion Immobilière Bessa$$, 'en', $$Bessa Real Estate Development$$, 'ar', $$الترقية العقارية Bessa$$),
  jsonb_build_object(
    'fr', $$HIS – HVAC & Industrial Solution Algeria a réalisé l'étude, la fabrication et l'installation du système de désenfumage de la résidence La Belle Colline, située à Jnane Sfari (Alger). Ce projet concerne deux tours d'habitation d'environ 90 mètres de hauteur chacune. Nos équipes ont assuré la fabrication des gaines de désenfumage, l'installation complète du réseau ainsi que la mise en œuvre des différents équipements du système. Cette réalisation garantit une évacuation efficace des fumées en cas d'incendie et répond aux exigences en matière de sécurité incendie, contribuant ainsi à la protection des occupants et des bâtiments.$$,
    'en', $$HIS – HVAC & Industrial Solution Algeria carried out the design, fabrication and installation of the smoke extraction system for the La Belle Colline residence in Jnane Sfari (Algiers). The project covers two residential towers of about 90 metres in height each. Our teams handled the fabrication of the smoke extraction ducts, the full installation of the network and the commissioning of the various system components. The work ensures efficient smoke evacuation in the event of a fire and meets fire-safety requirements, protecting both occupants and buildings.$$,
    'ar', $$أنجزت HIS – HVAC & Industrial Solution Algeria دراسة وتصنيع وتركيب نظام تصريف الدخان لإقامة La Belle Colline الواقعة في جنان سفاري (الجزائر العاصمة). يشمل هذا المشروع برجين سكنيين بارتفاع نحو 90 متراً لكل منهما. تكفّلت فرقنا بتصنيع قنوات تصريف الدخان والتركيب الكامل للشبكة وتشغيل مختلف تجهيزات النظام. يضمن هذا الإنجاز إخلاءً فعالاً للدخان في حال نشوب حريق ويستجيب لمتطلبات السلامة من الحرائق، مساهماً في حماية الساكنين والمباني.$$
  ),
  '', 0, 'published'
),
(
  'incendie', '/images/realisations/skid-pompage.jpg',
  jsonb_build_object('fr', $$Système de lutte contre l'incendie — Kalipap$$, 'en', $$Fire-fighting system — Kalipap$$, 'ar', $$نظام مكافحة الحرائق — Kalipap$$),
  jsonb_build_object('fr', $$Boumedfaa, Aïn Defla$$, 'en', $$Boumedfaa, Aïn Defla$$, 'ar', $$بومدفع، عين الدفلى$$),
  jsonb_build_object('fr', $$Kalipap$$, 'en', $$Kalipap$$, 'ar', $$Kalipap$$),
  jsonb_build_object(
    'fr', $$HIS – HVAC & Industrial Solution Algeria a réalisé l'étude, la fourniture et l'installation d'un système complet de lutte contre l'incendie sur le site industriel de Kalipap, situé à Boumedfaa (Aïn Defla). Kalipap est une entreprise algérienne de référence, spécialisée dans la transformation du papier depuis 1984. Dans le cadre de ce projet, nos équipes ont assuré la conception du réseau de protection incendie, l'installation des équipements ainsi que la mise en service de l'ensemble du système, garantissant une protection efficace des installations conformément aux exigences de sécurité incendie.$$,
    'en', $$HIS – HVAC & Industrial Solution Algeria carried out the design, supply and installation of a complete fire-fighting system at the Kalipap industrial site in Boumedfaa (Aïn Defla). Kalipap is a leading Algerian company specialised in paper processing since 1984. As part of this project, our teams handled the design of the fire-protection network, the installation of the equipment and the commissioning of the entire system, ensuring effective protection of the facilities in line with fire-safety requirements.$$,
    'ar', $$أنجزت HIS – HVAC & Industrial Solution Algeria دراسة وتوريد وتركيب نظام كامل لمكافحة الحرائق في الموقع الصناعي لمؤسسة Kalipap الواقع في بومدفع (عين الدفلى). تُعدّ Kalipap مؤسسة جزائرية رائدة متخصصة في تحويل الورق منذ 1984. في إطار هذا المشروع، تكفّلت فرقنا بتصميم شبكة الحماية من الحرائق وتركيب التجهيزات وتشغيل النظام بأكمله، بما يضمن حماية فعّالة للمنشآت وفق متطلبات السلامة من الحرائق.$$
  ),
  '', 1, 'published'
),
(
  'ventilation', '/images/realisations/cta-industrie.jpg',
  jsonb_build_object('fr', $$Système de ventilation — silos de stockage de céréales$$, 'en', $$Ventilation system — grain storage silos$$, 'ar', $$نظام تهوية — صوامع تخزين الحبوب$$),
  jsonb_build_object('fr', $$Sud de l'Algérie$$, 'en', $$Southern Algeria$$, 'ar', $$جنوب الجزائر$$),
  jsonb_build_object('fr', $$Coopérative des Céréales et des Légumes Secs (CCLS)$$, 'en', $$Cereals and Dry Legumes Cooperative (CCLS)$$, 'ar', $$تعاونية الحبوب والخضر الجافة (CCLS)$$),
  jsonb_build_object(
    'fr', $$HIS – HVAC & Industrial Solution Algeria a réalisé l'étude, la fabrication et l'installation d'un système de ventilation pour des silos de stockage de céréales appartenant à une Coopérative des Céréales et des Légumes Secs (CCLS), située dans le sud de l'Algérie. Les CCLS jouent un rôle essentiel dans la collecte, le stockage et la conservation des céréales à l'échelle nationale. Ce projet avait pour objectif d'assurer une ventilation efficace des silos afin de préserver la qualité des céréales, de limiter les risques liés à l'humidité et à l'échauffement des grains, et de garantir des conditions de stockage conformes aux exigences du secteur agricole.$$,
    'en', $$HIS – HVAC & Industrial Solution Algeria carried out the design, fabrication and installation of a ventilation system for grain storage silos belonging to a Cereals and Dry Legumes Cooperative (CCLS) located in southern Algeria. The CCLS play an essential role in the collection, storage and preservation of cereals nationwide. The project aimed to ensure efficient ventilation of the silos in order to preserve grain quality, limit the risks linked to moisture and grain heating, and guarantee storage conditions that comply with the requirements of the agricultural sector.$$,
    'ar', $$أنجزت HIS – HVAC & Industrial Solution Algeria دراسة وتصنيع وتركيب نظام تهوية لصوامع تخزين الحبوب تابعة لتعاونية الحبوب والخضر الجافة (CCLS) الواقعة في جنوب الجزائر. تؤدي تعاونيات CCLS دوراً أساسياً في جمع الحبوب وتخزينها والحفاظ عليها على المستوى الوطني. هدف هذا المشروع إلى ضمان تهوية فعّالة للصوامع للحفاظ على جودة الحبوب والحدّ من المخاطر المرتبطة بالرطوبة وارتفاع حرارة الحبوب، وضمان ظروف تخزين مطابقة لمتطلبات القطاع الفلاحي.$$
  ),
  '', 2, 'published'
);

-- ─────────────────────────────────────────────────────────────
-- Secteurs d'activité
-- ─────────────────────────────────────────────────────────────
insert into sectors (icon, name, description, sort_order) values
('factory', jsonb_build_object('fr', $$Industries manufacturières$$, 'en', $$Manufacturing$$, 'ar', $$الصناعات التحويلية$$), jsonb_build_object('fr', $$Lignes de production, ateliers et sites industriels.$$, 'en', $$Production lines, workshops and industrial sites.$$, 'ar', $$خطوط الإنتاج والورشات والمواقع الصناعية.$$), 0),
('flask', jsonb_build_object('fr', $$Pharmaceutique et laboratoires$$, 'en', $$Pharmaceutical & laboratories$$, 'ar', $$الصيدلة والمخابر$$), jsonb_build_object('fr', $$Salles propres, zones à atmosphère contrôlée et laboratoires.$$, 'en', $$Cleanrooms, controlled-atmosphere zones and laboratories.$$, 'ar', $$الغرف النظيفة والمناطق ذات الأجواء المتحكم بها والمخابر.$$), 1),
('hospital', jsonb_build_object('fr', $$Hôpitaux et cliniques$$, 'en', $$Hospitals & clinics$$, 'ar', $$المستشفيات والعيادات$$), jsonb_build_object('fr', $$Blocs opératoires, services de soins et établissements de santé.$$, 'en', $$Operating theatres, care units and healthcare facilities.$$, 'ar', $$غرف العمليات وأقسام العلاج والمؤسسات الصحية.$$), 2),
('wheat', jsonb_build_object('fr', $$Agroalimentaire$$, 'en', $$Food processing$$, 'ar', $$الصناعات الغذائية$$), jsonb_build_object('fr', $$Chaîne du froid, zones de production et de conditionnement.$$, 'en', $$Cold chain, production and packaging areas.$$, 'ar', $$سلسلة التبريد ومناطق الإنتاج والتعبئة.$$), 3),
('bolt', jsonb_build_object('fr', $$Énergie et hydrocarbures$$, 'en', $$Energy & hydrocarbons$$, 'ar', $$الطاقة والمحروقات$$), jsonb_build_object('fr', $$Sites sensibles nécessitant une sécurité renforcée.$$, 'en', $$Sensitive sites requiring reinforced safety.$$, 'ar', $$مواقع حساسة تتطلب سلامة معززة.$$), 4),
('crane', jsonb_build_object('fr', $$Promotion immobilière$$, 'en', $$Real estate development$$, 'ar', $$الترقية العقارية$$), jsonb_build_object('fr', $$Promoteurs et entreprises de construction.$$, 'en', $$Developers and construction companies.$$, 'ar', $$المرقّون العقاريون وشركات البناء.$$), 5),
('building', jsonb_build_object('fr', $$Administrations et collectivités$$, 'en', $$Public administrations$$, 'ar', $$الإدارات والجماعات$$), jsonb_build_object('fr', $$Bâtiments administratifs et équipements publics.$$, 'en', $$Administrative buildings and public facilities.$$, 'ar', $$المباني الإدارية والمرافق العمومية.$$), 6),
('hotel', jsonb_build_object('fr', $$Hôtels et centres commerciaux$$, 'en', $$Hotels & shopping centres$$, 'ar', $$الفنادق والمراكز التجارية$$), jsonb_build_object('fr', $$Bâtiments tertiaires recevant du public.$$, 'en', $$Commercial buildings open to the public.$$, 'ar', $$المباني الخدمية المستقبلة للجمهور.$$), 7),
('warehouse', jsonb_build_object('fr', $$Entrepôts logistiques$$, 'en', $$Logistics warehouses$$, 'ar', $$المستودعات اللوجستية$$), jsonb_build_object('fr', $$Plateformes de stockage et de distribution.$$, 'en', $$Storage and distribution platforms.$$, 'ar', $$منصات التخزين والتوزيع.$$), 8),
('school', jsonb_build_object('fr', $$Établissements scolaires$$, 'en', $$Educational institutions$$, 'ar', $$المؤسسات التعليمية$$), jsonb_build_object('fr', $$Écoles, universités et centres de formation.$$, 'en', $$Schools, universities and training centres.$$, 'ar', $$المدارس والجامعات ومراكز التكوين.$$), 9);

-- ─────────────────────────────────────────────────────────────
-- Pourquoi HIS ? (points forts)
-- ─────────────────────────────────────────────────────────────
insert into strengths (icon, title, description, sort_order) values
('team', jsonb_build_object('fr', $$Équipe d'ingénieurs qualifiés$$, 'en', $$Qualified engineering team$$, 'ar', $$فريق مهندسين مؤهلين$$), jsonb_build_object('fr', $$Des ingénieurs issus de l'ENP et de l'USTHB, épaulés par des techniciens expérimentés sur le terrain.$$, 'en', $$Engineers from ENP and USTHB, backed by experienced technicians in the field.$$, 'ar', $$مهندسون من ENP وUSTHB، مدعومون بتقنيين ذوي خبرة ميدانية.$$), 0),
('clock', jsonb_build_object('fr', $$Respect des délais$$, 'en', $$On-time delivery$$, 'ar', $$احترام الآجال$$), jsonb_build_object('fr', $$Un planning tenu et communiqué à chaque étape du chantier.$$, 'en', $$A schedule that is respected and communicated at every stage of the project.$$, 'ar', $$برنامج زمني محترم ومُبلَّغ في كل مرحلة من الورشة.$$), 1),
('medal', jsonb_build_object('fr', $$Qualité d'exécution$$, 'en', $$Quality of execution$$, 'ar', $$جودة التنفيذ$$), jsonb_build_object('fr', $$Un travail soigné, contrôlé et conforme aux règles de l'art.$$, 'en', $$Careful, inspected work delivered to professional standards.$$, 'ar', $$عمل متقن ومراقب ومطابق لأصول المهنة.$$), 2),
('blueprint', jsonb_build_object('fr', $$Solutions sur mesure$$, 'en', $$Tailor-made solutions$$, 'ar', $$حلول حسب الطلب$$), jsonb_build_object('fr', $$Chaque installation est étudiée selon les contraintes réelles de votre site.$$, 'en', $$Every installation is designed around the real constraints of your site.$$, 'ar', $$تُدرس كل منشأة وفق القيود الفعلية لموقعكم.$$), 3),
('factory', jsonb_build_object('fr', $$Expérience industrielle$$, 'en', $$Industrial experience$$, 'ar', $$خبرة صناعية$$), jsonb_build_object('fr', $$Plus de 10 ans d'intervention sur des sites industriels exigeants.$$, 'en', $$Over 10 years working on demanding industrial sites.$$, 'ar', $$أكثر من 10 سنوات من التدخل في مواقع صناعية متطلبة.$$), 4),
('shield', jsonb_build_object('fr', $$Respect des normes$$, 'en', $$Standards compliance$$, 'ar', $$احترام المعايير$$), jsonb_build_object('fr', $$Installations conformes à la réglementation technique et de sécurité en vigueur.$$, 'en', $$Installations compliant with current technical and safety regulations.$$, 'ar', $$منشآت مطابقة للتنظيمات التقنية وتنظيمات السلامة السارية.$$), 5),
('chart', jsonb_build_object('fr', $$Suivi des projets$$, 'en', $$Project follow-up$$, 'ar', $$متابعة المشاريع$$), jsonb_build_object('fr', $$Un interlocuteur unique et un reporting régulier de l'étude à la réception.$$, 'en', $$A single point of contact and regular reporting from study to handover.$$, 'ar', $$مُحاور وحيد وتقارير منتظمة من الدراسة إلى الاستلام.$$), 6),
('headset', jsonb_build_object('fr', $$Service après-vente$$, 'en', $$After-sales service$$, 'ar', $$خدمة ما بعد البيع$$), jsonb_build_object('fr', $$Une équipe joignable et réactive après la mise en service.$$, 'en', $$A reachable, responsive team after commissioning.$$, 'ar', $$فريق متاح وسريع الاستجابة بعد التشغيل.$$), 7),
('wrench', jsonb_build_object('fr', $$Maintenance$$, 'en', $$Maintenance$$, 'ar', $$الصيانة$$), jsonb_build_object('fr', $$Contrats préventifs, correctifs et dépannage pour la continuité de vos opérations.$$, 'en', $$Preventive and corrective contracts plus breakdown support to keep operations running.$$, 'ar', $$عقود وقائية وتصحيحية وإصلاح لضمان استمرارية عملياتكم.$$), 8);

-- ─────────────────────────────────────────────────────────────
-- Clients et fournisseurs
-- ─────────────────────────────────────────────────────────────
insert into partners (kind, name, logo_url, sort_order) values
('client', 'Kalipap', '/images/logos/kalipap.png', 0),
('client', 'Bessa Promotion', '/images/logos/bessa.png', 1),
('client', 'Baytimod Construction', '/images/logos/baytimod.png', 2),
('client', 'CCLS', '/images/logos/ccls.png', 3),
('supplier', 'LG', '/images/logos/lg.png', 0),
('supplier', 'Carrier', '/images/logos/carrier.png', 1),
('supplier', 'Mitsubishi', '/images/logos/mitsubishi.png', 2),
('supplier', 'Daikin', '/images/logos/daikin.png', 3),
('supplier', 'Midea', '/images/logos/midea.png', 4),
('supplier', 'Hisense', '/images/logos/hisense.png', 5),
('supplier', 'Trane', '/images/logos/trane.png', 6),
('supplier', 'Haier', '/images/logos/haier.png', 7),
('supplier', 'Condor', '/images/logos/condor.png', 8),
('supplier', 'Proclim', '/images/logos/proclim.png', 9),
('supplier', 'Ideal Duct', '/images/logos/ideal-duct.png', 10);
