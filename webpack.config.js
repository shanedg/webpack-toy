const path = require('path');
const webpack = require('webpack');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;

const MyCustomWebpackPlugin = require('./custom-webpack-plugin/custom-webpack-plugin');

const webpackProgressOptions = {
    profile: true,
};

const webpackBundleAnalyzerOptions = {
    analyzerMode: 'static',
    reportFilename: '../stats/config-report.html',
    defaultSizes: 'parsed',
    openAnalyzer: false,
    generateStatsFile: true,
    statsFilename: '../stats/config-stats.json',
    statsOptions: {
        all: true,
    },
    excludeAssets: null,
    logLevel: 'info',
};

module.exports = function(env, args) {
    return {
        mode: 'development',
        entry: {
            index: './src/index.ts',
        },

        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, 'dist')
        },

        plugins: [
            new CleanWebpackPlugin(),
            new MyCustomWebpackPlugin(),
            new webpack.ProgressPlugin(webpackProgressOptions),
            new BundleAnalyzerPlugin(webpackBundleAnalyzerOptions),
        ],

        devtool: 'source-map',

        stats: {
            all: true,
        },

        module: {
            rules: [
                {
                    test: /\.j|ts$/,
                    include: [
                        path.resolve(__dirname, 'src'),
                    ],
                    exclude: [/node_modules/],
                    loader: [
                        'babel-loader',
                        'ts-loader',
                    ]
                },
            ]
        },

        optimization: {
            splitChunks: {
                cacheGroups: {
                    vendors: {
                        priority: -10,
                        test: /[\\/]node_modules[\\/]/
                    }
                },

                chunks: 'async',
                minChunks: 1,
                minSize: 30000,
                name: true
            }
        },

        resolve: {
            extensions: ['.tsx', '.ts', '.js', '.jsx']
        },

        target: 'node'
    }
};
