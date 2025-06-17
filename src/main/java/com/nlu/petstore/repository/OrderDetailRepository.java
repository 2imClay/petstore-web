package com.nlu.petstore.repository;

import com.nlu.petstore.entity.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface OrderDetailRepository extends JpaRepository<OrderDetail, Integer> {
    @Query("SELECT o FROM OrderDetail o WHERE o.order_id = :orderId")
    List<OrderDetail> findByOrder_id(@Param("orderId")int orderId);
}
