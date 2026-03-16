import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    host: true,
    proxy: {
      '/auth': {
        target: 'http://10.203.243.24:8080',
        changeOrigin: true,
        secure: false,
      },
      '/assignment': {
        target: 'http://10.203.243.24:8080',
        changeOrigin: true,
        secure: false,
      },
      '/api': {
        target: 'http://10.203.243.24:8080',
        changeOrigin: true,
        secure: false,
      },
      '/file': {
        target: 'http://10.203.243.24:8080',
        changeOrigin: true,
        secure: false,
      }
    }
  }
});