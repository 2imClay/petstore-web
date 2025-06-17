package com.nlu.petstore.repository;

import com.nlu.petstore.entity.Order;

import java.util.List;

public interface OrderRepository {
    List<Order> findAllOrdersByUserId(Integer user_id);
    List<Order> findByStatus(int status_id);
}
