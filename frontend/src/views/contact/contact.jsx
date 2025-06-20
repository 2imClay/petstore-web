import React, { useState } from 'react';
import './contact-page.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState('');

  // Cập nhật state khi người dùng nhập
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Xử lý submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMsg('');

    try {
      const res = await fetch('http://localhost:8080/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setResponseMsg('Gửi tin nhắn thành công! Cảm ơn bạn đã liên hệ.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setResponseMsg('Gửi tin nhắn thất bại. Vui lòng thử lại.');
      }
    } catch (error) {
      setResponseMsg('Lỗi kết nối. Vui lòng thử lại.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-container">
      <h1>Liên hệ với PetStore</h1>

      <div className="contact-info">
        <p><strong>Địa chỉ:</strong> 123 Đường ABC, Quận 1, TP.HCM</p>
        <p><strong>Điện thoại:</strong> 0123 456 789</p>
        <p><strong>Email:</strong> support@petstore.vn</p>
        <p><strong>Giờ mở cửa:</strong> Thứ 2 - Chủ nhật: 8:00 - 20:00</p>
      </div>

      <div className="contact-map">
        <iframe
          title="PetStore Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.123456789012!2d106.7000000!3d10.7777777!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ecb8e4f1b15%3A0x123456789abcdef!2zMTIzIEPhuqd1IEFCQywgUGjGsMahbmcgMSwgVMOHoSBwaMOybmcgQ2jDrSBNaW5o!5e0!3m2!1svi!2s!4v1681234567890"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      <div className="contact-form">
        <h2>Gửi tin nhắn cho chúng tôi</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Họ và tên"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="subject"
            placeholder="Chủ đề"
            value={formData.subject}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Nội dung tin nhắn"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit" disabled={loading}>
            {loading ? 'Đang gửi...' : 'Gửi tin nhắn'}
          </button>
        </form>
        {responseMsg && (
          <p
            className="response-message"
            style={{ textAlign: 'center', color: responseMsg.includes('thành công') ? 'green' : 'red' }}
          >
            {responseMsg}
          </p>
        )}
      </div>
    </div>
  );
};

export default ContactPage;
