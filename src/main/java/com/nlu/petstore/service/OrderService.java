package com.nlu.petstore.service;

import com.nlu.petstore.DTO.OrderRequestDTO;
import com.nlu.petstore.response.OrderResponse;
import org.springframework.stereotype.Service;

@Service
public interface OrderService {
    OrderResponse createOrder(OrderRequestDTO orderRequestDTO);
}
