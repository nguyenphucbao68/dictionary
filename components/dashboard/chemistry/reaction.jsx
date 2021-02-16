import React, { useState, useRef } from "react";
import Router from "next/router";
import Breadcrumb from "../../../layout/breadcrumb";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import Head from "next/head";
import ErrorPage from "next/error";
import Link from "next/link";
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
const Reaction = ({
  data,
  relatedReactionsByReactant,
  relatedReactionsByProduct,
  products,
  reactants,
}) => {
  if (!data) {
    return <ErrorPage statusCode={404} />;
  }

  const tableReactionsByReactant = [
    {
      selector: "reaction",
    },
  ];

  const tableReactionsByProduct = [
    {
      selector: "reaction",
    },
  ];
  const [reactionTitle, setReactionTitle] = useState(
    data
      .filter((item) => item.type == "r")
      .map((item, i) => (i != 0 ? "+" + item.name : item.name))
      .join("") +
      "=" +
      data
        .filter((item) => item.type == "p")
        .map((item, i) => (i != 0 ? "+" + item.name : item.name))
        .join(""),
  );

  return (
    <>
      <Head>
        <meta
          name="keywords"
          content={settings.chemistry.reaction.keywordList(reactionTitle)}
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
              "target": "https://www.athoni.com/chemicalequations/{search_term_string}",
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
            name: reactionTitle,
            item: `https://www.athoni.com/chemicalequations/${reactants}/${products}`,
          },
        ]}
      />
      <NextSeo
        title={reactionTitle}
        titleTemplate={settings.chemistry.reaction.titleTemplate}
        description={settings.chemistry.reaction.description(reactionTitle)}
        canonical={`https://www.athoni.com/chemicalequations/${reactants}/${products}`}
        openGraph={{
          type: "website",
          url: `https://www.athoni.com/chemicalequations/${reactants}/${products}`,
          title: settings.chemistry.reaction.titleTemplateFunc(reactionTitle),
          description: settings.chemistry.reaction.description(reactionTitle),
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
        reaction={reactionTitle}
        reactants={reactants}
        products={products}
      />
      <SkeletonSection />

      <Container
        fluid={true}
        id="reaction-info"
        className="chemical-equation"
        key="reaction-info"
      >
        <Row>
          <Col md="2"></Col>
          <Col md="8">
            <h1>{reactionTitle} - Chemical Equation Balancer</h1>
            <Card>
              <CardHeader className="p-3">
                <h2>Chemical Equation</h2>
              </CardHeader>
              <CardBody className="p-3">
                <div className="chemical-reaction">
                  {data
                    .filter((item) => item.type == "r")
                    .map((item, i) => (
                      <>
                        {i != 0 ? <span>+</span> : ""}
                        {item?.count == 0 ? (
                          ""
                        ) : (
                          <strong className="countBalancer">
                            {item?.count}
                          </strong>
                        )}
                        <span
                          dangerouslySetInnerHTML={{
                            __html: item?.detail?.data?.other?.formula_code,
                          }}
                        ></span>
                      </>
                    ))}
                  <span className="arrow">→</span>
                  {data
                    .filter((item) => item.type == "p")
                    .map((item, i) => (
                      <>
                        {i != 0 ? <span>+</span> : ""}

                        {item?.count == 0 ? (
                          ""
                        ) : (
                          <strong className="countBalancer">
                            {item?.count}
                          </strong>
                        )}

                        <span
                          dangerouslySetInnerHTML={{
                            __html: item?.detail?.data?.other?.formula_code,
                          }}
                        ></span>
                      </>
                    ))}
                </div>
              </CardBody>
            </Card>
            {data.filter((item) => item?.type == "t").length != 0 ? (
              <Card>
                <CardBody className="p-3">
                  <h5>Reaction Type</h5>
                  <p id="reaction-type">
                    This is{" "}
                    {data
                      .filter((item) => item?.type == "t")
                      .map((item, i) => (
                        <strong key={i}>{item?.name}</strong>
                      ))}
                  </p>
                </CardBody>
              </Card>
            ) : (
              ""
            )}

            <Card>
              <CardBody className="p-3">
                <h5>Reactants</h5>
                <ListGroup className="mb-3">
                  {data
                    .filter((item) => item?.type == "r")
                    .map((item, i) => (
                      <ListGroupItem
                        className="list-group-item-action flex-column align-items-start"
                        key={i}
                      >
                        <div className="d-flex w-100 justify-content-between">
                          <h5 className="mb-1">
                            <span>
                              <Link href={`/substance/${item?.name}`}>
                                <a title={item?.name}>{item?.name}</a>
                              </Link>
                            </span>{" "}
                            -{" "}
                            {item?.detail?.data?.nameLang?.en?.data
                              ? item?.detail?.data?.nameLang?.en?.data
                              : item?.detail?.data?.other?.name}
                          </h5>
                        </div>
                        <ul>
                          <li>
                            <span>Other names: </span>
                            {item?.detail?.data?.aliases
                              ? item?.detail?.data?.aliases?.en?.map(
                                  (item, i) => (
                                    <em key={i}>
                                      {i == 0
                                        ? item?.value
                                        : ", " + item?.value}
                                    </em>
                                  ),
                                )
                              : item?.detail?.data?.other?.name_en}
                          </li>
                          <li>
                            <span>Mass: </span>
                            <em>
                              {item?.detail?.data?.statement?.properties?.P2067
                                ?.data
                                ? item?.detail?.data?.statement?.properties
                                    ?.P2067?.data
                                : item?.detail?.data?.other?.mass + " dalton"}
                            </em>
                          </li>
                        </ul>
                      </ListGroupItem>
                    ))}
                </ListGroup>
                <h5>Products</h5>
                <ListGroup>
                  {data
                    .filter((item) => item?.type == "p")
                    .map((item, i) => (
                      <ListGroupItem
                        className="list-group-item-action flex-column align-items-start"
                        key={i}
                      >
                        <div className="d-flex w-100 justify-content-between">
                          <h5 className="mb-1">
                            <span>
                              <Link href={`/substance/${item?.name}`}>
                                <a>{item?.name}</a>
                              </Link>
                            </span>{" "}
                            -{" "}
                            {item?.detail?.data?.nameLang?.en?.data
                              ? item?.detail?.data?.nameLang?.en?.data
                              : item?.detail?.data?.other.name}
                          </h5>
                          <small>
                            {item?.stype == "prec"
                              ? "Ket tua"
                              : item?.stype == "eva"
                              ? "Bay hoi"
                              : ""}
                          </small>
                        </div>
                        <ul>
                          <li>
                            <span>Other names: </span>
                            {item?.detail?.data?.aliases?.en
                              ? item?.detail?.data?.aliases[
                                  "en"
                                ]?.map((item, i) => (
                                  <em key={i}>
                                    {i == 0 ? item?.value : ", " + item?.value}
                                  </em>
                                ))
                              : item?.detail?.data?.other?.name_en}
                          </li>
                          <li>
                            <span>Mass: </span>
                            <em>
                              {item?.detail?.data?.statement?.properties?.P2067
                                ?.data
                                ? item?.detail?.data?.statement?.properties
                                    ?.P2067?.data
                                : item?.detail?.data?.other?.mass + " dalton"}
                            </em>
                          </li>
                        </ul>
                      </ListGroupItem>
                    ))}
                </ListGroup>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="p-3 relatedReaction">
                <h5>Search By Reactants</h5>
                <DataTable
                  key="Reactants"
                  pagination={true}
                  noHeader={true}
                  data={Object.keys(relatedReactionsByReactant).map((item) => {
                    return {
                      reaction: generateEquation(
                        relatedReactionsByReactant[item],
                      ),
                      id: item,
                    };
                  })}
                  columns={tableReactionsByReactant}
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
                <h5>Search By Products</h5>
                <DataTable
                  key="Reactants"
                  pagination={true}
                  noHeader={true}
                  data={Object.keys(relatedReactionsByProduct).map((item) => {
                    return {
                      reaction: generateEquation(
                        relatedReactionsByProduct[item],
                      ),
                    };
                  })}
                  columns={tableReactionsByProduct}
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
          <Col md="2"></Col>
        </Row>
      </Container>
    </>
  );
};

export default Reaction;
