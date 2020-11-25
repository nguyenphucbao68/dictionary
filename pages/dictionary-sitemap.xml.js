import React from 'react';
// TODO: update
const createSitemap = (language) => `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${(function () {
      var s = '';
      for (let i = 0; i < language.length; i++) {
        const item = language[i];
        for (let j = 0; j < item?.data?.length; j++) {
          const { page } = item?.data[j];
          s += `<url>
          <loc>${`${process.env.ORIGIN_URL}/site/${item.name}/page/${page}.xml`}</loc>
        </url>`;
        }
      }
      return s;
    })()}
  </urlset>
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
