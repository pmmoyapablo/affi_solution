const singleSpaDefaults = require("webpack-config-single-spa-ts");
const debug = require("debug")("styleguide");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "ventas",
    projectName: "utils",
    webpackConfigEnv,
    argv,
  });

 
  const final = {
    ...defaultConfig,
    devServer: {
      ...defaultConfig.devServer,
      port: 9002,
      https: Boolean(process.env.HTTPS),
    },
    output: {
      ...defaultConfig.output,
      filename: "main.js",
    },
    module:{
      ...defaultConfig.module,
      rules: [
        ...defaultConfig.module.rules,
        {
          test: /\.(js|ts)x?$/,
          exclude: /node_modules/,
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-typescript"
            ],
          },
        },
      ]
    },
    stats: "errors-warnings",
  }
  debug(final);
  return final;  
 };
