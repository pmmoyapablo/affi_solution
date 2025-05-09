const singleSpaDefaults = require("webpack-config-single-spa-ts");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (webpackConfigEnv, argv) => {
  const orgName = "ventas";
  const isLocal = webpackConfigEnv && webpackConfigEnv.isLocal;
  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName: "root-config",
    webpackConfigEnv,
    argv,
    disableHtmlGeneration: true
  });

  const final = {
    ...defaultConfig,
    plugins: [
      ...defaultConfig.plugins,
      new HtmlWebpackPlugin({
        inject: false,
        filename: "index.html",
        template: "src/index.ejs",
        templateParameters: {
          isLocal,
          orgName,
          FEATURE_APP_DATA: process.env.FEATURE_APP_DATA
        }
      })
    ]
  };

  return final;
};
