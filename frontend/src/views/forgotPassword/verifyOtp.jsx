import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { verifyOtp } from '../../service/forgotService';
import  '../../assets/css/verify.css'
import { notification } from 'antd';
import StepIndicator from '../../views/forgotPassword/stepForgotPassword.jsx'; 

export default function VerifyOtp() {
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || '';
    const [api, contextHolder] = notification.useNotification();

    const handleVerify = async (e) => {
            e.preventDefault();
            try {
            await verifyOtp({ otp, email });
            api.success({ message: 'Xác thực OTP thành công!' });
            navigate('/changePassword', { state: { email } });
            } catch (error) {
            // Lấy thông tin lỗi, convert thành string nếu cần
            let errorMsg = 'Mã OTP không hợp lệ hoặc đã hết hạn';
            if (error.response?.data) {
                if (typeof error.response.data === 'string') {
                errorMsg = error.response.data;
                } else {
                errorMsg = JSON.stringify(error.response.data);
                }
            } else if (error.message) {
                errorMsg = error.message;
            }
            
            api.error({
                message: 'Xác thực thất bại',
                description: errorMsg,
            });
            }
    };

    return (
        <div id = "verify-container">
            <div id="wrapper-verify">
                {contextHolder}
                <StepIndicator />
                <form onSubmit={handleVerify} id="form-verify">
                    <h1 className="form-heading">Nhập mã OTP</h1>
                      <div className="form-group">
                            <input
                                type="number"
                                className="form-input"
                                placeholder="Mã OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                            />
                    </div>
                    <input type="submit" value="Xác thực" className="form-submit" />
                </form>
            </div>
        </div>
    );
}
