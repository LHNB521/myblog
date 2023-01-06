import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import viteCompression from 'vite-plugin-compression';
import { md } from './plugins/md';
export default defineConfig({
  base: './', //打包路径
  plugins: [
    vue(),
    md(),
    // gzip压缩 生产环境生成 .gz 文件
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz'
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/assets/styles/main.scss";'
      }
    }
  },
  // 启动服务配置
  server: {
    host: '127.0.0.1',
    port: 3000,
    open: false,
    https: false,
    proxy: {},
    hmr: true //热更新
  },
  // 生产环境打包配置
  // 去除 console debugger
  build: {
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  }
});
