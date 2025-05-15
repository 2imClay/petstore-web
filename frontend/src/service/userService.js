import BASE_URL from "../api/axiosIns";

export const register = (user) =>{
    const response  = BASE_URL.post("/register",user);

    return response;
};