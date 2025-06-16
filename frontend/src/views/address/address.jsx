import React, { useState, useEffect } from "react";
import "../../assets/css/address.css";


const Address = () => {
  const [cartItems, setCartItems] = useState([]);

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
            <div className="address-content-left-input-top row">
              <div className="address-content-left-input-top-item">
                <label>Họ tên<span style={{ color: "red" }}>*</span></label>
                <input type="text" />
              </div>
              <div className="address-content-left-input-top-item">
                <label>Điện Thoại<span style={{ color: "red" }}>*</span></label>
                <input type="text" />
              </div>
            </div>
            <div className="address-content-left-input-bottom">
              <label>Địa chỉ (Ghi đầy đủ tỉnh, quận, phường...)<span style={{ color: "red" }}>*</span></label>
              <input type="text" />
            </div>
            <div className="address-content-left-button">
              <a href="/cart" className="back-to-cart-btn">
                &#171; Quay lại giỏ hàng
              </a>
              <button>
                THANH TOÁN HÓA ĐƠN
              </button>
            </div>
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
    </section>
  );
};

export default Address;
