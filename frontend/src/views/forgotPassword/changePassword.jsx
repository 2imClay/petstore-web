import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { changePassword } from '../../service/forgotService';
import '../../assets/css/change_password.css'
import { notification } from 'antd';
import StepIndicator from '../../views/forgotPassword/stepForgotPassword.jsx'; 

export default function ResetPassword() {
    const [newPassword, setNewPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [repeatPasswordError, setRepeatPasswordError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || '';
    const [api, contextHolder] = notification.useNotification();


    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (!newPassword) {
            setPasswordError('Vui lòng nhập mật khẩu mới');
            return;
        } else {
            setPasswordError('');
        }

        if (!repeatPassword) {
            setRepeatPasswordError('Vui lòng nhập lại mật khẩu');
            return;
        } else {
            setRepeatPasswordError('');
        }

        if (newPassword !== repeatPassword) {
            setRepeatPasswordError('Mật khẩu không khớp');
            return;
        } else {
            setRepeatPasswordError('');
        }

        try {
            await changePassword({ email, newPassword, repeatPassword });
            api.success({ message: 'Đổi mật khẩu thành công!' });
            navigate('/login');
        } catch (error) {
            let errorMsg = 'Không thể đổi mật khẩu';
            if (error.response?.data) {
                if (typeof error.response.data === 'string') {
                errorMsg = error.response.data;
                } else if (typeof error.response.data === 'object') {
                errorMsg = error.response.data.error || JSON.stringify(error.response.data);
                }
            } else if (error.message) {
                errorMsg = error.message;
            }

            api.error({
                message: 'Lỗi đổi mật khẩu',
                description: errorMsg,
            });
        }
    };


    return (
        <div id="changePass-container">
            <div id="wrapper-change">
                {contextHolder}
                <StepIndicator/>
                <form onSubmit={handleChangePassword} id="form-change">
                    <h1 className="form-heading">Đổi mật khẩu</h1>
                    <div className="form-group">
                            <div className="input-wrapper">
                                <i className="fas fa-lock"></i>
                                <input
                                    type={showNewPassword ? 'text' : 'password'}
                                    className="form-input"
                                    placeholder="Mật khẩu mới"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                                <div id="eye" onClick={() => setShowNewPassword(prev => !prev)} style={{ cursor: 'pointer' }}>
                                    <i className={`fas ${showNewPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                </div>
                            </div>
                            {passwordError && <span className="error-message">{passwordError}</span>}
                    </div>

                    <div className="form-group">
                        <div className="input-wrapper">
                        <i className="fas fa-lock"></i>
                        <input
                            type={showRepeatPassword ? 'text' : 'password'}
                            className="form-input"
                            placeholder="Nhập lại mật khẩu"
                            value={repeatPassword}
                            onChange={(e) => setRepeatPassword(e.target.value)}
                        />
                        <div id="eye" onClick={() => setShowRepeatPassword(prev => !prev)} style={{ cursor: 'pointer' }}>
                            <i className={`fas ${showRepeatPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                        </div>
                        </div>
                        {repeatPasswordError && <span className="error-message">{repeatPasswordError}</span>}
                    </div>
                    <input type="submit" value="Đổi mật khẩu" className="form-submit" />
                </form>
            </div>
        </div>
    );
}
