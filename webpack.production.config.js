const webpack = require('webpack');
const path = require('path');
const uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Autoprefixer = require('autoprefixer');

module.exports = {
  entry: {
    "h5demo": [path.resolve(__dirname, 'src/index.js')],
  },
  output: {
    path: path.resolve(__dirname + '/disk'),
    publicPath: '',
    filename: './js/[name].min.js'
  },
  module: {
    loaders: [{
      test: /\.css$/,
      include: path.resolve(__dirname, 'src'),
      loader: 'style!css!postcss'
    }, {
      test: /\.scss$/,
      include: path.resolve(__dirname, 'src'),
      loader: 'style!css!postcss!sass'
    }, {
      test: /\.js[x]?$/,
      include: path.resolve(__dirname, 'src'),
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /\.(png|jpg)$/,
      loader: 'url-loader?limit=10000&name=images/[hash:8].[name].[ext]'
    }, {
      test: /\.(htm|html)$/i,
      loader: 'html-withimg-loader'
    }, {
      test: /\.html$/,
      include: path.resolve(__dirname, 'src'),
      loader: "html-loader?interpolate"
    }]
  },
  babel: {
    babelrc: false,
    presets: [
      ['es2015'],
    ],
  },
  postcss: [Autoprefixer({
    browsers: ['last 5 versions']
  })],
  resolve: {
    extensions: ['', '.js', 'scss'],
  },
  plugins: [
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/index.html',
        inject: 'body',
        hash: true
    }),
    new webpack.optimize.DedupePlugin(),
    new uglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackExternalsPlugin([{
      name: 'zepto',
      var: 'zepto',
      url: 'lib/zepto.min.js'
    },{
      name: 'prismplayer',
      var: 'prismplayer',
      url: 'https://g.alicdn.com/de/prismplayer/1.9.9/prism-min.js'
    },{
      name: 'mqttws31',
      var: 'mqttws31',
      url: 'lib/mqttws31.js'
    },{
      name: 'jweixin',
      var: 'jweixin',
      url: 'http://res.wx.qq.com/open/js/jweixin-1.0.0.js'
    },{
      name: 'frozen',
      var: 'frozen',
      url: 'lib/frozen.min.js'
    }], {
      // Resolve local modules relative to this directory
      basedir: __dirname
    }),
    new CopyWebpackPlugin([{
      from: __dirname + '/src/index.html',
      to: __dirname + '/disk/'
    }]),
    new CopyWebpackPlugin([{
      from: __dirname + '/src/lib',
      to: __dirname + '/disk/lib'
    }]),
    new CopyWebpackPlugin([{
      from: __dirname + '/src/images',
      to: __dirname + '/disk/images'
    }])
  ]
};
