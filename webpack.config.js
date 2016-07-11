var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;


var root = '/home/ubuntu/workspace/';
var rootNodeDependencies = root + 'node_modules/webpack/node_modules/node-libs-browser/node_modules/';

module.exports = {
    
    entry:{
        polyfills: root + 'client2/app/app.polyfills.ts',
        vendor: root + 'client2/app/app.vendor.ts',
        main: root + 'client2/app/app.main.ts'
    },
    
    output: {
        filename: '[name].bundle.js',
        sourceMapFilename: '[name].map',
        path: root + 'dist'
    },
    
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loader: 'source-map-loader',
                exclude: [
                    // these packages have problems with their sourcemaps
                    root + 'node_modules/rxjs',
                    root + 'node_modules/@angular'
                ]
            }
        ],
        
        loaders: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: 'awesome-typescript-loader',
            },
            
            {
                test: /\.html$/,
                loader: 'raw-loader',
                exclude: [root + 'client2/index.html']
            }
        ]
    },
    
    resolve: {
        extensions: ['', '.js', '.ts'],
        root: root + 'client2',
        modulesDirectories: [root + 'node_modules'],
        alias: {/*libs with dependency problem*/
            'isarray': rootNodeDependencies + 'buffer/node_modules/isarray',
            'ieee754': rootNodeDependencies + 'buffer/node_modules/ieee754',
            'base64-js': rootNodeDependencies + 'buffer/node_modules/base64-js',
            'pbkdf2-compat/pbkdf2': rootNodeDependencies + 'crypto-browserify/node_modules/pbkdf2-compat/pbkdf2',
            'sha.js': rootNodeDependencies + 'crypto-browserify/node_modules/sha.js/sha1',
            'ripemd160': rootNodeDependencies + 'crypto-browserify/node_modules/ripemd160/lib/ripemd160',
            'create-hash.js': rootNodeDependencies + 'crypto-browserify/create-hash',
            'process/browser.js': rootNodeDependencies + 'timers-browserify/node_modules/process/browser',
            'inherits': rootNodeDependencies + 'util/node_modules/inherits/inherits'
        }
    },
    
    resolveLoader: {
        root: root + 'node_modules'
    },
    
    plugins: [
        new ForkCheckerPlugin(),
        
        new webpack.optimize.OccurenceOrderPlugin(true),
        
        new webpack.optimize.CommonsChunkPlugin({
            name: ['main', 'vendor', 'polyfills']
        }),
        
        new HtmlWebpackPlugin({
            template: root + 'client2/index.html',
            chunksSortMode: 'dependency'
        })
    ],
    
    devtool: 'cheap-eval-source-map'
};