const withCss = require("@zeit/next-css");
const withImages = require("next-images");
module.exports = withImages(
  withCss({
    async redirects() {
      return [
        {
          source: "/words",
          destination: "/",
          permanent: true,
        },
      ];
    },
  }),
);
// }
// withCSS(
// 	withSass({
// 		target: 'serverless',
// 		cssModules: true,
// 	})
// )
