import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
//lsdfjklsdjflsdjfsdljfl
// https://vitejs.dev/config/df
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
