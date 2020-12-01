import React from 'react';
const createURL = (link) => {
  return `
<sitemap>
      <loc>${link}</loc>
    </sitemap>`;
};
const createSitemap = (language) => `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${createURL(`${process.env.ORIGIN_URL}/page-sitemap.xml`)}
    ${(function () {
      var s = '';
      for (let i = 0; i < language.length; i++) {
        const item = language[i];
        for (let j = 0; j < item?.data?.length / 10; j++) {
          const { page } = item?.data[j];
          s += `<sitemap>
          <loc>${`${process.env.ORIGIN_URL}/site/${item.name}/page/${page}.xml`}</loc>
        </sitemap>`;
        }
      }
      return s;
    })()}
  </sitemapindex>
`;

class Sitemap extends React.Component {
  static async getInitialProps({ res }) {
    try {
      var language = ['en_en'];
      var obj = [];
      for (let i = 0; i < language.length; i++) {
        const item = language[i];
        var objLang = { name: item };
        const request = await fetch(
          `${process.env.ORIGIN_URL}/api/index.php/${item}/cat`
        );
        const posts = await request.json();
        objLang.data = posts;
        obj.push(objLang);
      }
      res.setHeader('Content-Type', 'text/xml');
      res.write(createSitemap(obj));
      res.end();
    } catch (error) {
      console.log(error);
      res.write('Not Found!');
      res.end();
    }
  }
}

export default Sitemap;
