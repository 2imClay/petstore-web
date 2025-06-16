import React, {useContext, useEffect, useState} from 'react';
import "../../assets/css/style.css";
import banner from '../../assets/images/hero-banner.jpg';

import { Star } from 'react-ionicons';
import axios from "../../api/axiosIns";
import {IonIcon} from "@ionic/react";
import {bagAddOutline} from "ionicons/icons";
import {CartContext} from "../../contexts/CartContext";
import {toast} from "react-toastify";

function MainContent() {

    const { fetchCartCount } = useContext(CartContext);
    const handleAddToCart = async (productId) => {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

        try {
            await axios.post(
                "http://localhost:8080/api/cart/add",
                {
                    userId: parseInt(userId),
                    productId: productId,
                    quantity: 1 // hoặc số lượng bạn muốn thêm
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            toast.success("Đã thêm sản phẩm vào giỏ hàng!");
            fetchCartCount();
        } catch (error) {
            console.error("Lỗi khi thêm vào giỏ hàng:", error);
            toast.error("Thêm vào giỏ hàng thất bại!");
        }
    };


    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8080/api/products"
                );
                setProducts(response.data);
            } catch (err) {
                console.error("Lỗi khi lấy danh sách sản phẩm:", err);
            }
        };

        fetchProducts();
    }, []);


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
                                                 <a href="/products" className="card-title">Thức ăn cho mèo</a>
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
                                                 <a href="/products" className="card-title">Thức ăn cho chó</a>
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
                                                 <a href="/products" className="card-title">Đồ chơi</a>
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
                                     {products.slice(0, 9).map((product) => (
                                         <li key={product.id}>
                                             <div className="product-card">
                                                 <div className="card-banner img-holder">
                                                     {product.images && product.images.length > 0 ? (

                                                         <>
                                                             <img
                                                                 src={product.images[0]}
                                                                 alt={product.title}
                                                                 className="img-cover default"
                                                             />
                                                             {product.images.length > 3 ? (
                                                                 <img
                                                                     src={product.images[2]}
                                                                     alt={product.title}
                                                                     className="img-cover hover"
                                                                 />
                                                             ) : (
                                                                 <img
                                                                     src={product.images[1]}
                                                                     alt={product.title}
                                                                     className="img-cover hover"
                                                                 />
                                                             )}
                                                         </>
                                                     ) : (
                                                         <div className="no-image">Không có ảnh</div>
                                                     )}
                                                     <button
                                                         className="card-action-btn"
                                                         aria-label="add to cart"
                                                         title="Add To Cart"
                                                         onClick={() => handleAddToCart(product.id)}
                                                     >
                                                         <IonIcon icon={bagAddOutline} aria-hidden="true" />
                                                     </button>
                                                 </div>
                                                 <div className="card-content">
                                                     <h3 className="h3">
                                                         <a href={`/products/${product.id}`} className="card-title">{product.title}</a>
                                                     </h3>
                                                     <data className="card-price" value={product.price}>
                                                         {product.price.toLocaleString("vi-VN")} VND
                                                     </data>
                                                 </div>
                                             </div>
                                         </li>
                                     ))}
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


                     </article>
                 </main>
             </div>
         </div>
    </>
  );
}

export default MainContent;