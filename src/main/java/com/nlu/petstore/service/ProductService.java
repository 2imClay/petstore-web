package com.nlu.petstore.service;

import com.nlu.petstore.entity.Product;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProductService {
    List<Product> getAllProducts();
    Product createProduct(Product product, List<MultipartFile> images);
    Product updateProduct(Integer id, Product product);
    void deleteProduct(Integer id);

}
