import BASE_URL from "../api/axiosIns";

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
export const login = async (user)=>{
    const response = await BASE_URL.post("/login",user);
    return response;
}