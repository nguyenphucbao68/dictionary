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
              <h3 title="Athoni Breadcrumb">{props.title}</h3>
              <Breadcrumb>
                <BreadcrumbItem key="home">
                  <Link href="/">
                    <a title="Athoni">
                      <Home />
                    </a>
                  </Link>
                </BreadcrumbItem>
                {props?.urlParent ? (
                  <BreadcrumbItem key="parent">
                    <Link href={`/${props?.urlParent}`}>
                      <a title={props.parent}>{props.parent}</a>
                    </Link>
                  </BreadcrumbItem>
                ) : (
                  ""
                )}
                {props.substance ? (
                  <BreadcrumbItem key="substance">
                    <Link href={`/substance/${props.substance}`}>
                      <a title={props.substance}>{props.substance}</a>
                    </Link>
                  </BreadcrumbItem>
                ) : (
                  ""
                )}
                {props.children ? (
                  <BreadcrumbItem key="children">
                    <Link href={`/${props.urlParent}/${props.urlChilren}`}>
                      <a title={props.children}>{props.children}</a>
                    </Link>
                  </BreadcrumbItem>
                ) : (
                  ""
                )}
                {props.reaction ? (
                  <BreadcrumbItem key="reaction">
                    <Link
                      href={`/chemicalequations/${props.reactants}/${props.products}`}
                    >
                      <a title={props.reaction}>{props.reaction}</a>
                    </Link>
                  </BreadcrumbItem>
                ) : (
                  ""
                )}
                {props.word ? (
                  <BreadcrumbItem key="word">
                    <Link href={`/dict/${props.language}/${props.word}`}>
                      <a title={props.word}>{props.word}</a>
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
