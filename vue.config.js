const path = require('path')

const publicPath = process.env.NODE_ENV === 'production' ? './' : '/'
module.exports = {
  publicPath: publicPath,

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
  },

  chainWebpack: function (config) {
    config
      .plugin('html')
      .tap((args) => {
        args[0].title = 'schev'
        return args
      })
  },

  pluginOptions: {
    autoRouting: {
      chunkNamePrefix: 'page-'
    }
  }
}
