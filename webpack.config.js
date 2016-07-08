var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    
    entry:{
        polyfills: './client2/app/app.polyfills.ts',
        vendor: './client2/app/app.vendor.ts',
        main: './client2/app/app.main.ts'
    },
    
    output: {
        filename: '[name].bundle.js',
        sourceMapFilename: '[name].map',
        path: './dist'
    },
    
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loader: 'source-map-loader',
                exclude: [
                    // these packages have problems with their sourcemaps
                    './node_modules/rxjs',
                    './node_modules/@angular'
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
                exclude: ['./client2/index.html']
            }
        ]
    },
    
    resolve: {
        extensions: ['', '.js', '.ts'],
        root: './client2',
        modulesDirectories: ['./node_modules', './client2']
    },
    
    resolveLoader: {
        root: 'aprende/node_modules'
    },
    
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['main', 'vendor', 'polyfills']
        }),
        
        new HtmlWebpackPlugin({
            template: './client2/index.html',
            chunksSortMode: 'dependency'
        })
    ],
    /**
    * Developer tool to enhance debugging
    *
    * See: http://webpack.github.io/docs/configuration.html#devtool
    * See: https://github.com/webpack/docs/wiki/build-performance#sourcemaps
    */
    devtool: 'cheap-eval-source-map'
};