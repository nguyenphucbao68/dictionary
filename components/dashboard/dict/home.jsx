import React, { useState, useRef, useEffect } from "react";
import Router from "next/router";
import Breadcrumb from "../../../layout/breadcrumb";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalHeader,
  ModalFooter,
  Button,
} from "reactstrap";
import Head from "next/head";
import Link from "next/link";
import useOutsideClick from "../../../lib/event";
import SkeletonSection from "./skeleton";
import settings from "../../../config/settingsConfig";
import { NextSeo, BreadcrumbJsonLd } from "next-seo";
import { Clock, Volume2 } from "react-feather";

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
const HomeSearch = () => {
  const ref = useRef();
  const [keyword, setKeyword] = useState("");
  const [listWord, setListWord] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const clickInputSearch = () => {
    if (keyword === "") return;
    setShowResults(true);
  };

  useOutsideClick(ref, () => {
    setShowResults(false);
  });

  // const onClickAudio = (url) => {
  //   var audio = new Audio(url);
  //   audio.play();
  // };

  const onChangeKeyWord = async (e) => {
    const keyword = e.target.value;
    if (keyword == "") return;
    setKeyword(e.target.value);
    try {
      const res = await fetch(
        `/api/index.php/search/${curLanguage}/${keyword}/8`,
      );
      const obj = res.json();
      setListWord(await obj);
      setShowResults(true);
    } catch (error) {
      // console.log('err', error);
    }
  };
  const [curLanguage, setCurLanguage] = useState(settings.defaultLanguageData);
  const [modal, setModal] = useState(false);
  const ModalLanguageSwitcher = () => setModal(!modal);
  const changeCurLanguage = (e) => {
    e.preventDefault();
    setCurLanguage(e.target.getAttribute("prefix"));
    setModal(false);
  };
  const [daytimes, setDayTimes] = useState();
  const today = new Date();
  const curHr = today.getHours();
  const curMi = today.getMinutes();
  const [meridiem, setMeridiem] = useState("AM");
  // eslint-disable-next-line
  const [date, setDate] = useState({ date: new Date() });
  // eslint-disable-next-line
  const [startDate, setStartDate] = useState(new Date());
  const handleChange = (date) => {
    setDate(date);
  };
  useEffect(() => {
    if (curHr < 12) {
      setDayTimes("Good Morning");
    } else if (curHr < 18) {
      setDayTimes("Good Afternoon");
    } else {
      setDayTimes("Good Evening");
    }

    if (curHr >= 12) {
      setMeridiem("PM");
    } else {
      setMeridiem("AM");
    }

    // eslint-disable-next-line
  }, []);
  const getInfoLanguage = settings.homeDictionary;
  return (
    <>
      <Head>
        <meta name="keywords" content={getInfoLanguage.keywordList()} />

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
            "target": "https://www.athoni.com/dict/en_en/{search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }`,
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
            name: getInfoLanguage.name,
            item: "https://www.athoni.com/dictionary",
          },
        ]}
      />
      <NextSeo
        title={getInfoLanguage.titleTemplate}
        description={getInfoLanguage.desc}
        canonical={`https://www.athoni.com/dictionary`}
        openGraph={{
          type: "website",
          url: `https://www.athoni.com/dictionary`,
          title: getInfoLanguage.titleTemplate,
          description: getInfoLanguage.des,
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

                    <a
                      className="language-switcher"
                      onClick={ModalLanguageSwitcher}
                      href="#javascript"
                    >
                      {
                        settings.languageData.find(
                          (item) => item.prefix == curLanguage,
                        ).name
                      }
                    </a>
                    <Modal isOpen={modal} toggle={ModalLanguageSwitcher}>
                      <ModalHeader toggle={ModalLanguageSwitcher}>
                        Language Switcher
                      </ModalHeader>
                      <ListGroup>
                        {settings.languageData.map(({ name, prefix }) => (
                          <ListGroupItem
                            className="list-group-item-action"
                            active={prefix == curLanguage}
                            prefix={prefix}
                            key={prefix}
                            onClick={changeCurLanguage}
                          >
                            {name}
                          </ListGroupItem>
                        ))}
                      </ListGroup>
                      <ModalFooter>
                        <Button color="primary" onClick={ModalLanguageSwitcher}>
                          Close
                        </Button>
                      </ModalFooter>
                    </Modal>
                    <button
                      type="button"
                      className="btn btn-light"
                      aria-label="Search..."
                    >
                      <img
                        src={require("../../../public/assets/images/landing/search-icon.png")}
                        alt="Search Icon"
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
                              href={`/dict/${curLanguage}/${item?.word}`}
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
                              href={`/dict/${curLanguage}/${item?.word}`}
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
        parent="Dictionary"
        urlParent="dictionary"
        title="Introduction"
      />
      <SkeletonSection />
      <Container fluid={true}>
        <Row>
          <Col md="8">
            <div className="card intro-text">
              <div className="card-body">
                <h1 title="Introduction to Athoni Dictionary">Introduction to Athoni Dictionary</h1>
                <ul>
                  <li>
                    <b>Multilingual Dictionary: </b> The languages ​​of the
                    dictionary include Japanese, English, Vietnamese, French, ..
                    and more updated. Specialized dictionary.
                  </li>
                  <li>
                    <b>Multi-function Dictionary: </b> A unique feature of the
                    dictionary. It can be expanded to find news, songs, and the
                    corresponding vocabulary. Compare the differences between
                    the two words.
                  </li>
                  <li>
                    <b>How to Pronounce - Youtube System: </b> Is a system to
                    look up those words on subtitles of each video. Helps you to
                    have an overview when the word is in a specific context.
                  </li>
                </ul>
              </div>
            </div>
            <Row>
              <Col md="6">
                <div className="card intro-text">
                  <div className="card-body">
                    <h2 title="English dictionaries">English dictionaries</h2>
                    <ul>
                      <li>English - English</li>
                      <li>English - Vietnamese</li>
                    </ul>
                  </div>
                </div>
              </Col>
              <Col md="6">
                <div className="card intro-text">
                  <div className="card-body">
                    <h2 title="Popular Words">Popular Words</h2>
                    <ul>
                      {[
                        "Test",
                        "Father",
                        "Question",
                        "Think",
                        "Word",
                        "Run",
                      ].map((item, i) => (
                        <li key={i}>
                          <Link href={`/dict/en_en/${item}`}><a title={item}>{item}</a></Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
          <Col md="4">
            <Card className="o-hidden profile-greeting">
              <CardBody>
                <div className="media">
                  <div className="badge-groups w-100">
                    <div className="badge f-12">
                      <Clock
                        style={{ width: "16px", height: "16px" }}
                        className="mr-1"
                      />
                      <span id="txt">
                        {curHr}:{curMi < 10 ? "0" + curMi : curMi} {meridiem}
                      </span>
                    </div>
                    <div className="badge f-12">
                      <i className="fa fa-spin fa-cog f-14"></i>
                    </div>
                  </div>
                </div>
                <div className="greeting-user text-center">
                  <div className="profile-vector">
                    <img
                      className="img-fluid"
                      src={require("../../../assets/images/dashboard/welcome.png")}
                      alt="Welcome to Athoni"
                    />
                  </div>
                  <h4 className="f-w-600">
                    <span id="greeting">articulate</span>{" "}
                    <span className="right-circle">
                      <i className="fa fa-check-circle f-14 middle"></i>
                    </span>
                  </h4>
                  <p>
                    <span> {daytimes}</span>
                  </p>
                  <p className="sound-word">
                    <span>
                      <Volume2 />
                    </span>
                    <span>
                      <Volume2 />
                    </span>
                  </p>
                  <div className="whatsnew-btn">
                    <Link href="/dict/en_en/articulate">
                      <a className="btn btn-primary">View More !</a>
                    </Link>
                  </div>
                  <div className="left-icon">
                    <i className="fa fa-bell"> </i>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HomeSearch;
