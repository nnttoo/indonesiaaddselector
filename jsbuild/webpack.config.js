const MiniCssExtractPlugin = require('mini-css-extract-plugin');

resolve = require('path').resolve 
module.exports = {
    /** agar require electon bisa bekerja */  
    plugins: [new MiniCssExtractPlugin({
        filename: 'main.css',
    })],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    {
                      loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader',
                  ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']                       

                    }
                }
            },
            {
                test: /\.(ttf|eot|svg|gif|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [{
                    loader: 'file-loader',
                }]
            },
        ]
    },
    target : 'web',
    entry: {
        server : './src/server.js',
        view : './src/view.js',
        viewimplement : './src/viewimplement.js'
    },
    optimization: {
        minimize: true
    },
    output: {
        path: resolve('../docs/js'),
        publicPath: '',
        library: 'indoselector', 
        filename: 'bundle[name].js' 
    }, 

    devServer: {
        publicPath: "/",
        contentBase: resolve('../output/views/'),
        hot: false,
        writeToDisk: true
    }
};