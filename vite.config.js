import vue from '@vitejs/plugin-vue';
import { viteMockServe } from 'vite-plugin-mock';

const path = require('path');

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
      }),
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
    minify: 'esbuild', //压缩
    cssPreprocessOptions: { //css预处理
      less: {
        modifyVars: {
          'primary-color': '#FE5F23',
          'link-color': '#1890FFFF',
          'info-color': '#1890FFFF'
        },
        javascriptEnabled: true
      }
    },
    optimizeDeps: { //加载的其他资源
      include: [
        '@ant-design/icons-vue'
      ],
    },
    alias: { //src目录的配置
      '/@': path.resolve(__dirname, 'src')
    },
  }
}
