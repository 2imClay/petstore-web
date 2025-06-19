package com.nlu.petstore.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name="review")
@Data
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "product_id")
    private int productId;

    @Column(name = "title")
    private String title;

    @Column(name="comment",columnDefinition = "TEXT")
    private String comment;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name ="name")
    private String name; // Tên người đánh giá (lấy từ token)

    @Column(name = "email")
    private String email; // Có thể lấy từ token hoặc cho nhập

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "rating")
    private int rating; // Đánh giá từ 1 đến 5 sao


}
