/**
 * Created by dongweizhao on 16-1-14.
 */
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

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
        vendors: ['jquery', 'underscore', path.resolve(ROOT_PATH, 'resource/lib/bootstrap/js/bootstrap.js'), path.resolve(ROOT_PATH, 'resource/lib/bootstrap/css/bootstrap.css')]
    },
    output: {
        // publicPath: "http://localhost/",
        path: BUILD_PATH,
        filename: "js/[name].js"
    },
    //enable dev source map
    // devtool: 'eval-source-map',
    plugins: [
        new ExtractTextPlugin("[name].css"),
        //new CommonsChunkPlugin({name:['vendors','jp'],filename:['vendors.js','jp.js']}),
//        new CommonsChunkPlugin("jp", 'jp.js'),
        new CommonsChunkPlugin("vendors", 'vendors.js'),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            "_": "underscore"
        }),
        new HtmlWebpackPlugin({
            title: 'My Index',
            template: path.resolve(APP_PATH, 'index/template/index.html'),    //html模板路径
            filename: 'index.html',
            inject: 'body',//插入到body底部
            //chunks这个参数告诉插件要引用entry里面的哪几个入口
            chunks: ['index', 'vendors'],
            minify: {    //压缩HTML文件
                removeComments: true,    //移除HTML中的注释
                collapseWhitespace: false    //删除空白符与换行符
            }
        }),
        new HtmlWebpackPlugin({
            title: 'My Login',
            template: path.resolve(APP_PATH, 'login/template/login.html'),    //html模板路径,
            filename: 'login.html',
            //chunks这个参数告诉插件要引用entry里面的哪几个入口
            chunks: ['login', 'vendors'],
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
            //{test: /\.css$/, loader: "style-loader!css-loader"},
            //图片文件使用 url-loader 来处理，小于8kb的直接转为base64
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=10240'},
            //{ test: /\.(eot|svg|ttf|woff|woff2)$/, loader: "file-loader" },
            { test: /\.woff$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
            { test: /\.woff2$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
            { test: /\.ttf$/,  loader: "url-loader?limit=10000&mimetype=application/octet-stream" },
            { test: /\.eot$/,  loader: "file-loader" },
            { test: /\.svg$/,  loader: "url-loader?limit=10000&mimetype=image/svg+xml" },
            {test: /\.html/, loader: "html"}
        ]
    }

};