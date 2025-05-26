import { createSlice } from "@reduxjs/toolkit";
import { login } from "../../service/authService";
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
        logout:(state)=>{
            Cookies.remove("token");
            state.data = null;
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
    },
});

export const {logout} = authSlice.actions;
export default authSlice.reducer;   