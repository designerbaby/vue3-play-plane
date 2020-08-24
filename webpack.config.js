const path = require('path');
const base = process.env.NODE_ENV === 'production' ? './' : './'
module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './main.js'),
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, './dist')
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [
      {
        test: /\.(png|gif|jpe?g|)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: 'images',
            publicPath: base + '/images'
          }
        }]
      }
    ]
  }
}