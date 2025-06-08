import axios from 'axios';
import Cookies from "js-cookie";

const USER_API = axios.create({
    baseURL : "http://localhost:8080/api/users",
    headers : { "Content-Type": "application/json" },
});

// Tự động xử lý refresh token nếu 401
USER_API.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = Cookies.get("refreshToken");
        if (!refreshToken) throw new Error("Refresh token không tồn tại");

        const res = await axios.post("http://localhost:8080/api/auth/refresh-token", {
          refreshToken: refreshToken,
        });

        const newToken = res.data.newToken;
        const newRefreshToken = res.data.refreshToken;

        // Lưu lại token mới
        Cookies.set("token", newToken, { expires: 1 });
        Cookies.set("refreshToken", newRefreshToken, { expires: 7 });

        // Gắn token mới vào header và gửi lại request cũ
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return USER_API(originalRequest);
      } catch (refreshError) {
        // Nếu refresh thất bại => redirect về login
        Cookies.remove("token");
        Cookies.remove("refreshToken");
        Cookies.remove("accessToken");
        // window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(err);
  }
);
export default USER_API;