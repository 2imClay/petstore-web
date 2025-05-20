

import React, { useState, useEffect } from "react";
import axios from "axios";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
// core components
import AdminAddProductHeader from "../components/Headers/AdminAddProductHeader.js";



const AdminAddProduct = () => {


  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({
    title: "",
    brand: "",
    price: 0,
    amount: 0,
    id_category: "",
    description: "",
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setProduct({ ...product, [id]: value });
  };
  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/products/create", product);
      alert("Thêm sản phẩm thành công!");
      console.log(response.data);
    } catch (error) {
      console.error("Lỗi thêm sản phẩm:", error.response?.data || error.message);
      alert("Lỗi: " + (error.response?.data?.error || "Không thể thêm sản phẩm"));
    }
  };


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/categories");
        setCategories(res.data);
      } catch (err) {
        console.error("Lỗi khi lấy danh mục:", err);
      }
    };

    fetchCategories();
  }, []);


  return (
    <>
      <AdminAddProductHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="/admin/tables" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={require("../assets/images/offer-banner-1.jpg")}
                      />
                    </a>
                  </div>
                </Col>
              </Row>
              <CardBody className="pt-0 pt-md-4" style={{marginTop:'50px'}}>
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      <div>
                        <span className="heading">50</span>
                        <span className="description">Sản phẩm</span>
                      </div>
                      <div>
                        <span className="heading">2</span>
                        <span className="description">Người dùng</span>
                      </div>
                      <div>
                        <span className="heading">1000</span>
                        <span className="description">Lượt truy cập</span>
                      </div>
                    </div>
                  </div>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Nhập thông tin sản phẩm</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      // href=""
                      onClick={handleSubmit}
                      size="sm"
                      style={{width:'50%'}}
                    >
                      Thêm
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Thông tin chính
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-productname"
                          >
                            Tên sản phẩm
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue=""
                            id="title"
                            value={product.title}
                            onChange={handleChange}
                            placeholder="Tên sản phẩm"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-brand"
                          >
                            Tên thương hiệu
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="brand"
                            value={product.brand}
                            onChange={handleChange}
                            placeholder="Tên thương hiệu"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Detail */}
                  <h6 className="heading-small text-muted mb-4">
                    Thông tin chi tiết
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-price"
                          >
                            Giá
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="price"
                            value={product.price}
                            onChange={handleChange}
                            placeholder="0VND"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-amount"
                          >
                            Số lượng
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="amount"
                            value={product.amount}
                            onChange={handleChange}
                            placeholder="0"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-category"
                          >
                            Loại sản phẩm
                          </label>
                          <select
                              className="form-control-alternative"
                              value={product.id_category}
                              defaultValue="Loại"
                              id="id_category"
                              onChange={handleChange}
                              style={{height:'100%',padding:'10px',borderRadius:'5px',width:'100%'}}

                          >
                            <option value="">-- Chọn loại --</option>
                            {categories.map((cate) => (
                                <option key={cate.id} value={cate.id}>
                                  {cate.name}
                                </option>
                            ))}
                          </select>
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Description */}
                  <h6 className="heading-small text-muted mb-4">Mô tả</h6>
                  <div className="pl-lg-4">
                    <FormGroup>
                      <label>Mô tả sản phẩm</label>
                      <Input
                        className="form-control-alternative"
                        placeholder="Description"
                        id="description"
                        value={product.description}
                        onChange={handleChange}
                        rows="4"
                        type="textarea"
                      />
                    </FormGroup>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminAddProduct;
