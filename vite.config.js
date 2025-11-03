import { defineConfig } from 'vite';
import compression from 'vite-plugin-compression';

export default defineConfig({
  root: '.',
  base: '/',
  publicDir: 'public',
  
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      input: {
        main: 'index.html'
      },
      output: {
        manualChunks: undefined,
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.match(/\.(jpe?g|png|gif|svg|webp)$/i)) {
            return 'assets/images/[name].[hash][extname]';
          }
          return 'assets/[name].[hash][extname]';
        },
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js'
      }
    },
    cssCodeSplit: false,
    chunkSizeWarningLimit: 1000,
    copyPublicDir: true
  },
  
  server: {
    port: 3000,
    open: true,
    cors: true
  },
  
  preview: {
    port: 8080,
    open: true
  },
  
  plugins: [
    compression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 10240,
      deleteOriginFile: false
    }),
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 10240,
      deleteOriginFile: false
    })
  ],
  
  css: {
    postcss: './postcss.config.js'
  },
  
  optimizeDeps: {
    include: []
  }
});

