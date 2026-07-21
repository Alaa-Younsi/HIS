/**
 * Fichier genere par scripts/generate-image-variants.py — ne pas editer a la main.
 *
 * Largeurs disponibles pour chaque photo. <Img> ne compose un srcset que
 * pour les images listees ici : une photo ajoutee sans declinaison
 * s'affiche normalement, en pleine resolution.
 */
export const imageVariants: Readonly<Record<string, readonly number[]>> = {
  "/images/a-propos.jpg": [
    400,
    600,
    800
  ],
  "/images/hero-chantier.jpg": [
    400,
    600,
    800,
    1200,
    1600,
    1920
  ],
  "/images/realisations/chambre-froide.jpg": [
    400,
    600,
    800,
    1200
  ],
  "/images/realisations/coffret-incendie.jpg": [
    400,
    600,
    800,
    1200
  ],
  "/images/realisations/cta-industrie.jpg": [
    400,
    600,
    800,
    1200
  ],
  "/images/realisations/reseau-exterieur.jpg": [
    400,
    600,
    800,
    1200
  ],
  "/images/realisations/ria-parking.jpg": [
    400,
    600,
    800,
    1200
  ],
  "/images/realisations/skid-pompage.jpg": [
    400,
    600,
    800,
    1200
  ],
  "/images/services/chambres-froides.jpg": [
    400,
    600,
    800,
    1200
  ],
  "/images/services/climatisation.jpg": [
    400,
    600,
    800,
    1200
  ],
  "/images/services/desenfumage.jpg": [
    400,
    600,
    800,
    1200
  ],
  "/images/services/etudes-ingenierie.jpg": [
    400,
    600,
    800,
    1200
  ],
  "/images/services/fourniture.jpg": [
    400,
    600,
    800,
    1200
  ],
  "/images/services/installation.jpg": [
    400,
    600,
    800,
    1200
  ],
  "/images/services/mise-en-service.jpg": [
    400,
    600,
    800,
    1200
  ],
  "/images/services/protection-incendie.jpg": [
    400,
    600,
    800,
    1200
  ],
  "/images/services/ventilation.jpg": [
    400,
    600,
    800,
    1200
  ]
};
