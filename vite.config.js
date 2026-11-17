import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      // Browser QA profiles contain locked files on Windows.
      ignored: ['**/tmp/**'],
    },
  },
  build: {
    outDir: 'dist',
  },
});
