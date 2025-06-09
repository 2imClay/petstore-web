import { createSlice } from "@reduxjs/toolkit";
import {logout as logoutThunk, login } from "../../service/authService";
import * as status from "../constants/status";
import Cookies from "js-cookie"

const authSlice = createSlice({
    name:"auth",
    initialState:{
        status: status.IDLE,
        data :null,
        error:null,
    },
    reducers:{
        clearAuth:(state)=>{
            Cookies.remove("token");
            Cookies.remove("refreshToken");
            state.data = null;
            state.status = status.IDLE;
            state.error = null;
        },
    },
    extraReducers:(builder) =>{
        builder.addCase(login.pending,(state,action)=>{
            state.status = status.PENDING;
        })
        .addCase(login.fulfilled,(state,action)=>{
            state.status = status.SUCCESSFULLY;
            state.data = action.payload;
        })
        .addCase(login.rejected,(state,action)=>{
             state.status = status.FAILED;
            state.data = action.payload;
        })
        .addCase(logoutThunk.fulfilled, (state) => {
                state.data = null;
                state.status = status.IDLE;
        })
        .addCase(logoutThunk.rejected, (state, action) => {
                state.error = action.payload;
        });
    },
});

export const {clearAuth} = authSlice.actions;
export default authSlice.reducer;   