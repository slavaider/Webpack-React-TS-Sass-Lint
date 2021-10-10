const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isDevelopment = process.env.npm_lifecycle_event === "start";

const base = require("./tsconfig.paths.json");

function parseString(stringToParse) {
  const regex = new RegExp("^([a-z\\/@]+)(\\/\\*)+$");
  return stringToParse.match(regex)[1];
}

function getPaths() {
  const {
    compilerOptions: { paths },
  } = base;
  const resolvePath = (pathName) => path.resolve(__dirname, pathName);
  return Object.keys(paths).reduce(
    (result, key) => ({
      ...result,
      [parseString(key)]: resolvePath(parseString(paths[key][0])),
    }),
    {}
  );
}

const getSettingsForStyles = (isModule = false) => {
  return [
    isDevelopment
      ? { loader: "style-loader" }
      : {
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: "../",
          },
        },
    !isModule
      ? "css-loader"
      : {
          loader: "css-loader",
          options: {
            modules: {
              localIdentName: isDevelopment
                ? "[path][name]__[local]"
                : "[hash:base64]",
            },
          },
        },
    {
      loader: "sass-loader",
      options: {
        sourceMap: true,
      },
    },
    !isDevelopment && {
      loader: "postcss-loader",
    },
  ].filter(Boolean);
};

module.exports = {
  context: __dirname,
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].[contenthash].js",
    publicPath: "",
  },
  mode: isDevelopment ? "development" : "production",
  devtool: isDevelopment ? "inline-source-map" : "hidden-source-map",
  devServer: {
    historyApiFallback: true,
    port: process.env.PORT || 4000,
    open: true,
    hot: true,
    inline: true,
  },
  target: isDevelopment ? "web" : "browserslist",
  entry: path.resolve(__dirname, "src", "index.tsx"),
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.module.(sa|sc|c)ss$/,
        use: getSettingsForStyles(true),
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /\.module.(sa|sc|c)ss$/,
        use: getSettingsForStyles(),
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: getPaths(),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      favicon: "./public/favicon.ico",
    }),
    new ESLintPlugin({
      extensions: ["js", "jsx", "ts", "tsx"],
    }),
    new CleanWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin(),
    !isDevelopment &&
      new MiniCssExtractPlugin({
        filename: "css/bundle.css",
      }),
    isDevelopment && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
};
