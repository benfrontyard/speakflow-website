import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('motion/react') || id.includes('framer-motion')) return 'motion'
          if (id.includes('lottie-react')) return 'lottie'
          if (id.includes('@phosphor-icons')) return 'icons'
        },
      },
    },
  },
})
