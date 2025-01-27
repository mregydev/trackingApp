import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Use global APIs like `describe` and `test`
    environment: "jsdom", // Simulate the browser environment
  },
})
