const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");
const tsNameof = require("ts-nameof");


const _DIST_FOLDER = "/dist";
let _FILE_NAME = "[name].js";

module.exports = {
    entry: {
        index: './src/index.tsx'
    },
    output: {
        filename: _FILE_NAME,
        chunkFilename: _FILE_NAME,
        path: path.join(__dirname, _DIST_FOLDER),
        publicPath: '/',
        pathinfo: false

    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader'
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            experimentalWatchApi: true,
                            getCustomTransformers: () => ({ before: [tsNameof] })
                        },
                    }
                ]
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },

    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    plugins: [
        new HtmlWebpackPlugin({
            'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no',
            title: '',
            hash: true,
            template: './html/index.template.html'
        })
    ],
    optimization: {
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    }
}