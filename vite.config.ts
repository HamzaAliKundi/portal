import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true, // Enables polling for file changes
    },
    host: '0.0.0.0', // Ensures the server is accessible from outside the container
    port: 5173, // Optional: Specifies the development server port
  },
});
