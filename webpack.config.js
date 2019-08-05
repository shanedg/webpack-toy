const path = require('path');
const webpack = require('webpack');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;

/*
 * SplitChunksPlugin is enabled by default and replaced
 * deprecated CommonsChunkPlugin. It automatically identifies modules which
 * should be splitted of chunk by heuristics using module duplication count and
 * module category (i. e. node_modules). And splits the chunks…
 *
 * It is safe to remove "splitChunks" from the generated configuration
 * and was added as an educational example.
 *
 * https://webpack.js.org/plugins/split-chunks-plugin/
 *
 */

const webpackProgressOptions = {
    profile: true,
    // // custom handler for progress reporting
    // handler: (percentage, message, ...args) => {
    //     console.info(percentage, message);
    // },
};

const webpackBundleAnalyzerOptions = {
    analyzerMode: 'static',
    analyzerHost: '127.0.0.1',
    analyzerPort: '8888',
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
            index: './src/index.ts'
        },

        output: {
            filename: '[name].[chunkhash].js',
            path: path.resolve(__dirname, 'dist')
        },

        plugins: [
            new CleanWebpackPlugin(),
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
                    test: /.(ts|tsx)?$/,
                    loader: 'ts-loader',
                    include: [path.resolve(__dirname, 'src')],
                    exclude: [/node_modules/]
                }
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
            extensions: ['.tsx', '.ts', '.js']
        },

        target: 'node'
    }
};
