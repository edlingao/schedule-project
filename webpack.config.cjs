const path = require('path')

module.exports = {
    entry: './frontend/index.js',
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
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader', 
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,

                        },
                    },
                ],
            },
            {
                test:  /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-react']
                  }
                }
            }
        ],
    },
    externals: {
        // 'customSelect': 'custom-select'
    }
}
