import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, 
    open: true, 
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:3000',  // fallback to local URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    outDir: 'dist', 
    sourcemap: true, 
  },
  resolve: {
    alias: {
      '@': '/src', 
    },
  },
  publicDir: 'public',
});
