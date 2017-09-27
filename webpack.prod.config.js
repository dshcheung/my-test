var webpack = require('webpack');

module.exports = function () {
  return {
    entry: {
      main: './src/index.jsx'
    },
    output: {
      path: __dirname + '/public',
      publicPath: '/',
      filename: 'bundle.js'
    },
    module: {
      rules: [
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
      // new webpack.optimize.UglifyJsPlugin({
      //   compress: {
      //     warnings: false
      //   },
      //   comments: false,
      //   minimize: false,
      //   sourceMap: true
      // }),
      new webpack.LoaderOptionsPlugin({
        // debug: false
        debug: true
      }),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify("development"),
          'API_URL': JSON.stringify(process.env.API_URL || 'https://scarif-api.herokuapp.com'),
          'API_VERSION': JSON.stringify(process.env.API_VERSION || '/v1/')
        }
      })
    ]
  };
};
