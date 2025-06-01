import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Card,
  CardHeader,
  Media,
  Table,
  Container,
  Row,
  Button,
} from "reactstrap";

import AdminHeader from "../../components/Headers/AdminListHeader.jsx";

const AdminProductList = () => {

  const [categories, setCategories] = useState([]);
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
  const getCategoryName = (id) => {
    const category = categories.find((cat) => cat.id === id);
    return category ? category.name : "Không rõ";
  };

  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/products");
        setProducts(response.data);
      } catch (err) {
        console.error("Lỗi khi lấy danh sách sản phẩm:", err);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xoá sản phẩm này?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8080/api/products/delete/${id}`);
      alert("Đã xoá sản phẩm!");

      // Cập nhật danh sách hiển thị bằng cách xoá sản phẩm khỏi state
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Lỗi khi xoá sản phẩm:", err);
      alert("Lỗi khi xoá sản phẩm!");
    }
  };


  return (
    <>
      <AdminHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Danh sách sản phẩm</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Tên</th>
                    <th scope="col">Giá</th>
                    <th scope="col">Thương hiệu</th>
                    <th scope="col">Loại</th>
                    <th scope="col">Số lượng</th>
                    <th scope="col">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <th scope="row">
                      <Media className="align-items-center">
                        <a
                          className="avatar rounded-circle mr-3"
                          href=" "
                        >
                          <img
                              alt="..."
                              src={
                                product.images && product.images.length > 0
                                    ? `http://localhost:8080/uploads/${product.images[0].image}`
                                    : require("../../assets/images/offer-banner-1.jpg")
                          }
                              className="avatar rounded-circle mr-3"
                              style={{ width: "50px", height: "50px", objectFit: "cover" }}
                          />
                        </a>
                        <Media>
                          <span className="mb-0 text-sm">
                            {product.title}
                          </span>
                        </Media>
                      </Media>
                    </th>
                    <td>{product.price}</td>
                    <td>{product.brand}</td>
                    <td>{getCategoryName(product.id_category)}</td>
                    <td>{product.amount}</td>
                    <td className="text-left">
                      {/*<Button*/}
                      {/*    size="sm"*/}
                      {/*    style={{width:'40%', padding:'2px'}}*/}
                      {/*    color="success"*/}

                      {/*>*/}
                      {/*  Sửa*/}
                      {/*</Button>*/}
                      <Button
                          size='sm'
                          style={{width:'40%', padding:'2px'}}
                          color="danger"
                          onClick={() => handleDelete(product.id)}
                      >
                        Xóa
                      </Button>
                    </td>
                  </tr>
                ))}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default AdminProductList;
