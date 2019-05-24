const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TransferWebpackPlugin = require('transfer-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const ROOT_PATH = path.resolve(__dirname);
const DIST_PATH = path.resolve(ROOT_PATH, './src/ui_prd');
const PUBLIC_PATH = process.env.NODE_ENV === 'production' ? './' : '/';

const UI_PATH = './src/ui/';
const HOST = '127.0.0.1';
const PORT = '8080';
module.exports = {
    entry : UI_PATH + 'App.js',
    output: {
        path      : DIST_PATH,
        publicPath: PUBLIC_PATH,
        filename  : 'js/[name].[hash:7].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use : [
                    'vue-style-loader',
                    'css-loader'
                ],
            },
            {
                test: /\.scss$/,
                use : [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                ],
            },
            {
                test: /\.sass$/,
                use : [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader?indentedSyntax'
                ],
            },
            {
                test   : /\.vue$/,
                loader : 'vue-loader',
                options: {
                    loaders: {
                        'scss': [
                            'vue-style-loader',
                            'css-loader',
                            'sass-loader'
                        ],
                        'sass': [
                            'vue-style-loader',
                            'css-loader',
                            'sass-loader?indentedSyntax'
                        ]
                    }
                }
            },
            {
                test   : /\.js$/,
                loader : 'babel-loader',
                exclude: /node_modules/
            },
            {
                test   : /\.(png|jpg|gif)$/,
                loaders: [
                    'url-loader?limit=30720&name=img/[name].[ext]',
                    'image-webpack-loader'
                ]
            },
            {
                test   : /\.(eot|svg|ttf|woff|woff2)$/,
                loader : 'file-loader',
                options: {
                    name: 'font/[name].[ext]'
                }
            },
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['.js', '.ts', '.vue']
    },
    devServer: {
        historyApiFallback: true,
        noInfo            : true,
        overlay           : true,
        host              : '0.0.0.0',
        contentBase       : UI_PATH,
        public            : HOST + ':' + PORT,
        disableHostCheck  : true
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map',
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: UI_PATH + 'index.html'
        }),
    ]
};

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map';
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new UglifyJSPlugin(),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        new TransferWebpackPlugin([
            {from: UI_PATH + 'static', to: './static'}
        ], path.resolve(__dirname, ''))
    ])
}