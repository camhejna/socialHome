const path = require('path');

module.exports = {
  mode: 'development',
  optimization: {
    usedExports: true
  },
  entry: {
    app: './src/main.js'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
  output: {
    filename: 'app.js',
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