module.exports = {
  configureWebpack: {
    devServer: {
      watchOptions: {
        poll: true,
        ignored: /node_modules/
      }
    }
  },

  transpileDependencies: [
    'vuetify'
  ]
}
