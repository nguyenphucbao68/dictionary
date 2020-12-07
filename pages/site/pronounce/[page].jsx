import React from "react";
import settings from "../../../config/settingsConfig";

// TODO: update
const createSitemap = (data) => `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${data
    .map(
      ({ word }) => `
    <url>
      <loc>${`${process.env.ORIGIN_URL}/pronounce/${escape(word)}`}</loc>
      <changefreq>daily</changefreq>
    </url>`,
    )
    .join("")}
  </urlset>
`;

class Sitemap extends React.Component {
  static async getInitialProps({ res, query }) {
    try {
      const { page } = query;
      const infoLanguage = settings.pronounce;
      var pageAddress = page.substr(0, page.indexOf(".xml"));
      const request = await fetch(
        `${process.env.ORIGIN_URL}/api/index.php/${infoLanguage.prefix}/cat/${
          pageAddress * infoLanguage.siteMapPageList
        }/${
          pageAddress * infoLanguage.siteMapPageList +
          infoLanguage.siteMapPageList
        }`,
      );
      const data = await request.json();
      res.setHeader("Content-Type", "text/xml");
      res.write(createSitemap(data));
      res.end();
    } catch (error) {
      console.log(error);
      res.write("Not Found!");
      res.end();
    }
  }
}

export default Sitemap;
