const path = require('path');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, '/build'),
        filename: 'bundle.js',
    },
    mode: process.env.NODE_ENV,
    // plugins: [new MiniCssExtractPlugin()],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'], //preset configs for babel
                        plugins: ['@babel/plugin-transform-runtime', '@babel/transform-async-to-generator'],
                    },
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    devServer: {
        publicPath: '/build/',
        proxy: {
            '/': 'http://localhost:3000',
        },
    },
    resolve: {
        extensions: ['.js', '.jsx'],
      },
};