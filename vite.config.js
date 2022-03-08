import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: "0.0.0.0",
    port: process.env.PORT
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      'composition-api': path.resolve(__dirname, 'node_modules/vue/dist/vue.runtime.esm-bundler.js'),
    },
  },
  optimizeDeps: {
    include: [
      'nouislider',
      'wnumb',
      'trix'
    ]
  }
});
