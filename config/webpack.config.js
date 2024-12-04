'use strict';

const { merge } = require('webpack-merge');

const common = require('./webpack.common.js');
const PATHS = require('./paths');

// Merge webpack configuration files
const config = (env, argv) =>
  merge(common, {
    entry: {
      content_script: PATHS.src + '/content_script.js',
      service_worker: PATHS.src + '/service_worker.js',
      execute: PATHS.src + '/execute.js',
    },
    devtool: argv.mode === 'production' ? false : 'source-map',
  });

module.exports = config;
