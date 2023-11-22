import path from 'path'
import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'
import Components from 'unplugin-vue-components/vite'
// import eslintPlugin from 'vite-plugin-eslint'
import visualizer from 'rollup-plugin-visualizer'

export default defineConfig({
  productionSourceMap: false,
  drop_console: true,
  drop_debugger: true,
  plugins: [
    createVuePlugin(),
    visualizer(),
    // eslintPlugin(),
    Components({
      /* options */
    }),
  ],
  server: {
    open: false,
    https: false,
    hot: true,
    port: 3445,
    proxy: {
      '/hapij': {
         target: 'http://192.168.1.80:3198', //http://182.255.62.173:7878/api
        //ws: true,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/hapij/, '')
      },
    }
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src'),
      },
    ],
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
  },
  
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    chunkSizeWarningLimit: 700, // Default is 500
  },
})
