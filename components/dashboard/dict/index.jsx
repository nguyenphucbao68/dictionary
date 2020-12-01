import React, { useState, useEffect, useRef } from 'react';
import Router from 'next/router';
import Breadcrumb from '../../../layout/breadcrumb';
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
  ModalBody,
  ModalFooter,
  Button,
} from 'reactstrap';
import Head from 'next/head';
import ErrorPage from 'next/error';
import Link from 'next/link';
import { Send, Clock } from 'react-feather';
import useOutsideClick from '../../../lib/event';
import SideBarPage from '../../app/SideBar';
import SkeletonSection from './skeleton';
import settings from '../../../config/settingsConfig';
Router.onRouteChangeStart = () => {
  document.getElementById('skeleton-word')?.classList.remove('hidden');
  document.getElementById('skeleton-word')?.classList.add('show');
  document.getElementById('word-info')?.classList.remove('show');
  document.getElementById('word-info')?.classList.add('hidden');
};
Router.onRouteChangeComplete = () => {
  document.getElementById('skeleton-word')?.classList.remove('show');
  document.getElementById('skeleton-word')?.classList.add('hidden');
  document.getElementById('word-info')?.classList.remove('hidden');
  document.getElementById('word-info')?.classList.add('show');
};
Router.onRouteChangeError = () => {
  document.getElementById('skeleton-word')?.classList.remove('show');
  document.getElementById('skeleton-word')?.classList.add('hidden');
  document.getElementById('word-info')?.classList.remove('hidden');
  document.getElementById('word-info')?.classList.add('show');
};
const Dictionary = ({ definition, word, language }) => {
  const [BasicLineTab, setBasicLineTab] = useState('1');
  // console.log(definition[0].meaning.noun);
  // const router = useRouter();
  // if(router.isFallback){
  // 	return <div>Loading...</div>;
  // }
  if (
    // !router.isFallback ||
    // typeof definition?.slug === 'undefined' ||
    !definition
  ) {
    return <ErrorPage statusCode={404} />;
  }

  const ref = useRef();
  const [daytimes, setDayTimes] = useState();
  const today = new Date();
  const curHr = today.getHours();
  const curMi = today.getMinutes();
  const [meridiem, setMeridiem] = useState('AM');
  // eslint-disable-next-line
  const [date, setDate] = useState({ date: new Date() });
  // eslint-disable-next-line
  const [startDate, setStartDate] = useState(new Date());
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [listWord, setListWord] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleChange = (date) => {
    setDate(date);
  };
  const [VerticleTab, setVerticleTab] = useState('2');

  const clickInputSearch = () => {
    if (keyword === '') return;
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
      const res = await fetch(`/api/index.php/search/${language}/${keyword}/8`);
      const obj = res.json();
      setListWord(await obj);
      setShowResults(true);
    } catch (error) {
      // console.log('err', error);
    }
  };

  useEffect(() => {
    window.hide = () => {
      alert('bao');
    };
    if (curHr < 12) {
      setDayTimes('Good Morning');
    } else if (curHr < 18) {
      setDayTimes('Good Afternoon');
    } else {
      setDayTimes('Good Evening');
    }

    if (curHr >= 12) {
      setMeridiem('PM');
    } else {
      setMeridiem('AM');
    }
  }, []);
  const [curLanguage, setCurLanguage] = useState(settings.defaultLanguageData);
  const [modal, setModal] = useState(false);
  const ModalLanguageSwitcher = () => setModal(!modal);
  const changeCurLanguage = (e) => {
    e.preventDefault();
    console.log(e.target?.getAttribute('prefix'));
    setCurLanguage(e.target?.getAttribute('prefix'));
    setModal(false);
  };
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
        <title>{word} | meaning in the Athoni English Dictionary</title>
        <meta charset="utf-8" />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="description" content={definition.meta.desc.trim()} />
        <meta
          name="keywords"
          content={`${word} definition, dictionary, english, british, american, business, british english, thesaurus, define test, test meaning, what is ${word}, spelling, conjugation, audio pronunciation, free, online, english.`}
        />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,minimum-scale=1,initial-scale=1"
        />
        <meta
          property="og:url"
          content={`https://www.athoni.com/dict/${language}/${word}`}
        />
        <meta
          property="og:title"
          content="Athoni Dictioanry - English dictionary, Vietnamese Dictionary"
        />
        <meta property="og:description" content={definition.meta.desc.trim()} />
        <link rel="canonical" href="https://www.athoni.com/dictionary" />
      </Head>
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
                      onClick={ModalLanguageSwitcher}
                      href="#javascript"
                    >
                      {
                        settings.languageData.find(
                          (item) => item.prefix == curLanguage
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
                    <button type="button" className="btn btn-light">
                      <img
                        width={31}
                        src="/assets/images/landing/search-icon.png"
                      />
                    </button>
                  </div>
                  <div
                    className={`dropdown-menu row ${showResults && 'show'}`}
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
        parent={
          settings.languageData.find((item) => item.prefix == curLanguage).name
        }
        title="Definition"
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
                    className={BasicLineTab === '1' ? 'active' : ''}
                    onClick={() => setBasicLineTab('1')}
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
                          <a>{item.word}</a>
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
            >
              Xem thêm
            </button>

            <Card className="o-hidden profile-greeting mt-3">
              <CardBody>
                <div className="media">
                  <div className="badge-groups w-100">
                    <div className="badge f-12">
                      <Clock
                        style={{ width: '16px', height: '16px' }}
                        className="mr-1"
                      />
                      <span id="txt">
                        {curHr}:{curMi < 10 ? '0' + curMi : curMi} {meridiem}
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
                      src="/assets/images/dashboard/welcome.png"
                      alt=""
                    />
                  </div>
                  <h4 className="f-w-600">
                    {' '}
                    comfortable{' '}
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

export default Dictionary;
