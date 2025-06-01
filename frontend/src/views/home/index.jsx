import React from 'react';
import "../../assets/css/style.css";
import banner from '../../assets/images/hero-banner.jpg';
import pet3 from '../../assets/images/product-1.jpg';
import pet4 from '../../assets/images/product-1_0.jpg';
import pet5 from '../../assets/images/product-2.jpg';
import pet6 from '../../assets/images/product-2_0.jpg';
import pet7 from '../../assets/images/product-3.jpg';
import pet8 from '../../assets/images/product-3_0.jpg';
import pet9 from '../../assets/images/product-4.jpg';
import pet10 from '../../assets/images/product-4_0.jpg';
import { Star } from 'react-ionicons';

function MainContent() {
  return (
     <>
         <div className="user-wrapper">
             <div className="home-page">
                 <main>
                     <article>
                         <section
                             className="section hero has-bg-image"
                             id="home"
                             aria-label="home"
                             style={{ backgroundImage: `url(${banner})`}}
                         >
                             <div className="container">
                                 <h1 className="h1 hero-title">
                                     <span className="span"> Uy tín</span> Chất lượng
                                 </h1>

                                 <p className="hero-text">Khuyến mãi lên đến 40%</p>

                                 <a href="https://google.com" className="btn">Mua ngay</a>
                             </div>
                         </section>

                         {/* CATEGORY */}
                         <section className="section category" aria-label="category">
                             <div className="container">
                                 <h2 className="h2 section-title">
                                     <span className="span">Danh </span>mục
                                 </h2>

                                 <ul className="has-scrollbar">

                                     <li className="scrollbar-item">
                                         <div className="category-card">
                                             <figure
                                                 className="card-banner img-holder"
                                                 style={{ width: '330px', height: '300px' }}
                                             >
                                                 <img
                                                     src={require("../../assets/images/category-1.jpg")}
                                                     width="330"
                                                     height="300"
                                                     loading="lazy"
                                                     alt="Cat Food"
                                                     className="img-cover"
                                                 />
                                             </figure>

                                             <h3 className="h3">
                                                 <a href="https://google.com" className="card-title">Thức ăn cho mèo</a>
                                             </h3>
                                         </div>
                                     </li>

                                     <li className="scrollbar-item">
                                         <div className="category-card">
                                             <figure
                                                 className="card-banner img-holder"
                                                 style={{ width: '330px', height: '300px' }}
                                             >
                                                 <img
                                                     src={require("../../assets/images/category-1.jpg")}
                                                     width="330"
                                                     height="300"
                                                     loading="lazy"
                                                     alt="Dog Food"
                                                     className="img-cover"
                                                 />
                                             </figure>

                                             <h3 className="h3">
                                                 <a href="https://google.com" className="card-title">Thức ăn cho chó</a>
                                             </h3>
                                         </div>
                                     </li>

                                     <li className="scrollbar-item">
                                         <div className="category-card">
                                             <figure
                                                 className="card-banner img-holder"
                                                 style={{ width: '330px', height: '300px' }}
                                             >
                                                 <img
                                                     src={require("../../assets/images/category-4.jpg")}
                                                     width="330"
                                                     height="300"
                                                     loading="lazy"
                                                     alt="Dog Toys"
                                                     className="img-cover"
                                                 />
                                             </figure>

                                             <h3 className="h3">
                                                 <a href="https://google.com" className="card-title">Đồ chơi</a>
                                             </h3>
                                         </div>
                                     </li>

                                 </ul>
                             </div>
                         </section>

                         {/* PRODUCT */}
                         <section className="section product" id="shop" aria-label="product">
                             <div className="container">
                                 <h2 className="h2 section-title">
                                     <span className="span">Bán </span> chạy
                                 </h2>

                                 <ul className="grid-list">
                                    <li>
                                                         <div className="product-card">
                                                            <div
                                                                className="card-banner img-holder"
                                                                style={{ '--width': 360, '--height': 360 }}
                                                            >
                                                                <img
                                                                src={pet3}
                                                                width="360"
                                                                height="360"
                                                                loading="lazy"
                                                                alt="Commodo leo sed porta"
                                                                className="img-cover default"
                                                                />
                                                                <img
                                                                src={pet4}
                                                                width="360"
                                                                height="360"
                                                                loading="lazy"
                                                                alt="Commodo leo sed porta"
                                                                className="img-cover hover"
                                                                />
                                        
                                                             <button
                                                             className="card-action-btn"
                                                             aria-label="add to card"
                                                             title="Add To Card"
                                                             >
                                                             <ion-icon name="bag-add-outline" aria-hidden="true"></ion-icon>
                                                             </button>
                                                         </div>
                                     
                                                         <div className="card-content">
                                     
                                                             <div className="wrapper">
                                                             <div className="rating-wrapper">
                                                                 <Star />
                                                                 <Star />
                                                                 <Star />
                                                                 <Star />
                                                                 <Star />
                                                             </div>
                                     
                                                             <span className="span">(1)</span>
                                                             </div>
                                     
                                                             <h3 className="h3">
                                                             <a href="https://google.com" className="card-title">Tên sp</a>
                                                             </h3>
                                     
                                                             <data className="card-price" value="15">giá</data>
                                     
                                                         </div>
                                                         </div>
                                    </li>
                                    {/* Sanp2 */}
                                    <li>
                                                         <div className="product-card">
                                                         <div
                                                             className="card-banner img-holder"
                                                             style={{ '--width': 360, '--height': 360 }}
                                                         >
                                                             <img
                                                             src={pet5}
                                                             width="360"
                                                             height="360"
                                                             loading="lazy"
                                                             alt="Commodo leo sed porta"
                                                             className="img-cover default"
                                                             />
                                                             <img
                                                             src={pet6}
                                                             width="360"
                                                             height="360"
                                                             loading="lazy"
                                                             alt="Commodo leo sed porta"
                                                             className="img-cover hover"
                                                             />
                                     
                                                             <button
                                                             className="card-action-btn"
                                                             aria-label="add to card"
                                                             title="Add To Card"
                                                             >
                                                             <ion-icon name="bag-add-outline" aria-hidden="true"></ion-icon>
                                                             </button>
                                                         </div>
                                     
                                                         <div className="card-content">
                                     
                                                             <div className="wrapper">
                                                             <div className="rating-wrapper">
                                                                 <Star />
                                                                 <Star />
                                                                 <Star />
                                                                 <Star />
                                                                 <Star />
                                                             </div>
                                     
                                                             <span className="span">(1)</span>
                                                             </div>
                                     
                                                             <h3 className="h3">
                                                             <a href="https://google.com" className="card-title">Tên sp</a>
                                                             </h3>
                                     
                                                             <data className="card-price" value="15">giá</data>
                                     
                                                         </div>
                                                         </div>
                                    </li>
                                    {/* Sanp3 */}
                                    <li>
                                                         <div className="product-card">
                                                         <div
                                                             className="card-banner img-holder"
                                                             style={{ '--width': 360, '--height': 360 }}
                                                         >
                                                             <img
                                                             src={pet7}
                                                             width="360"
                                                             height="360"
                                                             loading="lazy"
                                                             alt="Commodo leo sed porta"
                                                             className="img-cover default"
                                                             />
                                                             <img
                                                             src={pet8}
                                                             width="360"
                                                             height="360"
                                                             loading="lazy"
                                                             alt="Commodo leo sed porta"
                                                             className="img-cover hover"
                                                             />
                                     
                                                             <button
                                                             className="card-action-btn"
                                                             aria-label="add to card"
                                                             title="Add To Card"
                                                             >
                                                             <ion-icon name="bag-add-outline" aria-hidden="true"></ion-icon>
                                                             </button>
                                                         </div>
                                     
                                                         <div className="card-content">
                                     
                                                             <div className="wrapper">
                                                             <div className="rating-wrapper">
                                                                 <Star />
                                                                 <Star />
                                                                 <Star />
                                                                 <Star />
                                                                 <Star />
                                                             </div>
                                     
                                                             <span className="span">(1)</span>
                                                             </div>
                                     
                                                             <h3 className="h3">
                                                             <a href="https://google.com" className="card-title">Tên sp</a>
                                                             </h3>
                                     
                                                             <data className="card-price" value="15">giá</data>
                                     
                                                         </div>
                                                         </div>
                                    </li>
                                    {/* Sanp4 */}
                                    <li>
                                                         <div className="product-card">
                                                         <div
                                                             className="card-banner img-holder"
                                                             style={{ '--width': 360, '--height': 360 }}
                                                         >
                                                             <img
                                                             src={pet9}
                                                             width="360"
                                                             height="360"
                                                             loading="lazy"
                                                             alt="Commodo leo sed porta"
                                                             className="img-cover default"
                                                             />
                                                             <img
                                                             src={pet10}
                                                             width="360"
                                                             height="360"
                                                             loading="lazy"
                                                             alt="Commodo leo sed porta"
                                                             className="img-cover hover"
                                                             />
                                     
                                                             <button
                                                             className="card-action-btn"
                                                             aria-label="add to card"
                                                             title="Add To Card"
                                                             >
                                                             <ion-icon name="bag-add-outline" aria-hidden="true"></ion-icon>
                                                             </button>
                                                         </div>
                                     
                                                         <div className="card-content">
                                     
                                                             <div className="wrapper">
                                                             <div className="rating-wrapper">
                                                                 <Star />
                                                                 <Star />
                                                                 <Star />
                                                                 <Star />
                                                                 <Star />
                                                             </div>
                                     
                                                             <span className="span">(1)</span>
                                                             </div>
                                     
                                                             <h3 className="h3">
                                                             <a href="https://google.com" className="card-title">Tên sp</a>
                                                             </h3>
                                     
                                                             <data className="card-price" value="15">giá</data>
                                     
                                                         </div>
                                                         </div>
                                    </li>                       
                                 </ul>
                             </div>
                         </section>

                         {/* SERVICE */}
                         <section className="section service" aria-label="service">
                             <div className="container">

                                 <img
                                     src={require("../../assets/images/service-image.png")}
                                     width="122"
                                     height="136"
                                     loading="lazy"
                                     alt=""
                                     className="img"
                                 />

                                 <h2 className="h2 section-title">
                                     <span className="span">Khi bạn cần, </span> chúng tôi luôn có mặt.
                                 </h2>

                                 <ul className="grid-list">

                                     <li>
                                         <div className="service-card">
                                             <figure className="card-icon">
                                                 <img
                                                     src={require("../../assets/images/service-icon-1.png")}
                                                     width="70"
                                                     height="70"
                                                     loading="lazy"
                                                     alt="service icon"
                                                 />
                                             </figure>

                                             <h3 className="h3 card-title">Giao hàng miễn phí trong ngày</h3>

                                             <p className="card-text">
                                                 Đặt hàng trước 14h để được giao hàng miễn phí cho đơn hàng từ 49k.
                                             </p>
                                         </div>
                                     </li>

                                     <li>
                                         <div className="service-card">
                                             <figure className="card-icon">
                                                 <img
                                                     src={require("../../assets/images/service-icon-2.png")}
                                                     width="70"
                                                     height="70"
                                                     loading="lazy"
                                                     alt="service icon"
                                                 />
                                             </figure>

                                             <h3 className="h3 card-title">Khuyến mãi</h3>

                                             <p className="card-text">
                                                 Giảm 35% cho đơn hàng đầu tiên của bạn.
                                             </p>
                                         </div>
                                     </li>

                                     <li>
                                         <div className="service-card">
                                             <figure className="card-icon">
                                                 <img
                                                     src={require("../../assets/images/service-icon-3.png")}
                                                     width="70"
                                                     height="70"
                                                     loading="lazy"
                                                     alt="service icon"
                                                 />
                                             </figure>

                                             <h3 className="h3 card-title">Thanh toán an toàn</h3>

                                             <p className="card-text">
                                                 Khuyễn mãi lên đến 25% khi thanh toán online.
                                             </p>
                                         </div>
                                     </li>

                                     <li>
                                         <div className="service-card">
                                             <figure className="card-icon">
                                                 <img
                                                     src={require("../../assets/images/service-icon-4.png")}
                                                     width="70"
                                                     height="70"
                                                     loading="lazy"
                                                     alt="service icon"
                                                 />
                                             </figure>

                                             <h3 className="h3 card-title">Hỗ trợ 24/7</h3>

                                             <p className="card-text">
                                                 Mua sắm mọi lúc mọi nơi.
                                             </p>
                                         </div>
                                     </li>

                                 </ul>
                             </div>
                         </section>

                         {/* CTA */}
                         <section
                             className="cta has-bg-image"
                             aria-label="cta"
                             style={{ backgroundImage: "url(" + require("../../assets/images/cta-bg.jpg") + ")" }}
                         >
                             <div className="container">

                                 <figure className="cta-banner">
                                     <img
                                         src={require("../../assets/images/cta-banner.png")}
                                         width="900"
                                         height="660"
                                         loading="lazy"
                                         alt="cat"
                                         className="w-100"
                                     />
                                 </figure>

                                 <div className="cta-content">
                                      <img src={require("../../assets/images/cta-icon.png")} width="120" height="35" loading="lazy" alt="taste guarantee" className="img" />

                                     <h2 className="h2 section-title">
                                         Mang lại <span className="span">sự thoải mái</span> cho thú cưng.
                                     </h2>

                                     <p className="section-text">
                                         Đặt bánh thì mới có bánh.
                                     </p>

                                     <a href="https://google.com" className="btn">Đặt ngay</a>
                                 </div>
                             </div>
                         </section>
                     </article>
                 </main>
             </div>
         </div>
    </>
  );
}

export default MainContent;