import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/i-barberini/',
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: true,
  },
})
