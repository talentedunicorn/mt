const path = require('path')

module.exports = {
  chainWebpack: config => {
    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          resources: [ 
            './src/style/_icons.scss',
            './src/style/_helpers.scss',
            './src/style/_shared.scss'
          ]
        })
    })
  }
}
