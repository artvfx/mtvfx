import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  
  define: {
  'import.meta.env.VITE_API_KEY': JSON.stringify(process.env.VITE_API_KEY),
},
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  preview: {
    allowedHosts: ['mtvfx.onrender.com'],
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
});
