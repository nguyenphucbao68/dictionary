import React, { useState, useEffect, useRef } from "react";
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
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Progress,
} from "reactstrap";
import Head from "next/head";
import Link from "next/link";
import useOutsideClick from "../../../lib/event";
import SkeletonSection from "./skeleton";
import settings from "../../../config/settingsConfig";
import { NextSeo, BreadcrumbJsonLd } from "next-seo";
import dynamic from "next/dynamic";
import YouTube from "react-youtube";
import { parseStringPromise } from "xml2js";
import ErrorPage from "next/error";
import { XmlEntities } from "html-entities";
import reactStringReplace from "react-string-replace";
const ScrollArea = dynamic(() => import("react-scrollbar"), { ssr: false });
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
const Pronounce = ({ pronounce, subTitle, word }) => {
  if (!pronounce) {
    return <ErrorPage statusCode={404} />;
  }

  const ref = useRef();
  const [keyword, setKeyword] = useState("");
  const [listWord, setListWord] = useState([]);
  const [showResults, setShowResults] = useState(false);
  // const [VerticleTab, setVerticleTab] = useState("2");

  const clickInputSearch = () => {
    if (keyword == "") return;
    setShowResults(true);
  };

  useOutsideClick(ref, () => {
    setShowResults(false);
  });
  const inputRef = useRef();
  // const onClickAudio = (url) => {
  //   var audio = new Audio(url);
  //   audio.play();
  // };

  const onChangeKeyWord = async (e) => {
    const keyword = e.target.value;
    if (keyword == "") return;
    setKeyword(e.target.value);
    try {
      const res = await fetch(`/api/index.php/search/en_en/${keyword}/8`);
      const obj = res.json();
      setListWord(await obj);
      setShowResults(true);
    } catch (error) {
      // console.log('err', error);
    }
  };
  const [pillDarkTab, setpillDarkTab] = useState("1");

  const [subTitleText, setSubTitleText] = useState(pronounce[0]?.title);
  const [curCode, setCurCode] = useState(pronounce[0]?.code);
  const [index, setIndex] = useState(0);
  const [subTitleList, setSubTitleList] = useState(subTitle);
  const [playStart, setPlayStart] = useState(false);
  useEffect(() => {
    if (playStart) {
      if (!window.secTimer)
        window.secTimer = setInterval(() => {
          if (window.changedVideo) return;
          const timeEnd = new Date();
          if (window.stopTime) {
            var timeDiff =
              (timeEnd - window.currentTime - window.stopTime) / 1000;
            window.stopTime = false;
          } else {
            timeDiff = (timeEnd - window.currentTime) / 1000;
          }

          if (timeDiff > parseFloat(window.durTime)) {
            window.subTitleIndex += 1;

            window.currentTime = new Date();
            window.durTime = parseFloat(
              subTitleList[window.subTitleIndex]?.$.dur,
            ).toFixed(2);
            setSubTitleText(subTitleList[window.subTitleIndex]?._);
            inputRef?.current?.scrollIntoView({
              behavior: "smooth",
              block: "nearest",
              inline: "end",
            });
          }
        }, 200);
    }
  });
  const onStopFunc = () => {
    console.log("run");
    clearInterval(window.secTimer);
    window.stopTime = new Date();
    window.secTimer = false;
    setPlayStart(false);
  };

  const onReadyFunc = (event) => {
    event.target.seekTo(pronounce[0].start);
    subTitleList.find((element, index) => {
      if (pronounce[0].start > parseFloat(element.$.start)) return false;
      window.subTitleIndex = index;
      setSubTitleText(element?._);
      return true;
    });
  };

  const onPlayFunc = (event) => {
    setPlayStart(true);
    const video = event.target;
    subTitleList.find((element, index) => {
      let currentTime = video.getCurrentTime();
      if (currentTime > parseFloat(element.$.start)) return false;
      // setCurrentTime(new Date());
      window.currentTime = new Date();
      window.durTime = parseFloat(element.$.dur).toFixed(2);
      window.subTitleIndex = index;
      // setSubTitleIndex(index);
      setSubTitleText(element?._);
      return true;
    });
  };

  const getSubTitle = async (code = "", lang = "en") => {
    try {
      const response = await fetch(
        `https://video.google.com/timedtext?lang=${lang}&v=${code}`,
      );
      const str = response.text();
      const result = await parseStringPromise(await str, function (err, ress) {
        console.log(ress);
        return ress;
      });
      if (!(await result)) return false;
      return { result };
    } catch (error) {
      return false;
    }
  };

  const changeVideoFunc = async (e) => {
    window.changedVideo = true;

    const index = e.target.attributes["index"]?.value;
    const code = e.target.attributes["code"]?.value;
    const subTitles = await getSubTitle(code);
    if (!subTitles) {
      alert("This video is error!!!");
      return;
    }
    setSubTitleList(subTitles?.result.transcript?.text);
    setIndex(index);
    setSubTitleText(pronounce[index]?.title);
    setCurCode(code);
    delete window.currentTime;
    delete window.durTime;
    delete window.subTitleIndex;
    clearInterval(window.secTimer);
    delete window.secTimer;
    delete window.stopTime;
    // setSubTitleText(pronounce[index]?.title);

    window.changedVideo = false;
  };

  const opts = {
    height: "385",
    width: "100%",
    playerVars: {
      autoplay: 0,
      origin: process.env.ORIGIN_URL,
    },
  };
  const getInfoLanguage = settings.pronounce;

  const handleText = (text) => {
    const entities = new XmlEntities();
    const val = entities.decode(text);
    return reactStringReplace(val, word, (match, i) => (
      <strong className="wordSubTitle" key={i}>
        {match}
      </strong>
    ));
  };
  // To do : Update Soon....
  // const MouseOver = (e) => {
  //   console.log(e.target.getAttribute("word"));
  // };
  // const handleText = (text) => {
  //   return reactStringReplace(text, /(\p{L}+)/gu, (match, i) => (
  //     <a onMouseOver={MouseOver} word={match} key={i}>
  //       {match}
  //     </a>
  //   ));
  // };
  return (
    <>
      <Head>
        <meta name="keywords" content={getInfoLanguage.keywordList(word)} />

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
            "target": "https://www.athoni.com/pronounce/{search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }`,
          }}
        ></script>
        <link href="https://www.athoni.com" rel="publisher" />
        <link rel="dns-prefetch" href="//googlevideo.com" />
        <link rel="dns-prefetch" href="//www.youtube.com" />
        <link rel="dns-prefetch" href="//i.ytimg.com" />
        <link
          rel="preconnect"
          href="https://*.googlevideo.com"
          crossOrigin="true"
        />
        <link
          rel="preconnect"
          href="https://www.youtube.com"
          crossOrigin="true"
        />
        <link rel="preconnect" href="https://i.ytimg.com" crossOrigin="true" />
      </Head>
      <BreadcrumbJsonLd
        itemListElements={[
          {
            position: 1,
            name: "Home",
            item: "https://www.athoni.com/dictionary",
          },
          {
            position: 2,
            name: word,
            item: `https://www.athoni.com/pronounce/${word}`,
          },
        ]}
      />
      <NextSeo
        title={word}
        titleTemplate={getInfoLanguage.titleTemplate}
        canonical={`https://www.athoni.com/pronounce/${word}`}
        description={getInfoLanguage.description(word)}
        openGraph={{
          type: "website",
          url: `https://www.athoni.com/pronounce/${word}`,
          title: getInfoLanguage.titleTemplateFunc(word),
          description: getInfoLanguage.description(word),
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
              <CardBody className="search-words">
                <div className="dropdown">
                  <div className="input-group input-group-lg search-input">
                    <input
                      type="text"
                      className="form-control"
                      aria-label="Search Athoni's Dictionary"
                      id="keyword-search"
                      placeholder="Search Athoni's Dictionary"
                      onChange={onChangeKeyWord}
                      ref={ref}
                      onClick={clickInputSearch}
                      autoComplete="off"
                    />

                    <a className="language-switcher" href="#javascript">
                      English - English
                    </a>
                    <button
                      type="button"
                      className="btn btn-light"
                      aria-label="Search..."
                    >
                      <img
                        src={require("../../../public/assets/images/landing/search-icon.png")}
                        alt=""
                        width={31}
                      />
                    </button>
                  </div>
                  <div
                    className={`dropdown-menu row ${showResults && "show"}`}
                    id="related-words"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <div className="col-md-6">
                      {listWord
                        .filter((item, i) => i < listWord.length / 2)
                        .map((item, i) => (
                          <>
                            <Link
                              href={`/pronounce/${item?.word}`}
                              key={i}
                              onClick={() => setShowResults(false)}
                            >
                              <a className="dropdown-item">
                                {item.word == keyword ? (
                                  <strong>{item?.word}</strong>
                                ) : (
                                  item?.word
                                )}
                              </a>
                            </Link>
                          </>
                        ))}
                    </div>
                    <div className="col-md-6">
                      {listWord
                        .filter((item, i) => i >= listWord.length / 2)
                        .map((item, i) => (
                          <>
                            <Link
                              href={`/pronounce/${item?.word}`}
                              key={i}
                              onClick={() => setShowResults(false)}
                            >
                              <a className="dropdown-item">{item?.word}</a>
                            </Link>
                          </>
                        ))}
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <Breadcrumb
        parent={getInfoLanguage.name}
        title="Pronounce"
        urlParent="pronounce"
        language="en_en"
        word={word}
      />
      <SkeletonSection />

      <Container fluid={true} id="word-info" key="word-info">
        <h1>How to pronounce &apos;{word}&apos; in English? - Athoni</h1>
        <Row className="mb-3">
          <Col md="8">
            <div className="youtube">
              <YouTube
                videoId={curCode}
                opts={opts}
                onReady={onReadyFunc}
                onPlay={onPlayFunc}
                onPause={onStopFunc}
              />
              <div className="sub">
                <span
                  className="text"
                  // dangerouslySetInnerHTML={{ __html: subTitleText }}
                >
                  {handleText(subTitleText)}
                </span>
              </div>
            </div>
            <div className="action-item">
              <span className="left">
                <button className="btn btn-primary">
                  <i className="icon-light-bulb"></i>
                </button>
              </span>
              <span className="pull-right">
                <button className="btn btn-light" key="skip-backward">
                  <i className="icon-control-skip-backward"></i>
                </button>
                <button className="btn btn-light" key="skip-forward">
                  <i className="icon-control-skip-forward"></i>
                </button>
              </span>
            </div>
          </Col>
          <Col md="4" className="p-0">
            <Nav className="nav-dark">
              <NavItem>
                <NavLink
                  href="#javascript"
                  className={pillDarkTab === "1" ? "active" : ""}
                  onClick={() => setpillDarkTab("1")}
                >
                  <i className="icofont icofont-ui-home"></i>Sub Video
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  href={`/dict/en_en/${word}`}
                  className={pillDarkTab === "2" ? "active" : ""}
                  onClick={() => setpillDarkTab("2")}
                >
                  <i className="icofont icofont-book-alt"></i>
                  Definition
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={pillDarkTab}>
              <TabPane className="fade show" id="panelSub" tabId="1">
                <ListGroup className="moreExample" id="subTitle" key="section7">
                  <ScrollArea
                    horizontal={false}
                    vertical={true}
                    key="section9"
                    id="scrollAreaRef"
                  >
                    {subTitleList.map((item, i) => (
                      <ListGroupItem key={i}>
                        <span className="badge badge-primary">
                          {item?.$.start}
                        </span>{" "}
                        {/* <span
                          dangerouslySetInnerHTML={{
                            __html:
                              "<strong>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, repellat recusandae. Eos reiciendis minima voluptatibus debitis, unde doloribus ipsa porro similique nobis itaque ut fugit eveniet blanditiis quam pariatur. Earum!</strong>",
                          }}
                        ></span> */}
                        {typeof window !== "undefined" &&
                        window?.subTitleIndex == i ? (
                          <strong
                            id="refSubTitle"
                            ref={inputRef}
                            dangerouslySetInnerHTML={{
                              __html: `${item?._}`,
                            }}
                          ></strong>
                        ) : (
                          <span
                            dangerouslySetInnerHTML={{
                              __html: item?._,
                            }}
                          ></span>
                        )}
                        <Progress
                          color="secondary"
                          value={
                            (parseInt(item?.$.start) /
                              parseInt(
                                subTitleList[subTitleList.length - 1]?.$.start,
                              )) *
                            100
                          }
                          className="xs-progress-bar m-t-5"
                        />
                      </ListGroupItem>
                    ))}
                  </ScrollArea>
                </ListGroup>
              </TabPane>
              <TabPane tabId="2"></TabPane>
            </TabContent>
            <div className="action-item">
              <span className="left">
                <button className="btn btn-primary">
                  <i className="icon-light-bulb"></i>
                </button>
              </span>
              <span className="pull-right">
                <button className="btn btn-light" key="skip-backward">
                  <i className="icon-control-skip-backward"></i>
                </button>
                <button className="btn btn-light" key="skip-forward">
                  <i className="icon-control-skip-forward"></i>
                </button>
              </span>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md="8">
            <Card id="author-info-video">
              <CardHeader className="p-4">
                <h2>{pronounce[index]?.data?.title}</h2>
              </CardHeader>
              <CardBody className="p-4">
                <div className="appointment-table table-responsive">
                  <table className="table table-bordernone">
                    <tbody>
                      <tr>
                        <td width="8%">
                          <img
                            className="img-fluid img-40 rounded-circle mb-3"
                            src="../assets/images/appointment/app-ent.jpg"
                            alt="Image description"
                          />
                          <div className="status-circle bg-primary" />
                        </td>
                        <td className="img-content-box">
                          <span className="d-block">
                            {pronounce[index]?.data?.author_name}
                          </span>
                          <span className="font-roboto">Now</span>
                        </td>
                        <td></td>
                        <td className="text-right">
                          <a
                            className="button btn btn-primary"
                            href={pronounce[index]?.data?.author_url}
                          >
                            Subscribe
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col md="4" className="p-0">
            <Card id="author-info-video">
              <CardHeader className="p-3">
                <h2>Related Videos</h2>
              </CardHeader>
              <CardBody className="p-3">
                <div className="appointment-table table-responsive">
                  <table className="table table-bordernone" id="related-videos">
                    <tbody>
                      {pronounce?.slice(1).map((item, key) => (
                        <tr key={key}>
                          <td width="40%">
                            <div className="avatar ratio">
                              <img
                                className="img-fluid mb-3 b-r-8"
                                src={item?.data.thumbnail_url}
                                alt={item?.data.title}
                                data-original-title={item?.data.title}
                                title={item?.data.title}
                              />
                            </div>
                            <div className="status-circle bg-primary" />
                          </td>
                          <td className="img-content-box pl-2">
                            <span
                              className="d-block title-video p-1 mb-6"
                              onClick={changeVideoFunc}
                              code={item?.code}
                              index={key}
                            >
                              {item?.data.title}
                            </span>
                            <span className="font-roboto author-video p-1">
                              {item?.data.author_name}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Pronounce;
