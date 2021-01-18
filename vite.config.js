import { viteMockServe } from 'vite-plugin-mock';
import vue from '@vitejs/plugin-vue'

const path = require('path')

export default ({ command }) => {
  return {
    plugins: [
      vue(),
      viteMockServe({
        // close support .ts file
        supportTs: false,
        // default
        mockPath: 'mock',
        localEnabled: command === 'serve',
      })
    ],
    build: {
      lib: {
        entry: path.resolve(__dirname, 'lib/main.js'),
        name: 'MyLib'
      },
      rollupOptions: {
        external: ['vue']
      }
    },
    alias: {
      '/@': path.resolve(__dirname, 'src')
    }
  }
}
