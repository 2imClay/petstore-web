import React, { useState } from "react";
import '../../assets/css/login.css';
import "@fortawesome/fontawesome-free";
import { login } from "../../service/authService";
import { notification } from 'antd';
import { useNavigate } from "react-router-dom";

export default function Login(){
    const [api,contextHolder] = notification.useNotification();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: "",
        password:""

    });

    const [usernameError, setUserNameError] = useState("");
    const [passwordError,setPasswordError] = useState("");
    const [errorServer,setErrorServer] = useState(false);
    const validateData = (name,value) =>{
        let isValid = true;
        switch(name){
            case "username":
                if(!value){
                    setUserNameError("Username không được để trống")
                    isValid = false;
                }else{
                    setUserNameError("");
                }
                break;
            case "password":
                if(!value){
                    setPasswordError("Mật khẩu không được để trống");
                    isValid=false;
                }else{                
                    setPasswordError("");
                }
                break;
            default:
                break;
        }
        return isValid;

    };
     //Lấy giá trị từng ô input
    const handleChange=(e)=>{
        const {name,value} = e.target;
        setUser({
            ...user,
            [name]:value,
        })
        validateData(name,value);

    };
     const handleSubmit = async (e) =>{
        e.preventDefault();
        const userNameValid = validateData("username", user.username);
        const passWordValid = validateData("password", user.password);

       if (userNameValid&&passWordValid){
           
           
           try{
               const  response = await login(user);
               setErrorServer(null);
               console.log(response.data)
               if(response.status === 200){
                //Chuyển hướng về trang login
                const role = response.data.role?.toUpperCase();
                    api.success({
                        message: "Đăng nhập thành công",
                        description: typeof response.data.message === 'string' 
                            ? response.data.message 
                            : "Bạn đã đăng nhập thành công!",
                        placement: "top",
                      
                    });
                    setTimeout(()=>{
                        if (role === "ADMIN") {
                        navigate("/admin");
                        } else {
                            navigate("/home");
                        }
                    },1000);
               }
               
            }catch(error){
                console.log("error",error);
                const responseError = error?.response?.data?.error||"Tên đăng nhập hoặc mật khẩu không đúng.";
                setErrorServer(responseError);
                
                // api.error({
                //     message:"Đăng ký thất bại.Vui lòng kiểm tra lại thông tin.",
                //     description: error.response?.data||"Có lỗi xảy ra",
                //     placement:"top"

                // });
                
            }
        }
    };
    return (
        <div id="wrapper">
            {contextHolder}
            <form onSubmit={handleSubmit} id="form-login">
                <h1 className="form-heading">Đăng Nhập</h1>
                <div className="form-group">
                    <div className="input-wrapper">
                        <i className="far fa-user"></i>
                        <input type="text" 
                        className="form-input"
                        onChange={handleChange}
                        status = {usernameError ? "error":""}
                        name="username" 
                        placeholder="Tên đăng nhập"/>
                    </div>
                        {usernameError &&(
                            <span className="error-message">{usernameError}</span>
                        )}
                    
                </div>
                <div className="form-group">
                    <div className="input-wrapper">
                        <i className="fas fa-key"></i>
                        <input type="password" 
                            className="form-input" 
                            onChange={handleChange}
                            name="password" 
                            status = {passwordError ? "error":""}
                            placeholder="Mật khẩu"/>
                        <div id="eye"><i className="fas fa-eye"></i></div>
                    </div>
                        {passwordError && (
                            <span className="error-message">{passwordError}</span>
                        )}
                    
                </div>
                <div className="forgot">
                    <p>Quên mật khẩu?</p>
                </div>
                {errorServer && (
                    <div className="login-error-message">
                        {errorServer}
                    </div>
                )}
                <div className="social-login">
                    <p className="social-login-text">Đăng nhập với</p>
                    <div className="social-buttons">
                        <button type="button" className="btn-facebook">
                            <i className="fab fa-facebook-f"></i> Facebook
                        </button>
                        <button type="button" className="btn-google">
                            <i className="fab fa-google"></i> Google
                        </button>
                    </div>
                </div>
                <input type="submit" value="Đăng nhập" className="form-submit"/>
                 <p style={{ textAlign: 'center' }}>Bạn chưa có tài khoản ?<a href="/register"> Đăng ký</a></p>
            </form>
        </div>
    );
}