import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => ({
  base: "/", // ensures routing works on direct URLs
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(), // <- you need this for React to work!
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
