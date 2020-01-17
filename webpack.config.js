const path = require('path');

module.exports = {
    entry: {
        home: './app/views/assets/home.ts',
        detail: './app/views/assets/detail.ts',
        cart: './app/views/assets/cart.ts',
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts'],
    },
    output: {
        path: path.resolve(__dirname, 'build', 'views', 'assets'),
    },
};