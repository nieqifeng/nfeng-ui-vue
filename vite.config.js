import vue from '@vitejs/plugin-vue'

const path = require('path')

/**
 * @type {import('vite').UserConfig}
 */
export default {
  plugins: [vue()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'lib/main.js'),
      name: 'MyLib'
    },
    rollupOptions: {
      external: ['vue']
    }
  }
}
