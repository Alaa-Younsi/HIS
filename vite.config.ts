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
        // entre deux déploiements de contenu.
        manualChunks: (id) => (id.includes('node_modules') ? 'vendor' : undefined),
      },
    },
  },
});
