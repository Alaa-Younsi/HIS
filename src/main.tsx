import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { ErrorBoundary } from './components/ErrorBoundary';
import { reloadOnceForStaleChunk } from './lib/staleChunk';
import './styles/index.css';

// Vite émet `vite:preloadError` quand le préchargement d'un import dynamique
// échoue — typiquement un chunk renommé par un redéploiement Vercel, demandé
// par un onglet resté ouvert. Sans écouteur, Vite laisse l'erreur remonter et
// la page reste blanche ; ici on recharge pour récupérer les fichiers à jour.
window.addEventListener('vite:preloadError', (event) => {
  event.preventDefault();
  reloadOnceForStaleChunk();
});

// Préconnexion à Supabase (API + images Storage) une fois connecté — inutile
// tant que VITE_SUPABASE_URL est vide, donc ajouté dynamiquement plutôt que
// codé en dur dans index.html (qui serait servi à tout le monde, connecté ou non).
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
if (supabaseUrl) {
  const link = document.createElement('link');
  link.rel = 'preconnect';
  link.href = supabaseUrl;
  link.crossOrigin = 'anonymous';
  document.head.appendChild(link);
}

const container = document.getElementById('root');
if (!container) throw new Error('#root introuvable dans index.html');

createRoot(container).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
);
