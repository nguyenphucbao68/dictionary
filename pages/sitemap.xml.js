import React from "react";

const EXTERNAL_DATA_URL = `${process.env.ORIGIN_URL}/site/en_en/list`;

const createURL = (link) => {
  return `<url>
  <loc>${link}</loc>
  <changefreq>daily</changefreq>
<priority>1.0</priority>
</url>`
} 

// TODO: update
const createSitemap = (posts) => `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${createURL(`${process.env.ORIGIN_URL}`)}
    ${createURL(`${process.env.ORIGIN_URL}/dictionary`)}
    ${posts
      .map(
        ({ type }) => `
      <url>
        <loc>${`${EXTERNAL_DATA_URL}/${type}`}</loc>
      </url>
    `
      )
      .join("")}
  </urlset>
`;

class Sitemap extends React.Component {
  static async getInitialProps({ res }) {
    try {
      const request = await fetch(`${process.env.ORIGIN_URL}/api/index.php/cat`);
    const posts = await request.json();

    res.setHeader("Content-Type", "text/xml");
    res.write(createSitemap(posts));
    res.end();
    } catch (error) {
      res.write('Not Found!');
        res.end();
    }
    
  }
}

export default Sitemap;