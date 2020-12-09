import React from "react";
import { Container, Row, Col, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Home } from "react-feather";
import Link from "next/link";
const Breadcrumbs = (props) => {
  return (
    <>
      <Container fluid={true}>
        <div className="page-header">
          <Row>
            <Col xs="6">
              <h3>{props.title}</h3>
              <Breadcrumb>
                <BreadcrumbItem key="home">
                  <Link href="/">
                    <a>
                      <Home />
                    </a>
                  </Link>
                </BreadcrumbItem>
                <BreadcrumbItem key="parent">
                  <Link href={`/${props?.urlParent}`}>
                    <a>{props.parent}</a>
                  </Link>
                </BreadcrumbItem>
                {props.word ? (
                  <BreadcrumbItem key="word">
                    <Link href={`/dict/${props.language}/${props.word}`}>
                      <a>{props.word}</a>
                    </Link>
                  </BreadcrumbItem>
                ) : (
                  ""
                )}
              </Breadcrumb>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
};

export default Breadcrumbs;
