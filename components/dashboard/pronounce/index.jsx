import React, { useState, useEffect, useRef, Suspense } from "react";
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
} from "reactstrap";
import Head from "next/head";
import ErrorPage from "next/error";
import Link from "next/link";
import { Send, Clock } from "react-feather";
import useOutsideClick from "../../../lib/event";
import SkeletonSection from "./skeleton";
import dynamic from "next/dynamic";

import YoutubeResources from "./youtubeResources";
import SideBarPage from "../../app/SideBar";
{
  /*  */
}
// const YoutubeResources = dynamic(() => import('./youtubeResources'), {
// 	loading: () => <SkeletonSection />,
// });

Router.onRouteChangeStart = () => {
  // if (window.runned) return;
  document.getElementById("skeleton-pronounce")?.classList.remove("hidden");
  document.getElementById("skeleton-pronounce")?.classList.add("show");
  document.getElementById("pronounce-info")?.classList.remove("show");
  document.getElementById("pronounce-info")?.classList.add("hidden");
};
Router.onRouteChangeComplete = () => {
  document.getElementById("skeleton-pronounce")?.classList.remove("show");
  document.getElementById("skeleton-pronounce")?.classList.add("hidden");
  document.getElementById("pronounce-info")?.classList.remove("hidden");
  document.getElementById("pronounce-info")?.classList.add("show");
};
Router.onRouteChangeError = () => {
  document.getElementById("skeleton-pronounce")?.classList.remove("show");
  document.getElementById("skeleton-pronounce")?.classList.add("hidden");
  document.getElementById("pronounce-info")?.classList.remove("hidden");
  document.getElementById("pronounce-info")?.classList.add("show");
};

const isServer = typeof window === "undefined";
const Pronounce = ({ pronounce, subTitle, word }) => {
  const [BasicLineTab, setBasicLineTab] = useState("1");
  // console.log(definition[0].meaning.noun);
  // const router = useRouter();
  // if(router.isFallback){
  // 	return <div>Loading...</div>;
  // }
  if (
    // !router.isFallback ||
    // typeof definition?.slug === 'undefined' ||
    !pronounce ||
    !pronounce.length
  ) {
    return <ErrorPage statusCode={404} />;
  }

  const ref = useRef();
  const [daytimes, setDayTimes] = useState();
  const today = new Date();
  const curHr = today.getHours();
  const curMi = today.getMinutes();
  const [meridiem, setMeridiem] = useState("AM");
  // eslint-disable-next-line
  const [date, setDate] = useState({ date: new Date() });
  // eslint-disable-next-line
  const [startDate, setStartDate] = useState(new Date());
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [listWord, setListWord] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleChange = (date) => {
    setDate(date);
  };
  const [VerticleTab, setVerticleTab] = useState("2");

  // useEffect(() => {
  // 	document.getElementById('skeleton-pronounce')?.classList.remove('hidden');
  // 	document.getElementById('skeleton-pronounce')?.classList.add('show');
  // 	document.getElementById('pronounce-info')?.classList.remove('show');
  // 	document.getElementById('pronounce-info')?.classList.add('hidden');
  // 	window.runned = true;
  // }, []);

  const clickInputSearch = () => {
    if (keyword === "") return;
    setShowResults(true);
  };

  useOutsideClick(ref, () => {
    // alert('You clicked outside')
    setShowResults(false);
  });

  const onClickAudio = (url) => {
    var audio = new Audio(url);
    audio.play();
  };

  const onChangeKeyWord = async (e) => {
    const keyword = e.target?.value;
    setKeyword(e.target?.value);
    try {
      const res = await fetch(`/api/index.php/search/${keyword}/8`);
      const obj = res.json();
      setListWord(await obj);
      setShowResults(true);
    } catch (error) {
      // console.log('err', error);
    }
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
  }, []);
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Gentium+Basic:ital@1&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,700;1,300;1,400&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Container fluid={true} key="container1">
        <Row className="appointment-sec mt-2">
          <Col md="12" className="chat-default">
            <Card>
              <CardBody className="search-words">
                <div className="dropdown">
                  <div className="input-group input-group-lg search-input">
                    <input
                      type="text"
                      className="form-control"
                      aria-label="Text input with segmented dropdown button"
                      id="keyword-search"
                      placeholder="Search Athoni's Dictionary"
                      onChange={onChangeKeyWord}
                      ref={ref}
                      onClick={clickInputSearch}
                      autoComplete="off"
                    />
                    <a
                      className="language-switcher"
                      // onClick={() => ModalLanguageSwitcher()}
                    >
                      English - English
                    </a>
                    <button type="button" className="btn btn-light">
                      <img
                        width={31}
                        src="../assets/images/landing/search-icon.png"
                      />
                    </button>
                  </div>
                  <div
                    className={`dropdown-menu row ${showResults && "show"}`}
                    id="related-words"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <div className="col-md-6" key="col1">
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
                    <div className="col-md-6" key="col2">
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
      <Breadcrumb parent="Dashboard" title="Default" />
      <Container fluid={true} id="word-info" key="container2">
        <Row>
          <Col md="2" key="md2">
            <SideBarPage currentPage="pronounce" word={word} />
          </Col>
          <Col md="7" key="md7">
            <SkeletonSection />
            <YoutubeResources pronounce={pronounce} subTitle={subTitle} />
          </Col>

          <Col md="3" key="md3">
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
                  <ListGroup>...</ListGroup>
                </TabPane>
              </TabContent>
            </Card>
            <button
              className="mt-3 btn btn-outline-primary btn-lg"
              id="view-more"
            >
              Xem thêm
            </button>

            <Card className="o-hidden profile-greeting mt-3">
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
                  {/* <span id="greeting">{daytimes}</span> */}
                  <div className="profile-vector">
                    <img
                      className="img-fluid"
                      src="../assets/images/dashboard/welcome.png"
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

      <style jsx global>{`
        .uk-text-small {
          font-size: 0.8rem !important;
          line-height: 1.5;
        }
        .content-words h2,
        .content-words h3,
        .content-words h4,
        .content-words h5 {
          font-family: Roboto;
        }
        .content-words {
          font-size: 16px;
        }

        .related-section {
          border-bottom-left-radius: 0px !important;
          border-bottom-right-radius: 0px !important;
        }
        #view-more {
          width: 100%;
        }
      `}</style>
    </>
  );
};

export default Pronounce;
