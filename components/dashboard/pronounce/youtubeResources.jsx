import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem,
  Progress,
} from "reactstrap";
import { Accordion } from "react-bootstrap";
import dynamic from "next/dynamic";
const ScrollArea = dynamic(() => import("react-scrollbar"), { ssr: false });
import Slider from "react-slick";
import YouTube from "react-youtube";
import { parseStringPromise } from "xml2js";

// import { getSubtitleFromVideo } from '../../../lib/dictionary';

// const { getSubtitleFromVideo } = dynamic(
// 	() => import('../../../lib/dictionary'),
// 	{ ssr: false }
// );

const YoutubeResources = ({ pronounce, subTitle }) => {
  const [expanded1, setexpanded1] = useState(false);
  const [subTitleText, setSubTitleText] = useState(pronounce[0]?.title);
  const [curCode, setCurCode] = useState(pronounce[0]?.code);
  const [subTitleList, setSubTitleList] = useState(subTitle);
  const [playStart, setPlayStart] = useState(false);
  const Accordion1 = () => {
    setexpanded1(!expanded1);
  };
  const slickSettings = {
    centerMode: true,
    centerPadding: "0px",
    slidesToShow: 4,
    dots: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          arrows: true,
          centerMode: false,
          centerPadding: "0",
          slidesToShow: 1,
        },
      },
    ],
  };

  const opts = {
    height: "330",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  useEffect(() => {
    if (playStart) {
      if (!window.secTimer)
        window.secTimer = setInterval(() => {
          if (window.changedVideo) return;
          // setDt(new Date().toLocaleString());
          const timeEnd = new Date();
          if (window.stopTime) {
            var timeDiff =
              (timeEnd - window.currentTime - window.stopTime) / 1000;
            window.stopTime = false;
          } else {
            var timeDiff = (timeEnd - window.currentTime) / 1000;
          }

          if (timeDiff > parseFloat(window.durTime)) {
            // console.log(
            // 	timeEnd,
            // 	window.currentTime,
            // 	timeDiff,
            // 	parseFloat(window.durTime)
            // );
            window.subTitleIndex += 1;
            window.currentTime = new Date();
            window.durTime = parseFloat(
              subTitleList[window.subTitleIndex]?.$.dur,
            ).toFixed(2);
            setSubTitleText(subTitleList[window.subTitleIndex]?._);
          }
        }, 200);
    }
  });

  const onStopFunc = (event) => {
    clearInterval(window.secTimer);
    window.stopTime = new Date();
    window.secTimer = false;
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
    console.log(subTitles);
    setSubTitleList(subTitles?.result.transcript?.text);

    window.currentTime;
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

  return (
    <Card key="pronounce-info" id="pronounce-info">
      <CardHeader>
        <h3>How to pronounce parent in English?</h3>
      </CardHeader>
      <CardBody>
        <Slider {...slickSettings}>
          {pronounce?.map((item, i) => (
            <div className="slider-frame" key={item?.code}>
              <div
                className="img-slider"
                style={{
                  backgroundImage: `url("${item?.data.thumbnail_url}")`,
                }}
              >
                <div className="bg-overlay">
                  <button
                    className="btn btn-primary btn-sm"
                    code={item?.code}
                    index={i}
                    onClick={changeVideoFunc}
                  >
                    Watch
                  </button>
                </div>
              </div>
              {item?.data.title}
            </div>
          ))}
        </Slider>
        <div className="youtube">
          <YouTube
            videoId={curCode}
            opts={opts}
            onReady={onReadyFunc}
            onPlay={onPlayFunc}
            onPause={onStopFunc}
          />
        </div>
        <div id="subtitle">
          <div
            className="border-subTitle"
            dangerouslySetInnerHTML={{ __html: subTitleText }}
          ></div>
        </div>
        <div id="action-item">
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
        <Accordion defaultActiveKey="0">
          <div
            className="default-according style-1 meaningSection"
            id="accordionoc"
            key="section1"
          >
            <Card>
              <CardHeader className="bg-light p-0 border-0">
                <h5 className="mb-0">
                  <Accordion.Toggle
                    className="btn txt-dark btn-outline-light btn-square"
                    color="light"
                    onClick={Accordion1}
                    eventKey="0"
                    aria-expanded={expanded1}
                    key="section3"
                  >
                    <i className="icofont icofont-square-right"></i>
                    Subtitle
                  </Accordion.Toggle>
                </h5>
              </CardHeader>
              <Accordion.Collapse eventKey="0" key="section5">
                <ListGroup className="moreExample" id="subTitle" key="section7">
                  <ScrollArea horizontal={false} vertical={true} key="section9">
                    {subTitleList.map((item, i) => (
                      <>
                        <ListGroupItem key={`titleSub${i}`}>
                          <span className="badge badge-primary">
                            {item?.$.start}
                          </span>{" "}
                          {typeof window !== "undefined" &&
                          window?.subTitleIndex == i ? (
                            <strong
                              dangerouslySetInnerHTML={{
                                __html: `<strong>${item?._}</strong>`,
                              }}
                            ></strong>
                          ) : (
                            <span
                              dangerouslySetInnerHTML={{
                                __html: item?._,
                              }}
                            ></span>
                          )}
                          {/* {item?._} */}
                          <Progress
                            color="secondary"
                            value={
                              (parseInt(item?.$.start) /
                                parseInt(
                                  subTitleList[subTitleList.length - 1]?.$
                                    .start,
                                )) *
                              100
                            }
                            className="xs-progress-bar m-t-5"
                          />
                        </ListGroupItem>
                      </>
                    ))}
                  </ScrollArea>
                </ListGroup>
              </Accordion.Collapse>
            </Card>
          </div>
        </Accordion>
      </CardBody>
    </Card>
  );
};

export default YoutubeResources;
