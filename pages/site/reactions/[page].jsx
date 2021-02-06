import React from "react";
import settings from "../../../config/settingsConfig";

// TODO: update
const createSitemap = (data) => `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${Object.keys(
    data,
  )
    .map(
      (rid) => `
    <url>
      <loc>${process.env.ORIGIN_URL}/chemicalequations/${data[rid]
        .filter((item) => item.type == "r")
        .map((item) => item.name)
        .join("+")}/${data[rid]
        .filter((item) => item.type == "p")
        .map((item) => item.name)
        .join("+")}</loc>
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
      const infoReaction = settings.chemistry.reaction;
      var pageAddress = page.substr(0, page.indexOf(".xml"));
      const request = await fetch(
        `${process.env.ORIGIN_URL}/api/index.php/reaction/page/${
          pageAddress * infoReaction.siteMapPageList
        }/${
          pageAddress * infoReaction.siteMapPageList +
          infoReaction.siteMapPageList
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
