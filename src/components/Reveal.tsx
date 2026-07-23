import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, ReactNode, RefObject } from 'react';

type RevealTag = 'div' | 'li' | 'ul';

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Délai d'apparition en ms — utile pour échelonner une grille de cartes. */
  delay?: number;
  as?: RevealTag;
};

/**
 * Fait apparaître son contenu (fondu + léger glissement) quand il entre dans
 * le viewport. Ne se déclenche qu'une fois — pas de va-et-vient au scroll.
 */
export function Reveal({ children, className = '', delay = 0, as = 'div' }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const style: CSSProperties = { transitionDelay: visible ? `${delay}ms` : '0ms' };
  const cls = `reveal ${visible ? 'reveal-visible' : ''} ${className}`.trim();

  if (as === 'li') {
    return (
      <li ref={ref as RefObject<HTMLLIElement>} className={cls} style={style}>
        {children}
      </li>
    );
  }

  if (as === 'ul') {
    return (
      <ul ref={ref as RefObject<HTMLUListElement>} className={cls} style={style}>
        {children}
      </ul>
    );
  }

  return (
    <div ref={ref as RefObject<HTMLDivElement>} className={cls} style={style}>
      {children}
    </div>
  );
}
