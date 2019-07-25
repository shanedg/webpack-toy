const path = require('path');
const webpack = require('webpack');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

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

module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.ts'
    },

    output: {
        // filename: '[name].[chunkhash].js',
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },

    plugins: [
        new webpack.ProgressPlugin(),
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            analyzerHost: '127.0.0.1',
            analyzerPort: '8888',
            reportFilename: 'report.html',
            defaultSizes: 'parsed',
            openAnalyzer: true,
            generateStatsFile: true, // TODO: what if this was true, tho?
            statsFilename: 'generate-stats.json',
            statsOptions: null, // TODO: a bunch of config options available here
            excludeAssets: null,
            logLevel: 'info',
        }),
    ],

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
};
