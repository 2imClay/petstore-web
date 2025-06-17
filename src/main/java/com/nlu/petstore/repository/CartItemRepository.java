package com.nlu.petstore.repository;

import com.nlu.petstore.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem, Integer> {
    void deleteByUserId(int userId);
    List<CartItem> findByUserId(int userId);
    Optional<CartItem> findByUserIdAndProductId(int userId, int productId);
}
