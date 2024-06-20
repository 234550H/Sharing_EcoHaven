import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

console.log("Vite config loaded");

export default defineConfig({
  plugins: [react()],
  server: {
  port: 3000
  }
  })