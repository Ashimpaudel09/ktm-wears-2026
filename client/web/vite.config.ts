import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],

  // IMPORTANT: must match Express mount path
  base: "/",

  build: {
    outDir: "build",
    emptyOutDir: true,
  },

  server: {
    proxy: {
      "/api": "http://localhost:5000",
    },
  },
});
