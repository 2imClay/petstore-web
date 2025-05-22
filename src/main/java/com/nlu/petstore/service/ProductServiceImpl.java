package com.nlu.petstore.service;

import com.nlu.petstore.entity.Product;
import com.nlu.petstore.entity.ProductImage;
import com.nlu.petstore.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class ProductServiceImpl implements ProductService{

    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public Product createProduct(Product product, List<MultipartFile> images) {
        product.setCreatedAt(LocalDateTime.now());
        product.setUpdatedAt(LocalDateTime.now());

        // Chuẩn bị danh sách ảnh
        List<ProductImage> productImages = new ArrayList<>();

        if (images != null && !images.isEmpty()) {
            for (MultipartFile file : images) {
                try {
                    String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
                    Path filePath = Paths.get("uploads/" + fileName);

                    Files.createDirectories(filePath.getParent());
                    Files.write(filePath, file.getBytes());

                    ProductImage img = new ProductImage();
                    img.setImage(fileName);
                    img.setProduct(product);  // gắn ngược lại

                    productImages.add(img);

                } catch (IOException e) {
                    throw new RuntimeException("Lỗi khi lưu ảnh: " + file.getOriginalFilename(), e);
                }
            }
        }

        // Gắn danh sách ảnh vào sản phẩm
        product.setImages(productImages);

        return productRepository.save(product);
    }

    @Override
    public Product updateProduct(Integer id, Product product) {
        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));

        existingProduct.setTitle(product.getTitle());
        existingProduct.setBrand(product.getBrand());
        existingProduct.setPrice(product.getPrice());
//        existingProduct.setDiscount(product.getDiscount());
        existingProduct.setAmount(product.getAmount());
        existingProduct.setDescription(product.getDescription());
//        existingProduct.setStatus(product.getStatus());
        existingProduct.setId_category(product.getId_category());
        existingProduct.setUpdatedAt(LocalDateTime.now());

        return productRepository.save(existingProduct);
    }

    @Override
    public void deleteProduct(Integer id) {
        if (!productRepository.existsById(id)) {
            throw new RuntimeException("Không tìm thấy sản phẩm có id: " + id);
        }
        productRepository.deleteById(id);
    }
}
