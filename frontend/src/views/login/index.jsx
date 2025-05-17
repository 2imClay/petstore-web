import React from "react";
import '../../assets/css/login.css';
import "@fortawesome/fontawesome-free";

export default function Login(){
    return (
        <div id="wrapper">
            <form action="" id="form-login">
                <h1 class="form-heading">Đăng Nhập</h1>
                <div class="form-group">
                    <i class="far fa-user"></i>
                    <input type="text" class="form-input" placeholder="Tên đăng nhập"/>
                </div>
                <div class="form-group">
                    <i class="fas fa-key"></i>
                    <input type="password" class="form-input" placeholder="Mật khẩu"/>
                    <div id="eye"><i class="fas fa-eye"></i></div>
                </div>
                <div class="forgot">
                    <p>Quên mật khẩu?</p>
                </div>
                <div class="social-login">
                    <p class="social-login-text">Đăng nhập với</p>
                    <div class="social-buttons">
                        <button type="button" class="btn-facebook">
                            <i class="fab fa-facebook-f"></i> Facebook
                        </button>
                        <button type="button" class="btn-google">
                            <i class="fab fa-google"></i> Google
                        </button>
                    </div>
                </div>
                <input type="submit" value="Đăng nhập" class="form-submit"/>
                 <p style={{ textAlign: 'center' }}>Bạn chưa có tài khoản?<a href="/register"> Đăng ký</a></p>
            </form>
        </div>
    
    );
}