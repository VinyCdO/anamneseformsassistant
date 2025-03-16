import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // exemplo de base
  build: {
    outDir: 'build', // exemplo de diretório de saida
  },
})
