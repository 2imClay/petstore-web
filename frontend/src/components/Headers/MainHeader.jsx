import React from "react";
import { IonIcon } from "@ionic/react";
import "../../assets/css/mainPage.css";
import { menuOutline, closeOutline, searchOutline, personOutline, bagHandleOutline } from "ionicons/icons";

const MainHeader = () => {
  return (
      <div className="user-wrapper">
        <header className="header-products" data-header="">
          <div className="container">

            <button className="nav-toggle-btn" aria-label="toggle menu" data-nav-toggler="">
              <IonIcon icon={menuOutline} className="menu-icon" aria-hidden="true" />
              <IonIcon icon={closeOutline} className="close-icon" aria-label="true" />
            </button>

            <a href="/" className="logo">3B</a>

            <nav className="navbar" data-navbar="">
              <ul className="navbar-list">
                <li className="navbar-item">
                  <a href="/home" className="navbar-link" data-nav-link="">Trang chủ</a>
                </li>
                <li className="navbar-item">
                  <a href="/products" className="navbar-link" data-nav-link="">Cửa hàng</a>
                </li>
                <li className="navbar-item">
                  <a href="/about" className="navbar-link" data-nav-link="">Về chúng tôi</a>
                </li>
                <li className="navbar-item">
                  <a href="/contact" className="navbar-link" data-nav-link="">Liên hệ</a>
                </li>
              </ul>
              <a href="/login" className="navbar-action-btn">Đăng nhập</a>
            </nav>

            <div className="header-actions">
              <button className="action-btn" aria-label="Search" onClick={() => window.location.href = "/"}>
                <IonIcon icon={searchOutline} aria-hidden="true" />
              </button>

              <button className="action-btn user" aria-label="User" onClick={() => window.location.href = "/login"}>
                <IonIcon icon={personOutline} aria-hidden="true" />
              </button>

              <button className="action-btn" aria-label="Cart" onClick={() => window.location.href = "/cart"}>
                <IonIcon icon={bagHandleOutline} aria-hidden="true" />
                <span className="btn-badge">0</span>
              </button>
            </div>
          </div>
        </header>
      </div>
  );
};

export default MainHeader;