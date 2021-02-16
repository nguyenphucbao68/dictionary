import React, { useState, useEffect } from "react";
import Router from "next/router";
import Breadcrumb from "../../../layout/breadcrumb";
import { Container, Row, Col, Card, CardHeader, CardBody } from "reactstrap";
import Head from "next/head";
import ErrorPage from "next/error";
import SkeletonSection from "./skeleton";
import settings from "../../../config/settingsConfig";
import { NextSeo, BreadcrumbJsonLd } from "next-seo";
import SmilesDrawer from "smiles-drawer";
import { Search } from "../../../layout/search";
var smilesDrawer = new SmilesDrawer.Drawer({
  width: 300,
  height: 300,
  explicitHydrogens: true,
  experimental: true,
});
import DataTable from "react-data-table-component";
Router.onRouteChangeStart = () => {
  document.getElementById("skeleton-word").classList.remove("hidden");
  document.getElementById("skeleton-word").classList.add("show");
  document.getElementById("word-info").classList.remove("show");
  document.getElementById("word-info").classList.add("hidden");
};
Router.onRouteChangeComplete = () => {
  document.getElementById("skeleton-word").classList.remove("show");
  document.getElementById("skeleton-word").classList.add("hidden");
  document.getElementById("word-info").classList.remove("hidden");
  document.getElementById("word-info").classList.add("show");
};
Router.onRouteChangeError = () => {
  document.getElementById("skeleton-word").classList.remove("show");
  document.getElementById("skeleton-word").classList.add("hidden");
  document.getElementById("word-info").classList.remove("hidden");
  document.getElementById("word-info").classList.add("show");
};
const Substance = ({ substance, name, language }) => {
  if (!substance) {
    return <ErrorPage statusCode={404} />;
  }
  const [modal, setModal] = useState(false);

  useEffect(() => {
    RunCanvas();
  }, []);
  const RunCanvas = () => {
    SmilesDrawer.parse(
      substance.data.statement.properties["P233"].data,
      function (tree) {
        // Draw to the canvas
        smilesDrawer.draw(tree, "example-canvas", "light", false);
        // Alternatively, draw to SVG:
        // svgDrawer.draw(tree, 'output-svg', 'dark', false);
      },
    );
  };
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);

  const [data, setData] = useState(
    Object.keys(substance.data.nameLang).map(
      (item) => substance.data.nameLang[item],
    ),
  );

  const tableColumns = [
    {
      name: "Language",
      selector: "lang",
      sortable: true,
      center: true,
    },
    {
      name: "Name",
      selector: "data",
      sortable: true,
      center: true,
    },
  ];
  const [identifierData, setIdentifierData] = useState(
    Object.keys(substance.data.statement.identifiers).map(
      (item) => substance.data.statement.identifiers[item],
    ),
  );
  const identifierDataColumns = [
    {
      name: "ID",
      selector: "key",
      sortable: true,
      center: true,
      maxWidth: "200px",
      render: "key",
    },
    {
      name: "Source",
      selector: (row) => <p dangerouslySetInnerHTML={{ __html: row.data }}></p>,
      sortable: true,
      center: true,
      wrap: true,
    },
  ];

  return (
    <>
      <Head>
        <meta
          name="keywords"
          content={settings.chemistry.substance.keywordList(name)}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "url": "https://www.athoni.com/",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://www.athoni.com/substance/{search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }`
              .replace(/(?:\r\n|\r|\n)/g, "")
              .trim(),
          }}
        ></script>
        <link href="https://www.athoni.com" rel="publisher" />
      </Head>
      <BreadcrumbJsonLd
        itemListElements={[
          {
            position: 1,
            name: "Home",
            item: "https://www.athoni.com",
          },
          {
            position: 2,
            name,
            item: `https://www.athoni.com/substance/${name}`,
          },
        ]}
      />
      <NextSeo
        title={`${name} (${substance.data.nameLang[language].data})`}
        titleTemplate={settings.chemistry.substance.titleTemplate}
        canonical={`https://www.athoni.com/substance/${name}`}
        openGraph={{
          type: "website",
          url: `https://www.athoni.com/substance/${name}`,
          title: settings.chemistry.substance.titleTemplateFunc(
            `${name} (${substance.data.nameLang[language].data})`,
          ),
          description: settings.chemistry.substance.description,
          images: [
            {
              url: "https://www.athoni.com/assets/images/athoni-bg.png",
              width: 800,
              height: 600,
              alt: "Athoni Dictionary",
            },
          ],
          site_name: "Athoni Dictionary",
        }}
        twitter={{
          handle: "@handle",
          site: "@site",
          cardType: "summary_large_image",
        }}
      />
      <Container fluid={true}>
        <Row className="appointment-sec mt-2">
          <Col md="12" className="chat-default">
            <Card>
              <CardBody className="search-words landing-home">
                <Search />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <Breadcrumb
        parent="Chemical Equations"
        urlParent="chemicalequations"
        title="Chemistry"
        substance={name}
      />
      <SkeletonSection />
      <Container
        fluid={true}
        id="word-info"
        className="chemical-equation"
        key="word-info"
      >
        <Row>
          <Col md="2"></Col>
          <Col md="8">
            <h1 id="substance-title">
              {substance.data.nameLang[language].data} ({name}){" "}
            </h1>
            <Card>
              <CardHeader className="p-3">
                <h2>Chemical Data</h2>
              </CardHeader>
              <CardBody className="content-words p-0">
                <table className="table">
                  <tbody>
                    <tr>
                      <td>
                        <strong>Name</strong>
                      </td>
                      <td>
                        {substance.data.aliases[language].map((item, i) => (
                          <p key={i}>{item.value}</p>
                        ))}
                      </td>
                    </tr>
                    {Object.keys(substance.data.statement.properties).map(
                      (item, i) => (
                        <>
                          <tr key={i}>
                            <td>
                              <strong>
                                {substance.data.statement.properties[item].key}
                              </strong>
                            </td>
                            <td>
                              {substance.data.statement.properties[item].data}
                            </td>
                          </tr>
                        </>
                      ),
                    )}

                    <tr>
                      <td>
                        <strong>Demo</strong>
                      </td>
                      <td>
                        <canvas
                          id="example-canvas"
                          width="500"
                          height="500"
                        ></canvas>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="p-0">
                <DataTable
                  key="Translations"
                  pagination={true}
                  selectableRows
                  title="Translations"
                  data={data}
                  columns={tableColumns}
                  striped={true}
                  center={true}
                />
              </CardBody>
            </Card>
            <Card>
              <CardBody className="p-0">
                <DataTable
                  key="Identifier"
                  pagination={true}
                  title="Identifier"
                  data={identifierData}
                  columns={identifierDataColumns}
                  striped={true}
                  // center={true}
                />
              </CardBody>
            </Card>
          </Col>

          <Col md="2"></Col>
        </Row>
      </Container>
    </>
  );
};

export default Substance;
