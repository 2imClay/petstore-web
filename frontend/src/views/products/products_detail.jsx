import React, { useState,useEffect } from "react";
import "../../assets/css/product-detail.css";
import axios from "axios";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");


  useEffect(() => {
    // Giả sử productId là 1, bạn có thể lấy từ URL thực tế
    axios.get("http://localhost:8080/api/products/1")
      .then(response => {
        setProduct(response.data);
        setSelectedSize(response.data.sizes[0]);
      })
      .catch(error => console.error("Lỗi khi tải sản phẩm:", error));
  }, []);
  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleQuantityChange = (amount) => {
    setQuantity((prevQty) => Math.max(1, prevQty + amount));
  };

  return (
    <div className="product-detail-wrapper">
      <div className="product-detail-container">
        <div className="product-image">
          <img
            src={product.images[currentIndex]}
            alt={product.name}
            className="main-image"
          />
          <div className="image-navigation">
            <button onClick={handlePrev} className="nav-button">◀</button>
            <div className="thumbnail-list">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className={`thumbnail ${currentIndex === index ? "active" : ""}`}
                  onClick={() => handleThumbnailClick(index)}
                />
              ))}
            </div>
            <button onClick={handleNext} className="nav-button">▶</button>
          </div>
        </div>
        <div className="product-info">
          <h1>{product.name}</h1>
          <p className="brand">Thương hiệu: <strong>{product.brand}</strong></p>
          <p className="price">
            <span className="original">{product.originalPrice.toLocaleString("vi-VN")}₫</span>
            <span className="sale">{product.salePrice.toLocaleString("vi-VN")}₫</span>
          </p>

          <div className="sizes">
            {product.sizes.map((size, idx) => (
              <button
                key={idx}
                className={`size-button ${selectedSize === size ? "selected" : ""}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>

          <div className="quantity">
            <button onClick={() => handleQuantityChange(-1)}>-</button>
            <span>{quantity}</span>
            <button onClick={() => handleQuantityChange(1)}>+</button>
          </div>

          <p className="total">Tổng số tiền: {(product.salePrice * quantity).toLocaleString("vi-VN")}₫</p>

          <button className="add-to-cart">Thêm vào giỏ hàng</button>

          <div className="shipping-info">
            <p><strong>Miễn phí vận chuyển</strong> cho đơn hàng từ 500K</p>
            <p>Hỏa tốc 4h nội thành HCM</p>
          </div>
        </div>
      </div>

      <div className="product-tab">
        <button onClick={() => setActiveTab("description")} className={activeTab === "description" ? "active" : ""}>Mô Tả</button>
        <button onClick={() => setActiveTab("review")} className={activeTab === "review" ? "active" : ""}>Đánh Giá</button>
      </div>

      {activeTab === "description" && (
        <div className="product-description">
          <h2>Mô Tả</h2>
          <p>{product.description}</p>
        </div>
      )}

      {activeTab === "review" && (
        <div className="review-form">
          <div className="star-rating">
            {[...Array(5)].map((_, idx) => (
              <span key={idx} className="star">★</span>
            ))}
          </div>
          <label>Tiêu Đề Đánh Giá</label>
          <input type="text" placeholder="Hãy viết tiêu đề của bạn" />

          <label>Xem Trước</label>
          <textarea placeholder="Viết bình luận của bạn ở đây"></textarea>

          <label>Hình Ảnh/Video (Tùy Chọn)</label>
          <div className="upload-box">📤</div>
          <input type="text" placeholder="YouTube URL" />

          <label>Tên (Hiển Thị Công Khai Như John Smith)</label>
          <input type="text" placeholder="Nhập tên của bạn (công khai)" />

          <label>E-Mail</label>
          <input type="email" placeholder="Nhập email của bạn (riêng tư)" />

          <p className="privacy-note">
            Cách chúng tôi sử dụng dữ liệu của bạn: Chúng tôi sẽ chỉ liên hệ với bạn về đánh giá bạn để lại và chỉ khi cần thiết. Bằng cách gửi đánh giá của mình, bạn đồng ý với các điều khoản và điều kiện và của Judge.me chính sách quyền riêng tư và các chính sách về nội dung.
          </p>

          <div className="form-buttons">
            <button className="cancel">Hủy đánh giá</button>
            <button className="submit">Gửi nhận xét</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;