import React, { useState, useRef, useEffect } from "react";
import Router from "next/router";
import Breadcrumb from "../../../layout/breadcrumb";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import Head from "next/head";
import Link from "next/link";
import useOutsideClick from "../../../lib/event";
import SkeletonSection from "./skeleton";
import settings from "../../../config/settingsConfig";
import { NextSeo, BreadcrumbJsonLd } from "next-seo";
import DataTable from "react-data-table-component";

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
const ToEs = () => {
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

  const onChangeKeyWord = async (e) => {
    const keyword = e.target.value;
    if (keyword == "") return;
    setKeyword(e.target.value);
    try {
      const res = await fetch(`/api/index.php/reaction/search/s/${keyword}`);
      const obj = res.json();
      setListWord(await obj);
      setShowResults(true);
    } catch (error) {
      // console.log('err', error);
    }
  };

  return (
    <>
      <Head>
        <meta
          name="keywords"
          content={settings.chemistry.periodic.keywordList()}
        />

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
        title={settings.chemistry.periodic.titleTemplate}
        canonical={`https://www.athoni.com/chemicalequations`}
        openGraph={{
          type: "website",
          url: `https://www.athoni.com/chemicalequations`,
          title: settings.chemistry.periodic.titleTemplate,
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
                              href=""
                              // href={``}
                              key={i}
                              onClick={() => setShowResults(false)}
                            >
                              <a className="dropdown-item">{item?.reaction}</a>
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
                              href=""
                              // href={`/dict/${language}/${item?.word}`}
                              key={i}
                              onClick={() => setShowResults(false)}
                            >
                              <a className="dropdown-item">{item?.reaction}</a>
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
        parent="Chemical Equations"
        urlParent="chemicalequations"
        title="Chemistry"
        urlChildren="table-of-elements"
        children="Periodic Table"
      />
      <SkeletonSection />
      <Container fluid={true}>
        <Row>
          <Col md="12">
            <div className="card intro-text">
              <div className="card-body">
                <table style={{ width: "100%" }} className="tof-table">
                  <tbody>
                    <tr className="group-tof">
                      <td>
                        <a
                          title="Nhóm tuần hoàn"
                          href="https://wikipedia.org/wiki/Nh%C3%B3m_tu%E1%BA%A7n_ho%C3%A0n"
                        >
                          Group&nbsp;→
                        </a>
                        <a
                          title="Chu kỳ tuần hoàn"
                          href="https://wikipedia.org/wiki/Chu_k%E1%BB%B3_tu%E1%BA%A7n_ho%C3%A0n"
                        >
                          ↓&nbsp;Period
                        </a>
                      </td>
                      <td>
                        <a
                          title="Nhóm nguyên tố 1"
                          href="https://wikipedia.org/wiki/Nh%C3%B3m_nguy%C3%AAn_t%E1%BB%91_1"
                        >
                          <b>1</b>
                        </a>
                      </td>
                      <td>
                        <a
                          className="mw-redirect"
                          title="Nhóm nguyên tố 2"
                          href="https://wikipedia.org/wiki/Nh%C3%B3m_nguy%C3%AAn_t%E1%BB%91_2"
                        >
                          <b>2</b>
                        </a>
                      </td>
                      <td>
                        <a
                          title="Nhóm nguyên tố 3"
                          href="https://wikipedia.org/wiki/Nh%C3%B3m_nguy%C3%AAn_t%E1%BB%91_3"
                        >
                          <b>3</b>
                        </a>
                      </td>
                      <td>
                        <a
                          title="Nhóm nguyên tố 4"
                          href="https://wikipedia.org/wiki/Nh%C3%B3m_nguy%C3%AAn_t%E1%BB%91_4"
                        >
                          <b>4</b>
                        </a>
                      </td>
                      <td>
                        <a
                          title="Nhóm nguyên tố 5"
                          href="https://wikipedia.org/wiki/Nh%C3%B3m_nguy%C3%AAn_t%E1%BB%91_5"
                        >
                          <b>5</b>
                        </a>
                      </td>
                      <td>
                        <a
                          title="Nhóm nguyên tố 6"
                          href="https://wikipedia.org/wiki/Nh%C3%B3m_nguy%C3%AAn_t%E1%BB%91_6"
                        >
                          <b>6</b>
                        </a>
                      </td>
                      <td>
                        <a
                          title="Nhóm nguyên tố 7"
                          href="https://wikipedia.org/wiki/Nh%C3%B3m_nguy%C3%AAn_t%E1%BB%91_7"
                        >
                          <b>7</b>
                        </a>
                      </td>
                      <td>
                        <a
                          title="Nhóm nguyên tố 8"
                          href="https://wikipedia.org/wiki/Nh%C3%B3m_nguy%C3%AAn_t%E1%BB%91_8"
                        >
                          <b>8</b>
                        </a>
                      </td>
                      <td>
                        <a
                          title="Nhóm nguyên tố 9"
                          href="https://wikipedia.org/wiki/Nh%C3%B3m_nguy%C3%AAn_t%E1%BB%91_9"
                        >
                          <b>9</b>
                        </a>
                      </td>
                      <td>
                        <a
                          title="Nhóm nguyên tố 10"
                          href="https://wikipedia.org/wiki/Nh%C3%B3m_nguy%C3%AAn_t%E1%BB%91_10"
                        >
                          <b>10</b>
                        </a>
                      </td>
                      <td>
                        <a
                          title="Nhóm nguyên tố 11"
                          href="https://wikipedia.org/wiki/Nh%C3%B3m_nguy%C3%AAn_t%E1%BB%91_11"
                        >
                          <b>11</b>
                        </a>
                      </td>
                      <td>
                        <a
                          title="Nhóm nguyên tố 12"
                          href="https://wikipedia.org/wiki/Nh%C3%B3m_nguy%C3%AAn_t%E1%BB%91_12"
                        >
                          <b>12</b>
                        </a>
                      </td>
                      <td>
                        <a
                          className="mw-redirect"
                          title="Nhóm nguyên tố 13"
                          href="https://wikipedia.org/wiki/Nh%C3%B3m_nguy%C3%AAn_t%E1%BB%91_13"
                        >
                          <b>13</b>
                        </a>
                      </td>
                      <td>
                        <a
                          title="Nhóm nguyên tố 14"
                          href="https://wikipedia.org/wiki/Nh%C3%B3m_nguy%C3%AAn_t%E1%BB%91_14"
                        >
                          <b>14</b>
                        </a>
                      </td>
                      <td>
                        <a
                          className="mw-redirect"
                          title="Nhóm nguyên tố 15"
                          href="https://wikipedia.org/wiki/Nh%C3%B3m_nguy%C3%AAn_t%E1%BB%91_15"
                        >
                          <b>15</b>
                        </a>
                      </td>
                      <td>
                        <a
                          title="Nhóm nguyên tố 16"
                          href="https://wikipedia.org/wiki/Nh%C3%B3m_nguy%C3%AAn_t%E1%BB%91_16"
                        >
                          <b>16</b>
                        </a>
                      </td>
                      <td>
                        <a
                          className="mw-redirect"
                          title="Nhóm nguyên tố 17"
                          href="https://wikipedia.org/wiki/Nh%C3%B3m_nguy%C3%AAn_t%E1%BB%91_17"
                        >
                          <b>17</b>
                        </a>
                      </td>
                      <td>
                        <a
                          title="Khí hiếm"
                          href="https://wikipedia.org/wiki/Kh%C3%AD_hi%E1%BA%BFm"
                        >
                          <b>18</b>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          title="Chu kỳ nguyên tố 1"
                          href="https://wikipedia.org/wiki/Chu_k%E1%BB%B3_nguy%C3%AAn_t%E1%BB%91_1"
                        >
                          <b>1</b>
                        </a>
                      </td>
                      <td className="nonmetals gases elements chat-nguyen-thuy">
                        <a
                          title="Hiđrô"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Hi%C4%91r%C3%B4"
                        >
                          <div className="ten-elements">H</div>
                          <div className="so-thu-tu">1</div>
                        </a>
                      </td>
                      <td />
                      <td />
                      <td />
                      <td />
                      <td />
                      <td />
                      <td />
                      <td />
                      <td />
                      <td />
                      <td />
                      <td />
                      <td />
                      <td />
                      <td />
                      <td />
                      <td className="khi-hiem gases elements chat-nguyen-thuy">
                        <a title="Heli" href="https://wikipedia.org/wiki/Heli">
                          <div className="ten-elements">He</div>
                          <div className="so-thu-tu">2</div>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          title="Chu kỳ nguyên tố 2"
                          href="https://wikipedia.org/wiki/Chu_k%E1%BB%B3_nguy%C3%AAn_t%E1%BB%91_2"
                        >
                          <b>2</b>
                        </a>
                      </td>
                      <td className="kim-loai-yeu chat-ran elements chat-nguyen-thuy">
                        <a
                          title="Liti"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Liti"
                        >
                          <div className="ten-elements">Li</div>
                          <div className="so-thu-tu">3</div>
                        </a>
                      </td>
                      <td className="kim-loai-kiem-tho chat-ran elements chat-nguyen-thuy">
                        <a
                          title="Berili"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Berili"
                        >
                          <div className="ten-elements">Be</div>
                          <div className="so-thu-tu">4</div>
                        </a>
                      </td>
                      <td />
                      <td />
                      <td />
                      <td />
                      <td />
                      <td />
                      <td />
                      <td />
                      <td />
                      <td />
                      <td className="a-kim chat-ran elements chat-nguyen-thuy">
                        <a
                          title="Bo"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Bo"
                        >
                          <div className="ten-elements">B</div>
                          <div className="so-thu-tu">5</div>
                        </a>
                      </td>
                      <td className="nonmetals chat-ran elements chat-nguyen-thuy">
                        <a
                          title="Cacbon"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Cacbon"
                        >
                          <div className="ten-elements">C</div>
                          <div className="so-thu-tu">6</div>
                        </a>
                      </td>
                      <td className="nonmetals gases elements chat-nguyen-thuy">
                        <a
                          title="Nitơ"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Nit%C6%A1"
                        >
                          <div className="ten-elements">N</div>
                          <div className="so-thu-tu">7</div>
                        </a>
                      </td>
                      <td className="nonmetals gases elements chat-nguyen-thuy">
                        <a
                          title="Ôxy"
                          target="_blank"
                          href="https://wikipedia.org/wiki/%C3%94xy"
                        >
                          <div className="ten-elements">O</div>
                          <div className="so-thu-tu">8</div>
                        </a>
                      </td>
                      <td className="halogen gases elements chat-nguyen-thuy">
                        <a
                          title="Flo"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Flo"
                        >
                          <div className="ten-elements">F</div>
                          <div className="so-thu-tu">9</div>
                        </a>
                      </td>
                      <td className="khi-hiem gases elements chat-nguyen-thuy">
                        <a
                          title="Neon"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Neon"
                        >
                          <div className="ten-elements">Ne</div>
                          <div className="so-thu-tu">10</div>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          title="Chu kỳ nguyên tố 3"
                          href="https://wikipedia.org/wiki/Chu_k%E1%BB%B3_nguy%C3%AAn_t%E1%BB%91_3"
                        >
                          <b>3</b>
                        </a>
                      </td>
                      <td className="kim-loai-kiem chat-ran elements chat-nguyen-thuy">
                        <a
                          title="Natri"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Natri"
                        >
                          <div className="ten-elements">Na</div>
                          <div className="so-thu-tu">11</div>
                        </a>
                      </td>
                      <td className="kim-loai-kiem-tho chat-ran elements chat-nguyen-thuy">
                        <a
                          title="Magiê"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Magi%C3%AA"
                        >
                          <div className="ten-elements">Mg</div>
                          <div className="so-thu-tu">12</div>
                        </a>
                      </td>
                      <td />
                      <td />
                      <td />
                      <td />
                      <td />
                      <td />
                      <td />
                      <td />
                      <td />
                      <td />
                      <td className="kim-loai-yeu chat-ran elements chat-nguyen-thuy">
                        <a
                          title="Nhôm"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Nh%C3%B4m"
                        >
                          <div className="ten-elements">Al</div>
                          <div className="so-thu-tu">13</div>
                        </a>
                      </td>
                      <td className="a-kim chat-ran elements chat-nguyen-thuy">
                        <a
                          title="Silic"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Silic"
                        >
                          <div className="ten-elements">Si</div>
                          <div className="so-thu-tu">14</div>
                        </a>
                      </td>
                      <td className="nonmetals chat-ran elements chat-nguyen-thuy">
                        <a
                          title="Phốtpho"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Ph%E1%BB%91tpho"
                        >
                          <div className="ten-elements">P</div>
                          <div className="so-thu-tu">15</div>
                        </a>
                      </td>
                      <td className="nonmetals chat-ran elements chat-nguyen-thuy">
                        <a
                          title="Lưu huỳnh"
                          target="_blank"
                          href="https://wikipedia.org/wiki/L%C6%B0u_hu%E1%BB%B3nh"
                        >
                          <div className="ten-elements">S</div>
                          <div className="so-thu-tu">16</div>
                        </a>
                      </td>
                      <td className="halogen gases elements chat-nguyen-thuy">
                        <a
                          title="Clo"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Clo"
                        >
                          <div className="ten-elements">Cl</div>
                          <div className="so-thu-tu">17</div>
                        </a>
                      </td>
                      <td className="khi-hiem gases elements chat-nguyen-thuy">
                        <a
                          title="Agon"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Clo"
                        >
                          <div className="ten-elements">Ar</div>
                          <div className="so-thu-tu">18</div>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          title="Chu kỳ nguyên tố 4"
                          href="https://wikipedia.org/wiki/Chu_k%E1%BB%B3_nguy%C3%AAn_t%E1%BB%91_4"
                        >
                          <b>4</b>
                        </a>
                      </td>
                      <td className="kim-loai-kiem chat-ran elements chat-nguyen-thuy">
                        <a
                          title="Kali"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Kali"
                        >
                          <div className="ten-elements">K</div>
                          <div className="so-thu-tu">19</div>
                        </a>
                      </td>
                      <td className="kim-loai-kiem-tho chat-ran elements chat-nguyen-thuy">
                        <a
                          title="Canxi"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Canxi"
                        >
                          <div className="ten-elements">Ca</div>
                          <div className="so-thu-tu">20</div>
                        </a>
                      </td>
                      <td className="kim-loai-chuyen-tiep chat-ran elements chat-nguyen-thuy">
                        <a
                          title="Scandi"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Scandi"
                        >
                          <div className="ten-elements">Sc</div>
                          <div className="so-thu-tu">21</div>
                        </a>
                      </td>
                      <td className="kim-loai-chuyen-tiep chat-ran elements chat-nguyen-thuy">
                        <a
                          title="Titani"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Titani"
                        >
                          <div className="ten-elements">Ti</div>
                          <div className="so-thu-tu">22</div>
                        </a>
                      </td>
                      <td className="kim-loai-chuyen-tiep chat-ran elements chat-nguyen-thuy">
                        <a
                          title="Titani"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Vanadi"
                        >
                          <div className="ten-elements">V</div>
                          <div className="so-thu-tu">23</div>
                        </a>
                      </td>
                      <td className="kim-loai-chuyen-tiep chat-ran elements chat-nguyen-thuy">
                        <a
                          title="Crom"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Crom"
                        >
                          <div className="ten-elements">Cr</div>
                          <div className="so-thu-tu">24</div>
                        </a>
                      </td>
                      <td className="kim-loai-chuyen-tiep chat-ran elements chat-nguyen-thuy">
                        <a
                          title="Mangan"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Mangan"
                        >
                          <div className="ten-elements">Mn</div>
                          <div className="so-thu-tu">25</div>
                        </a>
                      </td>
                      <td className="kim-loai-chuyen-tiep chat-ran elements chat-nguyen-thuy">
                        <a
                          title="Sắt"
                          target="_blank"
                          href="https://wikipedia.org/wiki/S%E1%BA%AFt"
                        >
                          <div className="ten-elements">Fe</div>
                          <div className="so-thu-tu">26</div>
                        </a>
                      </td>
                      <td className="kim-loai-chuyen-tiep chat-ran elements chat-nguyen-thuy">
                        <a
                          title="Coban"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Coban"
                        >
                          <div className="ten-elements">Co</div>
                          <div className="so-thu-tu">27</div>
                        </a>
                      </td>
                      <td className="kim-loai-chuyen-tiep chat-ran elements chat-nguyen-thuy">
                        <a
                          title="Niken"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Niken"
                        >
                          <div className="ten-elements">Ni</div>
                          <div className="so-thu-tu">28</div>
                        </a>
                      </td>
                      <td className="kim-loai-chuyen-tiep chat-ran elements chat-nguyen-thuy">
                        <a
                          title="Đồng"
                          target="_blank"
                          href="https://wikipedia.org/wiki/%C4%90%E1%BB%93ng"
                        >
                          <div className="ten-elements">Cu</div>
                          <div className="so-thu-tu">29</div>
                        </a>
                      </td>
                      <td className="kim-loai-chuyen-tiep chat-ran elements chat-nguyen-thuy">
                        <a
                          title="Kẽm"
                          target="_blank"
                          href="https://wikipedia.org/wiki/K%E1%BA%BDm"
                        >
                          <div className="ten-elements">Zn</div>
                          <div className="so-thu-tu">30</div>
                        </a>
                      </td>
                      <td className="kim-loai-yeu chat-ran elements chat-nguyen-thuy">
                        <a
                          title="Gali"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Gali"
                        >
                          <div className="ten-elements">Ga</div>
                          <div className="so-thu-tu">31</div>
                        </a>
                      </td>
                      <td className="a-kim chat-ran elements chat-nguyen-thuy">
                        <a
                          title="Gecmani"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Gecmani"
                        >
                          <div className="ten-elements">Ge</div>
                          <div className="so-thu-tu">32</div>
                        </a>
                      </td>
                      <td className="a-kim chat-ran elements chat-nguyen-thuy">
                        <a
                          title="Asen"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Asen"
                        >
                          <div className="ten-elements">As</div>
                          <div className="so-thu-tu">33</div>
                        </a>
                      </td>
                      <td className="nonmetals chat-ran elements chat-nguyen-thuy">
                        <a
                          title="Selen"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Selen"
                        >
                          <div className="ten-elements">Se</div>
                          <div className="so-thu-tu">34</div>
                        </a>
                      </td>
                      <td className="halogen chat-long elements chat-nguyen-thuy">
                        <a
                          title="Brôm"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Br%C3%B4m"
                        >
                          <div className="ten-elements">Br</div>
                          <div className="so-thu-tu">35</div>
                        </a>
                      </td>
                      <td className="khi-hiem gases elements chat-nguyen-thuy">
                        <a
                          title="Krypton"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Krypton"
                        >
                          <div className="ten-elements">Kr</div>
                          <div className="so-thu-tu">36</div>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          title="Chu kỳ nguyên tố 5"
                          href="https://wikipedia.org/wiki/Chu_k%E1%BB%B3_nguy%C3%AAn_t%E1%BB%91_5"
                        >
                          <b>5</b>
                        </a>
                      </td>
                      <td className="kim-loai-kiem chat-ran elements chat-nguyen-thuy">
                        <a
                          title="Rubiđi"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Rubi%C4%91i"
                        >
                          <div className="ten-elements">Rb</div>
                          <div className="so-thu-tu">37</div>
                        </a>
                      </td>
                      <td className="kim-loai-kiem-tho chat-ran elements chat-nguyen-thuy">
                        <a
                          title="Stronti"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Stronti"
                        >
                          <div className="ten-elements">Sr</div>
                          <div className="so-thu-tu">38</div>
                        </a>
                      </td>
                      <td className="kim-loai-chuyen-tiep chat-ran elements chat-nguyen-thuy">
                        <a
                          title="Yttri"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Yttri"
                        >
                          <div className="ten-elements">Y</div>
                          <div className="so-thu-tu">39</div>
                        </a>
                      </td>
                      <td className="kim-loai-chuyen-tiep chat-ran elements chat-nguyen-thuy">
                        <a
                          title="Zirconi"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Zirconi"
                        >
                          <div className="ten-elements">Zr</div>
                          <div className="so-thu-tu">40</div>
                        </a>
                      </td>
                      <td className="kim-loai-chuyen-tiep chat-ran elements chat-nguyen-thuy">
                        <a
                          title="Niobi"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Niobi"
                        >
                          <div className="ten-elements">Nb</div>
                          <div className="so-thu-tu">41</div>
                        </a>
                      </td>
                      <td className="kim-loai-chuyen-tiep chat-ran elements chat-nguyen-thuy">
                        <a
                          title="Molypden"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Molypden"
                        >
                          <div className="ten-elements">Mo</div>
                          <div className="so-thu-tu">42</div>
                        </a>
                      </td>
                      <td className="kim-loai-chuyen-tiep chat-ran elements chat-sinh-ra-sau">
                        <a
                          title="Tecneti"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Tecneti"
                        >
                          <div className="ten-elements">Tc</div>
                          <div className="so-thu-tu">43</div>
                        </a>
                      </td>
                      <td className="kim-loai-chuyen-tiep chat-ran elements chat-nguyen-thuy">
                        <a
                          title="Rutheni"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Rutheni"
                        >
                          <div className="ten-elements">Ru</div>
                          <div className="so-thu-tu">44</div>
                        </a>
                      </td>
                      <td className="kim-loai-chuyen-tiep chat-ran elements chat-nguyen-thuy">
                        <a
                          title="Rhodi"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Rhodi"
                        >
                          <div className="ten-elements">Rh</div>
                          <div className="so-thu-tu">45</div>
                        </a>
                      </td>
                      <td className="kim-loai-chuyen-tiep chat-ran elements chat-nguyen-thuy">
                        <a
                          title="Paladi"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Paladi"
                        >
                          <div className="ten-elements">Pd</div>
                          <div className="so-thu-tu">46</div>
                        </a>
                      </td>
                      <td className="kim-loai-chuyen-tiep chat-ran elements chat-nguyen-thuy">
                        <a
                          title="Bạc"
                          target="_blank"
                          href="https://wikipedia.org/wiki/B%E1%BA%A1c"
                        >
                          <div className="ten-elements">Ag</div>
                          <div className="so-thu-tu">47</div>
                        </a>
                      </td>
                      <td className="kim-loai-chuyen-tiep chat-ran elements chat-nguyen-thuy">
                        <a
                          title="Cadmi"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Cadmi"
                        >
                          <div className="ten-elements">Cd</div>
                          <div className="so-thu-tu">48</div>
                        </a>
                      </td>
                      <td className="kim-loai-yeu chat-ran elements chat-nguyen-thuy">
                        <a
                          title="Indi"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Indi"
                        >
                          <div className="ten-elements">In</div>
                          <div className="so-thu-tu">49</div>
                        </a>
                      </td>
                      <td className="kim-loai-yeu chat-ran elements chat-nguyen-thuy">
                        <a
                          title="Thiếc"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Thi%E1%BA%BFc"
                        >
                          <div className="ten-elements">Sn</div>
                          <div className="so-thu-tu">50</div>
                        </a>
                      </td>
                      <td className="a-kim chat-ran elements chat-nguyen-thuy">
                        <a
                          title="Antimon"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Antimon"
                        >
                          <div className="ten-elements">Sb</div>
                          <div className="so-thu-tu">51</div>
                        </a>
                      </td>
                      <td className="a-kim chat-ran elements chat-nguyen-thuy">
                        <a
                          title="Telua"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Telua"
                        >
                          <div className="ten-elements">Te</div>
                          <div className="so-thu-tu">52</div>
                        </a>
                      </td>
                      <td className="halogen chat-ran elements chat-nguyen-thuy">
                        <a
                          title="Iốt"
                          target="_blank"
                          href="https://wikipedia.org/wiki/I%E1%BB%91t"
                        >
                          <div className="ten-elements">I</div>
                          <div className="so-thu-tu">53</div>
                        </a>
                      </td>
                      <td className="khi-hiem gases elements chat-nguyen-thuy">
                        <a
                          title="Xenon"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Xenon"
                        >
                          <div className="ten-elements">Xe</div>
                          <div className="so-thu-tu">54</div>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          title="Chu kỳ nguyên tố 6"
                          href="https://wikipedia.org/wiki/Chu_k%E1%BB%B3_nguy%C3%AAn_t%E1%BB%91_6"
                        >
                          <b>6</b>
                        </a>
                      </td>
                      <td className="kim-loai-kiem chat-ran elements chat-nguyen-thuy">
                        <a
                          title="Xêzi"
                          target="_blank"
                          href="https://wikipedia.org/wiki/X%C3%AAzi"
                        >
                          <div className="ten-elements">Cs</div>
                          <div className="so-thu-tu">55</div>
                        </a>
                      </td>
                      <td className="kim-loai-kiem-tho chat-ran elements chat-nguyen-thuy">
                        <a
                          title="Bari"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Bari"
                        >
                          <div className="ten-elements">Ba</div>
                          <div className="so-thu-tu">56</div>
                        </a>
                      </td>
                      <td className="nhom-lantan elements ">
                        <a>
                          <div className="ten-elements">*</div>
                          <div className="so-thu-tu" />
                        </a>
                      </td>
                      <td className="kim-loai-chuyen-tiep chat-ran elements chat-nguyen-thuy">
                        <a
                          title="Bari"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Hafni"
                        >
                          <div className="ten-elements">Hf</div>
                          <div className="so-thu-tu">72</div>
                        </a>
                      </td>
                      <td className="kim-loai-chuyen-tiep chat-ran elements chat-nguyen-thuy">
                        <a
                          title="Tantali"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Tantali"
                        >
                          <div className="ten-elements">Ta</div>
                          <div className="so-thu-tu">73</div>
                        </a>
                      </td>
                      <td className="kim-loai-chuyen-tiep chat-ran elements chat-nguyen-thuy">
                        <a
                          title="Volfram"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Volfram"
                        >
                          <div className="ten-elements">W</div>
                          <div className="so-thu-tu">74</div>
                        </a>
                      </td>
                      <td className="kim-loai-chuyen-tiep chat-ran elements chat-nguyen-thuy">
                        <a
                          title="Rheni"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Rheni"
                        >
                          <div className="ten-elements">Re</div>
                          <div className="so-thu-tu">75</div>
                        </a>
                      </td>
                      <td className="kim-loai-chuyen-tiep chat-ran elements chat-nguyen-thuy">
                        <a
                          title="Osmi"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Osmi"
                        >
                          <div className="ten-elements">Os</div>
                          <div className="so-thu-tu">76</div>
                        </a>
                      </td>
                      <td className="kim-loai-chuyen-tiep chat-ran elements chat-nguyen-thuy">
                        <a
                          title="Iridi"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Iridi"
                        >
                          <div className="ten-elements">Ir</div>
                          <div className="so-thu-tu">77</div>
                        </a>
                      </td>
                      <td className="kim-loai-chuyen-tiep chat-ran elements chat-nguyen-thuy">
                        <a
                          title="Platin"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Platin"
                        >
                          <div className="ten-elements">Pt</div>
                          <div className="so-thu-tu">78</div>
                        </a>
                      </td>
                      <td className="kim-loai-chuyen-tiep chat-ran elements chat-nguyen-thuy">
                        <a
                          title="Vàng"
                          target="_blank"
                          href="https://wikipedia.org/wiki/V%C3%A0ng"
                        >
                          <div className="ten-elements">Au</div>
                          <div className="so-thu-tu">79</div>
                        </a>
                      </td>
                      <td className="kim-loai-chuyen-tiep chat-long elements chat-nguyen-thuy">
                        <a
                          title="Thủy ngân"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Th%E1%BB%A7y_ng%C3%A2n"
                        >
                          <div className="ten-elements">Hg</div>
                          <div className="so-thu-tu">80</div>
                        </a>
                      </td>
                      <td className="kim-loai-yeu chat-ran elements chat-nguyen-thuy">
                        <a
                          title="Tali"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Th%E1%BB%A7y_ng%C3%A2n"
                        >
                          <div className="ten-elements">Tl</div>
                          <div className="so-thu-tu">81</div>
                        </a>
                      </td>
                      <td className="kim-loai-yeu chat-ran elements chat-nguyen-thuy">
                        <a
                          title="Chì"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Ch%C3%AC"
                        >
                          <div className="ten-elements">Pb</div>
                          <div className="so-thu-tu">82</div>
                        </a>
                      </td>
                      <td className="kim-loai-yeu chat-ran elements chat-nguyen-thuy">
                        <a
                          title="Bitmut"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Bitmut"
                        >
                          <div className="ten-elements">Bi</div>
                          <div className="so-thu-tu">83</div>
                        </a>
                      </td>
                      <td className="a-kim chat-ran elements chat-sinh-ra-sau">
                        <a
                          title="Poloni"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Poloni"
                        >
                          <div className="ten-elements">Po</div>
                          <div className="so-thu-tu">84</div>
                        </a>
                      </td>
                      <td className="halogen chat-ran elements chat-sinh-ra-sau">
                        <a
                          title="Poloni"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Astatin"
                        >
                          <div className="ten-elements">At</div>
                          <div className="so-thu-tu">85</div>
                        </a>
                      </td>
                      <td className="khi-hiem gases elements chat-sinh-ra-sau">
                        <a
                          title="Radon"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Radon"
                        >
                          <div className="ten-elements">Rn</div>
                          <div className="so-thu-tu">86</div>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          title="Chu kỳ nguyên tố 7"
                          href="https://wikipedia.org/wiki/Chu_k%E1%BB%B3_nguy%C3%AAn_t%E1%BB%91_7"
                        >
                          <b>7</b>
                        </a>
                      </td>
                      <td className="kim-loai-kiem chat-ran elements chat-nguyen-thuy">
                        <a
                          title="Franxi"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Franxi"
                        >
                          <div className="ten-elements">Fr</div>
                          <div className="so-thu-tu">87</div>
                        </a>
                      </td>
                      <td className="kim-loai-kiem-tho chat-ran elements chat-sinh-ra-sau">
                        <a
                          title="Radi"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Radi"
                        >
                          <div className="ten-elements">Ra</div>
                          <div className="so-thu-tu">88</div>
                        </a>
                      </td>
                      <td className="nhom-actini elements">
                        <a>
                          <div className="ten-elements">**</div>
                          <div className="so-thu-tu" />
                        </a>
                      </td>
                      <td className="kim-loai-chuyen-tiep chat-ran elements chat-nhan-tao">
                        <a
                          title="Rutherfordi"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Rutherfordi"
                        >
                          <div className="ten-elements">Fr</div>
                          <div className="so-thu-tu">104</div>
                        </a>
                      </td>
                      <td className="kim-loai-chuyen-tiep chat-ran elements chat-nhan-tao">
                        <a
                          title="Dubni"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Dubni"
                        >
                          <div className="ten-elements">Db</div>
                          <div className="so-thu-tu">105</div>
                        </a>
                      </td>
                      <td className="kim-loai-chuyen-tiep chat-ran elements chat-nhan-tao">
                        <a
                          title="Seaborgi"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Seaborgi"
                        >
                          <div className="ten-elements">Sg</div>
                          <div className="so-thu-tu">106</div>
                        </a>
                      </td>
                      <td className="kim-loai-chuyen-tiep chat-ran elements chat-nhan-tao">
                        <a
                          title="Bohr"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Bohri"
                        >
                          <div className="ten-elements">Bh</div>
                          <div className="so-thu-tu">107</div>
                        </a>
                      </td>
                      <td className="kim-loai-chuyen-tiep chat-ran elements chat-nhan-tao">
                        <a
                          title="Hassi"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Hassi"
                        >
                          <div className="ten-elements">Hs</div>
                          <div className="so-thu-tu">108</div>
                        </a>
                      </td>
                      <td className="thuoc-tinh-hoa-hoc-khong-ro chat-ran elements chat-nhan-tao">
                        <a
                          title="Meitneri"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Meitneri"
                        >
                          <div className="ten-elements">Mt</div>
                          <div className="so-thu-tu">109</div>
                        </a>
                      </td>
                      <td className="thuoc-tinh-hoa-hoc-khong-ro chat-ran elements chat-nhan-tao">
                        <a
                          title="Darmstadti"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Darmstadti"
                        >
                          <div className="ten-elements">Ds</div>
                          <div className="so-thu-tu">110</div>
                        </a>
                      </td>
                      <td className="thuoc-tinh-hoa-hoc-khong-ro chat-ran elements chat-nhan-tao">
                        <a
                          title="Roentgeni"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Roentgeni"
                        >
                          <div className="ten-elements">Rg</div>
                          <div className="so-thu-tu">111</div>
                        </a>
                      </td>
                      <td className="kim-loai-chuyen-tiep chat-long elements chat-nhan-tao">
                        <a
                          title="Copernixi"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Copernixi"
                        >
                          <div className="ten-elements">Cn</div>
                          <div className="so-thu-tu">112</div>
                        </a>
                      </td>
                      <td className="thuoc-tinh-hoa-hoc-khong-ro chat-long elements chat-nhan-tao">
                        <a
                          title="Ununtri"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Ununtri"
                        >
                          <div className="ten-elements">Uut</div>
                          <div className="so-thu-tu">113</div>
                        </a>
                      </td>
                      <td className="thuoc-tinh-hoa-hoc-khong-ro chat-long elements chat-nhan-tao">
                        <a
                          title="Flerovi"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Flerovi"
                        >
                          <div className="ten-elements">Fl</div>
                          <div className="so-thu-tu">114</div>
                        </a>
                      </td>
                      <td className="thuoc-tinh-hoa-hoc-khong-ro chat-long elements chat-nhan-tao">
                        <a
                          title="Ununpenti"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Ununpenti"
                        >
                          <div className="ten-elements">Uup</div>
                          <div className="so-thu-tu">115</div>
                        </a>
                      </td>
                      <td className="thuoc-tinh-hoa-hoc-khong-ro chat-long elements chat-nhan-tao">
                        <a
                          title="Livermori"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Livermori"
                        >
                          <div className="ten-elements">Lv</div>
                          <div className="so-thu-tu">116</div>
                        </a>
                      </td>
                      <td className="thuoc-tinh-hoa-hoc-khong-ro chat-long elements chat-nhan-tao">
                        <a
                          title="Ununsepti"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Ununsepti"
                        >
                          <div className="ten-elements">Uus</div>
                          <div className="so-thu-tu">117</div>
                        </a>
                      </td>
                      <td className="thuoc-tinh-hoa-hoc-khong-ro chat-long elements chat-nhan-tao">
                        <a
                          title="Ununocti"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Ununocti"
                        >
                          <div className="ten-elements">Uuo</div>
                          <div className="so-thu-tu">118</div>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={20}>
                        <br />
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "right" }} colSpan={3}>
                        *{" "}
                        <b>
                          <a
                            title="Nhóm Lantan"
                            href="https://wikipedia.org/wiki/Nh%C3%B3m_Lantan"
                          >
                            Lantan group
                          </a>
                        </b>
                      </td>
                      <td className="kim-loai-chuyen-tiep chat-ran elements chat-nguyen-thuy">
                        <a
                          title="Lantan"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Lantan"
                        >
                          <div className="ten-elements">La</div>
                          <div className="so-thu-tu">57</div>
                        </a>
                      </td>
                      <td className="nhom-lantan chat-ran elements chat-nguyen-thuy">
                        <a
                          title="Xeri"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Xeri"
                        >
                          <div className="ten-elements">Ce</div>
                          <div className="so-thu-tu">58</div>
                        </a>
                      </td>
                      <td className="nhom-lantan chat-ran elements chat-nguyen-thuy">
                        <a
                          title="Praseodymi"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Praseodymi"
                        >
                          <div className="ten-elements">Pr</div>
                          <div className="so-thu-tu">59</div>
                        </a>
                      </td>
                      <td className="nhom-lantan chat-ran elements chat-nguyen-thuy">
                        <a
                          title="Neodymi"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Praseodymi"
                        >
                          <div className="ten-elements">Nd</div>
                          <div className="so-thu-tu">60</div>
                        </a>
                      </td>
                      <td className="nhom-lantan chat-ran elements chat-sinh-ra-sau">
                        <a
                          title="Promethi"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Promethi"
                        >
                          <div className="ten-elements">Pm</div>
                          <div className="so-thu-tu">61</div>
                        </a>
                      </td>
                      <td className="nhom-lantan chat-ran elements chat-nguyen-thuy">
                        <a
                          title="Samari"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Samari"
                        >
                          <div className="ten-elements">Sm</div>
                          <div className="so-thu-tu">62</div>
                        </a>
                      </td>
                      <td className="nhom-lantan chat-ran elements chat-nguyen-thuy">
                        <a
                          title="Europi"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Europi"
                        >
                          <div className="ten-elements">Eu</div>
                          <div className="so-thu-tu">63</div>
                        </a>
                      </td>
                      <td className="nhom-lantan chat-ran elements chat-nguyen-thuy">
                        <a
                          title="Gadolini"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Gadolini"
                        >
                          <div className="ten-elements">Gd</div>
                          <div className="so-thu-tu">64</div>
                        </a>
                      </td>
                      <td className="nhom-lantan chat-ran elements chat-nguyen-thuy">
                        <a
                          title="Terbi"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Terbi"
                        >
                          <div className="ten-elements">Tb</div>
                          <div className="so-thu-tu">65</div>
                        </a>
                      </td>
                      <td className="nhom-lantan chat-ran elements chat-nguyen-thuy">
                        <a
                          title="Dysprosi"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Dysprosi"
                        >
                          <div className="ten-elements">Dy</div>
                          <div className="so-thu-tu">66</div>
                        </a>
                      </td>
                      <td className="nhom-lantan chat-ran elements chat-nguyen-thuy">
                        <a
                          title="Holmi"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Holmi"
                        >
                          <div className="ten-elements">Ho</div>
                          <div className="so-thu-tu">67</div>
                        </a>
                      </td>
                      <td className="nhom-lantan chat-ran elements chat-nguyen-thuy">
                        <a
                          title="Erbi"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Erbi"
                        >
                          <div className="ten-elements">Er</div>
                          <div className="so-thu-tu">68</div>
                        </a>
                      </td>
                      <td className="nhom-lantan chat-ran elements chat-nguyen-thuy">
                        <a
                          title="Thuli"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Thuli"
                        >
                          <div className="ten-elements">Tm</div>
                          <div className="so-thu-tu">69</div>
                        </a>
                      </td>
                      <td className="nhom-lantan chat-ran elements chat-nguyen-thuy">
                        <a
                          title="Ytterbi"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Ytterbi"
                        >
                          <div className="ten-elements">Yb</div>
                          <div className="so-thu-tu">70</div>
                        </a>
                      </td>
                      <td className="nhom-lantan chat-ran elements chat-nguyen-thuy">
                        <a
                          title="Luteti"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Luteti"
                        >
                          <div className="ten-elements">Lu</div>
                          <div className="so-thu-tu">71</div>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "right" }} colSpan={3}>
                        **{" "}
                        <b>
                          <a
                            title="Nhóm actini"
                            href="https://wikipedia.org/wiki/Nh%C3%B3m_actini"
                          >
                            Actini group
                          </a>
                        </b>
                      </td>
                      <td className="kim-loai-chuyen-tiep chat-ran elements chat-sinh-ra-sau">
                        <a
                          title="Actini"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Actini"
                        >
                          <div className="ten-elements">Ac</div>
                          <div className="so-thu-tu">89</div>
                        </a>
                      </td>
                      <td className="nhom-actini chat-ran elements chat-nguyen-thuy">
                        <a
                          title="Thori"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Thori"
                        >
                          <div className="ten-elements">Th</div>
                          <div className="so-thu-tu">90</div>
                        </a>
                      </td>
                      <td className="nhom-actini chat-ran elements chat-sinh-ra-sau">
                        <a
                          title="Protactini"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Protactini"
                        >
                          <div className="ten-elements">Pa</div>
                          <div className="so-thu-tu">91</div>
                        </a>
                      </td>
                      <td className="nhom-actini chat-ran elements chat-nguyen-thuy">
                        <a
                          title="Urani"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Urani"
                        >
                          <div className="ten-elements">U</div>
                          <div className="so-thu-tu">92</div>
                        </a>
                      </td>
                      <td className="nhom-actini chat-ran elements chat-sinh-ra-sau">
                        <a
                          title="Neptuni"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Neptuni"
                        >
                          <div className="ten-elements">Np</div>
                          <div className="so-thu-tu">93</div>
                        </a>
                      </td>
                      <td className="nhom-actini chat-ran elements chat-nguyen-thuy">
                        <a
                          title="Plutoni"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Plutoni"
                        >
                          <div className="ten-elements">Pu</div>
                          <div className="so-thu-tu">94</div>
                        </a>
                      </td>
                      <td className="nhom-actini chat-ran elements chat-nhan-tao">
                        <a
                          title="Americi"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Americi"
                        >
                          <div className="ten-elements">Am</div>
                          <div className="so-thu-tu">95</div>
                        </a>
                      </td>
                      <td className="nhom-actini chat-ran elements chat-nhan-tao">
                        <a
                          title="Curi"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Curi"
                        >
                          <div className="ten-elements">Cm</div>
                          <div className="so-thu-tu">96</div>
                        </a>
                      </td>
                      <td className="nhom-actini chat-ran elements chat-nhan-tao">
                        <a
                          title="Berkeli"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Berkeli"
                        >
                          <div className="ten-elements">Bk</div>
                          <div className="so-thu-tu">97</div>
                        </a>
                      </td>
                      <td className="nhom-actini chat-ran elements chat-nhan-tao">
                        <a
                          title="Californi"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Californi"
                        >
                          <div className="ten-elements">Cf</div>
                          <div className="so-thu-tu">98</div>
                        </a>
                      </td>
                      <td className="nhom-actini chat-ran elements chat-nhan-tao">
                        <a
                          title="Einsteini"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Einsteini"
                        >
                          <div className="ten-elements">Es</div>
                          <div className="so-thu-tu">99</div>
                        </a>
                      </td>
                      <td className="nhom-actini chat-ran elements chat-nhan-tao">
                        <a
                          title="Fermi"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Fermi"
                        >
                          <div className="ten-elements">Fm</div>
                          <div className="so-thu-tu">100</div>
                        </a>
                      </td>
                      <td className="nhom-actini chat-ran elements chat-nhan-tao">
                        <a
                          title="Mendelevi"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Mendelevi"
                        >
                          <div className="ten-elements">Md</div>
                          <div className="so-thu-tu">101</div>
                        </a>
                      </td>
                      <td className="nhom-actini chat-ran elements chat-nhan-tao">
                        <a
                          title="Nobeli"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Nobeli"
                        >
                          <div className="ten-elements">No</div>
                          <div className="so-thu-tu">102</div>
                        </a>
                      </td>
                      <td className="nhom-actini chat-ran elements chat-nhan-tao">
                        <a
                          title="Lawrenci"
                          target="_blank"
                          href="https://wikipedia.org/wiki/Lawrenci"
                        >
                          <div className="ten-elements">Lr</div>
                          <div className="so-thu-tu">103</div>
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ToEs;
