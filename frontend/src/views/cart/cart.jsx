import React, {useContext, useEffect, useState} from "react";
import "../../assets/css/cart.css";
import axios from "axios";
import {CartContext} from "../../contexts/CartContext";
import {toast} from "react-toastify";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(`http://localhost:8080/api/cart/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCartItems(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy giỏ hàng:", error);
      }
    };


    fetchCart();
  }, []);

  const { fetchCartCount } = useContext(CartContext);
  const handleQuantityChange = async (productId, value) => {
    if (value < 1) return;

    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    try {
      await axios.put(
        `http://localhost:8080/api/cart/updateQuantity`,
        {
          userId: Number(userId),
          productId,
          quantity: value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchCartCount();

      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.productId === productId ? { ...item, quantity: value } : item
        )
      );
    } catch (error) {
      console.error("Lỗi cập nhật số lượng:", error);
    }
  };


  const handleRemoveItem = async (productId) => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    try {
      // Gọi API xóa sản phẩm khỏi giỏ hàng
      await axios.delete(`http://localhost:8080/api/cart/remove`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          userId: Number(userId),
          productId: productId,
        },
      });

      setCartItems((prevItems) =>
        prevItems.filter((item) => item.productId !== productId)
      );
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm khỏi giỏ hàng:", error);
    }
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
                  cartItems.map((item) => {
                    // console.log(item);
                    return (
                      <tr key={item.productId}>
                        <td>
                          <img
                            src={item.image}
                            alt={item.productName}
                            style={{ width: "100px" }}
                          />
                        </td>
                        <td><a href={`/products/${item.productId}`}>{item.productName}</a></td>
                        <td>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) =>
                              handleQuantityChange(
                                item.productId,
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
                            onClick={() => handleRemoveItem(item.productId)}
                          >
                            x
                          </span>
                        </td>
                      </tr>
                    )
                  }
                  )
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
              <button onClick={() => window.location.href = '/products'} style={{ color: 'black' }}>TIẾP TỤC MUA SẮM</button>
              <button
                onClick={() => {
                  if (getTotalQuantity()>0) {
                    localStorage.setItem("cartItems", JSON.stringify(cartItems));
                    window.location.href = "/address";
                  } else {
                    toast.error("Vui lòng thêm sản phẩm vào giỏ hàng")
                  }
                }}
              >
                TIẾP TỤC ĐẶT HÀNG
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
