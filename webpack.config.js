const path = require('path');
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const isDev = process.env.NODE_ENV === "development"

const config = {
  entry: path.join(__dirname, 'src/index.js'),

  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          'css-loader',
          'stylus-loader' // 向上抛
        ]
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 1024, // 可转 Base64
              name: '[name]-image.[ext]'
            }
          }
        ]
      }
    ]
  },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDev ? '"development"' : '"production"'
            }
        }),
        new HTMLPlugin()
    ]
};

if (isDev) {
    config.devtool = '#cheap-module-eval-source-map' // 调试代码
    config.devServer = {
        port: 8000,
        host: '0.0.0.0', // 内网 ip 和 local 都可以
        overlay: {
            errors: true // 有错误显示在网页
        },
        hot: true, // 热部署
        // open: true // 打开游览器
    }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
}

module.exports = config
