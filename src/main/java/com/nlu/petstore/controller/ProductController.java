package com.nlu.petstore.controller;

import com.nlu.petstore.DTO.ProductDTO;
import com.nlu.petstore.DTO.ProductDetailDTO;
import com.nlu.petstore.entity.Product;
import com.nlu.petstore.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

//    @GetMapping
//    public List<Product> getAllProducts() {
//        return productService.getAllProducts();
//    }
    @GetMapping
    public ResponseEntity<List<ProductDTO>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
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
    @GetMapping("/{id}")
    public ResponseEntity<ProductDetailDTO> getProductById(@PathVariable("id") int id) {
        ProductDetailDTO product = productService.getProductById(id);
        return ResponseEntity.ok(product);
    }
    @GetMapping("/page")
    public ResponseEntity<Map<String,Object>> getProductsByPage(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "9") int size
    ) {
        Map<String, Object> result = productService.getProductsByPage(page - 1, size); // page - 1 vì client gửi từ 1
        return ResponseEntity.ok(result);
    }

    @GetMapping("/filter")
    public ResponseEntity<Map<String, Object>> getFilteredProducts(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(defaultValue = "-1") int category,
            @RequestParam(defaultValue = "-1") int animal
    ) {
        Map<String, Object> result = productService.getProductsByPageFilter(page - 1, size, category, animal);
        return ResponseEntity.ok(result);
    }
}