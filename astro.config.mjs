import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import * as path from "path";

// Import PostCSS plugins for Tailwind
import tailwindcss from "tailwindcss";
import tailwindcssNesting from "tailwindcss/nesting";
import autoprefixer from "autoprefixer";

// https://astro.build/config
export default defineConfig({
  integrations: [
    react()
  ],
  output: 'static', // Default is static, but explicitly setting it for clarity
  vite: {
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

