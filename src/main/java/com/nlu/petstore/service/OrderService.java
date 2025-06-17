package com.nlu.petstore.service;

import com.nlu.petstore.DTO.OrderRequestDTO;
import com.nlu.petstore.response.OrderDetailResponse;
import com.nlu.petstore.response.OrderResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface OrderService {
//    List<OrderResponse> getAllOrders();

    OrderResponse createOrder(OrderRequestDTO orderRequestDTO);
    List<OrderResponse> getOrdersByUserId(Integer userId);

    void updateOrderStatus(int orderId, String statusName);

}
