import "../../assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../../assets/scss/argon-dashboard-react.scss";

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
import AdminAddHeader from "../../components/Headers/AdminAddHeader.jsx";



const AdminAddProduct = () => {

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [animals, setAnimals] = useState([]);
  const [product, setProduct] = useState({
    title: "",
    brand: "",
    price: 0,
    amount: 0,
    id_category: "",
    id_animal: "",
    description: "",
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setProduct({ ...product, [id]: value });
  };
  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      // Thêm dữ liệu sản phẩm
      formData.append("title", product.title);
      formData.append("brand", product.brand);
      formData.append("price", product.price);
      formData.append("amount", product.amount);
      formData.append("description", product.description);
      formData.append("id_category", product.id_category);
      formData.append("id_animal", product.id_animal);

      // Thêm ảnh
      selectedFiles.forEach((file) => {
        formData.append("images", file);
      });

      const res = await axios.post("http://localhost:8080/api/products/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      console.log(res.data)

      alert("Thêm sản phẩm thành công!");
    } catch (error) {
      console.error("Lỗi:", error);
      alert("Thêm sản phẩm thất bại.");
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
  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/animals");
        setAnimals(res.data);
      } catch (err) {
        console.error("Lỗi khi lấy danh mục:", err);
      }
    };

    fetchAnimals();
  }, []);


  return (
    <>
      <AdminAddHeader />
      {/* Page content */}
      <Container className="mt--7 z-10" fluid>
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
                        src={require("../../assets/images/offer-banner-1.jpg")}
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
              <CardBody className="bg-white border-0">
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
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="8">
                      <FormGroup>
                        <label
                            className="form-control-label"
                            htmlFor="input-category"
                        >
                          Ảnh sản phẩm (tối đa 3 ảnh)
                        </label>
                        <Input
                            className="form-control-alternative"
                            type="file"
                            id="images"
                            multiple
                            accept="image/*"
                            onChange={(e) => setSelectedFiles([...e.target.files])}
                        />
                      </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                              className="form-control-label"
                              htmlFor="input-animal"
                          >
                            Thú cưng
                          </label>
                          <select
                              className="form-control-alternative"
                              value={product.id_animal}
                              defaultValue="Loại"
                              id="id_animal"
                              onChange={handleChange}
                              style={{height:'100%',padding:'10px',borderRadius:'5px',width:'100%'}}

                          >
                            <option value="">-- Chọn thú cưng --</option>
                            {animals.map((animal) => (
                                <option key={animal.id} value={animal.id}>
                                  {animal.name}
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
