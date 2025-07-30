import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import polyfillNode from 'rollup-plugin-polyfill-node';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      stream: 'stream-browserify',
      // add other node core polyfills here if needed
    },
  },
  define: {
    global: 'window',
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'window',
      },
    },
  },
  build: {
    rollupOptions: {
      plugins: [polyfillNode()],
    },
  },
});
