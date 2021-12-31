const path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'assets', 'scripts'),
    publicPath: './assets/scripts/',
    clean: true
  },
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    static: './',
    compress: true,
    port: 2852
    // open: true,
    // server: 'https'
  }
};
