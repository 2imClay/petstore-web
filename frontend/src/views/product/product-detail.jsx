import React, { useState, useEffect, useContext } from "react";
import "../../assets/css/product-detail.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../../contexts/CartContext";
import ReviewList from "../product/reviewlist"
import { toast } from "react-toastify";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  const { fetchCartCount } = useContext(CartContext);

  // Review states
  const [reviews, setReviews] = useState([]);
  const [titleReview, setTitleReview] = useState("");
  const [commentReview, setCommentReview] = useState("");
  const [ratingReview, setRatingReview] = useState(5);
  const [fileReview, setFileReview] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleQuantityChange = (amount) => {
    setQuantity((prevQty) => Math.max(1, prevQty + amount));
  };

  const getToken = () => {
    return localStorage.getItem("accessToken") || localStorage.getItem("token") || "";
  };

  const token = getToken();

  const handleAddToCart = async (product) => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "http://localhost:8080/api/cart/add",
        {
          userId: parseInt(userId),
          productId: product.id,
          productName: product.title,
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
  useEffect(() => {
    axios.get(`http://localhost:8080/api/products/${id}`)
      .then(response => {
        setProduct(response.data);
        if (response.data.sizes && response.data.sizes.length > 0) {
          setSelectedSize(response.data.sizes[0]);
        }
      })
      .catch(error => console.error("Lỗi khi tải sản phẩm:", error));
    fetchReviews();
  }, [id]);

  // Lấy danh sách review
  const fetchReviews = () => {
    axios.get(`http://localhost:8080/api/reviews/product/${id}`)
      .then(res => setReviews(res.data))
      .catch(err => console.error("Lỗi tải đánh giá:", err));
  };

  // Xử lý chọn file ảnh đánh giá
  const handleFileChange = (e) => {
    setFileReview(e.target.files[0]);
  };
  // Gửi review
  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Bạn phải đăng nhập mới có thể gửi đánh giá");
      return;
    }
    if (!titleReview.trim() || !commentReview.trim()) {
      toast.error("Vui lòng nhập tiêu đề và nội dung đánh giá");
      return;
    }

    let imageUrl = "";

    if (fileReview) {
      try {
        setUploadingImage(true);
        const formData = new FormData();
        formData.append("file", fileReview);
        const res = await axios.post(
          "http://localhost:8080/api/reviews/upload-image",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data"
            }
          }
        );
        imageUrl = res.data.imageUrl;
      } catch (error) {
        toast.error("Upload ảnh thất bại");
        setUploadingImage(false);
        return;
      }
      setUploadingImage(false);
    }

    try {
      await axios.post(
        "http://localhost:8080/api/reviews",
        {
          productId: product.id,
          title: titleReview,
          comment: commentReview,
          rating: ratingReview,
          imageUrl: imageUrl
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      toast.success("Gửi đánh giá thành công");
      setTitleReview("");
      setCommentReview("");
      setRatingReview(5);
      setFileReview(null);
      fetchReviews();
    } catch (error) {
      toast.error("Gửi đánh giá thất bại");
    }
  };

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

  if (!product || !product.images) {
    return <div>Đang tải sản phẩm...</div>;
  }
  return (
    <div className="product-detail-wrapper">
      <div className="product-detail-container">
        <div className="product-image">
          {product.images?.length > 0 ? (
            <>
              <img
                src={product.images[currentIndex]}
                alt={product.title}
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
            </>
          ) : (
            <div>Không có ảnh</div>
          )}
        </div>
        <div className="product-info">
          <h1>{product.title}</h1>
          <p className="brand"><strong>Thương hiệu: </strong> {product.brand}</p>
          <p className="price">
            <strong>Giá tiền:</strong> {product.price?.toLocaleString("vi-VN")}₫
          </p>

          <div className="quantity">
            <button onClick={() => handleQuantityChange(-1)}>-</button>
            <span>{quantity}</span>
            <button onClick={() => handleQuantityChange(1)}>+</button>
          </div>

          <button className="add-to-cart" onClick={() => handleAddToCart(product)}>Thêm vào giỏ hàng</button>

          <div className="shipping-info">
            <p><strong>Miễn phí vận chuyển</strong> cho đơn hàng từ 2 triệu trở lên.</p>
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
        <div className="review-section">
          {!token ? (
            <p style={{ color: "red" }}>Vui lòng đăng nhập để gửi đánh giá.</p>
          ) : (
            <form className="review-form" onSubmit={handleSubmitReview}>
              <div className="star-rating" style={{ fontSize: '24px' }}>
                {[1, 2, 3, 4, 5].map(num => (
                  <span
                    key={num}
                    className={`star ${num <= ratingReview ? "selected" : ""}`}
                    onClick={() => setRatingReview(num)}
                    style={{ cursor: "pointer", color: num <= ratingReview ? "gold" : "#ccc" }}
                  >
                    ★
                  </span>
                ))}
              </div>

              <label>Tiêu Đề Đánh Giá</label>
              <input
                type="text"
                placeholder="Hãy viết tiêu đề của bạn"
                value={titleReview}
                onChange={e => setTitleReview(e.target.value)}
                required
              />

              <label>Bình luận</label>
              <textarea
                placeholder="Viết bình luận của bạn ở đây"
                value={commentReview}
                onChange={e => setCommentReview(e.target.value)}
                required
              />

              <label>Ảnh (Tùy Chọn)</label>
              <input type="file" accept="image/*" onChange={handleFileChange} />

              {uploadingImage && <p>Đang tải ảnh lên...</p>}

              <div className="form-buttons" style={{ marginTop: "10px" }}>
                <button
                  type="button"
                  className="cancel"
                  onClick={() => {
                    setTitleReview("");
                    setCommentReview("");
                    setRatingReview(5);
                    setFileReview(null);
                  }}
                >
                  Hủy đánh giá
                </button>
                <button className="submit" type="submit" disabled={uploadingImage}>
                  Gửi nhận xét
                </button>
              </div>
            </form>
          )}
          <ReviewList reviews={reviews} />
        </div>
      )}
    </div>
  );
};

export default ProductDetail;