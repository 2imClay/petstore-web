import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { notification } from "antd";
import { jwtDecode } from "jwt-decode";

const OAuth2RedirectHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [api, contextHolder] = notification.useNotification();
  const isMounted = useRef(false);

  // notificationInfo dạng { type, message, description }
  const [notificationInfo, setNotificationInfo] = useState(null);

  useEffect(() => {
    isMounted.current = true;

    const params = new URLSearchParams(location.search);
    const accessToken = params.get("accessToken");
    const refreshToken = params.get("refreshToken");
    const error = params.get("error");

    const handleLogin = async () => {
      if (accessToken) {
        // Lưu cookie token
        Cookies.set("accessToken", accessToken, { expires: 1 });
        Cookies.set("refreshToken", refreshToken, { expires: 7 });

        try {
          const decodedToken = jwtDecode(accessToken);

           // Thông tin user có thể nằm ở các trường như "name", "email", "picture"
          const userDisplayName = decodedToken.fullname || decodedToken.name || "User";
          localStorage.setItem("fullname", userDisplayName);
          console.log("Decoded token:", decodedToken);
          if (isMounted.current) {
            setNotificationInfo({
              type: "success",
              message: "Đăng nhập thành công",
              description: `Chào mừng ${userDisplayName}`,
            });
          }

          // Đợi notification hiện xong rồi chuyển trang
          setTimeout(() => {
            if (isMounted.current) {
              navigate("/home");
            }
          }, 1500);
        } catch (err) {
          console.error("Lỗi khi giải mã token:", err);
          if (isMounted.current) {
            setNotificationInfo({
              type: "error",
              message: "Lỗi token đăng nhập",
              description: err.message,
            });
          }
          navigate("/login");
        }
      } else if (error) {
        if (isMounted.current) {
          setNotificationInfo({
            type: "error",
            message: "Đăng nhập thất bại",
            description: error,
          });
        }
        navigate("/login", { state: { message: error } });
      } else {
        navigate("/login");
      }
    };

    handleLogin();

    return () => {
      isMounted.current = false;
    };
  }, [location, navigate]);

 useEffect(() => {
    if (notificationInfo) {
      api[notificationInfo.type]({
        message: notificationInfo.message,
        description: notificationInfo.description,
        placement: "topRight",
        duration: 3,
      });
      setNotificationInfo(null);
    }
  }, [notificationInfo, api]);
  return (
    <>
      {contextHolder}
      <div>Đang xử lý đăng nhập...</div>
    </>
  );
};

export default OAuth2RedirectHandler;
