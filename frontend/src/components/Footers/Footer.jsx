import React from 'react';
import "../../assets/style.css";

function Footer() {
  return (
    <footer
      className="footer"
      style={{ backgroundImage: "url('../static/assets/images/footer-bg.jpg')" }}
    >
      <div className="footer-top section">
        <div className="container">
          <div className="footer-brand">
            <a href="#" className="logo">PetStore</a>

            <p className="footer-text">
              Liên lạc với chúng tôi nếu có thắc mắc{' '}
              <a href="mailto:support@gmail.com" className="link">support@gmail.com</a>
            </p>

            <ul className="contact-list">
              <li className="contact-item">
                <ion-icon name="location-outline" aria-hidden="true"></ion-icon>
                <address className="address">
                  1 Đường số 1, phương Linh Trung, Thủ Đức, TP.HCM
                </address>
              </li>

              <li className="contact-item">
                <ion-icon name="call-outline" aria-hidden="true"></ion-icon>
                <a href="tel:+16234567891011" className="contact-link">0123.456.789</a>
              </li>
            </ul>

            <ul className="social-list">
              <li>
                <a href="#" className="social-link">
                  <ion-icon name="logo-facebook"></ion-icon>
                </a>
              </li>
              <li>
                <a href="#" className="social-link">
                  <ion-icon name="logo-twitter"></ion-icon>
                </a>
              </li>
              <li>
                <a href="#" className="social-link">
                  <ion-icon name="logo-pinterest"></ion-icon>
                </a>
              </li>
              <li>
                <a href="#" className="social-link">
                  <ion-icon name="logo-instagram"></ion-icon>
                </a>
              </li>
            </ul>
          </div>

          <ul className="footer-list">
            <li><a href="#" className="footer-link">Về chúng tôi</a></li>
            <li><a href="#" className="footer-link">Liên hệ</a></li>
            <li><a href="#" className="footer-link">FAQs</a></li>
          </ul>

          <ul className="footer-list">
            <li><p className="footer-list-title">Thông tin</p></li>
            <li><a href="#" className="footer-link">Trang chủ</a></li>
            <li><a href="#" className="footer-link">Chính sách bảo mật</a></li>
            <li><a href="#" className="footer-link">Chính sách hoàn trả</a></li>
            <li><a href="#" className="footer-link">Chính sách giao hàng</a></li>
            <li><a href="#" className="footer-link">Điều khoản dịch vụ</a></li>
          </ul>

          <ul className="footer-list">
            <li><p className="footer-list-title">Dịch vụ</p></li>
            <li><a href="#" className="footer-link">Dịch vụ thú y</a></li>
            <li><a href="#" className="footer-link">Bảo hiểm</a></li>
            <li><a href="#" className="footer-link">Nhận nuôi thú cưng</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p className="copyright">Trường Đại học Nông Lâm TP.HCM</p>

          <img
            src="../static/assets/images/payment.png"
            width="397"
            height="32"
            loading="lazy"
            alt="payment method"
            className="img"
          />
        </div>
      </div>

      <a href="#top" className="back-top-btn" aria-label="back to top" data-back-top-btn>
        <ion-icon name="chevron-up" aria-hidden="true"></ion-icon>
      </a>
    </footer>
  );
}

export default Footer;