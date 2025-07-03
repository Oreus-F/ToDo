const path = require('path');
const HtmlPluginWebpack = require('html-webpack-plugin');


module.exports = {

    entry: './src/index.js',
    output: {
        filename: 'mainBundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
}