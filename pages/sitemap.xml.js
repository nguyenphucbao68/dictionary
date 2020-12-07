import React from "react";
import settings from "../config/settingsConfig";
const createURL = (link) => {
  return `
<sitemap>
      <loc>${link}</loc>
    </sitemap>`;
};
const createSitemap = (
  language,
  pronounceData,
) => `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${createURL(`${process.env.ORIGIN_URL}/page-sitemap.xml`)}
    ${(function () {
      var s = "";
      for (let i = 0; i < language.length; i++) {
        const item = language[i];
        for (let j = 0; j < item?.data?.length / item.siteMapPageList; j++) {
          const { page } = item?.data[j];
          s += `<sitemap>
          <loc>${`${process.env.ORIGIN_URL}/site/${item.prefix}/page/${page}.xml`}</loc>
        </sitemap>`;
        }
      }
      for (
        let i = 0;
        i < pronounceData?.data?.length / pronounceData.siteMapPageList;
        i++
      ) {
        const { page } = pronounceData?.data[i];
        s += `<sitemap>
        <loc>${`${process.env.ORIGIN_URL}/site/pronounce/${page}.xml`}</loc>
      </sitemap>`;
      }

      return s;
    })()}
  </sitemapindex>
`;

class Sitemap extends React.Component {
  static async getInitialProps({ res }) {
    try {
      var obj = [];

      // pronounce
      var pronounceData = settings.pronounce;
      const request = await fetch(
        `${process.env.ORIGIN_URL}/api/index.php/en_en/cat`,
      );
      pronounceData.data = await request.json();
      // dictionary
      for (let i = 0; i < settings.languageData.length; i++) {
        var objLang = settings.languageData[i];
        const request = await fetch(
          `${process.env.ORIGIN_URL}/api/index.php/${objLang.prefix}/cat`,
        );
        const posts = await request.json();
        objLang.data = posts;
        obj.push(objLang);
      }
      res.setHeader("Content-Type", "text/xml");
      res.write(createSitemap(obj, pronounceData));
      res.end();
    } catch (error) {
      console.log(error);
      res.write("Not Found!");
      res.end();
    }
  }
}

export default Sitemap;
