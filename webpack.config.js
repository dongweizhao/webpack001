/**
 * Created by dongweizhao on 16-1-14.
 */
var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
var RESOURCE_PATH = path.resolve(ROOT_PATH, 'resource');

var metadata = {
    title: 'Angular2 Webpack Starter by @gdi2990 from @AngularClass',
    baseUrl: '/',
    host: 'localhost',
    port: 3000
};

module.exports = {
    metadata: metadata,
    entry: {
        index: path.resolve(APP_PATH, 'index/js/index.js'),
        login: path.resolve(APP_PATH, 'login/js/login.js'),
        common: ['jquery', 'underscore',path.resolve(RESOURCE_PATH, 'lib/bootstrap/js/bootstrap.js'),path.resolve(RESOURCE_PATH, 'lib/bootstrap/css/bootstrap.css')]
    },
    output: {
       // publicPath: "http://localhost/",
        path: BUILD_PATH,
        filename: "[name]/[name].js"
    },
    //enable dev source map
    // devtool: 'eval-source-map',
    plugins: [
        new ExtractTextPlugin("[name]/[name].css"),
        new CommonsChunkPlugin("common", 'common/common.js'),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            "_": "underscore"
        }),
        new HtmlWebpackPlugin({
            title: 'My Index',
            template: path.resolve(ROOT_PATH, 'index.html'),    //html模板路径
            filename: 'index.html',
            inject: 'body',//插入到body底部
            //chunks这个参数告诉插件要引用entry里面的哪几个入口
            chunks: ['index', 'common'],
            minify: {    //压缩HTML文件
                removeComments: true,    //移除HTML中的注释
                collapseWhitespace: false    //删除空白符与换行符
            }
        }),
        new HtmlWebpackPlugin({
            title: 'My Login',
            template: path.resolve(ROOT_PATH, 'login.html'),    //html模板路径,
            filename: 'login.html',
            //chunks这个参数告诉插件要引用entry里面的哪几个入口
            chunks: ['login', 'common'],
            inject: 'body',//插入到body底部
            minify: {    //压缩HTML文件
                removeComments: true,    //移除HTML中的注释
                collapseWhitespace: false    //删除空白符与换行符
            }
        })
    ],
    module: {
        loaders: [
            {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")},
           // {test: /\.css$/, loader: "style-loader!css-loader"},
            //图片文件使用 url-loader 来处理，小于8kb的直接转为base64
            { test: /\.(png|jpg|woff|woff2|ttf|eot|svg)$/, loader: 'url-loader?limit=10240&name=images/[name].[ext]'},
            {test: /\.html/, loader: "html"}
        ]
    }

};