import React ,{ useState } from "react";
import { IonIcon } from "@ionic/react";
import "../../assets/css/style.css";
import { menuOutline, closeOutline, searchOutline, personOutline, bagHandleOutline } from "ionicons/icons";

const MainHeader = () => {
  const userName = localStorage.getItem("userName"); // hoặc lấy tên user bạn lưu

  const [showMenu, setShowMenu] = useState(false);

  const handleUserClick = () => {
    if (!userName) {
      window.location.href = "/login";
    } else {
      setShowMenu((prev) => !prev);
    }
  };
  return (
      <div className="user-wrapper">
        <header className="header-products" data-header="">
          <div className="container">

            <button className="nav-toggle-btn" data-nav-toggler="">
              <IonIcon icon={menuOutline} className="menu-icon"/>
              <IonIcon icon={closeOutline} className="close-icon" />
            </button>

            <a href="/" className="logo" style={{color:"black"}}>PetStore</a>

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
              {/* <a href="/login" className="navbar-action-btn">Đăng nhập</a> */}
            </nav>

            <div className="header-actions">
              <button className="action-btn" onClick={() => window.location.href = "/"}>
                <IonIcon icon={searchOutline} aria-hidden="true" />
              </button>

              <button
              className="action-btn user"
              aria-label="User"
              onClick={handleUserClick}
              >
              <IonIcon icon={personOutline} aria-hidden="true" />
            </button>

                {showMenu && (
                  <div
                    style={{
                      position: "absolute",
                      top: "110%",
                      right: 0,
                      backgroundColor: "white",
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                      width: "150px",
                      padding: "10px",
                      zIndex: 999,
                      color: "black",
                      userSelect: "none",
                    }}
                  >
                    <div style={{ marginBottom: 10 }}>Chào, {userName || "Khách"}</div>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                      <li style={{ padding: "6px 0", cursor: "pointer" }}>Thông tin khách hàng</li>
                      <li style={{ padding: "6px 0", cursor: "pointer" }}>Đơn hàng của bạn</li>
                      <li
                        style={{ padding: "6px 0", cursor: "pointer" }}
                        onClick={() => {
                          localStorage.removeItem("userName"); // Xóa user khi đăng xuất
                          window.location.href = "/";
                        }}
                      >
                        Đăng xuất
                      </li>
                    </ul>
                  </div>
                )}
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