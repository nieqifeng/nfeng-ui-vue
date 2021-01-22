const path = require('path');
export default {
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
      'ant-design-vue/es/locale/zh_CN',
      'lodash-es',
      '@ant-design/icons-vue',
    ],
  },
  alias: { //src目录的配置
    '/@/': path.resolve(__dirname, 'src')
  },
}
