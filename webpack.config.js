var path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/Highlighter.jsx',
    output: {
        path: path.resolve('lib'),
        filename: 'Highlighter.js',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                use: 'babel-loader'
            }
        ]
    }
}