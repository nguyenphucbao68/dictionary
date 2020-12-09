import { Container, Row, Col } from "reactstrap";
import Link from "next/link";
const Footer = () => {
  return (
    <>
      <footer className="footer">
        <Container fluid={true}>
          <Row>
            <Col md="4" className="footer-copyright">
              <img
                className="img-fluid for-light"
                src={require("../../assets/images/logo/logo.png")}
                alt="Athoni Logo"
              />
              <p>
                Athoni is educated ecosystem where you can find or learn
                everything about Chemistry, Language, Physics & Other Subjects.
                We built a comprehensive solution for learning.
              </p>
            </Col>
            <Col md="4">
              <h3>Site links</h3>
              <ul>
                <li>
                  <Link href="/about">
                    <a>About</a>
                  </Link>
                </li>
                <li>
                  <Link href="/terms-of-use">
                    <a>Terms of Use</a>
                  </Link>
                </li>
                <li>
                  <Link href="/contact-us">
                    <a>Contact Us</a>
                  </Link>
                </li>
              </ul>
            </Col>
            <Col md="4">
              <h3>Social</h3>
              <ul>
                <li>
                  <a href="#">Facebook</a>
                </li>
                <li>
                  <a href="#">Google</a>
                </li>
              </ul>
            </Col>
          </Row>
          <hr />
          <span>Copyright © 2020 Athoni. All Rights Reserved.</span>
        </Container>
      </footer>
    </>
  );
};

export default Footer;
