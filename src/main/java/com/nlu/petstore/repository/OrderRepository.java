package com.nlu.petstore.repository;

import com.nlu.petstore.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Integer> {
    List<Order> findAllOrdersByUserId(Integer user_id);
    List<Order> findByStatus(int status_id);
}
