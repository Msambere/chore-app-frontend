import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import tailwindcssPost from "tailwindcss";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), tailwindcss()],
  css: {
    postcss: {
      plugins: [tailwindcssPost],
    },
  },
  optimizeDeps: {
    include: ["@emotion/styled"],
  },
});
