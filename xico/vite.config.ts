import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})

// vite.config.ts

/*import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Redirigir todas las rutas a index.html para SPA routing
    historyApiFallback: true,
  },
  preview: {
    // También para preview build
    historyApiFallback: true,
  },
})*/
