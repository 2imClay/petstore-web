import React, { useState } from "react";
import "../../assets/css/cart.css";
import product6 from '../../assets/images/product-6.jpg';
import product6_0 from '../../assets/images/product-6_0.jpg';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Nước nhỏ mắt cho mèo",
      image: product6,
      quantity: 1,
      price: 400000,
    },
    {
      id: 2,
      name: "Nước nhỏ mắt cho mèo",
      image: product6_0,
      quantity: 1,
      price: 400000,
    },
  ]);

  const handleQuantityChange = (id, value) => {
    if (value < 1) return; // Không cho số lượng nhỏ hơn 1
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: value } : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const getTotalQuantity = () =>
    cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const getTotalPrice = () =>
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const formatCurrency = (value) =>
    value.toLocaleString("vi-VN") + "₫";

  return (
    <section className="cart" style={{ marginTop: "30px" }}>
      <div className="container">
        <div className="cart-top-wrap">
          <div className="cart-top">
            <a href="/cart" className="cart-top-cart cart-top-item">
              <i className="fas fa-shopping-cart"></i>
            </a>
            <a href="/address" className="cart-top-address cart-top-item">
              <i className="fas fa-map-marker-alt"></i>
            </a>
            <a href="/payment" className="cart-top-payment cart-top-item">
              <i className="fa-solid fa-money-check-dollar"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="cart-content row">
          <div className="cart-content-left">
            <table>
              <thead>
                <tr>
                  <th>Sản phẩm</th>
                  <th>Tên Sản Phẩm</th>
                  <th>Số lượng</th>
                  <th>Thành tiền</th>
                  <th>Xóa</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <img
                          src={`${item.image}`}
                          alt={item.name}
                          style={{ width: "100px" }}
                        />
                      </td>
                      <td>{item.name}</td>
                      <td>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(
                              item.id,
                              Number(e.target.value)
                            )
                          }
                        />
                      </td>
                      <td>
                        <p>{formatCurrency(item.price * item.quantity)}</p>
                      </td>
                      <td>
                        <span
                          style={{ cursor: "pointer", color: "red" }}
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          x
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{ textAlign: "center" }}>
                      Giỏ hàng của bạn đang trống.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="cart-content-right">
            <table>
              <thead>
                <tr>
                  <th colSpan="2">TỔNG TIỀN GIỎ HÀNG</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Tổng số lượng</td>
                  <td>{getTotalQuantity()}</td>
                </tr>
                <tr>
                  <td>Tổng tiền hàng</td>
                  <td>
                    <p>{formatCurrency(getTotalPrice())}</p>
                  </td>
                </tr>
                <tr>
                  <td>Tạm tính</td>
                  <td>
                    <p
                      style={{ color: "black", fontWeight: "bold" }}
                    >
                      {formatCurrency(getTotalPrice())}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="cart-content-right-button">
              <button>TIẾP TỤC MUA SẮM</button>
              <button>THANH TOÁN</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
