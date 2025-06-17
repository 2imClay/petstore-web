    import React, { useEffect, useState } from "react";
    import axios from "axios";
    import "../../assets/css/orders.css";

    const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        axios.get(`http://localhost:8080/api/orders/${userId}`)
        .then(res => {
            console.log("Orders:", res.data);
            setOrders(res.data);
        })
        .catch(err => console.error(err));
    }, [userId]);

    // Hàm tính tiền ship theo phương thức vận chuyển
    const getShippingCost = (method) => {
        if (method === "fast") return 50000;
        if (method === "normal") return 20000;
        return 0;
    };


    return (
        <div className="myorders-container">
        <h2 className="myorders-title">Đơn hàng của tôi</h2>
        {orders.length === 0 ? (
            <p className="myorders-empty">Chưa có đơn hàng nào.</p>
        ) : (
            <table className="myorders-table">
            <thead>
                <tr>
                <th>Mã đơn hàng</th>
                <th>Phương thức vận chuyển</th>
                <th>Phương thức thanh toán</th>
                <th>Trạng thái giao hàng</th>
                <th>Ngày đặt</th>
                <th>Sản phẩm</th>
                <th>Tiền ship</th>
                <th>Tổng tiền</th>
                </tr>
            </thead>
            <tbody>
                {orders.map(order => {
                const totalProductPrice = order.items.reduce(
                    (sum, item) => sum + item.price * item.quantity,
                    0
                );
                const shippingCost = getShippingCost(order.shippingMethod);
                const finalTotal = totalProductPrice + shippingCost;

                return (
                    <tr key={order.orderId}>
                    <td>{order.orderId}</td>
                    <td>{order.shippingMethod}</td>
                    <td>{order.paymentMethod}</td>
                    <td>{order.statusName || "Không xác định"}</td> {/* Lấy trực tiếp statusName */}
                    <td>{new Date(order.orderDate).toLocaleString()}</td>
                    <td>
                        <ul className="myorders-product-list">
                        {order.items.map(item => (
                            <li key={item.productId}>
                            {item.productName} - Giá: {item.price.toLocaleString()} - SL: {item.quantity}
                            </li>
                        ))}
                        </ul>
                    </td>
                    <td>{shippingCost.toLocaleString()} đ</td>
                    <td>{finalTotal.toLocaleString()} đ</td>
                    </tr>
                );
                })}
            </tbody>
            </table>
        )}
        </div>
    );
    };

    export default MyOrders;