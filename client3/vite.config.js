import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  const API_URL = `${env.VITE_API_URL ?? 'http://localhost:3001'}`;
  //or leave it empty const API_URL = `${env.VITE_API_URL ?? ''}`;

  console.log("hello first");
  console.log("hello", API_URL);
  console.log("hello second");

  return {
    server: {
      proxy: {
        '/api': {
          target: API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    plugins: [react()],
    optimizeDeps: {
      include: ['jquery'],
    }
  };
});

