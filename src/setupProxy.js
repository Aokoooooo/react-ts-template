const proxy = require("http-proxy-middleware");
const target = process.env.REACT_APP_DEV_BASE_URL;

module.exports = function(app) {
  app.use(
    proxy("/api", {
      target,
      changeOrigin: true,
      pathRewrite: { "^/api": "" }
    })
  );
};
