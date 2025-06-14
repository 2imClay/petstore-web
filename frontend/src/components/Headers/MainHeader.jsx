import React, { useState, useEffect } from "react";
import { IonIcon } from "@ionic/react";
import "../../assets/css/style.css";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { menuOutline, closeOutline, searchOutline, personOutline, bagHandleOutline } from "ionicons/icons";
import { logout as logoutThunk } from "../../service/authService";
import axios from "axios";

const MainHeader = () => {
  const [fullname, setFullname] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const userId = localStorage.getItem("userId");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Khi component mount hoặc localStorage thay đổi (bạn có thể lắng nghe sự kiện storage)
  useEffect(() => {
    const storedName = localStorage.getItem("fullname");
    setFullname(storedName);

    // Lắng nghe event storage để cập nhật fullname khi localStorage thay đổi ở tab khác
    const handleStorageChange = () => {
      const updatedName = localStorage.getItem("fullname");
      setFullname(updatedName);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  const handleLogout = async () => {
    try {
      await dispatch(logoutThunk());
      navigate("/home", { replace: true }); // Chuyển hướng về trang chủ
      window.location.reload(); // Reload lại trang để reset toàn bộ state (nếu cần)
    } catch (error) {
      console.error("Lỗi khi logout:", error);
    }
  };
  const handleUserClick = () => {
    if (!fullname) {
      window.location.href = "/login";
    } else {
      setShowMenu((prev) => !prev);
    }
  };

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


  return (
    <div className="user-wrapper">
      <header className="header-products" data-header="">
        <div className="container">

          <button className="nav-toggle-btn" data-nav-toggler="">
            <IonIcon icon={menuOutline} className="menu-icon" />
            <IonIcon icon={closeOutline} className="close-icon" />
          </button>

          <a href="/" className="logo" style={{ color: "black" }}>PetStore</a>

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
                <div style={{ marginBottom: 10 }}>Chào, {fullname || "Khách"}</div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  <li style={{ padding: "6px 0", cursor: "pointer" }}>
                    <Link to={userId ? `/profile/${userId}` : "/login"}
                     style={{ textDecoration: "none", color: "inherit" }}>
                      Thông tin khách hàng
                    </Link>
                  </li>
                  <li style={{ padding: "6px 0", cursor: "pointer" }}>Đơn hàng của bạn</li>
                  <li
                    style={{ padding: "6px 0", cursor: "pointer" }}
                    onClick={handleLogout}
                  >
                    Đăng xuất
                  </li>
                </ul>
              </div>
            )}
            <button className="action-btn" aria-label="Cart" onClick={() => window.location.href = "/cart"}>
              <IonIcon icon={bagHandleOutline} aria-hidden="true" />
              <span className="btn-badge">{cartItems.length}</span>
            </button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default MainHeader;