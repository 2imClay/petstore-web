import React from "react";
import footerBg from '../../assets/images/footer-bg.jpg';
import paymentImg from '../../assets/images/payment.png';

import { IonIcon } from '@ionic/react';
import { logoFacebook, logoTwitter, logoPinterest, logoInstagram, locationOutline, callOutline, chevronUp } from 'ionicons/icons';

const MainFooter = () => {
  return (
    <>
      <div className="user-wrapper">
        <footer
            className="footer"
            style={{ backgroundImage: `url(${footerBg})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "top",
              backgroundSize: "cover"}}
        >
          <div className="footer-top section">
            <div className="container">

              <div className="footer-brand">
                <a href="/home" className="logo">PetStore</a>
                <p className="footer-text">
                  Liên lạc với chúng tôi nếu có thắc mắc{" "}
                  <a href="" className="link">support@gmail.com</a>
                </p>

                <ul className="contact-list">
                  <li className="contact-item">
                    <IonIcon icon={locationOutline} aria-hidden="true" />
                    <address className="address">
                      1 Đường số 1, phương Linh Trung, Thủ Đức, TP.HCM
                    </address>
                  </li>

                  <li className="contact-item">
                    <IonIcon icon={callOutline} aria-hidden="true" />
                    <a href="" className="contact-link">0123.456.789</a>
                  </li>
                </ul>

                <ul className="social-list">
                  <li><a href="" className="social-link"><IonIcon icon={logoFacebook} /></a></li>
                  <li><a href="" className="social-link"><IonIcon icon={logoTwitter} /></a></li>
                  <li><a href="" className="social-link"><IonIcon icon={logoPinterest} /></a></li>
                  <li><a href="" className="social-link"><IonIcon icon={logoInstagram} /></a></li>
                </ul>
              </div>

              <ul className="footer-list">
                <li><a href="" className="footer-link">Về chúng tôi</a></li>
                <li><a href="" className="footer-link">Liên hệ</a></li>
                <li><a href="" className="footer-link">FAQs</a></li>
              </ul>

              <ul className="footer-list">
                <li><p className="footer-list-title">Thông tin</p></li>
                <li><a href="" className="footer-link">Trang chủ</a></li>
                <li><a href="" className="footer-link">Chính sách bảo mật</a></li>
                <li><a href="" className="footer-link">Chính sách hoàn trả</a></li>
                <li><a href="" className="footer-link">Chính sách giao hàng</a></li>
                <li><a href="" className="footer-link">Điều khoản dịch vụ</a></li>
              </ul>

              <ul className="footer-list">
                <li><p className="footer-list-title">Dịch vụ</p></li>
                <li><a href="" className="footer-link">Dịch vụ thú y</a></li>
                <li><a href="" className="footer-link">Bảo hiểm</a></li>
                <li><a href="" className="footer-link">Nhận nuôi thú cưng</a></li>
              </ul>

            </div>
          </div>

          <div className="footer-bottom"
               style={{ backgroundColor: 'transparent', color: 'white', padding: '15px 0',fontSize: '18px', fontWeight: '600' }}>
            <div className="container">
              <p className="copyright">
                Trường Đại học Nông Lâm TP.HCM
              </p>
              <img
                  src={paymentImg}
                  width="397"
                  height="32"
                  loading="lazy"
                  alt="payment method"
                  className="img"
              />
            </div>
          </div>
        </footer>
      </div>

      <a href="" className="back-top-btn" aria-label="back to top">
        <IonIcon icon={chevronUp} />
      </a>
    </>
  );
};

export default MainFooter;
