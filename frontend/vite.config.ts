import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import VitePluginHtmlEnv from "vite-plugin-html-env";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    VitePluginHtmlEnv({
      compiler: true,
    }),
  ],
  server: {
    host: "0.0.0.0",
    port: 4242,
    strictPort: true,
    hmr: {
      port: 4242,
      clientPort: 4242,
      host: "localhost",
      path: "/hmr/",
    },
  },
});
