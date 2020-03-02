const path = require('path')

module.exports = {
  publicPath: './',
  devServer: {
    proxy: {
      '/api': {
        target: process.env.VUE_APP_API_ENDPOINT,
        ws: false,
        changeOrigin: true
      }
    }
  },
  transpileDependencies: [
    'vuetify'
  ],
  configureWebpack: {
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': path.resolve(__dirname, 'src/')
      }
    }
  }
}