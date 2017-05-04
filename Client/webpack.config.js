const webpack = require('webpack');
// var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js",
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
                    {loader: 'css-loader?importLoaders=1', options: {url: false}},
                    {loader: 'postcss-loader'},


                ]
            },
            {
                test: /\.jpg$/,
                loader: "url-loader",
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
            },

        ],


    },
 //   plugins: [new BundleAnalyzerPlugin()]
    plugins: [
        new webpack.optimize.UglifyJsPlugin()
    ]

};
