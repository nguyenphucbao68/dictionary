const withCss = require('@zeit/next-css');
const withImages = require('next-images');
module.exports = withImages(withCss());
// withCSS(
// 	withSass({
// 		target: 'serverless',
// 		cssModules: true,
// 	})
// )
