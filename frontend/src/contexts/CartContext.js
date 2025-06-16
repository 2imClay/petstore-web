import React, { createContext, useState, useEffect } from "react";
import axios from "../api/axiosIns";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartCount, setCartCount] = useState(0);

    const fetchCartCount = async () => {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

        try {
            const response = await axios.get(`http://localhost:8080/api/cart/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const count = response.data.reduce((sum, item) => sum + item.quantity, 0);
            setCartCount(count);
        } catch (err) {
            console.error("Lỗi lấy số lượng giỏ hàng:", err);
        }
    };

    useEffect(() => {
        fetchCartCount();
    }, []);

    return (
        <CartContext.Provider value={{ cartCount, fetchCartCount }}>
            {children}
        </CartContext.Provider>
    );
};
