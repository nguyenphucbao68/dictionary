import React, { useState, useRef } from "react";
import Router from "next/router";
import Breadcrumb from "../../../layout/breadcrumb";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import Head from "next/head";
import SkeletonSection from "./skeleton";
import settings from "../../../config/settingsConfig";
import { NextSeo, BreadcrumbJsonLd } from "next-seo";
import DataTable from "react-data-table-component";
import { generateEquation } from "../../../service/chemistry";
import { Search } from "../../../layout/search";

Router.onRouteChangeStart = () => {
  document.getElementById("skeleton-reaction").classList.remove("hidden");
  document.getElementById("skeleton-reaction").classList.add("show");
  document.getElementById("reaction-info").classList.remove("show");
  document.getElementById("reaction-info").classList.add("hidden");
};
Router.onRouteChangeComplete = () => {
  document.getElementById("skeleton-reaction").classList.remove("show");
  document.getElementById("skeleton-reaction").classList.add("hidden");
  document.getElementById("reaction-info").classList.remove("hidden");
  document.getElementById("reaction-info").classList.add("show");
};
Router.onRouteChangeError = () => {
  document.getElementById("skeleton-reaction").classList.remove("show");
  document.getElementById("skeleton-reaction").classList.add("hidden");
  document.getElementById("reaction-info").classList.remove("hidden");
  document.getElementById("reaction-info").classList.add("show");
};
const CEHome = ({ data }) => {
  const tableReactions = [
    {
      selector: "reaction",
    },
  ];

  return (
    <>
      <Head>
        <meta name="keywords" content={settings.chemistry.home.keywordList()} />

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
            name: "Chemical Equations",
            item: "https://www.athoni.com/chemicalequations",
          },
        ]}
      />
      <NextSeo
        title={settings.chemistry.home.titleTemplate}
        canonical={`https://www.athoni.com/chemicalequations`}
        openGraph={{
          type: "website",
          url: `https://www.athoni.com/chemicalequations`,
          title: settings.chemistry.home.titleTemplate,
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
      />
      <SkeletonSection />
      <Container fluid={true}>
        <Row>
          <Col md="2"></Col>
          <Col md="8">
            <div className="card intro-text">
              <div className="card-body">
                <h1 title="Introduction to Athoni Dictionary">
                  Introduction to Athoni Chemistry
                </h1>
                <ul>
                  <li>
                    <b>Balance Chemical Equations: </b> enter an equation of a
                    chemical reaction and press the Search button.
                  </li>
                  <li>
                    <b>Substances: </b> Most complete information about chemical
                    substances.
                  </li>
                </ul>
              </div>
            </div>
            <Row>
              <Col md="12">
                <Card>
                  <CardBody className="p-3 relatedReaction">
                    <h5 title="English dictionaries">Decomposition reaction</h5>
                    <DataTable
                      key="Reactants"
                      pagination={true}
                      noHeader={true}
                      data={Object.keys(data.decomposition).map((item) => {
                        return {
                          reaction: generateEquation(data.decomposition[item]),
                          id: item,
                        };
                      })}
                      columns={tableReactions}
                      striped={true}
                      customStyles={{
                        rows: {
                          style: {
                            fontSize: "15px",
                          },
                        },
                      }}
                    />
                  </CardBody>
                </Card>
                <Card>
                  <CardBody className="p-3 relatedReaction">
                    <h5 title="English dictionaries">
                      Double-replacement reaction
                    </h5>
                    <DataTable
                      key="Reactants"
                      pagination={true}
                      noHeader={true}
                      data={Object.keys(data.doublereplacement).map((item) => {
                        return {
                          reaction: generateEquation(
                            data.doublereplacement[item],
                          ),
                          id: item,
                        };
                      })}
                      columns={tableReactions}
                      striped={true}
                      customStyles={{
                        rows: {
                          style: {
                            fontSize: "15px",
                          },
                        },
                      }}
                    />
                  </CardBody>
                </Card>
                <Card>
                  <CardBody className="p-3 relatedReaction">
                    <h5 title="English dictionaries">
                      Oxidation-reduction reaction
                    </h5>
                    <DataTable
                      key="Reactants"
                      pagination={true}
                      noHeader={true}
                      data={Object.keys(data.oxidition).map((item) => {
                        return {
                          reaction: generateEquation(data.oxidition[item]),
                          id: item,
                        };
                      })}
                      columns={tableReactions}
                      striped={true}
                      customStyles={{
                        rows: {
                          style: {
                            fontSize: "15px",
                          },
                        },
                      }}
                    />
                  </CardBody>
                </Card>
                <Card>
                  <CardBody className="p-3 relatedReaction">
                    <h5 title="English dictionaries">
                      Single-replacement reaction
                    </h5>
                    <DataTable
                      key="Reactants"
                      pagination={true}
                      noHeader={true}
                      data={Object.keys(data.singlereplacement).map((item) => {
                        return {
                          reaction: generateEquation(
                            data.singlereplacement[item],
                          ),
                          id: item,
                        };
                      })}
                      columns={tableReactions}
                      striped={true}
                      customStyles={{
                        rows: {
                          style: {
                            fontSize: "15px",
                          },
                        },
                      }}
                    />
                  </CardBody>
                </Card>
                <Card>
                  <CardBody className="p-3 relatedReaction">
                    <h5 title="English dictionaries">Combination reaction</h5>
                    <DataTable
                      key="Reactants"
                      pagination={true}
                      noHeader={true}
                      data={Object.keys(data.combination).map((item) => {
                        return {
                          reaction: generateEquation(data.combination[item]),
                          id: item,
                        };
                      })}
                      columns={tableReactions}
                      striped={true}
                      customStyles={{
                        rows: {
                          style: {
                            fontSize: "15px",
                          },
                        },
                      }}
                    />
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Col>
          <Col md="2"></Col>
        </Row>
      </Container>
    </>
  );
};

export default CEHome;
