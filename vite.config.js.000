import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  // Use relative assets pathing instead of absolute root pathing
  base: './', 
  plugins: [vue()],
  server: {
    port: 3000,
    //open: true,
    cors: true
  },
  build: {
    outDir: 'dist'
  }
});

