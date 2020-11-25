import React from 'react';

const EXTERNAL_DATA_URL = `${process.env.ORIGIN_URL}/site/en_en/list`;

// TODO: update
const createSitemap = (data, lang) => `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${data
      .map(
        ({ word }) => `
        <url>
          <loc>${`${process.env.ORIGIN_URL}/dict/${lang}/${word}`}</loc>
        </url>
      `
      )
      .join('')}
  </urlset>
`;

class Sitemap extends React.Component {
  static async getInitialProps({ res, query }) {
    try {
      const { lang, page } = query;
      var pageAddress = page.substr(0, page.indexOf('.xml'));
      const request = await fetch(
        `${process.env.ORIGIN_URL}/api/index.php/${lang}/cat/${pageAddress}`
      );
      const data = await request.json();
      res.setHeader('Content-Type', 'text/xml');
      res.write(createSitemap(data, lang));
      res.end();
    } catch (error) {
      console.log(error);
      res.write('Not Found!');
      res.end();
    }
  }
}

export default Sitemap;
