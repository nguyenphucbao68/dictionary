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

const QAResult = ({ result, query }) => {
  //const ref = useRef();
  //const [showResults, setShowResults] = useState(false);
  const totalResult = result?.hits?.total?.value;
  const resultList = result?.hits?.hits;
  const bestResult = resultList[0]?._source;

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
      //remove garbage pre tag
      node?.type === "tag" &&
      node?.name === "pre" &&
      node?.children[0].data
        .replace(/(\r\n)+|\r+|\n+|\t+/, "")
        .replace(" ", "") === ""
    ) {
      return null;
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
      //Prevent dangerous Link
      node?.type === "tag" &&
      node?.name === "a"
    ) {
      return (
        <a
          key={uuidv4()}
          href={node?.attribs.href}
          rel="noopener noreferrer nofollow"
        >
          {node?.children[0].data}
        </a>
      );
    }
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

  const decodeHTML = (html) => {
    return html;
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
        title={`${query} | Homework Helper | Athoni`}
        canonical={`https://www.athoni.com/qa`}
        openGraph={{
          type: "website",
          url: `https://www.athoni.com/qa/`,
          title: `${query} | Homework Helper | Athoni`,
          images: [
            {
              url: "https://www.athoni.com/assets/images/athoni-bg.png",
              width: 800,
              height: 600,
              alt: "Athoni Homework Helper",
            },
          ],
          site_name: "Athoni Homework Helper",
        }}
        twitter={{
          handle: "@handle",
          site: "@site",
          cardType: "summary_large_image",
        }}
      />
      <Container fluid={true}>
        <Row className="mt-2">
          <Col md="12">
            <Card style={{ backgroundColor: "#f8f8f8", boxShadow: "none" }}>
              <CardBody className="landing-home pb-0">
                <Search
                  searchMode={"hoidap"}
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
              totalResult > 0 &&
              bestResult.selchildid &&
              bestResult.selchildid !== null &&
              resultList[0]._score >= 70 ? (
                <LazyLoad height={500} once={true}>
                  <Card
                    key={"bestResult"}
                    className="card-absolute best-answer"
                  >
                    <CardHeader className="bg-secondary">
                      <h5>Trả lời tốt nhất</h5>
                    </CardHeader>
                    <CardBody>
                      <h5 className="f-w-600">
                        <a
                          href={
                            process.env.NEXT_PUBLIC_HOIDAP_URL +
                            bestResult.questionid
                          }
                          rel="noreferrer noopener"
                        >
                          {bestResult.title}
                        </a>
                      </h5>
                      <MathJax.Provider>
                        {ReactHtmlParser(bestResult.content, {
                          transform: (node) => transformHTML(node),
                        })}
                      </MathJax.Provider>
                      <hr />
                      <p className="f-w-600">Trả lời:</p>
                      <MathJax.Provider>
                        {ReactHtmlParser(bestResult.selchildcontent, {
                          transform: (node) => transformHTML(node),
                        })}
                      </MathJax.Provider>
                      <div className="mt-2">
                        <CategoryBadge
                          catid1={bestResult.catidpath3}
                          catid2={bestResult.catidpath2}
                          catid3={bestResult.catidpath1}
                          info={{
                            title: "Tốt nhất",
                            tooltip:
                              "câu trả lời này được cộng đồng lựa chọn tuy nhiên chỉ mang tính chất tham khảo",
                            color: "success",
                          }}
                        />
                      </div>
                    </CardBody>
                  </Card>
                </LazyLoad>
              ) : totalResult > 0 && bestResult.type === "Q" ? (
                <LazyLoad height={500} once={true}>
                  <Card
                    key={"bestResult"}
                    className="card-absolute best-answer"
                  >
                    <CardHeader className="bg-secondary">
                      <h5>Câu hỏi</h5>
                    </CardHeader>
                    <CardBody>
                      <h5 className="f-w-600">
                        <a
                          href={
                            process.env.NEXT_PUBLIC_HOIDAP_URL +
                            bestResult.questionid
                          }
                          rel="noreferrer noopener"
                        >
                          {bestResult.title}
                        </a>
                      </h5>
                      <div>
                        <MathJax.Provider>
                          {ReactHtmlParser(bestResult.content, {
                            transform: (node) => transformHTML(node),
                          })}
                        </MathJax.Provider>
                      </div>
                      <div className="mt-2">
                        <CategoryBadge
                          catid1={bestResult.catidpath3}
                          catid2={bestResult.catidpath2}
                          catid3={bestResult.catidpath1}
                          info={{
                            title: "Câu hỏi",
                            tooltip:
                              "câu hỏi được gửi cho bạn thay cho câu trả lời vì chưa có câu trả lời nào được chọn",
                            color: "info",
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
            {totalResult > 5 && (
              <NoResult keyword={query} type={"FINAL_RESULT"} />
            )}
            {resultList?.slice(1).map((data, i) => (
              <LazyLoad key={i} height={250} offset={170} once={true}>
                <Card key={i}>
                  <div className="qa-record">
                    <CardBody>
                      <h5 className="f-w-600">
                        <a
                          href={
                            process.env.NEXT_PUBLIC_HOIDAP_URL +
                            data?._source?.questionid
                          }
                          rel="noreferrer noopener"
                        >
                          {data._source?.title}
                        </a>
                      </h5>

                      <p className="search-description">
                        {decodeHTML(shortenContent(data._source?.text, 250))}
                      </p>
                      <div>
                        <CategoryBadge
                          catid1={data._source?.catidpath3}
                          catid2={data._source?.catidpath2}
                          catid3={data._source?.catidpath1}
                        />
                      </div>
                    </CardBody>
                  </div>
                </Card>
              </LazyLoad>
            ))}
            {totalResult > 0 ? (
              <NoResult keyword={query} type={"FINAL_RESULT"} />
            ) : (
              <></>
            )}
            {/* </Row> */}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default QAResult;
