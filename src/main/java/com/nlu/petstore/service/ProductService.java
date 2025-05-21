package com.nlu.petstore.service;

import com.nlu.petstore.model.Category;
import com.nlu.petstore.model.Product;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProductService {
    List<Product> getAllProducts();
    Product createProduct(Product product, List<MultipartFile> images);
    Product updateProduct(Integer id, Product product);
    void deleteProduct(Integer id);

}
