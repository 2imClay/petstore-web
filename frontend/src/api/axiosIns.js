import axios from 'axios'
import Cookies from 'js-cookie';

const BASE_URL = axios.create({
    baseURL : "http://localhost:8080/api/auth",
    headers : {
        "Content-Type":"application/json",
    },
});
// Ví dụ trong component xử lý /oauth2/redirect
const params = new URLSearchParams(window.location.search);
const accessToken = params.get("accessToken");
if (accessToken) {
  Cookies.set("accessToken", accessToken, { expires: 1, path: "/" });
}
// Gửi token kèm theo mỗi request nếu có
BASE_URL.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Tự động xử lý refresh token nếu 401
BASE_URL.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    if (
      err.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== "/refresh-token"
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = Cookies.get("refreshToken");
        if (!refreshToken) {
            throw new Error("Refresh token không tồn tại");
        }

        const res = await axios.post(
          "http://localhost:8080/api/auth/refresh-token",
          { refreshToken }
        );

        const { newToken, refreshToken: newRefreshToken } = res.data;

<<<<<<< HEAD
        // Lưu lại token mới
        Cookies.set("accessToken", newToken, { expires: 1 });
        Cookies.set("refreshToken", newRefreshToken, { expires: 7 });

          // Gắn token mới vào header và gửi lại request cũ
=======
        Cookies.set("token", newToken, { expires: 1, path: "/" });
        Cookies.set("refreshToken", newRefreshToken, { expires: 7, path: "/" });

>>>>>>> extra
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return BASE_URL(originalRequest);
      } catch (refreshError) {
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
export default BASE_URL;