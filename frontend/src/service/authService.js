import { createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../api/axiosIns";
import Cookies from "js-cookie"

/**
 * 
 * @param {*} user 
 * @returns 
 */
export const register = async (user) =>{
    const response  = await BASE_URL.post("/register",user);
    return response;
};

/**
 * 
 * @param {*} user 
 * @returns 
 */
// export const login = createAsyncThunk("/login",async (user) =>{
//     const response = await BASE_URL.post("/login",user);
//     Cookies.set("token",response.data.token)
//     return response.data
// });
export const login = createAsyncThunk("auth/login", async (user, { rejectWithValue }) => {
  try {
    const response = await BASE_URL.post("/login", user);
    const { token, refreshToken,fullname,userId,username } = response.data;


    // Lưu vào cookie
    Cookies.set("token", token, { expires: 1, path: "/" });
    Cookies.set("refreshToken", refreshToken, { expires: 7 ,path: "/" });

      // Lưu fullname vào localStorage nếu có
    if (fullname) {
      localStorage.setItem("fullname", fullname);
    }
    // Lưu id vào localStorage nếu có
    if (userId) {
      localStorage.setItem("userId", userId);
    }
    // Lưu username vào localStorage nếu có
    if (username) {
      localStorage.setItem("username", username);
    }

    return response.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || "Lỗi đăng nhập");
  }
});

export const logout = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) =>{
   try {
     const refreshToken = Cookies.get("refreshToken"); // lấy refreshToken từ Cookie
     if (!refreshToken) return rejectWithValue("Không tìm thấy refresh token");
     console.log("RefreshTokeRefreshToke",refreshToken);

    const response = await BASE_URL.post("/logout", { refreshToken });

    // Xoá cookies và localStorage
    Cookies.remove("token");
    Cookies.remove("refreshToken");
    Cookies.remove("accessToken");
    // Xoá fullname và userId từ localStorage
    localStorage.removeItem("fullname");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");

    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Lỗi khi logout");
  }
});




