module.exports = {
    entry: __dirname + '/scripts/app.ts',
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
        filename: 'bundle.js'
    }
};