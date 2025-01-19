module.exports = {
    entry: './src/index.ts',
    output: {
      filename: 'bundle.js',
      path: __dirname + '/dist',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    devServer: {
      contentBase: './dist',
    },
  };