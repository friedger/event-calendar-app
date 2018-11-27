var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');

module.exports = {
    devtool: 'source-map',
    entry: ['webpack-hot-middleware/client', './src/app.js'],

    output: {
        path: path.join(__dirname, '/src/'),
        filename: '[name].js',
        publicPath: '/'
    },
    module: {
        loaders: [
            {
                test: require.resolve('tinymce/tinymce'),
                loaders: ['imports?this=>window', 'exports?window.tinymce']
            },
            {
                test: /tinymce\/(themes|plugins)\//,
                loaders: ['imports?this=>window']
            },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react'],
                    env: {
                        development: {
                            plugins: [
                                [
                                    'react-transform',
                                    {
                                        transforms: [
                                            {
                                                transform:
                                                    'react-transform-hmr',
                                                imports: ['react'],
                                                locals: ['module']
                                            },
                                            {
                                                transform:
                                                    'react-transform-catch-errors',
                                                imports: [
                                                    'react',
                                                    'redbox-react'
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            ]
                        }
                    }
                }
            },
            {
                test: /\.(ttf|eot|svg|woff2|woff)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader'
            },
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass', 'postcss-loader']
            },
            {
                test: /\.css$/,
                loaders: ['style', 'css', 'postcss-loader']
            },
            {
                include: /\.json$/,
                loaders: ['json-loader']
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('./styles.css')
    ]
};
