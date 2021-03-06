const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackPlugin,
  addWebpackAlias
} = require("customize-cra");
const es3ifyPlugin = require("es3ify-webpack-plugin");
const modifyThemeVars = require("./src/styles/theme");

const setupMinify = () => config => {
  //只修改生产模式
  if (process.env.NODE_ENV !== "production") {
    return config;
  }
  const { MINIMIZE_STATIC_FILE, MINIMIZE_INDEX_FILE } = process.env;
  const { optimization, plugins } = config;
  // 是否压缩静态资源(js,css,media)
  if (isValidEnvParam(MINIMIZE_STATIC_FILE)) {
    optimization.minimize = isTrue(MINIMIZE_STATIC_FILE);
  }
  // 是否压缩 index.html
  if (isValidEnvParam(MINIMIZE_INDEX_FILE) && plugins.length > 0) {
    const { minify } = plugins[0].options;
    if (!minify || minify === {}) {
      return config;
    }
    Object.keys(minify).forEach(i => {
      minify[i] = isTrue(MINIMIZE_INDEX_FILE);
    });
  }
  return config;
};

const isValidEnvParam = param => {
  return typeof param !== "undefined" && param !== "";
};

const isTrue = inputString => {
  return inputString === "true";
};

module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    importLoaders: true,
    modifyVars: modifyThemeVars
  }),
  addWebpackAlias({ "@": require("path").resolve(__dirname, "src") }),
  addWebpackPlugin(new es3ifyPlugin()),
  setupMinify()
);
