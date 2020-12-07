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
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Modal,
  ModalHeader,
  ModalFooter,
  Button,
} from "reactstrap";
import Head from "next/head";
import ErrorPage from "next/error";
import Link from "next/link";
import useOutsideClick from "../../../lib/event";
import SideBarPage from "../../app/SideBar";
import SkeletonSection from "./skeleton";
import settings from "../../../config/settingsConfig";
import { NextSeo, BreadcrumbJsonLd } from "next-seo";

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
const Dictionary = ({ definition, word, language }) => {
  const [BasicLineTab, setBasicLineTab] = useState("1");
  if (!definition) {
    return <ErrorPage statusCode={404} />;
  }

  const ref = useRef();
  const [keyword, setKeyword] = useState("");
  const [listWord, setListWord] = useState([]);
  const [showResults, setShowResults] = useState(false);
  // const [VerticleTab, setVerticleTab] = useState("2");

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
  const getInfoLanguage = settings.languageData.find(
    (item) => item.prefix == language,
  );
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
            "target": "https://www.athoni.com/dict/${language}/{search_term_string}",
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
            item: "https://www.athoni.com",
          },
          {
            position: 3,
            name: word,
            item: `https://www.athoni.com/dict/${language}/${word}`,
          },
        ]}
      />
      <NextSeo
        title={word}
        titleTemplate={getInfoLanguage.titleTemplate}
        description={definition.meta.desc.trim()}
        canonical={`https://www.athoni.com/dict/${language}/${word}`}
        openGraph={{
          type: "website",
          url: `https://www.athoni.com/dict/${language}/${word}`,
          title: getInfoLanguage.titleTemplateFunc(word),
          description: definition.meta.desc.trim(),
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
                              href={`/dict/${language}/${item?.word}`}
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
                              href={`/dict/${language}/${item?.word}`}
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
        title="Definition"
        language={language}
        word={word}
      />
      <SkeletonSection />
      <Container fluid={true} id="word-info" key="word-info">
        <Row>
          <Col md="2">
            <SideBarPage currentPage="details" word={word} />
          </Col>
          <Col md="7">
            <Card>
              <CardHeader>
                <h1>
                  {definition.word}
                  {/* <span className='uk-text-small'>noun</span> */}
                </h1>
                {/* <div>
                  <span className="speaker-word">
                    <i
                      className="txt-primary icofont icofont-audio"
                      //   onClick={() => onClickAudio(data.pronunciation)}
                    ></i>{' '}
                    {/* {data.phonetic} 
                  </span>
                </div> */}
              </CardHeader>
              <CardBody
                className="content-words"
                dangerouslySetInnerHTML={{ __html: definition.data }}
              ></CardBody>
            </Card>
          </Col>

          <Col md="3">
            <h4>Other Results</h4>
            <Card className="m-b-0 related-section">
              <Nav className="m-b-0" tabs>
                <NavItem>
                  <NavLink
                    href="#javascript"
                    className={BasicLineTab === "1" ? "active" : ""}
                    onClick={() => setBasicLineTab("1")}
                  >
                    Matches
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={BasicLineTab}>
                <TabPane className="fade show" tabId="1">
                  <ListGroup>
                    {definition?.relatedWords?.map((item, i) => (
                      <ListGroupItem
                        className="btn-square btn btn-outline-light txt-dark"
                        action
                        key={i}
                      >
                        <a
                          href={`/dict/${language}/${item.word}`}
                          as={`/dict/${language}/${item.word}`}
                        >
                          {item.word}
                        </a>
                      </ListGroupItem>
                    ))}
                  </ListGroup>
                </TabPane>
              </TabContent>
            </Card>
            <button
              className="mt-3 btn btn-outline-primary btn-lg"
              id="view-more"
              aria-label="View More"
            >
              Xem thêm
            </button>

            <Card className="o-hidden profile-greeting mt-3">
              <CardBody>
                <div className="media">
                  <div className="badge-groups w-100">
                    <div className="badge f-12">
                      <i className="fa fa-spin fa-cog f-14"></i>
                    </div>
                  </div>
                </div>
                <div className="greeting-user text-center">
                  {/* <span id="greeting">{daytimes}</span> */}
                  <div className="profile-vector">
                    <img
                      className="img-fluid"
                      src={require("../../../public/assets/images/dashboard/welcome.png")}
                      alt=""
                    />
                  </div>
                  <h4 className="f-w-600">
                    {" "}
                    comfortable{" "}
                    <span className="right-circle">
                      <i className="fa fa-check-circle f-14 middle"></i>
                    </span>
                  </h4>
                  <div className="whatsnew-btn">
                    <a className="btn btn-primary" href="#javascript">
                      Whats New !
                    </a>
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

export default Dictionary;
