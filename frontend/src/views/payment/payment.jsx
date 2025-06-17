import React, { useState, useEffect } from "react";
import "../../assets/css/payment.css";
import "bootstrap/dist/css/bootstrap.min.css";
import momo from "../../assets/images/Vi-Momo.jpg";
import paypal from "../../assets/images/images (1).jpg";

const Payment = () => {
  const userId = localStorage.getItem("userId");
  const [shippingInfo, setShippingInfo] = useState(null);
  const [shippingMethod, setShippingMethod] = useState("normal");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const storedInfo = localStorage.getItem("shippingInfo");
    if (storedInfo) {
      setShippingInfo(JSON.parse(storedInfo));
    }
  }, []);
  const handlePayment = async () => {
    if (!shippingInfo) {
      alert("Vui lòng nhập địa chỉ giao hàng.");
      return;
    }

    const orderData = {
      userId: userId,
      address: shippingInfo.address,
      phone: shippingInfo.phone,
      note: shippingInfo.note || "",
      paymentMethod: paymentMethod,
      paymentStatus: "Chưa thanh toán",
      shippingMethod: shippingMethod,
      discount: 0,
      totalMoney: shippingInfo.totalMoney || 0,
      statusId: 1,
      items: shippingInfo.cartItems.map(item => ({
        productId: item.productId,
        price: item.price,
        quantity: item.quantity
      }))
    };
    console.log("orderData gửi lên:", orderData);
    console.log("paymentMethod:", paymentMethod);


    try {
      const response = await fetch("http://localhost:8080/api/orders/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        setSuccess(true);
        const data = await response.json();
        console.log("Order success:", data);

        // Lưu thông tin order vào localStorage
        localStorage.setItem("lastOrder", JSON.stringify(data));

        // Xóa giỏ hàng
        localStorage.removeItem("cartItems");
        localStorage.removeItem("shippingInfo");


        // Xóa giỏ hàng SERVER (backend)
        try {
          await fetch(`http://localhost:8080/api/cart/clear/${userId}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json"
            }
          });
          console.log("Đã clear cart ở server");
        } catch (err) {
          console.error("Lỗi khi clear cart ở server:", err);
        }

        // Chuyển về trang chủ
        setTimeout(() => {
          window.location.href = "/home";
        }, 2000);
      } else {
        console.error("Failed to place order");
        alert("Thanh toán thất bại, vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Có lỗi xảy ra khi đặt hàng.");
    }
  };
  return (
    <>
      {/* Phần form thanh toán của bạn */}

      {success && (
        <div className="payment-success-popup">
          <p>🎉 Thanh toán thành công! Đang chuyển về trang chủ...</p>
        </div>
      )}

      <section className="payment" style={{ marginTop: "30px" }}>
        <div className="container">
          <div className="payment-top-wrap">
            <div className="payment-top">
              <a href="/cart" className="payment-top-cart payment-top-item">
                <i className="fas fa-shopping-cart"></i>
              </a>
              <a href="/address" className="payment-top-address payment-top-item">
                <i className="fas fa-map-marker-alt"></i>
              </a>
              <a href="/payment" className="payment-top-payment payment-top-item">
                <i className="fa-solid fa-money-check-dollar"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="payment-content row">
            <div className="payment-content-left">
              <div className="payment-content-box">
                <p className="section-title">Phương thức giao hàng</p>
                <div className="payment-radio">
                  <label htmlFor="fast">Giao hàng hỏa tốc (50.000đ)</label>
                  <input
                    type="radio"
                    name="shipping-method"
                    id="fast"
                    value="fast"
                    checked={shippingMethod === "fast"}
                    onChange={(e) => setShippingMethod(e.target.value)}
                  />
                </div>
                <div className="payment-radio">
                  <label htmlFor="normal">Giao hàng thường (20.000đ)</label>
                  <input
                    type="radio"
                    name="shipping-method"
                    id="normal"
                    value="normal"
                    checked={shippingMethod === "normal"}
                    onChange={(e) => setShippingMethod(e.target.value)}
                  />
                </div>

                <p className="section-title" style={{ marginTop: "30px" }}>
                  Phương thức thanh toán
                </p>

                <div className="payment-radio">
                  <label htmlFor="paypal">Thanh toán qua PayPal</label>
                  <input
                    type="radio"
                    name="payment-method"
                    id="paypal"
                    value="paypal"
                    checked={paymentMethod === "paypal"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                </div>
                <img src={paypal} alt="PAYPAL" className="payment-img" />

                <div className="payment-radio">
                  <label htmlFor="momo">Thanh toán bằng Momo</label>
                  <input
                    type="radio"
                    name="payment-method"
                    id="momo"
                    value="momo"
                    checked={paymentMethod === "momo"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                </div>
                <img src={momo} alt="Momo" className="payment-img" />

                <div className="payment-radio">
                  <label htmlFor="cod">Thanh toán khi nhận hàng</label>
                  <input
                    type="radio"
                    name="payment-method"
                    id="cod"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="payment-content-right">
              <div className="payment-content-right-button">
                <input type="text" placeholder="Mã giảm giá / Quà tặng" />
                <button>
                  <i className="fas fa-check"></i>
                </button>
              </div>

              <div className="payment-content-right-payment">
                <button onClick={handlePayment}>ĐẶT HÀNG</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Payment;
