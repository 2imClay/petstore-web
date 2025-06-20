import React from 'react';
import '../../assets/css/about.css';

const AboutPage = () => {
  return (
    <div className="about-container">
      <h1>Giới thiệu về PetStore</h1>
      <p>
        <strong>PetStore</strong> là cửa hàng trực tuyến chuyên cung cấp các sản phẩm dành cho thú cưng:
        <br />
        <em>thức ăn, phụ kiện, đồ chơi, quần áo, đồ dùng chăm sóc sức khỏe</em> và nhiều sản phẩm khác dành riêng cho các "bé yêu" của bạn.
      </p>

      <h2>Sứ mệnh của chúng tôi</h2>
      <ul>
        <li>Đem đến sản phẩm chất lượng cao, an toàn cho thú cưng.</li>
        <li>Cung cấp dịch vụ khách hàng tận tâm, chuyên nghiệp.</li>
        <li>Giá cả hợp lý, nhiều ưu đãi hấp dẫn.</li>
      </ul>

      <h2>Tại sao chọn PetStore?</h2>
      <ul>
        <li>Đa dạng sản phẩm cho chó, mèo và các loại thú cưng khác.</li>
        <li>Giao hàng nhanh chóng trên toàn quốc.</li>
        <li>Hỗ trợ đổi trả dễ dàng.</li>
        <li>Đội ngũ chăm sóc khách hàng nhiệt tình.</li>
      </ul>

      <p className="closing-text">
        PetStore luôn mong muốn được đồng hành cùng bạn trong hành trình chăm sóc các bé thú cưng khỏe mạnh, hạnh phúc! 🐶🐱
      </p>
    </div>
  );
};

export default AboutPage;