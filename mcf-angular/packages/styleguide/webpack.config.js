const singleSpaDefaults = require("webpack-config-single-spa-ts");
const debug = require("debug")("styleguide");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "ventas",
    projectName: "styleguide",
    webpackConfigEnv,
    argv, 
  });

 const final = {
   ...defaultConfig,
   devServer: {
     ...defaultConfig.devServer,
     port: 9001,
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
         test: /\.s[ac]ss$/i,
         use: [
           "style-loader",
           "css-loader",
           {
             loader: "sass-loader",
             options: {
               sourceMap: true
             }
           }
         ],
       },
       {
         test: /\.css$/i,
         use: ["style-loader", "css-loader"],
       },
       {
         test: /\.(ts|js)x?$/,
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
