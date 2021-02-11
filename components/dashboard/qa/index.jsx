import React, { useState, useRef, useEffect } from "react";
import Router from "next/router";
import Breadcrumb from "../../../layout/breadcrumb";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  CardHeader,
} from "reactstrap";
// import Head from "next/head";
import Link from "next/link";
import useOutsideClick from "../../../lib/event";
// import SkeletonSection from "./skeleton";
// import settings from "../../../config/settingsConfig";
// import { NextSeo, BreadcrumbJsonLd } from "next-seo";
// import DataTable from "react-data-table-component";
import QAFilter from "./qaFilter";
import Rating from "react-rating";

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
const QAResult = () => {
  const ref = useRef();
  const [keyword, setKeyword] = useState("");
  const [listWord, setListWord] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [rating, setRating] = useState(5);

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

  const JobData = [
    {
      Id: 1,
      logo: require("../../../assets/images/job-search/1.jpg"),
      job_name: "UI/UX IT Frontend Developer",
      badgeType: "primary",
      badgeValue: "New",
      job_area: "(L6) Salt Lake City,",
      job_city: "UT",
      Job_description: [
        "We are looking for an experienced and creative designer and/or frontend engineer with expertise in accessibility to join our team , 3+ years of experience working in as a Frontend Engineer or comparable role. You won’t be a team of one though — you’ll be collaborating closely with other...",
      ],
      Qualifications: {
        title: "Qualifications",
        desc: `
              <li>Have shipped multiple iOS, Android, and/or web products </li>
              <li>5+ years UI/UX experience</li>
              <li>Portfolio demonstrating mastery of native iOS, Android, and/or responsive web design principles</li>
              <li>Ability to autonomously pursue elegant solutions to open-ended problems</li>
              <li>Comfort with ambiguity</li>
              <li>Proven ability to create interactive prototypes</li>
              <li>Strong verbal communication skills with ability to clearly communicate complex ideas and champion a design vision across all levels of an organization</li>
              <li>Strong written communication skills with ability to make transparent design documentation and client-facing presentations</li>
              <li>Ability to create and maintain flow charts, wire frames, prototypes, and mockups.</li>
              <li>Ability to effectively work on more than one project at a time</li>
              <li>Experience conducting user research and stakeholder interviews</li>
              <li>Solid grasp of standard design tools, ex: Sketch, Omnigraffle, the Adobe Suite, Zeplin, etc.</li>
              <li>Bonus Considerations </li>`,
      },
      Agency_experience: {
        title: "Agency experience",
        desc: `
              <li>Experience working with Agile development teams</li>
              <li>Experience with RITE method usability testing</li>
              <li>Experience in visual and motion design; ability to translate UX design into high quality visuals</li>
              <li>Mastery of Sketch & InVision</li>
              <li>Knowledge of mobile or front-end web programming</li>`,
      },
      Perks: {
        title: "Perks",
        desc: `
              <li>Competitive pay</li>
              <li>Competitive medical, dental, and vision insurance plans</li>
              <li>Company-provided 401(k) plan</li>
              <li>Paid vacation and sick time</li>
              <li>Free snacks and beverages</li>`,
      },
      type: "new",
      ribbion: "false",
    },
    {
      Id: 2,
      logo: require("../../../assets/images/job-search/2.jpg"),
      job_name: "React/React Native Developer",
      badgeType: "primary",
      badgeValue: "New",
      job_area: "San Diego,",
      job_city: "CA",
      Job_description: [
        "Ideally 2+ years experience with React. Bonus points if you have React Native experience. This is an incredibly exciting opportunity to gain commercial , Professional experience of React Native and other front end frameworks. Transform product wireframes into responsive, mobile user interface components and",
      ],
      Qualifications: {
        title: "Qualifications",
        desc: `
              <li>Have shipped multiple iOS, Android, and/or web products </li>
              <li>5+ years UI/UX experience</li>
              <li>Portfolio demonstrating mastery of native iOS, Android, and/or responsive web design principles</li>
              <li>Ability to autonomously pursue elegant solutions to open-ended problems</li>
              <li>Comfort with ambiguity</li>
              <li>Proven ability to create interactive prototypes</li>
              <li>Strong verbal communication skills with ability to clearly communicate complex ideas and champion a design vision across all levels of an organization</li>
              <li>Strong written communication skills with ability to make transparent design documentation and client-facing presentations</li>
              <li>Ability to create and maintain flow charts, wire frames, prototypes, and mockups.</li>
              <li>Ability to effectively work on more than one project at a time</li>
              <li>Experience conducting user research and stakeholder interviews</li>
              <li>Solid grasp of standard design tools, ex: Sketch, Omnigraffle, the Adobe Suite, Zeplin, etc.</li>
              <li>Bonus Considerations </li>`,
      },
      Agency_experience: {
        title: "Agency experience",
        desc: `
              <li>Experience working with Agile development teams</li>
              <li>Experience with RITE method usability testing</li>
              <li>Experience in visual and motion design; ability to translate UX design into high quality visuals</li>
              <li>Mastery of Sketch & InVision</li>
              <li>Knowledge of mobile or front-end web programming</li>`,
      },
      Perks: {
        title: "Perks",
        desc: `
              <li>Competitive pay</li>
              <li>Competitive medical, dental, and vision insurance plans</li>
              <li>Company-provided 401(k) plan</li>
              <li>Paid vacation and sick time</li>
              <li>Free snacks and beverages</li>`,
      },
      type: "new",
      ribbion: "false",
    },
  ];

  return (
    <>
      {/* <Head>
        <meta name="keywords" content={settings.chemistry.home.keywordList()} />

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
        title={settings.chemistry.home.titleTemplate}
        canonical={`https://www.athoni.com/chemicalequations`}
        openGraph={{
          type: "website",
          url: `https://www.athoni.com/chemicalequations`,
          title: settings.chemistry.home.titleTemplate,
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
      /> */}

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
      />
      {/* <SkeletonSection /> */}
      <Container fluid={true} className="qa-result">
        <Row>
          <QAFilter />
          <Col md="7">
            <Row>
              <Card className="card-absolute best-answer">
                <CardHeader className="bg-secondary">
                  <h5>Best Result</h5>
                </CardHeader>
                <CardBody>
                  <p className="qa-best-answer">
                    Vì Bảo là thằng đẹp trai nhất thế giới
                  </p>
                  <Rating
                    initialRating={rating}
                    emptySymbol="fa fa-star-o fa-2x"
                    fullSymbol="fa fa-star fa-2x"
                    onChange={(rate) => setRating(rate)}
                  ></Rating>
                  <hr />
                  <h6 className="f-w-600">
                    <Link href={`/app/jobSearch/job-detail`}>
                      Cấu tạo của sán lá gan thích nghi với vòng đời trong sinh
                      học 12 là cm gì?
                    </Link>
                  </h6>
                  <span>
                    <i className="fa fa-star font-warning"></i>
                    <i className="fa fa-star font-warning"></i>
                    <i className="fa fa-star font-warning"></i>
                    <i className="fa fa-star font-warning"></i>
                    <i className="fa fa-star font-warning"></i>
                  </span>
                  <p>
                    Bởi vì ta không kiểm soát được thức ăn của trâu bò ở nước
                    ta, đó là cỏ và nước uống. Trong khi hai nơi này lại là nơi
                    thường có kén sán. Tiếp nữa, do chất thải từ trâu bò không
                    được xử lý nên lại tạo điều kiện cho sán lá gan tiếp tục
                    vòng đời.
                  </p>
                </CardBody>
              </Card>
              {JobData.map((data, i) => {
                return (
                  // <Col xl="6 xl-100" key={i}>
                  <Card>
                    <div className="qa-record">
                      <CardBody>
                        <h6 className="f-w-600">
                          <Link href={`/app/jobSearch/job-detail`}>
                            Cấu tạo của sán lá gan thích nghi với vòng đời trong
                            sinh học 12 là cm gì?
                          </Link>
                        </h6>

                        <p>
                          Bởi vì ta không kiểm soát được thức ăn của trâu bò ở
                          nước ta, đó là cỏ và nước uống. Trong khi hai nơi này
                          lại là nơi thường có kén sán. Tiếp nữa, do chất thải
                          từ trâu bò không được xử lý nên lại tạo điều kiện cho
                          sán lá gan tiếp tục vòng đời.
                        </p>
                        <div className="qa-category">
                          <Button color="light" size="xs" className="qa-tag">
                            <a href="#">Sinh học lớp 8</a>
                          </Button>
                          <Button color="light" size="xs" className="qa-tag">
                            <a href="#">Toán lớp 13</a>
                          </Button>
                        </div>
                      </CardBody>
                    </div>
                  </Card>
                  // </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default QAResult;
