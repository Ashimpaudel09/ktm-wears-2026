import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  build: {
    outDir: "build", // must match Render publish directory
  },
  base: "/admin/", // root path
  server: {
  proxy: {
    '/api': 'http://localhost:5000',
  },
}

});

