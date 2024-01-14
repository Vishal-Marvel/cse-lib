import path from "path"

module.exports = {
    // Other webpack configuration settings...

    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },

    // Other webpack configuration settings...

    module: {
        rules: [
            // Add your TypeScript/JavaScript loader configuration here...
            {
                test: /\.(ts|tsx|js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader', // You might use ts-loader for TypeScript files
                },
            },
        ],
    },
};
