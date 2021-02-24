import React, { useState } from "react";
import Router from "next/router";
//import Breadcrumb from "../../../layout/breadcrumb";
import { Container, Row, Col, Card, CardBody, CardHeader } from "reactstrap";
import Head from "next/head";
//import useOutsideClick from "../../../lib/event";
// import SkeletonSection from "./skeleton";
// import settings from "../../../config/settingsConfig";
import { NextSeo, BreadcrumbJsonLd } from "next-seo";
import LazyLoad from "react-lazyload";
// import DataTable from "react-data-table-component";
//import QAFilter from "./qaFilter";

import { NoResult } from "./noResult";
import { CategoryBadge } from "./categoryBadge";
import { Search } from "../../../layout/search";
import ReactHtmlParser from "react-html-parser";
import MathJax from "react-mathjax";
import { v4 as uuidv4 } from "uuid";

const PostResult = ({ result, query }) => {
  //const ref = useRef();
  //const [showResults, setShowResults] = useState(false);
  const totalResult = result?.hits?.total?.value;
  const resultList = result?.hits?.hits;
  const bestResult = resultList[0];

  // const onChangeKeyword = (inputKeyWord) => {
  //   if (inputKeyWord.length === 0 || !inputKeyWord.replace(/\s/g, "").length)
  //     return;
  //   Router.push("/qa/" + inputKeyWord);
  // };

  const transformHTML = (node) => {
    if (
      node?.type === "tag" &&
      node?.name === "span" &&
      node.attribs.class === "math-tex"
    ) {
      return (
        <MathJax.Node
          key={uuidv4()}
          inline
          formula={node?.children[0].data.replace("\\(", "").replace("\\)", "")}
        />
      );
    }
    if (
      //Codecogs to Latex
      node?.type === "tag" &&
      node?.name === "img" &&
      node?.attribs &&
      node?.attribs.src.includes("codecogs.com")
    ) {
      console.log(node);
      return (
        <MathJax.Node
          key={uuidv4()}
          inline
          formula={node?.attribs.alt.replace("\\(", "").replace("\\)", "")}
        />
      );
    }
    if (
      //remove garbage pre tag
      node?.type === "tag" &&
      node?.name === "pre" &&
      node?.children[0].data
        .replace(/(\r\n)+|\r+|\n+|\t+/, "")
        .replace(" ", "") === ""
    ) {
      return null;
    }
  };

  const transformPostHightlight = (node) => {
    if (
      node?.type === "tag" &&
      node?.name === "span" &&
      node.attribs.class === "math-tex"
    ) {
      return (
        <MathJax.Node
          key={uuidv4()}
          inline
          formula={node?.children[0].data.replace("\\(", "").replace("\\)", "")}
        />
      );
    }
    if (
      //Codecogs to Latex
      node?.type === "tag" &&
      node?.name === "img" &&
      node?.attribs &&
      node?.attribs.src.includes("codecogs.com")
    ) {
      console.log(node);
      return (
        <MathJax.Node
          key={uuidv4()}
          inline
          formula={node?.attribs.alt.replace("\\(", "").replace("\\)", "")}
        />
      );
    }
    // if (
    //   //remove garbage pre tag
    //   node?.type === "tag" &&
    //   ["h1", "h2", "pre", "p", "strong", "img"].includes(node?.name)
    // ) {
    //   return <>{`qwe`}</>;
    // }
  };

  const shortenContent = (content, length) => {
    var trimmedString = content.substr(0, length);
    //re-trim if we are in the middle of a word
    trimmedString = trimmedString.substr(
      0,
      Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")),
    );
    return trimmedString;
  };

  const sanitizeHTMLTag = (string) => {
    return string.replace(/(<([^>]+)>)/gi, "");
  };

  //const onChangeKeyWord = async (e) => {
  // const keyword = e.target.value;
  // if (keyword == "") return;
  // setKeyword(e.target.value);
  // try {
  //   const res = await fetch(`/api/index.php/reaction/search/s/${keyword}`);
  //   const obj = res.json();
  //   setListWord(await obj);
  //   setShowResults(true);
  // } catch (error) {
  //   // console.log('err', error);
  // }
  //};

  return (
    <>
      <Head>
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
        title={"Tìm kiếm lời giải | Athoni"}
        canonical={`https://www.athoni.com/hoidap`}
        openGraph={{
          type: "website",
          url: `https://www.athoni.com/hoidap`,
          title: "Tìm kiếm lời giải | Athoni",
          images: [
            {
              url: "https://www.athoni.com/assets/images/athoni-bg.png",
              width: 800,
              height: 600,
              alt: "Athoni Lời giải",
            },
          ],
          site_name: "Athoni Lời giải",
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
            <Card style={{ backgroundColor: "#f8f8f8", boxShadow: "none" }}>
              <CardBody className="landing-home pb-0">
                <Search
                  searchMode={"lecttr"}
                  keyword={query}
                  currentPage={"search"}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* <SkeletonSection /> */}
      <Container fluid={true} className="qa-result">
        <Row>
          {/* <QAFilter /> */}
          <Col md="12">
            {/* <Row> */}
            {
              /*eslint-disable */
              totalResult > 0 ? (
                <LazyLoad height={500} once={true}>
                  <Card
                    key={"bestResult"}
                    className="card-absolute best-answer"
                  >
                    <CardHeader className="bg-secondary">
                      <h5>Phù hợp nhất</h5>
                    </CardHeader>
                    <CardBody>
                      <h5 className="f-w-600">
                        <a
                          href={bestResult._source.permalink}
                          rel="noreferrer noopener"
                        >
                          {bestResult._source.post_title}
                        </a>
                      </h5>
                      <div className="post-excerpt">
                        <MathJax.Provider>
                          {ReactHtmlParser(
                            bestResult._source.post_content_filtered,
                            {
                              transform: (node) => transformHTML(node),
                            },
                          )}
                        </MathJax.Provider>
                      </div>
                      <div className="mt-3 text-center">
                        <a
                          href={bestResult._source.permalink}
                          rel="noopener noreferrer nofollow"
                          class="btn btn-outline-primary"
                        >
                          Xem thêm tại{" "}
                          <img
                            style={{ height: "19px" }}
                            src={require("../../../public/assets/images/icon/lecttr.png")}
                          />{" "}
                          Lecttr
                        </a>
                      </div>
                      <hr />
                      <div className="mt-2">
                        <CategoryBadge
                          catid1={bestResult._source?.terms?.category[0]}
                          catid2={bestResult._source?.terms?.category[1]}
                          catid3={bestResult._source?.terms?.category[2]}
                          info={{
                            title: "Phù hợp nhất",
                            tooltip:
                              "bài viết này được gửi đến cho bạn vì khớp với từ khóa tìm kiếm của bạn",
                            color: "success",
                          }}
                        />
                      </div>
                    </CardBody>
                  </Card>
                </LazyLoad>
              ) : (
                <NoResult keyword={query} type="NO_RESULT" />
              )
              /*eslint-enable */
            }
            {resultList?.slice(1).map((data, i) => (
              <LazyLoad height={250} offset={170} once={true}>
                <Card key={i}>
                  <div className="qa-record">
                    <CardBody>
                      <h5 className="f-w-600">
                        <a
                          href={data?._source?.permalink}
                          rel="noreferrer noopener"
                        >
                          {data?._source?.post_title}
                        </a>
                      </h5>
                      <div className="search-description">
                        {shortenContent(
                          sanitizeHTMLTag(data._source?.post_content_filtered),
                          250,
                        )}
                      </div>
                      <div className="mt-2">
                        <CategoryBadge
                          catid1={data._source?.terms?.category[0]}
                          catid2={data._source?.terms?.category[1]}
                          catid3={data._source?.terms?.category[2]}
                        />
                      </div>
                    </CardBody>
                  </div>
                </Card>
              </LazyLoad>
            ))}
            {/* </Row> */}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PostResult;
