package com.nlu.petstore.repository;

import com.nlu.petstore.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review,Integer> {
    List<Review> findByProductId(Long productId);
}
