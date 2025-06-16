import React, { useState } from "react";
import USER_API from "../../api/axiosUser";
import { FaEye, FaEyeSlash } from "react-icons/fa";




const ChangePasswordUser = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Các state điều khiển hiển thị mật khẩu
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChangePassword = async () => {
    setMessage("");
    setError("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Mật khẩu mới không khớp.");
      return;
    }

    try {
      const res = await USER_API.put("/change-password", {
        currentPassword,
        newPassword,
      });

      setMessage(res.data || "Đổi mật khẩu thành công.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err.response?.data || "Đã xảy ra lỗi.");
    }
  };

  return (
    <div className="change-password-form">
      <h2>Đổi mật khẩu</h2>

      {error && <div className="error-message">{error}</div>}
      {message && <div className="success-message">{message}</div>}

      {/* Current Password */}
      <div className="password-input-wrapper">
        <input
          type={showCurrent ? "text" : "password"}
          placeholder="Mật khẩu hiện tại"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <span onClick={() => setShowCurrent(!showCurrent)} className="toggle-eye">
          {showCurrent ? <FaEye /> : <FaEyeSlash />}
        </span>
      </div>

      {/* New Password */}
      <div className="password-input-wrapper">
        <input
          type={showNew ? "text" : "password"}
          placeholder="Mật khẩu mới"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <span onClick={() => setShowNew(!showNew)} className="toggle-eye">
          {showNew ? <FaEye /> : <FaEyeSlash />}
        </span>
      </div>

      {/* Confirm Password */}
      <div className="password-input-wrapper">
        <input
          type={showConfirm ? "text" : "password"}
          placeholder="Xác nhận mật khẩu mới"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <span onClick={() => setShowConfirm(!showConfirm)} className="toggle-eye">
          {showConfirm ? <FaEye /> : <FaEyeSlash />}
        </span>
      </div>
      <button onClick={handleChangePassword}>Xác nhận đổi mật khẩu</button>
    </div>
  );
};

export default ChangePasswordUser;