const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const stylesHandler = MiniCssExtractPlugin.loader;
const TerserPlugin = require("terser-webpack-plugin");

const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;
module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  devServer: {
    open: true,
  },
  devtool: "inline-source-map",
  resolve: {
    extensions: [".js", ".jsx", ".css", ".less", ".mjs"],
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: lessRegex,
        exclude: lessModuleRegex,
        use: [stylesHandler, "css-loader", "postcss-loader", "less-loader"],
      },
      {
        test: lessModuleRegex,
        use: [
          stylesHandler,
          {
  