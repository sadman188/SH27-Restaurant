import { defineConfig } from 'vite';
import { resolve } from 'node:path';

// Multi-page site: HTML pages live in src/, static images in public/
export default defineConfig({
  root: 'src',
  envDir: __dirname, // read frontend/.env
  publicDir: resolve(__dirname, 'public'),
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: ['index', 'menu', 'about', 'reservation', 'contact'].reduce((o, n) => ({ ...o, [n]: resolve(__dirname, `src/${n}.html`) }), {})
    }
  },
  server: { port: 5173 }
});
