const path = require('path');

module.exports = () => {
    return {
        entry: './src/index',
        output: {
            path: path.join(__dirname),
            filename: 'bundle.js'
        },
        module: {
            rules: [{
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            }]
        }
    }
};