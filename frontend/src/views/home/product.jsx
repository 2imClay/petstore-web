import React, { useState } from "react";
import product1 from "../../assets/images/product-1.jpg"
import product1_0 from "../../assets/images/product-1_0.jpg"

const products = [
    {
      id: 1,
      title: "Commodo leo sed porta",
      price: 15,
      animal: "dog",
      category: "1",
      image: product1,
      imageHover: product1_0,
    },
    // Thêm sản phẩm nếu cần
  ];
const ProductPage = () => {
  const [animal, setAnimal] = useState("");
  const [category, setCategory] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  

  // Lọc sản phẩm khi submit
  const handleFilter = (e) => {
    e.preventDefault();
    const result = products.filter((product) => {
      const matchAnimal = animal === "" || product.animal === animal;
      const matchCategory = category === "" || product.category === category;
      return matchAnimal && matchCategory;
    });
    setFilteredProducts(result);
  };

  // Mặc định hiển thị tất cả
  React.useEffect(() => {
    setFilteredProducts(products);
  }, []); 

  return (
      <div className="user-wrapper">
        <section className="section product" id="shop" aria-label="product">
          <div className="container">

            {/* Filter Form */}
            <div className="product-filter">
              <form id="filter-form" onSubmit={handleFilter}>
                <div className="filter-group">
                  <p>Loại động vật</p>
                  <div className="radio-group">
                    <label>
                      <input
                          type="radio"
                          name="animal"
                          value=""
                          checked={animal === ""}
                          onChange={() => setAnimal("")}
                      /> Tất cả
                    </label>
                    <label>
                      <input
                          type="radio"
                          name="animal"
                          value="dog"
                          checked={animal === "dog"}
                          onChange={() => setAnimal("dog")}
                      /> Chó
                    </label>
                    <label>
                      <input
                          type="radio"
                          name="animal"
                          value="cat"
                          checked={animal === "cat"}
                          onChange={() => setAnimal("cat")}
                      /> Mèo
                    </label>
                  </div>
                </div>

                <div className="filter-group">
                  <label htmlFor="category">Loại sản phẩm</label>
                  <select
                      id="category"
                      name="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Tất cả</option>
                    <option value="1">Loại 1</option>
                    <option value="2">Loại 2</option>
                    <option value="3">Loại 3</option>
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
                  <li key={product.id} data-category={product.category} data-animal={product.animal}>
                    <div className="product-card">
                      <div className="card-banner img-holder" style={{ width: '360px', height: '360px' }}>
                        <img
                            src={product.image}
                            width="360"
                            height="360"
                            loading="lazy"
                            alt={product.title}
                            className="img-cover default"
                        />
                        <img
                            src={product.imageHover}
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
                        <data className="card-price" value={product.price}>${product.price}</data>
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