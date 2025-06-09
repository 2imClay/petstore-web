package com.nlu.petstore.controller;

import com.nlu.petstore.entity.CartItem;
import com.nlu.petstore.service.CartItemService;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartItemController {

    @Autowired
    private CartItemService cartItemService;

    @PostMapping("/add")
    public ResponseEntity<CartItem> addToCart(@RequestBody CartItemRequest request) {
        CartItem item = cartItemService.addToCart(request.getUserId(), request.getProductId(), request.getQuantity());
        return ResponseEntity.ok(item);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<CartItem>> getCartItems(@PathVariable int userId) {
        return ResponseEntity.ok(cartItemService.getCartItems(userId));
    }

    @DeleteMapping("/remove")
    public ResponseEntity<Void> removeFromCart(@RequestParam int userId, @RequestParam int productId) {
        cartItemService.removeFromCart(userId, productId);
        return ResponseEntity.noContent().build();
    }
}

@Getter
@Setter
class CartItemRequest {
    private int userId;
    private int productId;
    private int quantity;
}
