import React, { useState, useEffect } from "react";
import "../../assets/css/address.css";


const Address = () => {
  const userId = localStorage.getItem("userId");
  const [cartItems, setCartItems] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");


   const handleSubmit = (e) => {
    e.preventDefault(); // Ngăn form reload trang

    // Dùng form validation mặc định của browser
    if (!e.target.checkValidity()) {
      // Nếu form không hợp lệ, trình duyệt sẽ tự hiện báo lỗi
      e.target.reportValidity();
      return;
    }

    // Nếu hợp lệ thì tiếp tục
    const shippingInfo = {
      phone,
      address,
      note,
      cartItems,
    };
    localStorage.setItem("shippingInfo", JSON.stringify(shippingInfo));
    window.location.href = "/payment";
  };
  // Lấy user info từ API
  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:8080/api/users/${userId}/name`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch user info");
          }
          return response.json();
        })
        .then((data) => {
          setName(data.name || "");
        })
        .catch((error) => {
          console.error("Error fetching user info:", error);
        });
    }
  }, [userId]);
  useEffect(() => {
    const storedItems = localStorage.getItem("cartItems");
    if (storedItems) {
      setCartItems(JSON.parse(storedItems));
    }
  }, []);

  return (
    <section className="address" style={{ marginTop: "30px" }}>
      <div className="container">
        <div className="address-top-wrap">
          <div className="address-top">
            <a href="/cart" className="address-top-cart address-top-item">
              <i className="fas fa-shopping-cart"></i>
            </a>
            <a href="/address" className="address-top-address address-top-item">
              <i className="fas fa-map-marker-alt"></i>
            </a>
            <a href="/payment" className="address-top-payment address-top-item">
              <i className="fa-solid fa-money-check-dollar"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="address-content row">
          <div className="address-content-left">
            <p>Vui lòng chọn địa chỉ giao hàng</p>
            <form onSubmit={handleSubmit} noValidate>
              <div className="address-content-left-input-top row">
                <div className="address-content-left-input-top-item">
                  <label>Họ tên</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div className="address-content-left-input-top-item">
                  <label>Điện Thoại<span style={{ color: "red" }}>*</span></label>
                  <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </div>
              </div>
              <div className="address-content-left-input-bottom">
                <label>Địa chỉ (Ghi đầy đủ tỉnh, quận, phường...)<span style={{ color: "red" }}>*</span></label>
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
              </div>
              <div className="address-content-left-input-bottom">
                <label>
                  Ghi chú đơn hàng (tuỳ chọn)
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Ví dụ: Giao sau 6h, gọi trước khi giao..."
                  style={{ width: "100%", height: "80px", marginTop: "10px", padding: "8px" }}
                ></textarea>
              </div>
              <div className="address-content-left-button">
                <a href="/cart" className="back-to-cart-btn">
                  &#171; Quay lại giỏ hàng
                </a>
                <button type="submit">
                  TIẾP TỤC ĐẶT HÀNG
                </button>
              </div>
            </form>
          </div>

          <div className="address-content-right">
            <table>
              <thead>
                <tr>
                  <th>Tên Sản Phẩm</th>
                  <th>Giảm giá</th>
                  <th>Số lượng</th>
                  <th>Thành Tiền</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.productId}>
                    <td>{item.productName}</td>
                    <td>0%</td> {/* Nếu có giảm giá bạn có thể thay thế động */}
                    <td>{item.quantity}</td>
                    <td><p>{(item.price * item.quantity).toLocaleString("vi-VN")}<sup>đ</sup></p></td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="3" style={{ fontWeight: "bold" }}>Tổng</td>
                  <td style={{ fontWeight: "bold" }}>
                    <p>
                      {cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toLocaleString("vi-VN")}
                      <sup>đ</sup>
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section >
  );
};

export default Address;
