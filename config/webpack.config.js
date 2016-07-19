var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    
    entry:{
        main: root('client2/app/index.ts')
    },
    
    output: {
        filename: '[name].bundle.js',
        sourceMapFilename: '[name].map',
        path: root('dist')
    },
    
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loader: 'source-map-loader'
            }
        ],
        
        loaders: [
            {
                test: /\.ts$/,
                include: [root('client2')],
                loaders: ['ng-annotate', 'awesome-typescript-loader'],
            },
            
            {
                test: /\.html$/,
                exclude: [root('client2/index.html')],
                loader: 'raw-loader'
            }
        ]
    },
    
    resolve: {
        extensions: ['', '.js', '.ts'],
        root: root('client2'),
        modulesDirectories: ['node_modules']
    },
    
    plugins: [
        new HtmlWebpackPlugin({
            template: root('client2/index.html'),
            chunksSortMode: 'dependency'
        })/*,
        
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        })*/
    ],
    
    devtool: 'source-map'
};

function root (path) {
    return __dirname.concat('/../', path);
}