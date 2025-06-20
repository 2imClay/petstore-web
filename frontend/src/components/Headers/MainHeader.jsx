import React, { useState, useEffect, useContext } from "react";
import { IonIcon } from "@ionic/react";
import "../../assets/css/style.css";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { menuOutline, closeOutline, searchOutline, personOutline, bagHandleOutline } from "ionicons/icons";
import { logout as logoutThunk } from "../../service/authService";
import axios from "axios";
import { CartContext } from "../../contexts/CartContext";

const MainHeader = () => {
  const [fullname, setFullname] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const userId = localStorage.getItem("userId");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);

  const [username, setUsername] = useState(null);
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const fetchSearchResults = async () => {
        if (searchInput.trim() === "") {
          setSearchResults([]);
          return;
        }

        try {
          const response = await axios.get(`http://localhost:8080/api/products/search?keyword=${searchInput}`);
          setSearchResults(response.data);
          console.log("Kết quả tìm kiếm:", response.data);
          setVisibleCount(10); // reset mỗi lần nhập từ mới
        } catch (error) {
          console.error("Lỗi tìm kiếm sản phẩm:", error);
        }
      };

      fetchSearchResults();

    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchInput]);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername);
  }, []);
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

  const { cartCount } = useContext(CartContext);

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
            <div style={{ position: "relative" }}>
              <button className="action-btn" onClick={() => setShowSearch((prev) => !prev)}>
                <IonIcon icon={searchOutline} aria-hidden="true" />
              </button>

              {showSearch && (
                <div style={{
                  position: "absolute",
                  top: "120%",
                  right: "0",
                  backgroundColor: "#fff",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  borderRadius: "6px",
                  padding: "10px",
                  zIndex: 999,
                  width: "350px"
                }}>
                  <input
                    type="text"
                    placeholder="Tìm sản phẩm..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    style={{
                      width: "250px",
                      padding: "6px 10px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                  />

                  {searchResults.length > 0 && (
                    <>
                      <ul style={{
                        listStyle: "none",
                        padding: 0,
                        marginTop: "10px",
                        maxHeight: "200px",
                        overflowY: "auto",
                      }}>
                        {searchResults.slice(0, visibleCount).map((product) => (
                          <li
                            key={product.id}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "10px",
                              padding: "6px 8px",
                              cursor: "pointer",
                              color: "black",
                              borderBottom: "1px solid #eee",
                            }}
                            onClick={() => {
                              navigate(`/products/${product.id}`);
                              setShowSearch(false);
                              setSearchInput("");
                            }}
                            onMouseEnter={(e) => {
                              const titleElement = e.currentTarget.querySelector(".search-title");
                              if (titleElement) titleElement.style.color = "#007bff"; // màu xanh khi hover
                            }}
                            onMouseLeave={(e) => {
                              const titleElement = e.currentTarget.querySelector(".search-title");
                              if (titleElement) titleElement.style.color = "black"; // màu mặc định
                            }}
                          >
                            {product.image && (
                              <img
                                src={product.image || "/placeholder.jpg"}
                                alt={product.title}
                                style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "4px" }}
                              />
                            )}
                            <span className="search-title">{product.title}</span>
                          </li>
                        ))}
                      </ul>
                      {visibleCount < searchResults.length && (
                        <div
                          onClick={() => setVisibleCount((prev) => prev + 10)}
                          style={{
                            padding: "6px 8px",
                            cursor: "pointer",
                            textAlign: "center",
                            color: "#007bff",
                            fontWeight: "bold"
                          }}
                        >
                          Xem thêm...
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>

            <button
              className="action-btn user"
              aria-label="User"
              onClick={handleUserClick}
              style={{position:"relative"}}
            >
              <IonIcon icon={personOutline} aria-hidden="true" />
              {showMenu && (
                  <div
                      style={{
                        position: "absolute",
                        top: "100%",
                        right: "-450%",
                        backgroundColor: "white",
                        border: "1px solid #ccc",
                        borderRadius: "6px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                        width: "500%",
                        padding: "10px",
                        zIndex: 999,
                        color: "black",
                        userSelect: "none",
                      }}
                  >
                    <div style={{ marginBottom: 10 }}>Chào, {fullname || "Khách"}</div>
                    <hr/>
                    <ul style={{ listStyle: "none", padding: "2px", margin: 0 }}>
                      <li style={{ padding: "6px 0", cursor: "pointer"}}>
                        <Link to={userId ? `/profile/${userId}` : "/login"}
                              style={{ textDecoration: "none", color: "inherit" }}>
                          Thông tin khách hàng
                        </Link>
                      </li>
                      <li style={{ padding: "6px 0", cursor: "pointer"}}>
                        <Link to={userId ? `/orders/${userId}` : "/login"}
                              style={{ textDecoration: "none", color: "inherit" }}>
                          Đơn hàng của tôi
                        </Link>
                      </li>
                      {username && (
                          <li style={{ padding: "6px 0", cursor: "pointer"}}>
                            <Link to="/change-password"
                                  style={{ textDecoration: "none", color: "inherit" }}>
                              Đổi mật khẩu
                            </Link>
                          </li>
                      )}
                      <hr/>
                      <li
                          style={{ padding: "6px 0", cursor: "pointer"}}
                          onClick={handleLogout}
                      >
                        Đăng xuất
                      </li>
                    </ul>
                  </div>
              )}
            </button>


            <button
              className="action-btn"
              aria-label="Cart"
              onClick={() => window.location.href = "/cart"}
            >
              <IonIcon
                icon={bagHandleOutline}
                aria-hidden="true"
              />
              <span
                className="btn-badge"
              >{cartCount}</span>

            </button>
          </div>
        </div>
      </header >
    </div >
  );
};

export default MainHeader;