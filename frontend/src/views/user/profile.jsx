import React, { useRef, useState, useEffect } from "react";
import USER_API from "../../api/axiosUser";

const Profile = () => {
  const fileInputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false); // trạng thái chỉnh sửa
  const [user, setUser] = useState({
    avatar: "",
    fullname: "",
    email: "",
    birthDate: "",
    phoneNumber: "",
    address: "",
  });

  const userId = localStorage.getItem("userId");
  useEffect(() => {
    USER_API.get(`/profile/${userId}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.error("Lỗi khi lấy thông tin user:", err);
      });
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await USER_API.post(`/${userId}/upload-img-avatar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const imageUrl = response.data;

      // Cập nhật UI
      setUser((prevUser) => ({
        ...prevUser,
        avatar: imageUrl,
      }));

      alert("Cập nhật avatar thành công!");
    } catch (err) {
      console.error("Lỗi khi upload avatar:", err);
      alert("Tải ảnh lên thất bại!");
    }

  };
  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handleUpdateClick = () => {
    USER_API.put(`/update/${userId}`, user)
      .then(() => {
        alert("Cập nhật thông tin thành công!");
        setIsEditing(false);
      })
      .catch((err) => {
        console.error("Lỗi khi cập nhật:", err);
        alert("Cập nhật thất bại!");
      });
  };

  return (
    <>
      <div
        className="profile-avatar-wrapper"
        onClick={handleAvatarClick}
        style={{ cursor: isEditing ? "pointer" : "default" }}
      >
        <img src={user.avatar} alt="Avatar" className="profile-avatar" />
        <div className="camera-icon">&#128247;</div>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleAvatarChange}
        />
      </div>

      <div className="profile-form">
        <div className="profile-form">
          <div className="profile-form-group">
            <label>Họ tên:</label>
            <input
              type="text"
              name="fullname"
              value={user.fullname || ""}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="profile-form-group">
            <label>Ngày sinh:</label>
            <input
              type="date"
              name="birthDate"
              value={user.birthDate || ""}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="profile-form-group">
            <label>Địa chỉ:</label>
            <input
              type="text"
              name="address"
              value={user.address || ""}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="profile-form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={user.email || ""}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="profile-form-group">
            <label>Số điện thoại:</label>
            <input
              type="tel"
              name="phoneNumber"
              value={user.phoneNumber || ""}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
        </div>

        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          {!isEditing ? (
            <button onClick={handleEditClick}>Sửa</button>
          ) : (
            <>
              <button
                onClick={handleUpdateClick}
                style={{ marginRight: "10px" }}
              >
                Cập nhật
              </button>
              <button onClick={() => setIsEditing(false)}>Hủy</button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
