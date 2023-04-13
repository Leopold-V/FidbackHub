import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        //file: 'fidbackhub-widget',
        entryFileNames: 'fidbackhub-widget.js',
      },
    },
  },
});
