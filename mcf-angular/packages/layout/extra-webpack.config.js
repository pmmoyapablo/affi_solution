const singleSpaAngularWebpack = require('single-spa-angular/lib/webpack').default;
const { merge } = require('webpack-merge');

module.exports = (config, options) => {
  const singleSpaWebpackConfig = singleSpaAngularWebpack(config, options);

  return merge(singleSpaWebpackConfig, {
		externals:[/^@ventas\//],
	});
};


//  if (!singleSpaWebpackConfig.externals) {
//   singleSpaWebpackConfig.externals = [];
// }

// singleSpaWebpackConfig.externals.push(/^@ventas\//); 

// return singleSpaWebpackConfig;
// };
