var webpack = require('webpack');
// var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CompressionPlugin = require("compression-webpack-plugin");

const VENDOR_LIBS = [
    'react', 'react-dom',
    'redux', 'redux-immutable', 'redux-form',
    'lodash', 'reselect', 'react-router',
    'axios', 'immutable', 'react-masonry-component',
    'react-router-redux', 'react-select',
    'reactstrap', 'redux-saga', 'react-router-dom',
    'react-apollo'
];

module.exports = {
    entry: {
        bundle: "./src/index.tsx",
        vendor: VENDOR_LIBS
    },
    output: {
        filename: "[name].[chunkhash].js",
        path: __dirname + "/../Backend/Compiled/dist/"
    },
    // switch to source-map only for production
    devtool: 'eval-source-map',
    //  devtool: 'cheap-module-eval-source-map',

    resolve: {
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader?importLoaders=1',options:{url: false}},
                    {loader: 'postcss-loader'}

                ]
            },
            {
                test: /\.jpg$/,
                loader: "url-loader"
            },
            {
                test: /\.mp3$/,
                exclude: /(node_modules)/,
                loader: 'file-loader'
            },
            {
                test: /\.tsx$/,
                enforce: 'pre',
                loader: 'tslint-loader',
                options: {},
                exclude: [/node_modules/, /\.d.ts/]

            },
            {
                test: /\.tsx?$/,
                loaders: ['awesome-typescript-loader'],
                exclude: /node_modules/
            }

        ]


    },
    //   plugins: [new BundleAnalyzerPlugin()]
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest']
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new CompressionPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.(js|html)$/,
            threshold: 10240,
            minRatio: 0.8
        })
    ]

};
