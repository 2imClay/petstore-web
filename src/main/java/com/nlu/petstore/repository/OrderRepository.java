package com.nlu.petstore.repository;

import com.nlu.petstore.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Integer> {
    @Query("SELECT o FROM Order o WHERE o.user_id = :userId")
    List<Order> findAllOrdersByUser_id(Integer userId);

    @Query("SELECT o FROM Order o WHERE o.status_id.id = :statusId")
    List<Order> findByStatus_id(int statusId);
}
