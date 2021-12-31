const path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
    // filename: '[contenthash].js',
    filename: 'app.js',
    path: path.resolve(__dirname, 'assets', 'scripts'),
    publicPath: './assets/scripts/',
    clean: true
  },
  mode: 'production',
  devtool: 'cheap-source-map'
};
