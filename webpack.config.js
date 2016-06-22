module.exports = {
    output: {
        filename: 'app.bundle.js'
    },
    module: {
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