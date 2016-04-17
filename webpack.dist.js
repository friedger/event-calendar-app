var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');

module.exports = {
    entry: [
        './src/app.js'
    ],

    output: {
        path: path.join(__dirname, '/server/public/build'),
        filename: '[name].js',
        publicPath: '/'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /(node_modules)/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'react']
            }
        }, {
            test: /\.(ttf|eot|svg|woff2|woff)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "file-loader"
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract(
                // activate source maps via loader query
                'css?sourceMap!' +
                'sass?sourceMap&')
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    plugins: [
        new ExtractTextPlugin("./styles.css"),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.DedupePlugin()
    ]
};
