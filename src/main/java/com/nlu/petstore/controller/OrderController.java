package com.nlu.petstore.controller;

import com.nlu.petstore.DTO.OrderRequestDTO;
import com.nlu.petstore.response.OrderResponse;
import com.nlu.petstore.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;
    @PostMapping
    public OrderResponse createOrder(@RequestBody OrderRequestDTO dto) {
        return orderService.createOrder(dto);
    }
    @GetMapping("/{userId}")
    public ResponseEntity<List<OrderResponse>> getOrdersByUser(@PathVariable Integer userId) {
        List<OrderResponse> orders = orderService.getOrdersByUserId(userId);
        return ResponseEntity.ok(orders);
    }
}
