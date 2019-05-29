const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const common = require('./webpack.config.common.js');

module.exports = merge(common, {
    devtool: 'hidden-source-map',
    mode: 'production',
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode: 'static'
        })
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin()
        ],
    },
});