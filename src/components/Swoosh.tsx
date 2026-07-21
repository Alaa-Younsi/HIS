/**
 * Courbe de marque HIS — le bandeau marine qui balaie la gauche du hero,
 * souligné d'un ruban blanc puis d'un ruban rouge.
 *
 * L'image de fond reste visible à droite de la courbe. Le SVG est étiré sur
 * toute la surface (`slice`) : la courbe garde sa forme quelle que soit la
 * hauteur de la section.
 */
export function Swoosh({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1440 720"
      preserveAspectRatio="xMinYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      {/* Aplat marine, bord droit incurvé.
          La forme déborde largement en haut et en bas du viewBox : en mode
          « slice » la zone visible dépasse le cadre, et sans ce débord la photo
          réapparaîtrait derrière le texte sur les sections courtes. */}
      <path
        d="M0-400H612V0c104 152 166 336 92 486-70 143-134 176-226 254v800H0Z"
        className="fill-navy-900"
      />
      {/* Rubans blanc puis rouge, décalés le long de la même courbe */}
      <g fill="none" strokeLinecap="round">
        <path
          d="M612-30c104 152 166 336 92 486-70 143-134 176-226 294"
          className="stroke-white/85"
          strokeWidth="22"
          transform="translate(30 0)"
        />
        <path
          d="M612-30c104 152 166 336 92 486-70 143-134 176-226 294"
          className="stroke-flame-500"
          strokeWidth="18"
          transform="translate(64 0)"
        />
      </g>
    </svg>
  );
}
