const withCss = require("@zeit/next-css");
const withImages = require("next-images");
module.exports = withImages(
  withCss({
    inlineImageLimit: 16384,
    async redirects() {
      return [
        {
          source: "/dict/en_en",
          destination: "/dictionary",
          permanent: true,
        },
        {
          source: "/dict/en_vn",
          destination: "/dictionary",
          permanent: true,
        },
        {
          source: "/dict",
          destination: "/dictionary",
          permanent: true,
        },
        {
          source: "/qa",
          destination: "/",
          permanent: true,
        },
      ];
    },
  }),
);
