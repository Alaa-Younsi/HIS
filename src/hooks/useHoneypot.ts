import { useRef } from 'react';

/**
 * Anti-spam basique pour un formulaire public : un champ piège invisible
 * (un bot generique le remplit, un humain ne le voit jamais) + une durée
 * minimale entre l'affichage du formulaire et l'envoi (un script soumet
 * quasi instantanément). Ne protège pas contre un appel direct au RPC —
 * c'est le rôle de la validation + limitation de débit côté serveur.
 */
export function useHoneypot() {
  const mountedAt = useRef(Date.now());

  const isSpam = (honeypotValue: string) =>
    honeypotValue.length > 0 || Date.now() - mountedAt.current < 1500;

  return { isSpam };
}
