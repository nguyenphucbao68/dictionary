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
        id="skeleton-reaction"
        className="hidden"
        key="skeleton-reaction"
      >
        <Row>
          <Col md="2"></Col>
          <Col md="8">
            <Skeleton />
            <Card>
              <CardHeader className="p-3">
                <h2>Chemical Equation</h2>
              </CardHeader>
              <CardBody className="p-3">
                <div className="chemical-reaction">
                  <Skeleton />
                </div>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="p-3">
                <h5>Reactants</h5>
              </CardBody>
              <ListGroup className="mb-3">
                <ListGroupItem className="list-group-item-action flex-column align-items-start">
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">
                      <Skeleton />
                    </h5>
                  </div>
                  <ul>
                    <li>
                      <Skeleton />
                    </li>
                    <li>
                      <Skeleton />
                    </li>
                  </ul>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>

          <Col md="2"></Col>
        </Row>
      </Container>
    </>
  );
};
export default SkeletonSection;
