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
    const { token, refreshToken,fullname  } = response.data;


    // Lưu vào cookie
    Cookies.set("token", token, { expires: 1 });
    Cookies.set("refreshToken", refreshToken, { expires: 7 });

     // Lưu fullname vào localStorage
    localStorage.setItem("fullname", fullname);

    return response.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || "Lỗi đăng nhập");
  }
});





