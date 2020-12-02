import React from "react";

const createURL = (link) => {
  return `<url>
  <loc>${link}</loc>
  <changefreq>daily</changefreq>
<priority>1.0</priority>
</url>`;
};

// TODO: update
const createSitemap = () => `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${createURL(`${process.env.ORIGIN_URL}`)}
    ${createURL(`${process.env.ORIGIN_URL}/dictionary`)}
  </urlset>
`;

class Sitemap extends React.Component {
  static async getInitialProps({ res }) {
    try {
      res.setHeader("Content-Type", "text/xml");
      res.write(createSitemap());
      res.end();
    } catch (error) {
      console.log(error);
      res.write("Not Found!");
      res.end();
    }
  }
}

export default Sitemap;
