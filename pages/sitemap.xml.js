import React from 'react';

const createURL = (link) => {
  return `
<sitemap>
      <loc>${link}</loc>
    </sitemap>`;
};

// TODO: update
const createSitemap = () => `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${createURL(`${process.env.ORIGIN_URL}/page-sitemap.xml`)}
    ${createURL(`${process.env.ORIGIN_URL}/dictionary-sitemap.xml`)}
    
  </sitemapindex>
`;

class Sitemap extends React.Component {
  static async getInitialProps({ res }) {
    try {
      res.setHeader('Content-Type', 'text/xml');
      res.write(createSitemap());
      res.end();
    } catch (error) {
      console.log(error);
      res.write('Not Found!');
      res.end();
    }
  }
}

export default Sitemap;
