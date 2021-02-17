import { Row, Col, Card, CardBody, Button } from "reactstrap";

export const NoResult = ({ keyword, type }) => {
  let title, description;
  if (type == "FINAL_RESULT") {
    title = "Không thấy bài bạn muốn?";
    description =
      "Đặt câu hỏi nhanh trên Selfomy Hỏi Đáp để được hỗ trợ từ cộng đồng hơn 60.000 học sinh năng động, tài năng trên cả nước.";
  } else if (type == "NO_RESULT") {
    title = "Không có kết quả nào";
    description =
      "Rất tiếc, Athoni không tìm thấy câu hỏi hay câu trả lời nào khớp với yêu cầu của bạn.";
  } else {
    title = "Không có kết quả nào";
    description =
      "Rất tiếc, Athoni không tìm thấy câu hỏi hay câu trả lời nào khớp với yêu cầu của bạn.";
  }
  return (
    <Row>
      <Col md={2} />
      <Col md={8}>
        <Card
          style={{
            backgroundImage: `url(${require("../../../public/assets/images/promo/ask-selfomy-banner.svg")})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 0px top",
          }}
          className="card-absolute d-none d-sm-block"
        >
          <CardBody>
            <Row>
              <Col md={8}>
                <h3>{title}</h3>
                <p>{description}</p>
                <form
                  action={process.env.NEXT_PUBLIC_HOIDAP_URL + "ask?cat=1"}
                  method="POST"
                >
                  <input
                    name="title"
                    type="text"
                    readOnly
                    value={keyword}
                    hidden
                  />
                  <Button
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                    type="submit"
                    color="primary"
                  >
                    Đặt câu hỏi
                  </Button>
                </form>
              </Col>
            </Row>
          </CardBody>
        </Card>
        <Card className="card-absolute d-block d-sm-none">
          <CardBody>
            <Row>
              <Col xs={12}>
                <h3>{title}</h3>
                <p>{description}</p>
                <form
                  action={process.env.NEXT_PUBLIC_HOIDAP_URL + "ask?cat=1"}
                  method="POST"
                >
                  <input
                    name="title"
                    type="text"
                    value=""
                    onChange={(e) => e.target.setAttribute.value(keyword)}
                    hidden
                  />
                  <div className="d-flex justify-content-center">
                    <Button
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                      type="submit"
                      color="primary"
                    >
                      Đặt câu hỏi
                    </Button>
                  </div>
                </form>
              </Col>
              <Col xs={12}>
                <div className="d-flex justify-content-center">
                  <img
                    src={require("../../../public/assets/images/promo/ask-selfomy-banner.svg")}
                    style={{ height: "300px" }}
                  />
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
      <Col md={2} />
    </Row>
  );
};
