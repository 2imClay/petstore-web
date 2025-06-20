import React, { useState } from "react";
import '../../assets/css/register.css';
import '../../utils/validate'
import '@fortawesome/fontawesome-free';
import { validateEmail } from "../../utils/validate";
import { register } from "../../service/authService";
import { notification } from 'antd';
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [api, contextHolder] = notification.useNotification();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        fullname: "",
        username: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: ""
    });
    const [fullNameError, setFullNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [usernameError, setUserNameError] = useState("");
    const [phoneNumberError, setPhoneNumberError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    const validateDate = (name, value) => {
        let isValid = true;
        switch (name) {
            case "fullname":
                if (!value) {
                    setFullNameError("Họ và tên không được để trống");
                    isValid = false;
                } else {
                    setFullNameError("");
                }
                break;
            case "email":
                if (!value) {
                    setEmailError("Email không được để trống");
                    isValid = false;
                } else {
                    if (!validateEmail(value)) {
                        setEmailError("Email không đúng định dạng");
                        isValid = false;
                    } else {
                        setEmailError("");
                    }
                }
                break;

            case "username":
                if (!value) {
                    setUserNameError("Username không được để trống")
                    isValid = false;
                } else {
                    setUserNameError("");
                }
                break;
            case "phoneNumber":
                if (!value) {
                    setPhoneNumberError("Số điện thoại không được để trống");
                    isValid = false;
                } else if (!/^(0\d{9})$/.test(value)) {
                    setPhoneNumberError("Số điện thoại phải bắt đầu bằng số 0 và có 10 chữ số");
                    isValid = false;
                } else {
                    setPhoneNumberError("");
                }
                break;
            case "password":
                if (!value) {
                    setPasswordError("Mật khẩu không được để trống");
                    isValid = false;
                } else {
                    if (value.length < 8) {
                        setPasswordError("Mật khẩu  dài tối thiểu 8 ký tự");
                        isValid = false;
                    } else {
                        setPasswordError("");
                    }
                }
                break;
            case "confirmPassword":
                if (!value) {
                    setConfirmPasswordError("Mật khẩu không được để trống");
                    isValid = false;
                } else {
                    if (value !== user.password) {
                        setConfirmPasswordError("Mật khẩu phải trùng với mật khẩu ở trên.");
                        isValid = false;
                    } else {
                        setConfirmPasswordError("");
                    }
                }
                break;
            default:
                break;
        }
        return isValid;

    }

    //Lấy giá trị từng ô input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });

        validateDate(name, value);

    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        const fullNameValid = validateDate("fullname", user.fullname);
        const userNameValid = validateDate("username", user.username);
        const emailValid = validateDate("email", user.email);
        const phoneNumberValid = validateDate("phoneNumber", user.phoneNumber);
        const passWordValid = validateDate("password", user.password);
        const confirmPasswordValid = validateDate("confirmPassword", user.confirmPassword);
        if (fullNameValid && emailValid && userNameValid && phoneNumberValid && passWordValid && confirmPasswordValid) {

            const userData = { ...user };
            delete userData.confirmPassword;

            try {
                const response = await register(userData);
                if (response.status === 200) {
                    // Chỉ hiển thị thông báo thành công chung chung, không hiển thị dữ liệu trả về
                    api.success({
                        message: "Đăng ký thành công",
                        description: "Bạn đã đăng ký tài khoản thành công.",
                        placement: "top",
                    });
                    setTimeout(() => {
                        navigate("/login");
                    }, 1000);
                }
            } catch (error) {
                let description = "Có lỗi xảy ra";
                if (error.response?.data) {
                    const data = error.response.data;
                    if (typeof data === "string") {
                        description = data;
                    } else if (typeof data === "object") {
                        description = Object.values(data).join(", ");
                    }
                }
                api.error({
                    message: "Đăng ký thất bại. Vui lòng kiểm tra lại thông tin.",
                    description,
                    placement: "top",
                });
            }
        }

    };
    return (
        <div className="wrapper-register">
            {contextHolder}
            <form className="registerForm" onSubmit={handleSubmit} id="register-form">
                <h1>Đăng Ký</h1>
                <div className="group-form">
                    <label htmlFor="fullname">Họ và tên :</label>
                    <input onChange={handleChange}
                        type="text"
                        id="fullName"
                        status={fullNameError ? "error" : ""}
                        name="fullname"
                        required />
                    {fullNameError && (
                        <span className="error-message">{fullNameError}</span>
                    )}
                </div>
                <div className="group-form">
                    <label htmlFor="username">Tên đăng nhập:</label>
                    <input onChange={handleChange}
                        type="text"
                        id="userName"
                        status={usernameError ? "error" : ""}
                        name="username"
                        required />
                    {usernameError && (
                        <span className="error-message">Tên đăng nhập không được trống.</span>
                    )}
                </div>
                <div className="group-form">
                    <label htmlFor="email">Email:</label>
                    <input onChange={handleChange}
                        type="email"
                        id="email"
                        status={emailError ? "error" : ""}
                        name="email"
                        required />
                    {emailError && (
                        <span className="error-message">{emailError}</span>
                    )}
                </div>
                <div className="group-form">
                    <label htmlFor="phoneNumber">Số điện thoại:</label>
                    <input onChange={handleChange}
                        type="number"
                        id="phoneNumber"
                        status={phoneNumberError ? "error" : ""}
                        name="phoneNumber"
                        required />
                    {phoneNumberError && (
                        <span className="error-message">{phoneNumberError}</span>
                    )}
                </div>
                <div className="group-form">
                    <label htmlFor="password">Mật khẩu:</label>
                    <input onChange={handleChange}
                        type="password"
                        id="password"
                        status={passwordError ? "error" : ""}
                        name="password"
                        required />
                    {passwordError && (
                        <span className="error-message">{passwordError}</span>
                    )}
                </div>
                <div className="group-form">
                    <label htmlFor="confirmPassword">Nhập lại mật khẩu:</label>
                    <input onChange={handleChange}
                        type="password"
                        id="confirmPassword"
                        status={confirmPasswordError ? "error" : ""}
                        name="confirmPassword"
                        required />
                    {confirmPasswordError && (
                        <span className="error-message">{confirmPasswordError}</span>
                    )}
                </div>
                <div className="group-form">
                    <button className="button-submit" type="submit">Đăng Ký</button>
                </div>
            </form>
        </div>
    );
}   