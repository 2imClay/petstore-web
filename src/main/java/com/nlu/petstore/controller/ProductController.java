package com.nlu.petstore.controller;

import com.nlu.petstore.entity.Product;
import com.nlu.petstore.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }
    @PostMapping("/create")
    public ResponseEntity<?> createProduct(
            @RequestParam("title") String title,
            @RequestParam("brand") String brand,
            @RequestParam("price") float price,
            @RequestParam("amount") int amount,
            @RequestParam("description") String description,
            @RequestParam("id_category") Integer id_category,
            @RequestParam(value = "images", required = false) List<MultipartFile> images
    ) {
        Product product = new Product();
        product.setTitle(title);
        product.setBrand(brand);
        product.setPrice(price);
        product.setAmount(amount);
        product.setDescription(description);
        product.setId_category(id_category);

        Product created = productService.createProduct(product, images);

        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Integer id, @RequestBody Product product) {
        Product updated = productService.updateProduct(id, product);
        return new ResponseEntity<>(updated, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Integer id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok().body("Xóa sản phẩm thành công.");
    }

}