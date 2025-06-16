import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import MainFooter from "../../components/Footers/MainFooter.jsx";
import MainHeader from "../../components/Headers/MainHeader.jsx";
import "../../assets/css/profile.css";
import "../../assets/css/change-password.css";

const LayoutProfile = () => {
  const location = useLocation();
  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("username");

  return (
    <>
      <MainHeader />
      <div className="profile-wrapper">
        <div className="container-left">
          <Link
            to={`/profile/${userId}`}
            className={`profile-menu-item ${location.pathname === `/profile/${userId}` ? "active" : ""}`}
          >
            Thông tin cá nhân
          </Link>
          <Link
            to={`/orders/${userId}`}
            className={`profile-menu-item ${location.pathname === `/orders/${userId}` ? "active" : ""}`}
          >
            Đơn hàng của bạn
          </Link>
          {username && (
            <Link
              to={`/change-password`}
              className={`profile-menu-item ${location.pathname === `/change-password` ? "active" : ""}`}
            >
              Đổi mật khẩu
            </Link>
          )}
        </div>

        <div className="container-right">
          <Outlet />
        </div>
      </div>
      <MainFooter />
    </>
  );
};

export default LayoutProfile;