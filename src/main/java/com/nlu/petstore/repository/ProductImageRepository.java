package com.nlu.petstore.repository;

import com.nlu.petstore.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductImageRepository extends JpaRepository<Product, Integer> {
}
