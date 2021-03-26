import path from 'path'

const __dirname = path.resolve(process.cwd(), '.')

export default {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'main.js',
    },
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
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ],
    }
}