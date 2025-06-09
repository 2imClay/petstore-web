package com.nlu.petstore.service;

import com.nlu.petstore.DTO.CartItemDTO;
import com.nlu.petstore.entity.CartItem;

import java.util.List;

public interface CartItemService {
    CartItem addToCart(int userId, int productId, int quantity);
    List<CartItemDTO> getCartItems(int userId);
    void removeFromCart(int userId, int productId);

    CartItem updateQuantity(int userId, int productId, int quantity);
}
