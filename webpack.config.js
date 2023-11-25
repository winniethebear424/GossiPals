const path = require('path');

module.exports = {
    entry: './src/app.js',
    mode: 'development',
    devServer: {
        static: path.join(__dirname, 'public'),
        compress: true,
        port: 3000,
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
}
