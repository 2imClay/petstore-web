package com.nlu.petstore.service;

import com.nlu.petstore.model.Product;

public interface ProductService {
    Product createProduct(Product product);
    Product updateProduct(Integer id, Product product);
    void deleteProduct(Integer id);

}
