const path = require('path')

module.exports = {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'main.js',
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.html$/i,
                use: [
                    'html-loader'
                ]
            },
            {
                test: /\.styles.scss$/,
                exclude: /node_modules/,
                use: [
                "sass-to-string",
                {
                    loader: "sass-loader",
                    options: {
                    sassOptions: {
                        outputStyle: "compressed",
                    },
                    },
                },
                ],
            },
            // {
            //     test: /\.js$/,
            //     exclude: /node_modules/,
            //     loader: 'babel-loader'
            // }
        ],
    },
    externals: {
        // 'customSelect': 'custom-select'
    }
}
