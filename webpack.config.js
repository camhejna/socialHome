const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
      rules: [
          {
            test: /\.(png|svg|jpg|gif)$/,
            use: [
                'file-loader'
            ]
          }
      ]
  }
};