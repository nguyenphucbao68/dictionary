import React, { Fragment, useState } from "react";
import { Search, MapPin } from "react-feather";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Input,
  Label,
  Button,
  Collapse,
} from "reactstrap";

const QAFilter = () => {
  const [isFilter, setIsFilter] = useState(true);
  const [location, setLocation] = useState(true);
  const [isJobTitle, setisJobTitle] = useState(true);
  const [isIndustry, setisIndustry] = useState(true);
  const [isSkill, setisSkill] = useState(true);

  return (
    <Fragment>
      <Col md="5">
        <div
          className="default-according style-1 faq-accordion job-accordion"
          id="accordionoc"
        >
          <Row>
            <Col xl="12">
              <Card>
                <CardHeader>
                  <h5 className="mb-0">
                    <Button
                      color="link pl-0"
                      data-toggle="collapse"
                      onClick={() => setIsFilter(!isFilter)}
                      data-target="#collapseicon"
                      aria-expanded={isFilter}
                      aria-controls="collapseicon"
                    >
                      Filter
                    </Button>
                  </h5>
                </CardHeader>
                <Collapse isOpen={isFilter}>
                  <CardBody className="filter-cards-view animate-chk">
                    <div className="job-filter">
                      <div className="faq-form">
                        <Input
                          className="form-control"
                          type="text"
                          placeholder="Search.."
                        />
                        <Search className="search-icon" />
                      </div>
                    </div>
                    <div>
                      <span>
                        <a
                          className="btn btn-pill btn-light mr-3 wow pulse"
                          target="_blank"
                          style={{
                            visibility: "visible",
                            animationName: "pulse",
                          }}
                        >
                          <img
                            src={require("../../../public/assets/images/icon/lecttr.png")}
                            style={{
                              width: "20px",
                              height: "20px",
                              marginRight: "10px",
                            }}
                          />
                          Lecttr
                        </a>
                      </span>
                      <span>
                        <a
                          className="btn btn-pill btn-primary mr-3 wow pulse "
                          target="_blank"
                          style={{
                            visibility: "visible",
                            animationName: "pulse",
                          }}
                        >
                          <img
                            src={require("../../../public/assets/images/icon/selfomy.png")}
                            style={{
                              width: "20px",
                              height: "20px",
                              marginRight: "10px",
                            }}
                          />
                          Selfomy Hỏi đáp
                        </a>
                      </span>
                    </div>

                    <div className="checkbox-animated">
                      <Label className="d-block" htmlFor="chk-ani">
                        <Input
                          className="checkbox_animated"
                          id="chk-ani"
                          type="checkbox"
                        />{" "}
                        Full-time (8688)
                      </Label>
                      <Label className="d-block" htmlFor="chk-ani1">
                        <Input
                          className="checkbox_animated"
                          id="chk-ani1"
                          type="checkbox"
                        />
                        Contract (503)
                      </Label>
                      <Label className="d-block" htmlFor="chk-ani2">
                        <Input
                          className="checkbox_animated"
                          id="chk-ani2"
                          type="checkbox"
                        />
                        Part-time (288)
                      </Label>
                      <Label className="d-block" htmlFor="chk-ani3">
                        <Input
                          className="checkbox_animated"
                          id="chk-ani3"
                          type="checkbox"
                        />
                        Internship (236)
                      </Label>
                      <Label className="d-block" htmlFor="chk-ani4">
                        <Input
                          className="checkbox_animated"
                          id="chk-ani4"
                          type="checkbox"
                        />
                        Temporary (146)
                      </Label>
                      <Label className="d-block" htmlFor="chk-ani5">
                        <Input
                          className="checkbox_animated"
                          id="chk-ani5"
                          type="checkbox"
                        />
                        Commission (25)
                      </Label>
                    </div>
                    <Button color="primary" className="text-center">
                      Find jobs
                    </Button>
                  </CardBody>
                </Collapse>
              </Card>
            </Col>
          </Row>
        </div>
      </Col>
    </Fragment>
  );
};

export default QAFilter;
