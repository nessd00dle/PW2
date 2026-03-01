import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Si estás en una carpeta especial, podrías probar agregando:
  // base: './', 
})