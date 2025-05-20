package com.nlu.petstore.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "product")
@Getter
@Setter
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "id_category")
    private int id_category;
    @Column(name = "title")
    private String title;
    @Column(name = "brand")
    private String brand;
    @Column(name = "price")
    private float price;
//    @Column(name = "discount")
//    private float discount;
    @Column(name = "amount")
    private int amount;
    @Column(name = "description")
    private String description;
//    @Column(name = "status")
//    private String status;
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;


}
