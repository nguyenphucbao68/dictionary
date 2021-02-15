import Head from "next/head";
import { useState, useRef } from "react";
import useOutsideClick from "../lib/event";
import settings from "../config/settingsConfig";

const HomePage = () => {
  const [restAPI, setRestAPI] = useState("");
  const [currentSearch, setCurrentSearch] = useState("dictionary");
  const [dataSearch, setDataSearch] = useState({
    keyword: "",
    curLanguage: "",
  });
  const setActiveSearch = (e) => {
    const area = e.currentTarget.getAttribute("area");
    setCurrentSearch(area);
  };

  const ref = useRef();
  const [keyword, setKeyword] = useState("");
  const [listWord, setListWord] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [curLanguage, setCurLanguage] = useState(settings.defaultLanguageData);
  const clickInputSearch = () => {
    if (keyword === "") return;
    setShowResults(true);
  };

  useOutsideClick(ref, () => {
    setShowResults(false);
  });

  const onChangeKeyWord = async (e) => {
    const keyword = e.target.value;
    if (keyword == "") return;
    setKeyword(e.target.value);
    try {
      var restAPI = "";
      switch (currentSearch) {
        case "chemistry":
          restAPI = `/api/index.php/reaction/search/s/${keyword}`;
          break;
        case "dictionary":
          restAPI = `/api/index.php/search/${curLanguage}/${keyword}/8`;
          break;
        case "hoidap":
          break;
        case "lecttr":
          break;
      }
      console.log(restAPI);
      const res = await fetch(restAPI);
      const obj = res.json();
      setListWord(await obj);
      setShowResults(true);
    } catch (error) {
      console.log("err", error);
    }
  };

  return (
    <>
      <Head>
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="assets/images/favicon.png" type="image/x-icon" />
        <link
          rel="shortcut icon"
          href="assets/images/favicon.png"
          type="image/x-icon"
        />
        {/* Google font*/}
        <link
          href="https://fonts.googleapis.com/css?family=Rubik:400,400i,500,500i,700,700i&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Roboto:300,300i,400,400i,500,500i,700,700i,900&display=swap"
          rel="stylesheet"
        />
        <meta charSet="utf-8" />
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta
          name="description"
          content="Athoni is educated ecosystem where you can find or learn everything about Chemistry, Language, Physics & Other Subjects"
        />
        <meta name="keywords" content="athoni, chemical equation, dictionary" />
        <title>Homepage | Athoni - Look up Everything</title>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,minimum-scale=1,initial-scale=1"
        />
        <meta name="revisit-after" content="1 days" />
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="true"
        />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="canonical" href="https://www.athoni.com/" />
        <meta name="revisit-after" content="1 days" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com/"
          crossOrigin="true"
        />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link
          rel="preconnect"
          href="https://www.googletagmanager.com"
          crossOrigin="true"
        />
        {/* Google font*/}
        <link
          href="https://fonts.googleapis.com/css?family=Rubik:400,400i,500,500i,700,700i&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Roboto:300,300i,400,400i,500,500i,700,700i,900&display=swap"
          rel="stylesheet"
        />
        {/* Font Awesome*/}
        <link
          rel="stylesheet"
          type="text/css"
          href="assets/css/fontawesome.css"
        />
        {/* ico-font*/}
        <link rel="stylesheet" type="text/css" href="assets/css/icofont.css" />
        {/* Themify icon*/}
        <link rel="stylesheet" type="text/css" href="assets/css/themify.css" />
        {/* Flag icon*/}
        <link
          rel="stylesheet"
          type="text/css"
          href="assets/css/flag-icon.css"
        />
        {/* Feather icon*/}
        <link
          rel="stylesheet"
          type="text/css"
          href="assets/css/feather-icon.css"
        />
        {/* Plugins css start*/}
        <link rel="stylesheet" type="text/css" href="assets/css/animate.css" />
        {/* Plugins css Ends*/}
        {/* Bootstrap css*/}
        <link
          rel="stylesheet"
          type="text/css"
          href="assets/css/bootstrap.css"
        />
        {/* App css*/}
        <link rel="stylesheet" type="text/css" href="assets/css/style.css" />
        <link
          id="color"
          rel="stylesheet"
          href="assets/css/color-1.css"
          media="screen"
        />
        {/* Responsive css*/}
        <link
          rel="stylesheet"
          type="text/css"
          href="assets/css/responsive.css"
        />
        <style
          dangerouslySetInnerHTML={{
            __html:
              "\n            .landing-home .content h1{\n                font-size: 87px;\n                background-image: -webkit-linear-gradient(rgb(255 255 255 / 50%), rgb(255 255 255 / 50%)),url(../../assets/images/landing/title.gif);\n            }\n            .landing-home .row.layout-row{\n                position: absolute;\nfloat: left;\ntop: 50%;\nleft: 50%;\ntransform: translate(-50%, -37%);\nwidth: 100%;\n            }\n            .landing-home .content {\n                margin: 0 auto;\n    width: 58%;\n    text-align: center;\n    display: block;\n    \n            }\n            .landing-home .center-content{\n                margin: 0 auto;\n            }\n\t\t\t.landing-home .col-xl-5 {\n\t\t\t\tbackground: none;\n\t\t\t}\n\t\t\t.landing-home {\n\t\t\t\tbackground-color: transparent;\n\t\t\t\tbackground-image: linear-gradient(180deg, #1a1239 0%, #1e2386 100%);\n            }\n            .eight {\n                bottom: -162px;\n    left: 30%;\n    -webkit-animation: animationtop 10s infinite;\n    animation: animationtop 10s infinite;\n            }\n            .eight img{\n                height: 528px!important;\n                -webkit-animation: animationtop 10s infinite;\n    animation: animationtop 10s infinite;\n            }\n            .nine{\n                left: 18%;\n    bottom: 3px;\n    -webkit-animation: animationtop 10s infinite;\n    animation: animationtop 10s infinite;\n            }\n            .ten{\n                left: 15%;\n    bottom: 25px;\n    -webkit-animation: animationtop 10s infinite;\n    animation: animationtop 10s infinite;\n            }\n            .eleven{\n                right: 10%;\n                bottom: 3px;\n                -webkit-animation: animationleft 10s infinite;\n    animation: animationleft 10s infinite;\n            }\n            .twelve{\n                right: 18%;\n                bottom: 3px;\n                -webkit-animation: animationtop 10s infinite;\n    animation: animationtop 10s infinite;\n            }\n            .thirdteen{\n                bottom: -150px;\n                left: -30px;\n                -webkit-animation: animationleft 5s infinite;\n    animation: animationleft 5s infinite;\n            }\n            .fourteen{\n                bottom: -40px;\n                left: -30px;\n                -webkit-animation: animationtop 5s infinite;\n    animation: animationtop 5s infinite;\n            }\n            .fifthteen{\n                top: 50%;\n                right: 100px;\n                -webkit-animation: animationtop  10s infinite;\n    animation: animationtop  10s infinite;\n            }\n            .sixteen{\n                top: 20%;\n                right: 160px;\n                -webkit-animation: animationtop 10s infinite;\n    animation: animationtop 10s infinite;\n            }\n            .seventeen{\n                top: 30%;\n                left: 100px;\n                -webkit-animation: spin 15s infinite;\n    animation: spin 15s infinite;\n            }\n            .seventeen img{\n                filter: brightness(100%) contrast(100%) saturate(100%) blur(2.2px) hue-rotate(0deg);\n            }\n            .eightteen{\n                top: 60%;\n                left: 300px;\n                -webkit-animation: spin 20s infinite;\n    animation: spin 20s infinite;\n            }\n            .language-switcher{\n                padding: 14px 8px;\n            }\n            .search-input{\n                padding: 7px;\n                background-color: #fff;\n                border-radius: .3rem;\n                border-bottom-left-radius: 0px;\n                border-bottom-right-radius: 0px;\n            }\n            .search-input input{\n                border: 0px;\n                border-right: 1px solid #888;\n                \n            }\n            .landing-home .dropdown-menu{\n                width: 100%;\n                margin-top: -1px;\n                border: 1px solid #fff;\n    border-top: 1px dotted #888;\n    border-top-left-radius: 0px;\n    border-top-right-radius: 0px;\n            }\n            .landing-home .dropdown-menu .col-md-6{\n                float: left;\n            }\n            .landing-home .dropdown-menu .col-md-6:first-child{\n                border-right: 1px solid #777;\n            }\n\t\t",
          }}
        />
        <meta
          property="og:image"
          content="https://www.athoni.com/assets/images/athoni-bg.png"
        />
        <meta property="og:image:alt" content="Athoni Dictionary" />
        <meta property="og:image:width" content={800} />
        <meta property="og:image:height" content={600} />
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:title"
          content="Athoni Dictioanry - English dictionary, Vietnamese Dictionary"
        />
        <meta
          property="og:description"
          content="Athoni Dictionary - American English audio pronunciation, Vietnamese dictionary, English dictionary"
        />
        <link rel="canonical" href="https://www.athoni.com" />
        <meta property="og:url" content="https://www.athoni.com" />
      </Head>
      {/* page-wrapper Start*/}
      <div className="page-wrapper landing-page" />
      {/* page-wrapper Start*/}
      <div className="page-wrapper landing-page">
        {/* Page Body Start            */}
        <div className="landing-home">
          <ul className="decoration">
            <li className="fourteen">
              <img
                style={{ height: "300px!important" }}
                className="img-fluid"
                src="cloud-pupple.svg"
              />
            </li>
            <li className="fifthteen">
              <img
                style={{ height: "161px!important" }}
                className="img-fluid"
                src="assets/images/landing/decorebg/ball3-1.png"
              />
            </li>
            <li className="sixteen">
              <img
                style={{ height: "130px!important" }}
                className="img-fluid"
                src="assets/images/landing/decorebg/cube.png"
              />
            </li>
            <li className="seventeen">
              <img
                style={{ height: "120px!important" }}
                className="img-fluid"
                src="assets/images/landing/decorebg/ball1.png"
              />
            </li>
            <li className="eightteen">
              <img
                style={{ height: "70px!important" }}
                className="img-fluid"
                src="assets/images/landing/decorebg/ball4.png"
              />
            </li>
            <li className="one">
              <img
                className="img-fluid"
                src="assets/images/landing/decore/1.png"
              />
            </li>
            <li className="two">
              <img
                className="img-fluid"
                src="assets/images/landing/decore/2.png"
              />
            </li>
            <li className="three">
              <img
                className="img-fluid"
                src="assets/images/landing/decore/4.png"
              />
            </li>
            <li className="four">
              <img
                className="img-fluid"
                src="assets/images/landing/decore/3.png"
              />
            </li>
            <li className="five">
              <img className="img-fluid" src="assets/images/landing/2.png" />
            </li>
            <li className="six">
              <img
                className="img-fluid"
                src="assets/images/landing/decore/cloud.png"
              />
            </li>
            <li className="seven">
              <img className="img-fluid" src="assets/images/landing/2.png" />
            </li>
            <li className="nine">
              <img
                style={{ height: "161px!important" }}
                className="img-fluid"
                src="assets/images/landing/decorebg/leave1.png"
              />
            </li>
            <li className="ten">
              <img
                style={{ height: "161px!important" }}
                className="img-fluid"
                src="assets/images/landing/decorebg/leave3.png"
              />
            </li>
            <li className="eleven">
              <img
                style={{ height: "161px!important" }}
                className="img-fluid"
                src="assets/images/landing/decorebg/leave4.png"
              />
            </li>
            <li className="twelve">
              <img
                style={{ height: "161px!important" }}
                className="img-fluid"
                src="assets/images/landing/decorebg/leave3.png"
              />
            </li>
            <li className="thirdteen">
              <img
                style={{ height: "300px!important" }}
                className="img-fluid"
                src="cloud.svg"
              />
            </li>
            <li className="eight">
              <img className="img-fluid" src="test.svg" />
            </li>
          </ul>
          <div className="container-fluid">
            <div className="row layout-row">
              <div className="col-md-12">
                <div className="content">
                  <div className="center-content">
                    <h1 className="wow zoomIn">
                      <img
                        src="assets/images/landing/dictionaries-app-icon.png"
                        style={{ width: 100 }}
                      />{" "}
                      Athoni
                    </h1>
                    {/* <h1 class="wow fadeIn">For all admin template</h1> */}
                    <h2 className="txt-secondary wow fadeIn">
                      Faster, Lighter &amp; Dev. Friendly
                    </h2>
                    <p className=" wow fadeIn"></p>
                    <div className="dropdown">
                      <div className="input-group input-group-lg search-input">
                        <input
                          type="text"
                          className="form-control"
                          autoComplete="off"
                          aria-label="Text input with segmented dropdown button"
                          id="keyword-search"
                          onChange={onChangeKeyWord}
                          ref={ref}
                          onClick={clickInputSearch}
                          autoComplete="off"
                        />
                        {currentSearch == "dictionary" ? (
                          <a
                            className="language-switcher"
                            data-toggle="modal"
                            data-target="#LanguageSwitcher"
                          >
                            English - English
                          </a>
                        ) : (
                          ""
                        )}

                        <button type="button" className="btn btn-light">
                          <img
                            width={31}
                            src="assets/images/landing/search-icon.png"
                          />
                        </button>
                      </div>
                      <div
                        className={`dropdown-menu row ${showResults && "show"}`}
                        id="related-words"
                        aria-labelledby="dropdownMenuButton"
                      >
                        <div className="col-md-6" id="first-col">
                          {listWord
                            .filter((item, i) => i < listWord.length / 2)
                            .map((item, i) => (
                              <>
                                {currentSearch == "Chemistry" ? (
                                  <Link
                                    href=""
                                    key={i}
                                    onClick={() => setShowResults(false)}
                                  >
                                    <a className="dropdown-item">
                                      {item?.reaction}
                                    </a>
                                  </Link>
                                ) : (
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
                                )}
                              </>
                            ))}
                        </div>
                        <div className="col-md-6" id="second-col">
                          {listWord
                            .filter((item, i) => i >= listWord.length / 2)
                            .map((item, i) => (
                              <>
                                {currentSearch == "Chemistry" ? (
                                  <Link
                                    href=""
                                    key={i}
                                    onClick={() => setShowResults(false)}
                                  >
                                    <a className="dropdown-item">
                                      {item?.reaction}
                                    </a>
                                  </Link>
                                ) : (
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
                                )}
                              </>
                            ))}
                        </div>
                      </div>
                    </div>
                    <p />
                    <div className="btn-grp mt-4">
                      <button
                        onClick={setActiveSearch}
                        area="chemistry"
                        className="btn btn-pill btn-primary btn-air-primary btn-lg mr-3 wow pulse"
                      >
                        <img src="assets/images/landing/icon/chemistry.webp" />
                        Chemistry
                      </button>
                      <button
                        onClick={setActiveSearch}
                        area="dictionary"
                        className="btn btn-pill btn-secondary btn-air-secondary btn-lg mr-3 wow pulse"
                      >
                        <img src="assets/images/landing/dictionaries-app-icon.png" />
                        Dictionary
                      </button>
                      <button
                        onClick={setActiveSearch}
                        area="hoidap"
                        className="btn btn-pill btn-success btn-air-success btn-lg wow pulse mr-3"
                      >
                        <img
                          src={require("../public/assets/images/icon/selfomy.png")}
                        />
                        Hỏi đáp
                      </button>
                      <button
                        onClick={setActiveSearch}
                        area="lecttr"
                        className="btn btn-pill btn-success btn-air-success btn-lg wow pulse mr-3"
                      >
                        <img
                          src={require("../public/assets/images/icon/lecttr.png")}
                        />
                        Lecttr
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="LanguageSwitcher"
        tabIndex={-1}
        aria-labelledby="LanguageSwitcherLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="LanguageSwitcherLabel">
                LanguageSwitcher
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="list-group">
              <a
                href="#"
                className="list-group-item list-group-item-action active"
              >
                English - Vietnamese
              </a>
              <a href="#" className="list-group-item list-group-item-action">
                English - English
              </a>
              <a href="#" className="list-group-item list-group-item-action">
                English - Franch
              </a>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default HomePage;
