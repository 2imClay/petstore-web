import React from 'react';
import { useLocation } from 'react-router-dom';
import '../../assets/css/stepForgot.css'; // CSS riêng cho step

export default function StepIndicator() {
    const location = useLocation();
    const path = location.pathname;

    const steps = [
        { label: "1. Nhập email", path: "/forgot-password" },
        { label: "2. Mã OTP", path: "/verifyOtp" },
        { label: "3. Đổi mật khẩu", path: "/changePassword" }
    ];

    return (
        <div className="step-indicator">
            {steps.map((step, index) => (
                <div
                    key={index}
                    className={`step ${path === step.path ? 'active' : ''}`}
                >
                    {step.label}
                </div>
            ))}
        </div>
    );
}
