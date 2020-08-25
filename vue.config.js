module.exports = {
  devServer: {
    proxy: {  //配置跨域
      '/api': {
        target: 'http://39.103.135.187:8408',
        changOrigin: true,  //允许跨域
        pathRewrite: {
          '^/api': ''
        }
      },
    }
  },
}