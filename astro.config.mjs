import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import * as path from "path";
import tailwindcssNesting from "tailwindcss/nesting";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export default defineConfig({
  adapter: vercel(),
  integrations: [
    react(),
  ],
  vite: {
    preview: {
      allowedHosts: ["https://049f-182-2-165-157.ngrok-free.app/"],
    },
    css: {
      postcss: {
        plugins: [
          tailwindcssNesting(),
          tailwindcss(),
          autoprefixer()
        ]
      }
    },
    resolve: {
      alias: {
        '@features': path.resolve('./src/features'),
        '@components': path.resolve('./src/components'),
        '@layouts': path.resolve('./src/layouts'),
        '@utils': path.resolve('./src/utils'),
        '@hooks': path.resolve('./src/hooks'),
        '@context': path.resolve('./src/context'),
        '@api': path.resolve('./src/api'),
        '@styles': path.resolve('./src/styles'),
        '@assets': path.resolve('./src/assets'),
      }
    }
  }
});