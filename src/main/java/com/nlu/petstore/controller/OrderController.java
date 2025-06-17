package com.nlu.petstore.controller;

import com.nlu.petstore.DTO.OrderRequestDTO;
import com.nlu.petstore.response.OrderResponse;
import com.nlu.petstore.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;
    @PostMapping
    public OrderResponse createOrder(@RequestBody OrderRequestDTO dto) {
        return orderService.createOrder(dto);
    }
}
