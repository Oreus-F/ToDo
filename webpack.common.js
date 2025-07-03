const path = require('path');
const HtmlPluginWebpack = require('html-webpack-plugin');


module.exports = {

    entry: './src/index.js',
    output: {
        filename: 'mainBundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },


    plugins : [
        new HtmlPluginWebpack({
            template: './src/template.html',
        }),
    ],

    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/i,
                type: 'asset/ressource',
            },
        ],
    },
};