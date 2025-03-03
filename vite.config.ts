import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/system/",
  build: {
    chunkSizeWarningLimit: 3000,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'], // Hem TS hem JS dosyalarını destekle
  },
})
