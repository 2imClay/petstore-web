import React from 'react';
import "../../assets/css/payment.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import momo from "../../assets/images/Vi-Momo.jpg"
import vnpay from "../../assets/images/cong-thanh-toan-vnpay-va-cach-tich-hop-vao-website-wordpress.jpg"

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
            <div className="payment-content-left-method-address">
              <p style={{ fontWeight: 'bold' }}>Phương thức giao hàng</p>

              <div className="payment-content-left-method-address-item">
                <input type="radio" name="shipping-method" />
                <label>Giao hàng chuyển phát nhanh</label>
              </div>

              <div className="payment-content-left-method-address-item">
                <input type="radio" name="shipping-method" />
                <label>Giao hàng thường</label>
              </div>

              <div className="payment-content-left-method-payment">
                <p style={{ fontWeight: 'bold' }}>Phương thức thanh toán</p>

                <div className="payment-content-left-method-payment-item">
                  <input type="radio" name="payment-method" />
                  <label>Thanh toán bằng thẻ tín dụng (OnePay)</label>
                </div>

                <div className="payment-content-left-method-payment-item-img">
                  <img
                    src={vnpay}
                    alt="VNPAY"
                    style={{ height: '100px', width: '100px' }}
                  />
                </div>

                <div className="payment-content-left-method-payment-item">
                  <input type="radio" name="payment-method" />
                  <label>Thanh toán bằng Momo</label>
                </div>

                <div className="payment-content-left-method-payment-item-img">
                  <img
                    src={momo}
                    alt="Momo"
                    style={{ height: '100px', width: '100px' }}
                  />
                </div>

                <div className="payment-content-left-method-payment-item">
                  <input type="radio" name="payment-method" />
                  <label>Thanh toán bằng tiền mặt</label>
                </div>
              </div>
            </div>
          </div>

          <div className="payment-content-right">
            <div className="payment-content-right-button">
              <input type="text" placeholder="Mã giảm giá/Quà tặng" />
              <button>
                <i className="fas fa-check"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="payment-content-right-payment">
          <button>TIẾP TỤC THANH TOÁN</button>
        </div>
      </div>
    </section>
  );
};

export default Payment;
