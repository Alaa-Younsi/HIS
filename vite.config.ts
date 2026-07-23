import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2022',
    // Les petits fichiers sont inlinés en base64 : autant de requêtes en moins.
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        // Bibliothèques dans un chunk séparé : le cache navigateur les garde
        // entre deux déploiements de contenu. xlsx est exclu exprès : il ne sert
        // qu'à l'export Excel du tableau de bord (src/lib/exportLeads.ts) — le
        // forcer dans "vendor" l'aurait envoyé à chaque visiteur public, alors
        // qu'en le laissant suivre le découpage par route il ne charge que
        // pour un administrateur ouvrant /admin/demandes.
        manualChunks: (id) => {
          if (!id.includes('node_modules')) return undefined;
          if (id.includes('xlsx')) return undefined;
          return 'vendor';
        },
      },
    },
  },
});
