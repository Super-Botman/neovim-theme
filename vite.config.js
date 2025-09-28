import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: "automatic",
      jsxImportSource: "react",
    }),
  ],
  build: {
    manifest: true,
    rollupOptions: {
      input: "./js/main.jsx",
    },
    outDir: "static/bundle",
    assetsDir: "",
    minify: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler", // or "modern"
      },
    },
  },

  publicDir: false,
  clearScreen: false,
});
