package com.nlu.petstore.controller;

import com.nlu.petstore.DTO.OrderRequestDTO;
import com.nlu.petstore.response.OrderResponse;
import com.nlu.petstore.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;

//    @GetMapping
//    public ResponseEntity<List<OrderResponse>> getAllOrders() {
//        List<OrderResponse> orders = orderService.getAllOrders();
//        return ResponseEntity.ok(orders);
//    }

    @PostMapping("/create")
    public OrderResponse createOrder(@RequestBody OrderRequestDTO dto) {
        return orderService.createOrder(dto);
    }
    @GetMapping("/{userId}")
    public ResponseEntity<List<OrderResponse>> getOrdersByUser(@PathVariable Integer userId) {
        List<OrderResponse> orders = orderService.getOrdersByUserId(userId);
        return ResponseEntity.ok(orders);
    }
    @PutMapping("/{orderId}/status")
    public ResponseEntity<?> updateOrderStatus(@PathVariable int orderId, @RequestBody Map<String, String> body) {
        String statusName = body.get("statusName");
        orderService.updateOrderStatus(orderId, statusName);
        return ResponseEntity.ok().build();
    }

}
