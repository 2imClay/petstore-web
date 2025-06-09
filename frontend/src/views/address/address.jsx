import React from "react";
import "../../assets/css/address.css";


const Address = () => {
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
              <div className="address-content-left-input-top-item">
                <label>Tỉnh/TP<span style={{ color: "red" }}>*</span></label>
                <input type="text" />
              </div>
              <div className="address-content-left-input-top-item">
                <label>Quận/Huyện<span style={{ color: "red" }}>*</span></label>
                <input type="text" />
              </div>
            </div>
            <div className="address-content-left-input-bottom">
              <label>Địa chỉ<span style={{ color: "red"}}>*</span></label>
              <input type="text" />
            </div>
            <div className="address-content-left-button row">
              <a href="/cart" className="back-to-cart-btn">
                <span>&#171;<p> Quay lại giỏ hàng</p></span> 
              </a>
              <button>
                <p style={{ fontWeight: "bold" }}>THANH TOÁN HÓA ĐƠN</p>
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
                <tr>
                  <td>Thức ăn cho mèo(hạt)</td>
                  <td>20%</td>
                  <td>3</td>
                  <td><p>400.000<sup>đ</sup></p></td>
                </tr>
                <tr>
                  <td>Vòng cổ cho mèo</td>
                  <td>10%</td>
                  <td>2</td>
                  <td><p>200.000<sup>đ</sup></p></td>
                </tr>
                <tr>
                  <td colSpan="3" style={{ fontWeight: "bold" }}>Tổng</td>
                  <td style={{ fontWeight: "bold" }}><p>600.000<sup>đ</sup></p></td>
                </tr>
                <tr>
                  <td colSpan="3" style={{ fontWeight: "bold" }}>Tổng Tiền Hàng</td>
                  <td style={{ fontWeight: "bold" }}><p>600.000<sup>đ</sup></p></td>
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
