import { useRef } from 'react';
import type { MouseEvent, ReactNode } from 'react';

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  /** Intensité de l'inclinaison en degrés. */
  strength?: number;
};

/** Enveloppe qui incline son contenu en 3D en suivant le curseur — effet de profondeur au survol. */
export function TiltCard({ children, className = '', strength = 8 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    node.style.transform = `perspective(900px) rotateX(${(-y * strength).toFixed(2)}deg) rotateY(${(x * strength).toFixed(2)}deg) translateY(-6px) scale(1.02)`;
  };

  const handleLeave = () => {
    const node = ref.current;
    if (!node) return;
    node.style.transform = '';
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`tilt-card ${className}`.trim()}
    >
      {children}
    </div>
  );
}
