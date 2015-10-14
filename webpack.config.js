var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {

  context: path.join(__dirname, "/src"),
  entry: [
    './main.js',
  ],

  // Produces one output file called
  // `bundle.js` in the dist directory.
  //
  // Webpack can do more complicated stuff,
  // like code splitting.
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "dist"),
  },

  module: {
    // Process all files in the src directory
    // through the babel system. The babel loader
    // processes jsx and ES6 js.
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]') },
      { test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192'},
      // { test: /\.json$/, loader: 'json-loader' },
    ],
  },

  plugins: [
    new ExtractTextPlugin('style.css', { allChunks: true }),
  ],

}
