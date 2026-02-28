import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    // Optimizes and converts images during production build.
    // Handles imported images (import img from './foo.png') in JSX/CSS.
    // For /public assets, run the one-off script:  npx sharp-cli -i public/**/*.png -o public --toFormat webp
    ViteImageOptimizer({
      png: { quality: 80 },
      jpeg: { quality: 80 },
      jpg: { quality: 80 },
      webp: { lossless: false, quality: 80 },
      // Convert PNG/JPG to WebP on build
      includePublic: true,
    }),
  ],
})

