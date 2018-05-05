import path from 'path';
const HtmlWebpackPlugin = require('html-webpack-plugin');
import { VueLoaderPlugin } from 'vue-loader';
import webpack from 'webpack';
import Visualizer from 'webpack-visualizer-plugin';

const NODE_ENV = process.env.NODE_ENV;

const conf = {
    mode: NODE_ENV,
    entry: './src/index.js',
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            vue$: 'vue/dist/vue.esm.js'
        }
    },

    module: {
        rules: [
            {test: /\.vue$/, exclude: /node_modules/, use: 'vue-loader'},
            {test: /\.js$/, exclude: /node_modules/, use: 'babel-loader'},
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({template: './src/index.html', inject: 'body', hash: 'false'}),
        new webpack.DefinePlugin({
            VERSION: JSON.stringify(require("./package.json").version)
        }),
        new VueLoaderPlugin()
    ],

};

if (conf.mode === "development") {
    conf.devServer = {
        host: "localhost",
        proxy: {
            "/api": "http://localhost:8080"
        }
    }
}
if (conf.mode === "production") {
    conf.plugins.push(new Visualizer({filename: '../visualizer/statistics.html'}));
    conf.output = {
        ...conf.output,
        filename: 'play.js',
        path: path.resolve(__dirname, 'dist/draw.blueforest.org/play'),
        libraryTarget: 'var',
        library: 'Player'
    };
    conf.externals = {
        vue : "Vue"
    }
}

module.exports = conf;