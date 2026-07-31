import { Component, type ReactNode } from 'react';
import { isStaleChunkError, reloadOnceForStaleChunk } from '@/lib/staleChunk';

type Props = { children: ReactNode };
type State = { hasError: boolean };

/**
 * Filet de sécurité global. Sans lui, la moindre erreur de rendu — au premier
 * chef un import de chunk échoué après un redéploiement (voir staleChunk.ts) —
 * laisse un écran blanc, car React démonte tout l'arbre. Ici :
 *  - erreur de chunk périmé → rechargement automatique (récupère les fichiers
 *    à jour), transparent pour le visiteur ;
 *  - toute autre erreur → repli lisible avec bouton « Recharger » et
 *    coordonnées, plutôt qu'une page blanche.
 *
 * C'est un composant de CLASSE à dessein : React n'expose
 * `getDerivedStateFromError` que sur les classes — il n'existe pas d'équivalent
 * en hook pour créer une error boundary.
 */
export class ErrorBoundary extends Component<Props, State> {
  override state: State = { hasError: false };

  static getDerivedStateFromError(error: unknown): State {
    // Un chunk périmé se répare en rechargeant : on ne montre pas le repli.
    if (isStaleChunkError(error) && reloadOnceForStaleChunk()) {
      return { hasError: false };
    }
    return { hasError: true };
  }

  override render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="grid min-h-screen place-items-center bg-navy-50 px-6 text-center">
        <div className="max-w-md">
          <p className="text-2xl font-extrabold text-navy-900">
            H<span className="text-flame-500">I</span>S
          </p>
          <h1 className="mt-4 text-lg font-bold text-navy-900">Une erreur est survenue</h1>
          <p className="mt-2 text-sm leading-relaxed text-navy-900/65">
            Veuillez recharger la page. Si le problème persiste, contactez-nous directement.
          </p>
          <button type="button" onClick={() => window.location.reload()} className="btn-primary mt-6">
            Recharger la page
          </button>
          <p className="mt-6 text-sm text-navy-900/60">
            <a href="tel:+213550700036" className="font-semibold hover:text-flame-600" dir="ltr">
              +213 550 70 00 36
            </a>
            {' — '}
            <a href="mailto:contact@his-hvac.com" className="font-semibold hover:text-flame-600">
              contact@his-hvac.com
            </a>
          </p>
        </div>
      </div>
    );
  }
}
