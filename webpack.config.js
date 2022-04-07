const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
    mode: 'development',
    entry: {
      bundle: path.resolve(__dirname, 'src/index.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        // name prend le nom de l'entry bundle là
        filename: '[name][contenthash].js',
        clean : true,
        // name assets (images) stay the same, not hashed
        assetModuleFilename: '[name][ext]'
    },
    devtool: 'source-map',
      devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader']
        },
        {
          test: /\.js$/,
          exclude: path.resolve(__dirname, 'node_modules'),
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.(png|jpg|jpeg)$/,
          type: 'asset/resource'
        }
      ] 
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Webpack app',
        filename: 'index.html',
        template: 'src/template.html',
      }),
      new BundleAnalyzerPlugin(),
    ]
}