const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isDev = process.env.npm_lifecycle_event === "start";

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
  return Object.keys(paths).reduce((result, key) => {
    result[parseString(key)] = resolvePath(parseString(paths[key][0]));
    return result;
  }, {});
}

const stylesConfig = [
  {
    loader: MiniCssExtractPlugin.loader,
    options: {
      publicPath: "../",
    },
  },
  {
    loader: "css-loader",
  },
  {
    loader: "sass-loader",
    options: {
      sourceMap: true,
    },
  },
];

if (!isDev) {
  stylesConfig.push({
    loader: "postcss-loader",
  });
}

module.exports = {
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    publicPath: "",
  },
  mode: isDev ? "development" : "production",
  devtool: isDev ? "inline-source-map" : false,
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    historyApiFallback: true,
    port: 4000,
    open: true,
    hot: true,
  },
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: stylesConfig,
      },

      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "./assets/img",
              name: "[name].[ext]",
            },
          },
        ],
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
    new MiniCssExtractPlugin({
      filename: "css/bundle.css",
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      favicon: "./public/favicon.ico",
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ESLintPlugin({
      extensions: ["js", "jsx", "ts", "tsx"],
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/assets"),
          to: path.resolve(__dirname, "dist/assets"),
        },
      ],
    }),
  ],
};
