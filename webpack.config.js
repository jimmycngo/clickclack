const path = require('path');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
console.log('The Process ENV variable', process.env.NODE_ENV);

module.exports = {
    entry: './src/index.js',
    mode: process.env.NODE_ENV,
    devServer: {
        // contentBase: path.resolve(__dirname, '/build'),
        publicPath: '/',
        proxy: {
            '/': 'http://localhost:3000',
        },
    },
    output: {
        path: path.join(__dirname, '/build'),
        filename: 'bundle.js',
    },
    // plugins: [new MiniCssExtractPlugin()],
    performance: {
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react',], //preset configs for babel
                    },
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },

    resolve: {
        extensions: ['.js', '.jsx'],
      },
};