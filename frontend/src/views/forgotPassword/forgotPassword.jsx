import React, { useState } from 'react';
import { verifyEmail } from '../../service/forgotService';
import { useNavigate } from 'react-router-dom';
import { notification } from 'antd';
import '../../assets/css/forgot_password.css';
import StepIndicator from '../../views/forgotPassword/stepForgotPassword.jsx'; 

    export default function ForgotPassword() {
        const [email, setEmail] = useState('');
        const navigate = useNavigate();
        const [api, contextHolder] = notification.useNotification();

        const getErrorMessage = (error) => {
        const errorMsg = 
        error.response?.data?.message || 
        error.response?.data || 
        error.message || 
        'Không thể gửi mã OTP.';
        
        return typeof errorMsg === 'string' ? errorMsg : JSON.stringify(errorMsg);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        await verifyEmail(email);
        api.success({ message: 'Mã OTP đã gửi đến email của bạn!' });
        navigate('/verifyOtp', { state: { email } });
        } catch (error) {
        api.error({ 
            message: 'Lỗi', 
            description: getErrorMessage(error) 
        });
        console.error(error);
        }
    };

    return (
        <div id="forgot-password-container">
            <div id="wrapper-forgotPassword">
            {contextHolder}
            <StepIndicator />
            <form onSubmit={handleSubmit} id="form-forgotPassword">
                <h1 className="form-heading">Quên mật khẩu</h1>
                <div className="form-group">
                <input
                    type="email"
                    name="email"
                    className="form-input"
                    placeholder="Nhập email của bạn"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                </div>
                <input type="submit" value="Gửi mã OTP" className="form-submit" />
            </form>
            </div>
        </div>
    );
}