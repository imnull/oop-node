var webpack = require("webpack");
module.exports = {
    entry: {
        bundle : './index.js'
    },
    output: {
        filename: "main.js",
        path: __dirname + '/dist',
        libraryTarget: 'commonjs',
        // library: 'OOPNode',
        // umdNamedDefine: true,
    },
    module: {
        rules: [
           
        ]
    },
    resolve:{
        extensions:['.js']  //用于配置程序可以自行补全哪些文件后缀
    },

    optimization: {
        minimize: true
    },
};