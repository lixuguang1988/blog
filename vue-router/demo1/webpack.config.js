var path = require("path");
const vueConfig = require('./vue-loader.config')
// var HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = {
    entry: "./src/entry.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueConfig
            },
            {
                test: /\.js$/,
                loader: 'buble-loader',
                exclude: /node_modules/,
                options: {
                    objectAssign: 'Object.assign'
                }
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            }            
        ]
    },
    // plugins: [
    //     new HtmlWebpackPlugin({template: './src/index.html'})
    // ]
};