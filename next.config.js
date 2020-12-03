const withCss = require("@zeit/next-css");
const withImages = require("next-images");
module.exports = withImages(
  withCss({
    inlineImageLimit: 16384,
    async redirects() {
      return [
        {
          source: "/dict/en_en",
          destination: "/",
          permanent: true,
        },
        {
          source: "/dict/en_vn",
          destination: "/",
          permanent: true,
        },
        {
          source: "/dict",
          destination: "/",
          permanent: true,
        },
      ];
    },
  }),
);
