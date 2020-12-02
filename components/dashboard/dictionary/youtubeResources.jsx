import { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import { Accordion } from "react-bootstrap";
import dynamic from "next/dynamic";
const ScrollArea = dynamic(() => import("react-scrollbar"), { ssr: false });
import Slider from "react-slick";

const YoutubeResources = () => {
  const [expanded1, setexpanded1] = useState(true);
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
          arrows: false,
          centerMode: false,
          centerPadding: "0",
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <>
      <Card>
        <CardHeader>
          <h3>How to pronounce parent in English?</h3>
        </CardHeader>
        <CardBody>
          <Slider {...slickSettings}>
            <div className="slider-frame">
              <div className="img-slider">
                <div className="bg-overlay">
                  <button class="btn btn-primary btn-sm">Watch</button>
                </div>
              </div>
              test1
            </div>
            <div className="slider-frame">
              <div className="img-slider"></div>
              test
            </div>
            <div className="slider-frame">
              <div className="img-slider"></div>
              test
            </div>
            <div className="slider-frame">
              <div className="img-slider"></div>
              test
            </div>
            <div className="slider-frame">
              <div className="img-slider"></div>
              test
            </div>
            <div className="slider-frame">
              <div className="img-slider"></div>
              test
            </div>
          </Slider>
          <Accordion>
            <div
              className="default-according style-1 meaningSection"
              id="accordionoc"
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
                    >
                      <i className="icofont icofont-square-right"></i>
                      Subtitle
                    </Accordion.Toggle>
                  </h5>
                </CardHeader>
                <Accordion.Collapse eventKey="0">
                  <ListGroup className="moreExample">
                    <ListGroupItem key={1}>
                      <span class="badge badge-primary">1:00</span> Quis ex aute
                      nisi culpa commodo cillum culpa minim voluptate.
                    </ListGroupItem>
                    <ListGroupItem key={2}>
                      <span class="badge badge-primary">1:15</span> Quis ex aute
                      nisi culpa commodo cillum culpa minim voluptate.
                    </ListGroupItem>
                    <ListGroupItem key={3}>
                      <span class="badge badge-primary">1:30</span>
                      Quis ex aute nisi culpa commodo cillum culpa minim
                      voluptate.
                    </ListGroupItem>
                    <ListGroupItem key={4}>
                      <span class="badge badge-primary">2:00</span>
                      Quis ex aute nisi culpa commodo cillum culpa minim
                      voluptate.
                    </ListGroupItem>
                    <ListGroupItem key={5}>
                      <span class="badge badge-primary">2:00</span>
                      Quis ex aute nisi culpa commodo cillum culpa minim
                      voluptate.
                    </ListGroupItem>
                    <ListGroupItem key={6}>
                      <span class="badge badge-primary">2:00</span>
                      Quis ex aute nisi culpa commodo cillum culpa minim
                      voluptate.
                    </ListGroupItem>
                    <ListGroupItem key={7}>
                      <span class="badge badge-primary">2:00</span>
                      Quis ex aute nisi culpa commodo cillum culpa minim
                      voluptate.
                    </ListGroupItem>
                  </ListGroup>
                </Accordion.Collapse>
              </Card>
            </div>
          </Accordion>
          <div className="youtube"></div>
          <div className="bg-dark" id="subtitle">
            <div className="border-subTitle">
              Something the Johnson Administration worried about
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default YoutubeResources;
