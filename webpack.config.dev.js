const webpack = require('webpack');
const merge = require('webpack-merge');

const common = require('./webpack.config.common.js');

module.exports = merge(common, {
    devtool: 'inline-source-map',
    mode: 'development',
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:5000',
                pathRewrite: { '^/api': '' },
            },
        }
    }
});