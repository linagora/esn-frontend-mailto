const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.config.base.js');
const BASE_HREF = process.env.BASE_HREF || '/';

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: "source-map",
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    contentBasePublicPath: BASE_HREF,
    compress: true,
    port: 9900,
    proxy: [{
      context: [
        '/auth',
        '/api',
        '/views',
        '/account/api',
        '/profile/app',
        '/controlcenter/app',
        '/images',
        '/socket.io/',
        '/user-status/app/bubble/',
        '/user-status/api',
        '/contact/app',
        '/contact/images',
        '/dav/api',
        '/unifiedinbox/views',
        '/unifiedinbox/app',
        '/unifiedinbox/api',
        '/calendar/app',
        '/calendar/api',
        '/linagora.esn.resource/api'
      ],
      //target: 'http://localhost:8080',
      target: 'https://dev.open-paas.org',
      disableHostCheck: true,
      secure: false,
      changeOrigin: true,
    }]
  }
});
