package com.nlu.petstore.controller;

import com.nlu.petstore.entity.Review;
import com.nlu.petstore.repository.ReviewRepository;
import com.nlu.petstore.security.cloud.CloudinaryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {
    private final ReviewRepository reviewRepository;
    private final CloudinaryService cloudinaryService;

    public ReviewController(ReviewRepository reviewRepository, CloudinaryService cloudinaryService) {
        this.reviewRepository = reviewRepository;
        this.cloudinaryService = cloudinaryService;
    }
    @GetMapping("/product/{productId}")
    public List<Review> getReviews(@PathVariable Long productId) {
        return reviewRepository.findByProductId(productId);
    }

    @PostMapping("/upload-image")
    public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            String url = cloudinaryService.uploadFile(file, "petstore/reviews");
            return ResponseEntity.ok(Map.of("imageUrl", url));
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Upload ảnh thất bại");
        }
    }
    @PostMapping
    public ResponseEntity<?> addReview(@RequestBody Review review, Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Bạn phải đăng nhập để đánh giá");
        }

        String displayName = authentication.getName();

        if (authentication instanceof OAuth2AuthenticationToken oauthToken) {
            Map<String, Object> attrs = oauthToken.getPrincipal().getAttributes();
            displayName = (String) attrs.getOrDefault("name", displayName);
        }

        review.setName(displayName);

        reviewRepository.save(review);

        return ResponseEntity.ok("Đánh giá đã được gửi thành công");
    }
}
