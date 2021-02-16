import React, { useState, useRef } from "react";
import Router from "next/router";
//import Breadcrumb from "../../../layout/breadcrumb";
import { Container, Row, Col, Card, CardBody, CardHeader } from "reactstrap";
import Head from "next/head";
import useOutsideClick from "../../../lib/event";
// import SkeletonSection from "./skeleton";
// import settings from "../../../config/settingsConfig";
import { NextSeo, BreadcrumbJsonLd } from "next-seo";
// import DataTable from "react-data-table-component";
//import QAFilter from "./qaFilter";

import NoResult from "./noResult";
import CategoryBadge from "./categoryBadge";
import ReactHtmlParser from "react-html-parser";
import MathJax from "react-mathjax";

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
const QAResult = ({ result, query }) => {
  const ref = useRef();
  const [keyword, setKeyword] = useState(query);
  const [showResults, setShowResults] = useState(false);
  const totalResult = result?.hits?.total?.value;
  const resultList = result?.hits?.hits;
  const bestResult = resultList[0]?._source;

  const onChangeKeyword = (inputKeyWord) => {
    if (inputKeyWord.length === 0 || !inputKeyWord.replace(/\s/g, "").length)
      return;
    Router.push("/qa/" + inputKeyWord);
  };

  useOutsideClick(ref, () => {
    setShowResults(false);
  });

  const transformHTML = (node) => {
    if (
      node.type === "tag" &&
      node.name === "span" &&
      node.attribs.class === "math-tex"
    ) {
      return (
        <MathJax.Node
          inline
          formula={node.children[0].data.replace("\\(", "").replace("\\)", "")}
        />
      );
    }
    if (
      //remove garbage pre tag
      node.type === "tag" &&
      node.name === "pre" &&
      node.children[0].data
        .replace(/(\r\n)+|\r+|\n+|\t+/, "")
        .replace(" ", "") === ""
    ) {
      console.log(node);
      return null;
    }
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
            <Card>
              <CardBody className="search-words">
                <div className="dropdown">
                  <div className="input-group input-group-lg search-input">
                    <input
                      type="text"
                      className="form-control"
                      aria-label="Tìm lời giải và bài tập"
                      id="keyword-search"
                      placeholder="Tìm lời giải và bài tập"
                      value={keyword}
                      onChange={(event) => {
                        setKeyword(event.target.value);
                        onChangeKeyword(event.target.value);
                      }}
                      ref={ref}
                      //onClick={clickInputSearch}
                      autoComplete="off"
                    />
                    <button
                      type="button"
                      className="btn btn-light"
                      aria-label="Tìm kiếm..."
                      onClick={() => onChangeKeyword(keyword)}
                    >
                      <img
                        src={require("../../../public/assets/images/landing/search-icon.png")}
                        alt="Search Icon"
                        width={31}
                      />
                    </button>
                  </div>
                </div>
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
              bestResult.selchildid !== null ? (
                <Card key={"bestResult"} className="card-absolute best-answer">
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
                    <MathJax.Provider>
                      {ReactHtmlParser(bestResult.selchildcontent, {
                        transform: (node) => transformHTML(node),
                      })}
                    </MathJax.Provider>

                    <CategoryBadge
                      catid1={bestResult.catidpath1}
                      catid2={bestResult.catidpath2}
                      catid3={bestResult.catidpath3}
                      info={{
                        title: "tốt nhất",
                        tooltip:
                          "câu trả lời này được cộng đồng lựa chọn tuy nhiên chỉ mang tính chất tham khảo",
                        color: "success",
                      }}
                    />
                  </CardBody>
                </Card>
              ) : totalResult > 0 && bestResult.type === "Q" ? (
                <Card key={"bestResult"} className="card-absolute best-answer">
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
                    <MathJax.Provider>
                      {ReactHtmlParser(bestResult.content, {
                        transform: (node) => transformHTML(node),
                      })}
                    </MathJax.Provider>
                  </CardBody>
                </Card>
              ) : totalResult > 0 && bestResult.type === "A" ? (
                <Card key={"bestResult"} className="card-absolute best-answer">
                  <CardHeader className="bg-secondary">
                    <h5>Trả lời</h5>
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
                    <CategoryBadge
                      catid1={bestResult.catidpath1}
                      catid2={bestResult.catidpath2}
                      catid3={bestResult.catidpath3}
                      info={{
                        title: "tham khảo",
                        tooltip:
                          "câu trả lời này khớp với từ khóa của bạn nhất, tuy nhiên chỉ mang tính chất tham khảo",
                        color: "warning",
                      }}
                    />
                  </CardBody>
                </Card>
              ) : (
                <NoResult keyword={keyword} type="NO_RESULT" />
              )
              /*eslint-enable */
            }
            {resultList?.slice(1).map((data, i) => (
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

                    <p>{data._source?.text}</p>
                    <CategoryBadge
                      catid1={data._source?.catidpath1}
                      catid2={data._source?.catidpath2}
                      catid3={data._source?.catidpath3}
                    />
                  </CardBody>
                </div>
              </Card>
            ))}
            {totalResult > 0 ? (
              <NoResult keyword={keyword} type={"FINAL_RESULT"} />
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
