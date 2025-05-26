import React, { useState } from 'react';
import "../../assets/style.css";
// import { ... } from '@ionic/react';

function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => setIsNavOpen(!isNavOpen);

  return (
    <header className="header" data-header>
      <div className="container">
        <button
          className="nav-toggle-btn"
          aria-label="toggle menu"
          data-nav-toggler
          onClick={toggleNav}
        >
          <ion-icon
            name={isNavOpen ? "close-outline" : "menu-outline"}
            aria-hidden="true"
            class={isNavOpen ? "close-icon" : "menu-icon"}
          ></ion-icon>
        </button>

        <a href="#" className="logo">
          PetStore
        </a>

        <nav className={`navbar ${isNavOpen ? 'active' : ''}`} data-navbar>
          <ul className="navbar-list">
            <li className="navbar-item">
              <a href="index.html" className="navbar-link" data-nav-link>
                Trang chủ
              </a>
            </li>
            <li className="navbar-item">
              <a href="products.html" className="navbar-link" data-nav-link>
                Sản phẩm
              </a>
            </li>
            <li className="navbar-item">
              <a href="#" className="navbar-link" data-nav-link>
                Về chúng tôi
              </a>
            </li>
            <li className="navbar-item">
              <a href="#" className="navbar-link" data-nav-link>
                Liên hệ
              </a>
            </li>
          </ul>

          <a href="login.html" className="navbar-action-btn">
            Đăng nhập
          </a>
        </nav>

        <div className="header-actions">
          <button
            className="action-btn"
            aria-label="Search"
            onClick={() => window.location.href = ''}
          >
            <ion-icon name="search-outline" aria-hidden="true"></ion-icon>
          </button>

          <button
            className="action-btn user"
            aria-label="User"
            onClick={() => window.location.href = 'login.html'}
          >
            <ion-icon name="person-outline" aria-hidden="true"></ion-icon>
          </button>

          <button
            className="action-btn"
            aria-label="cart"
            onClick={() => window.location.href = 'cart.html'}
          >
            <ion-icon name="bag-handle-outline" aria-hidden="true"></ion-icon>
            <span className="btn-badge">0</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;