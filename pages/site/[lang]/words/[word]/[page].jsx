import React from "react";

const EXTERNAL_DATA_URL = `${process.env.ORIGIN_URL}/words`;

// TODO: update
const createSitemap = (wordsList) => `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${wordsList
    .map(
      ({ word }) => `
    <url>
      <loc>${`${EXTERNAL_DATA_URL}/${encodeURI(word)}`}</loc>
    </url>
  `
    )
    .join("")}
  </urlset>
`;

class Sitemap extends React.Component {
  static async getInitialProps({ res, query }) {
      try {
        const { page, word } = query;
        const request = await fetch(`${process.env.ORIGIN_URL}/api/index.php/words/${word}/${page}`);
        const wordsList = await request.json();
    
        res.setHeader("Content-Type", "text/xml");
        res.write(createSitemap(wordsList));
        res.end();
      } catch (error) {
        res.write('Not Found!');
        res.end();
      }
    
  }
}

export default Sitemap;