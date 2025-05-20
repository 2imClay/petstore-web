
import React, { useEffect, useState } from "react";
import axios from "axios";

// reactstrap components
import {
  // Badge,
  Card,
  CardHeader,
  // CardFooter,
  // DropdownMenu,
  // DropdownItem,
  // UncontrolledDropdown,
  // DropdownToggle,
  Media,
  // Pagination,
  // PaginationItem,
  // PaginationLink,
  // Progress,
  Table,
  Container,
  Row,
  // UncontrolledTooltip,
  Button,
} from "reactstrap";
// core components
import AdminHeader from "../components/Headers/AdminProductListHeader.js";

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
                <h3 className="mb-0">Card tables</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Tên</th>
                    <th scope="col">Giá</th>
                    <th scope="col">Nhãn hiệu</th>
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
                            src={require("../assets/images/offer-banner-1.jpg")}
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
              {/*<CardFooter className="py-4">*/}
              {/*  <nav aria-label="...">*/}
              {/*    <Pagination*/}
              {/*      className="pagination justify-content-end mb-0"*/}
              {/*      listClassName="justify-content-end mb-0"*/}
              {/*    >*/}
              {/*      <PaginationItem className="disabled">*/}
              {/*        <PaginationLink*/}
              {/*          href=" "*/}
              {/*          onClick={(e) => e.preventDefault()}*/}
              {/*          tabIndex="-1"*/}
              {/*        >*/}
              {/*          <i className="fas fa-angle-left" />*/}
              {/*          <span className="sr-only">Previous</span>*/}
              {/*        </PaginationLink>*/}
              {/*      </PaginationItem>*/}
              {/*      <PaginationItem className="active">*/}
              {/*        <PaginationLink*/}
              {/*          href=" "*/}
              {/*          onClick={(e) => e.preventDefault()}*/}
              {/*        >*/}
              {/*          1*/}
              {/*        </PaginationLink>*/}
              {/*      </PaginationItem>*/}
              {/*      <PaginationItem>*/}
              {/*        <PaginationLink*/}
              {/*          href=" "*/}
              {/*          onClick={(e) => e.preventDefault()}*/}
              {/*        >*/}
              {/*          2 <span className="sr-only">(current)</span>*/}
              {/*        </PaginationLink>*/}
              {/*      </PaginationItem>*/}
              {/*      <PaginationItem>*/}
              {/*        <PaginationLink*/}
              {/*          href=" "*/}
              {/*          onClick={(e) => e.preventDefault()}*/}
              {/*        >*/}
              {/*          3*/}
              {/*        </PaginationLink>*/}
              {/*      </PaginationItem>*/}
              {/*      <PaginationItem>*/}
              {/*        <PaginationLink*/}
              {/*          href=" "*/}
              {/*          onClick={(e) => e.preventDefault()}*/}
              {/*        >*/}
              {/*          <i className="fas fa-angle-right" />*/}
              {/*          <span className="sr-only">Next</span>*/}
              {/*        </PaginationLink>*/}
              {/*      </PaginationItem>*/}
              {/*    </Pagination>*/}
              {/*  </nav>*/}
              {/*</CardFooter>*/}
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default AdminProductList;
