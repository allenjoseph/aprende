module.exports = {
    output: {
        filename: 'app.bundle.js',
        sourceMapFilename: 'app.bundle.map'
    },
    module: {
        preLoaders: [{
            test: /\.js$/,
            loader: 'source-map-loader',
            exclude: [
                // these packages have problems with their sourcemaps
                './node_modules/rxjs',
                './node_modules/@angular'
            ]
        }],
        loaders: [{
            test: /\.ts$/,
            exclude: /node_modules/,
            loader: 'awesome-typescript-loader',
        }]
    },
    resolve: {
        extensions: ['', '.js', '.ts'],
        root: './.temp',
        modulesDirectories: ['node_modules'],
    },
    /**
    * Developer tool to enhance debugging
    *
    * See: http://webpack.github.io/docs/configuration.html#devtool
    * See: https://github.com/webpack/docs/wiki/build-performance#sourcemaps
    */
    devtool: 'cheap-eval-source-map'
};