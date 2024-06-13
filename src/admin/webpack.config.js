'use strict';
const webpack = require('webpack');

module.exports = (config) => {
  // Note: we provide webpack above so you should not `require` it
  // Perform customizations to webpack config
  // Important: return the modified config

  // Add rule for .scss files
  // config.module.rules.push({
  //   test: /\.scss$/,
  //   use: [
  //     'style-loader', // creates style nodes from JS strings
  //     'css-loader', // translates CSS into CommonJS
  //     'sass-loader' // compiles Sass to CSS
  //   ]
  // });

  config.plugins.push(new webpack.NormalModuleReplacementPlugin(
    /^tippy\.js$/,
    'tippy.js/dist/tippy-bundle.umd.min.js'
  ));

  return config;
};