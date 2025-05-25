import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import node from "@astrojs/node";
import * as path from "path";

// Import PostCSS plugins for Tailwind
import tailwindcss from "tailwindcss";
import tailwindcssNesting from "tailwindcss/nesting";
import autoprefixer from "autoprefixer";

// https://astro.build/config
export default defineConfig({
  output: "static",
  // prefetch: true,
  // experimental: {
  //   clientPrerender: true,
  // },
  adapter: node({
    mode: "standalone",
  }),
  server: {
    proxy: {
      "/api": {
        target: "https://api.kokoliemart.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  build: {
    server: "./dist/server/",
    client: "./dist/client/",
    serverEntry: "entry.mjs",
  },
  integrations: [react()],
  vite: {
    preview: {
      allowedHosts: ["https://049f-182-2-165-157.ngrok-free.app/"],
    },
    css: {
      postcss: {
        plugins: [tailwindcssNesting(), tailwindcss(), autoprefixer()],
      },
    },
    resolve: {
      alias: {
        "@features": path.resolve("./src/features"),
        "@components": path.resolve("./src/components"),
        "@layouts": path.resolve("./src/layouts"),
        "@utils": path.resolve("./src/utils"),
        "@hooks": path.resolve("./src/hooks"),
        "@context": path.resolve("./src/context"),
        "@api": path.resolve("./src/api"),
        "@styles": path.resolve("./src/styles"),
        "@assets": path.resolve("./src/assets"),
      },
    },
  },
});
