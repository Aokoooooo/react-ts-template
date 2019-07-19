const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackPlugin
} = require("customize-cra");
const es3ifyPlugin = require("es3ify-webpack-plugin");

module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    importLoaders: true
  }),
  addWebpackPlugin(new es3ifyPlugin())
);
