import React, {useContext, useEffect, useState} from "react";
// import { useSelector } from "react-redux";
import "../../assets/css/product-page.css";

import axios from "../../api/axiosIns";
import { bagAddOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import {useLocation} from "react-router-dom";
import {CartContext} from "../../contexts/CartContext";
import {toast} from "react-toastify";

const ProductPage = () => {

  const { fetchCartCount } = useContext(CartContext);
  const handleAddToCart = async (productId) => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "http://localhost:8080/api/cart/add",
        {
          userId: parseInt(userId),
          productId: productId,
          quantity: 1 // hoặc số lượng bạn muốn thêm
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Đã thêm sản phẩm vào giỏ hàng!");
      fetchCartCount();
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
      toast.error("Thêm vào giỏ hàng thất bại!");
    }
  };


  const [selectedAnimal, setSelectedAnimal] = useState("");
  const [animals, setAnimals] = useState([]);
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

  const [selectedCategory, setSelectedCategory] = useState("");
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

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 12;
  // const filteredProducts = products.filter((p) => {
  //   const matchCategory = selectedCategory === "" || p.id_category === parseInt(selectedCategory);
  //   const matchAnimal = selectedAnimal === "" || p.id_animal === parseInt(selectedAnimal);
  //   return matchCategory && matchAnimal;
  // });
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const animalParam = selectedAnimal === "" ? -1 : parseInt(selectedAnimal);
        const categoryParam = selectedCategory === "" ? -1 : parseInt(selectedCategory);

        const response = await axios.get(
          `http://localhost:8080/api/products/filter?page=${currentPage}&size=${pageSize}&category=${categoryParam}&animal=${animalParam}`
        );
        setProducts(response.data.products);
        setTotalPages(response.data.totalPages);
      } catch (err) {
        console.error("Lỗi khi lấy danh sách sản phẩm:", err);
      }
    };

    fetchProducts();
  }, [currentPage, selectedCategory, selectedAnimal]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedAnimal]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  return (
    <div className="user-wrapper">
      <section className="section product" id="shop" aria-label="product">
        <div className="container">
          {/* Filter Form */}
          <div className="product-filter">
            <form id="filter-form">

              <div className="filter-group">
                <p>Loại động vật</p>
                <div className="radio-group">
                  <label>
                    <input
                      type="radio"
                      name="animal"
                      value=""
                      checked={selectedAnimal === ""}
                      onChange={(e) => setSelectedAnimal(e.target.value)}
                    />
                    <span style={{ width: "70px", display: "inline-block" }}>Tất cả</span>
                  </label>
                  {animals.map((animal) => (
                    <label key={animal.id}>
                      <input
                        type="radio"
                        name="animal"
                        value={animal.id}
                        checked={selectedAnimal === animal.id.toString()}
                        onChange={(e) => setSelectedAnimal(e.target.value)}
                      /> <text style={{ width: "70px" }}>{animal.name}</text>
                    </label>
                  ))}
                </div>
              </div>


              <div className="filter-group">
                <label htmlFor="category">Loại sản phẩm</label>
                <select
                  name="category"
                  id="id_category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">Tất cả</option>
                  {categories.map((cate) => (
                    <option key={cate.id} value={cate.id}>
                      {cate.name}
                    </option>
                  ))}
                </select>

                {/*<button type="submit" className="filter-btn">Lọc</button>*/}
              </div>
            </form>
          </div>

          {/* Title */}
          <h2 className="h2 section-title">
            Tất cả <span className="span">Sản phẩm</span>
          </h2>

          {/* Product List */}
          <ul className="grid-list" style={{ justifyContent: "center" }}>
            {products.map((product) => (
              <li key={product.id} data-category={product.id_category.name} >
                <div className="product-card">
                  <div className="card-banner img-holder">
                    {product.images && product.images.length > 0 ? (
                      <>
                        <img
                          src={product.images[0]}
                          alt={product.title}
                          className="img-cover default"
                        />
                        {product.images.length > 3 ? (
                            <img
                                src={product.images[2]}
                                alt={product.title}
                                className="img-cover hover"
                            />
                        ) : (
                            <img
                                src={product.images[1]}
                                alt={product.title}
                                className="img-cover hover"
                            />
                        )}
                      </>
                    ) : (
                      <div className="no-image">Không có ảnh</div>
                    )}
                    <button
                      className="card-action-btn"
                      aria-label="add to cart"
                      title="Add To Cart"
                      onClick={() => handleAddToCart(product.id)}
                    >
                      <IonIcon icon={bagAddOutline} aria-hidden="true" />
                    </button>
                  </div>
                  <div className="card-content">
                    <h3 className="h3">
                      <a href={`/products/${product.id}`} className="card-title">{product.title}</a>
                    </h3>
                    <data className="card-price" value={product.price}>
                      {product.price.toLocaleString("vi-VN")} VND
                    </data>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {/* Pagination */}
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`page-button ${currentPage === i + 1 ? "active" : ""}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductPage;