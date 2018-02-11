var webpack = require('webpack');

module.exports = function () {
  return {
    entry: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      './src/index.jsx'
    ],
    output: {
      path: __dirname + '/public',
      publicPath: '/',
      filename: 'bundle.js'
    },
    devServer: {
      host: 'localhost',
      port: '8080',
      historyApiFallback: true,
      contentBase: './public'
    },
    module: {
      rules: [
        {
          exclude: /node_modules/,
          test: /\.jsx$/,
          enforce: "pre",
          loader: "eslint-loader"
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.scss$/,
          use: [
            'style-loader',
            'css-loader',
            'resolve-url-loader',
            'sass-loader?sourceMap'
          ]
        },
        {
          test: /\.(gif|png|woff|woff2|eot|ttf|svg)$/,
          loader: 'url-loader'
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx']
    },
    plugins: [
      new webpack.LoaderOptionsPlugin({
        debug: true
      }),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify("development"),
          'API_URL': JSON.stringify(process.env.API_URL || 'https://scarif-api.herokuapp.com'),
          // 'API_URL': JSON.stringify('http://angelhub-api.herokuapp.com/'),
          'API_VERSION': JSON.stringify(process.env.API_VERSION || '/v1/')
        }
      })
    ]
  };
};
