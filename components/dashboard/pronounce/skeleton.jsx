import Skeleton from "react-loading-skeleton";
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

const SkeletonSection = () => {
  return (
    <>
      <Container
        fluid={true}
        id="skeleton-word"
        className="hidden"
        key="skeleton-word"
      >
        <Row>
          <Col md="2">
            <Nav className="nav flex-column nav-pills">
              <NavItem>
                <NavLink
                // href='#javascript'
                >
                  <Skeleton />
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
          <Col md="7">
            <Card>
              <CardHeader>
                <h2>
                  <Skeleton />
                  {/* <span className='uk-text-small'>noun</span> */}
                </h2>
                <div>
                  <span className="speaker-word">
                    <i className="txt-primary icofont icofont-audio"></i>{" "}
                    <Skeleton />
                  </span>
                </div>
              </CardHeader>
              <CardBody className="content-words">
                <div className="meaningSection">
                  <h3 className="sec">
                    <Skeleton />
                  </h3>
                  <ol className="meaning-section">
                    <Skeleton count={3} />
                  </ol>
                  <hr />
                </div>
              </CardBody>
            </Card>
            {/* <DataTables /> */}
          </Col>

          <Col md="3">
            <h4>Other Results</h4>
            <Card className="m-b-0 related-section">
              <Nav className="m-b-0" tabs>
                <NavItem>
                  <NavLink href="#javascript" className="active">
                    Matches
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab="1">
                <TabPane className="fade show" tabId="1">
                  <ListGroup>
                    <ListGroupItem
                      className="btn-square btn btn-outline-light txt-dark"
                      action
                    >
                      <Skeleton />
                    </ListGroupItem>
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
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default SkeletonSection;
