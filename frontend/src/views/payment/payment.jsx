import React from 'react';
import "../../assets/css/payment.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import momo from "../../assets/images/Vi-Momo.jpg";
import paypal from "../../assets/images/images (1).jpg";


const Payment = () => {
  return (
    <section className="payment" style={{ marginTop: '30px' }}>
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
                <label htmlFor="fast">Giao hàng hỏa tốc (30.000đ)</label>
                <input type="radio" name="shipping-method" id="fast" />
              </div>
              <div className="payment-radio">
                <label htmlFor="normal">Giao hàng thường</label>
                <input type="radio" name="shipping-method" id="normal" />
              </div>

              <p className="section-title" style={{ marginTop: "30px" }}>Phương thức thanh toán</p>

              <div className="payment-radio">
                <label htmlFor="vnpay">Thanh toán qua PayPal</label>
                <input type="radio" name="payment-method" id="paypal" />
              </div>
              <img src={paypal} alt="PAYPAL" className="payment-img" />

              <div className="payment-radio">
                <label htmlFor="momo">Thanh toán bằng Momo</label>
                <input type="radio" name="payment-method" id="momo" />
              </div>
              <img src={momo} alt="Momo" className="payment-img" />

              <div className="payment-radio">
                <label htmlFor="cod">Thanh toán khi nhận hàng</label>
                <input type="radio" name="payment-method" id="cod" />
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
              <button>TIẾP TỤC THANH TOÁN</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Payment;