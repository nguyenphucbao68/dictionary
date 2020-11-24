import React from 'react';

const createURL = (link) => {
  return `<url>
  <loc>${link}</loc>
  <changefreq>daily</changefreq>
<priority>1.0</priority>
</url>`;
};

// TODO: update
const createSitemap = (language) => `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${createURL(`${process.env.ORIGIN_URL}`)}
    ${createURL(`${process.env.ORIGIN_URL}/dictionary`)}
    ${language
      .map((item) =>
        item?.data?.map(
          ({ page }) => `
        <url>
          <loc>${`${process.env.ORIGIN_URL}/site/${item.name}/page/${page}`}</loc>
        </url>
      `
        )
      )
      .join('')}
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
