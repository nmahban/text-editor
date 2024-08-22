const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [],

    module: {
      rules: [],
    },
  };
};
module.exports = {
  mode: "development",
  entry: "./client/src/js/index.js",
  output: {
    filename: "main.bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.css$/, 
        use: ["style-loader", "css-loader"], 
      },
     
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./client/public/index.html",
    }),
    new InjectManifest({
      swSrc: "./client/src/js/service-worker.js",
      swDest: "service-worker.js",
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 8080,
  },
};
