package com.nlu.petstore.service;

import com.nlu.petstore.entity.CartItem;
import com.nlu.petstore.repository.CartItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartItemServiceImpl implements CartItemService {

    @Autowired
    private CartItemRepository cartItemRepository;

    @Override
    public CartItem addToCart(int userId, int productId, int quantity) {
        Optional<CartItem> optional = cartItemRepository.findByUserIdAndProductId(userId, productId);
        if (optional.isPresent()) {
            CartItem item = optional.get();
            item.setQuantity(item.getQuantity() + quantity);
            return cartItemRepository.save(item);
        }
        CartItem newItem = new CartItem();
        newItem.setUserId(userId);
        newItem.setProductId(productId);
        newItem.setQuantity(quantity);
        return cartItemRepository.save(newItem);
    }

    @Override
    public List<CartItem> getCartItems(int userId) {
        return cartItemRepository.findByUserId(userId);
    }

    @Override
    public void removeFromCart(int userId, int productId) {
        cartItemRepository.findByUserIdAndProductId(userId, productId)
                .ifPresent(cartItemRepository::delete);
    }
}
