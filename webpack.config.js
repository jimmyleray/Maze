module.exports = {
    entry: __dirname + '/src/app.ts',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    output: {
        path: __dirname + '/dist',
        filename: 'app.js'
    }
};