
// reactstrap components
import { Button, Container, Row, Col } from "reactstrap";

const UserHeader = () => {
  return (
    <>
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: "600px",
          backgroundImage:
            "url(" + require("../../assets/images/hero-banner.jpg") + ")",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        {/* Mask */}
        <span className="mask bg-gradient-default opacity-8" />
        {/* Header container */}
        <Container className="d-flex align-items-center" fluid>
          <Row style={{width:'100%'}}>
            <Col lg="7" md="10" style={{width:'100%'}}>
              <h1 className="display-2 text-white" style={{width:'100%', marginBottom:'100px'}}>Danh sách sản phẩm</h1>
              <Button
                color="info"
                href="/admin/addProduct"
                // onClick={(e) => e.preventDefault()}
              >
                Thêm sản phẩm
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default UserHeader;
