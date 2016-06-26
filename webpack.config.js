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
        root: './client2',
        modulesDirectories: ['node_modules'],
    },
    devtool: 'source-map'
};