const { defineConfig } = require('@vue/cli-service')
const target = 'http://localhost:3000'
module.exports = defineConfig({
  devServer: {
    port: 8080,
    proxy: {
      '^/auth': {
        target,
        changeOrigin: true
      },
      '^/mypage': {
        target,
        changeOrigin: true
      },
      '^/goods': {
        target,
        changeOrigin: true
      }
    }
  },
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    historyApiFallback: true,
  },
})
