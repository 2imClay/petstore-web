package com.nlu.petstore.repository;

import com.nlu.petstore.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface ProductRepository extends JpaRepository<Product, Integer> {
    Page<Product> findAll(Pageable pageable);
    @Query(value = "SELECT * FROM product p WHERE (:id_category = -1 OR p.id_category = :id_category) AND (:id_animal = -1 OR p.id_animal = :id_animal)",
            countQuery = "SELECT COUNT(*) FROM product p WHERE (:id_category = -1 OR p.id_category = :id_category) AND (:id_animal = -1 OR p.id_animal = :id_animal)",
            nativeQuery = true)
    Page<Product> findByIdCategoryAndIdAnimal(@Param("id_category") int id_category, @Param("id_animal") int id_animal, Pageable pageable);
    List<Product> findByTitleContainingIgnoreCase(String keyword);
}
