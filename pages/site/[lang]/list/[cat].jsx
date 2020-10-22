import React from "react";

const EXTERNAL_DATA_URL = `${process.env.ORIGIN_URL}/site/en_en/words`;

// TODO: update
const createSitemap = (cat, catList) => `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${(function(catList, rows){
      console.log(catList);
      for (let i = 1; i <= catList.pageCount; i++) {
        rows += `<url>
        <loc>${`${EXTERNAL_DATA_URL}/${cat}/${i}`}</loc>
      </url>`;
      }
      return rows;
    }(catList, ''))}
  </urlset>
`;

class Sitemap extends React.Component {
  static async getInitialProps({ res, query }) {
    try {
      const { cat } = query;
      const request = await fetch(`${process.env.ORIGIN_URL}/api/index.php/cat/${cat}`);
      const catList = await request.json();
      res.setHeader("Content-Type", "text/xml");
      res.write(createSitemap(cat, catList));
      res.end();
    } catch (error) {
      res.write('Not Found!');
        res.end();
    }
   
  }
}

export default Sitemap;