package com.nlu.petstore.service;

import com.nlu.petstore.DTO.CartItemDTO;
import com.nlu.petstore.entity.CartItem;
import com.nlu.petstore.entity.Product;
import com.nlu.petstore.repository.CartItemRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
    public List<CartItemDTO> getCartItems(int userId) {
        List<CartItem> items = cartItemRepository.findByUserId(userId);
        return items.stream().map(item -> {
            Product p = item.getProduct();
            String img = (p.getImages() != null && !p.getImages().isEmpty())
                    ? p.getImages().get(0).getImage()
                    : "default.jpg";

            return new CartItemDTO(
                    p.getId(),
                    p.getTitle(),
                    img,
                    p.getPrice(),
                    item.getQuantity()
            );
        }).collect(Collectors.toList());
    }


    @Override
    public void removeFromCart(int userId, int productId) {
        cartItemRepository.findByUserIdAndProductId(userId, productId)
                .ifPresent(cartItemRepository::delete);
    }
    @Transactional
    @Override
    public void clearCart(int userId) {
        cartItemRepository.deleteByUserId(userId);
    }

    @Transactional
    @Override
    public CartItem updateQuantity(int userId, int productId, int quantity) {
        CartItem cartItem = cartItemRepository.findByUserIdAndProductId(userId, productId)
                .orElseThrow(() -> new RuntimeException("Sản phẩm không tồn tại trong giỏ hàng"));

        cartItem.setQuantity(quantity);
        return cartItemRepository.save(cartItem);
    }
}
