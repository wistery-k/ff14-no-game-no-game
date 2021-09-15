const path = require('path');
const webpack = require('webpack');

const src = path.resolve(__dirname, 'src')
const dist = path.resolve(__dirname, 'dist')

module.exports = {
   mode: 'development',

   context: src,

   entry: src + '/main.jsx',

   output: {
      path: dist,
      filename: 'bundle.js',
   },

   module: {
      rules: [
         {
            test: /\.jsx$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
         },
         {
            test: /\.css$/,
            exclude: /node_modules/,
            use: ['style-loader', 'css-loader'],
         },
         {
            test: /\.scss$/,
            exclude: /node_modules/,
            use: [
               'style-loader',
               {
                  loader: 'css-loader',
                  options: {
                     url: false,
                     sourceMap: true,
                     importLoaders: 2,
                     modules: {
                        localIdentName: '[path]___[name]__[local]___[hash:base64:5]',
                        localIdentContext: src,
                     },
                  },
               },
               {
                  loader: 'sass-loader',
                  options: {
                     sourceMap: true,
                     sassOptions: {
                        includePaths: [src],
                     },
                  },
               },
            ],
         },
      ]
   },

   resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
         '@settings': path.resolve(src, 'settings'),
      },
      roots: [src],
   },

   devtool: 'source-map',

   cache: {
      type: 'filesystem',
      buildDependencies: {
         config: [__filename]
      }
   },
}