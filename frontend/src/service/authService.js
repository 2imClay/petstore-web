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
export const login = createAsyncThunk("/login",async (user) =>{
    const response = await BASE_URL.post("/login",user);
    Cookies.set("token",response.data.token)
    return response.data
});





