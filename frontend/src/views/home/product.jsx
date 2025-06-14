import React, {useEffect, useState} from "react";

import axios from "../../api/axiosIns";
import {bagAddOutline} from "ionicons/icons";
import {IonIcon} from "@ionic/react";

const ProductPage = () => {

  // const userId = useSelector((state) => state.auth.data?.userId);

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
      alert("Đã thêm sản phẩm vào giỏ hàng!");
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
      alert("Thêm vào giỏ hàng thất bại!");
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
  const filteredProducts = selectedCategory
      ? products.filter((p) => p.id_category === parseInt(selectedCategory))
      : products;


  return (
    <div className="user-wrapper">
      <section className="section product" id="shop" aria-label="product">
        <div className="container">

            {/* Filter Form */}
            <div className="product-filter">
              <form id="filter-form">
                {/*<div className="filter-group">*/}
                {/*  <p>Loại động vật</p>*/}
                {/*  <div className="radio-group">*/}
                {/*    <label>*/}
                {/*      <input*/}
                {/*          type="radio"*/}
                {/*          name="animal"*/}
                {/*          value=""*/}
                {/*          checked={}*/}
                {/*          onChange={}*/}
                {/*      /> Tất cả*/}
                {/*    </label>*/}
                {/*    <label>*/}
                {/*      <input*/}
                {/*          type="radio"*/}
                {/*          name="animal"*/}
                {/*          value="dog"*/}
                {/*          checked={}*/}
                {/*          onChange={}*/}
                {/*      /> Chó*/}
                {/*    </label>*/}
                {/*    <label>*/}
                {/*      <input*/}
                {/*          type="radio"*/}
                {/*          name="animal"*/}
                {/*          value="cat"*/}
                {/*          checked={}*/}
                {/*          onChange={}*/}
                {/*      /> Mèo*/}
                {/*    </label>*/}
                {/*  </div>*/}
                {/*</div>*/}

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

                  <button type="submit" className="filter-btn">Lọc</button>
                </div>
              </form>
            </div>

          {/* Title */}
          <h2 className="h2 section-title">
            Tất cả <span className="span">Sản phẩm</span>
          </h2>

            {/* Product List */}
            <ul className="grid-list">
              {filteredProducts.map((product) => (
                  <li key={product.id} data-category={product.id_category.name} >
                    <div className="product-card">
                      <div className="card-banner img-holder" style={{ width: '360px', height: '360px' }}>
                        <img
                            src={
                              product.images && product.images.length > 0
                                  ? `http://localhost:8080/uploads/${product.images[0].image}`
                                  : require("../../assets/images/offer-banner-1.jpg")
                            }
                            width="360"
                            height="360"
                            loading="lazy"
                            alt={product.title}
                            className="img-cover default"
                        />
                        <img
                            src={
                              product.images && product.images.length > 0
                                  ? `http://localhost:8080/uploads/${product.images[1].image}`
                                  : require("../../assets/images/offer-banner-1.jpg")
                            }
                            width="360"
                            height="360"
                            loading="lazy"
                            alt={product.title}
                            className="img-cover hover"
                        />
                        <button className="card-action-btn" aria-label="add to cart" title="Add To Cart">
                          <ion-icon name="bag-add-outline" aria-hidden="true"></ion-icon>
                        </button>
                      </div>
                      <div className="card-content">
                        <h3 className="h3">
                          <a href={`/product/${product.id}`} className="card-title">{product.title}</a>
                        </h3>
                        <data className="card-price" value={product.price}>{product.price} VND</data>
                      </div>
                    </div>
                  </li>
              ))}
            </ul>

        </div>
      </section>
    </div>
  );
};

export default ProductPage;