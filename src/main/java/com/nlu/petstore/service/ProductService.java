package com.nlu.petstore.service;

import com.nlu.petstore.DTO.ProductDTO;
import com.nlu.petstore.DTO.ProductDetailDTO;
import com.nlu.petstore.DTO.ProductSearchDTO;
import com.nlu.petstore.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface ProductService {
    List<ProductDTO> getAllProducts();
    Product createProduct(Product product, List<MultipartFile> images);
    Product updateProduct(Integer id, Product product);
    void deleteProduct(Integer id);
    ProductDetailDTO getProductById(int id);
    Map<String, Object> getProductsByPage(int page, int size);
    Map<String, Object> getProductsByPageFilter(int page, int size, int category, int animal);
    List<ProductSearchDTO> searchProducts(String keyword);
}
