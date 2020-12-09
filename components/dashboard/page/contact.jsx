import { Container, Row, Col, Card, CardBody } from "reactstrap";
import Breadcrumb from "../../../layout/breadcrumb";
import Head from "next/head";
const ContactUsPage = () => {
  return (
    <>
      <Head>
        <title>Contact Us | Athoni</title>
      </Head>
      <Breadcrumb
        parent="Contact Us"
        urlParent="contact-us"
        title="Contact us"
      />
      <Container fluid={true}>
        <Row>
          <Col md="12">
            <Card>
              <CardBody>
                <p>Contact Us via email : admin@athoni.com</p>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default ContactUsPage;
