package com.nlu.petstore.service;

import com.nlu.petstore.DTO.OrderRequestDTO;
import com.nlu.petstore.response.OrderDetailResponse;
import com.nlu.petstore.response.OrderResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface OrderService {
    OrderResponse createOrder(OrderRequestDTO orderRequestDTO);
    List<OrderResponse> getOrdersByUserId(Integer userId);
}
