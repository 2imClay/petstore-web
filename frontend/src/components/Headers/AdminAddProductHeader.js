

// reactstrap components
import { Button, Container, Row, Col } from "reactstrap";

const AdminAddProductHeader = () => {
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
        {/* AdminHeader container */}
        <Container className="d-flex align-items-center" fluid>
          <Row style={{width:'70%'}}>
            <Col lg="7" md="10" style={{width:'50%'}}>
              <h1 className="display-2 text-white" style={{marginBottom:'100px'}}>Thêm sản phẩm</h1>
              {/*<p className="text-white mt-0 mb-5">*/}
              {/*  Thêm sản phẩm*/}
              {/*</p>*/}
              <Button
                color="info"
                href="/admin/productList"
                // onClick={(e) => e.preventDefault()}
              >
                Danh sách sản phẩm
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default AdminAddProductHeader;
