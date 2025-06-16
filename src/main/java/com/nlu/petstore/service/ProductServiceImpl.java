package com.nlu.petstore.service;

import com.nlu.petstore.DTO.ProductDTO;
import com.nlu.petstore.DTO.ProductDetailDTO;
import com.nlu.petstore.entity.Product;
import com.nlu.petstore.entity.ProductImage;
import com.nlu.petstore.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService{

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CategoryService categoryService;

    @Override
    public List<ProductDTO> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return products.stream().map(product -> {
            ProductDTO dto = new ProductDTO();
            dto.setId(product.getId());
            dto.setTitle(product.getTitle());
            dto.setPrice(product.getPrice());
            dto.setBrand(product.getBrand());
            dto.setDescription(product.getDescription());
            dto.setId_category(product.getId_category());
            dto.setId_animal(product.getId_animal());

            List<String> imageUrls = product.getImages().stream()
                    .map(ProductImage::getImage)
                    .collect(Collectors.toList());
            dto.setImages(imageUrls);

            return dto;
        }).collect(Collectors.toList());
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
                    String baseUrl = "http://localhost:8080/uploads/";
                    img.setImage(baseUrl + fileName);
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

    @Override
    public ProductDetailDTO getProductById(int id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));

        ProductDetailDTO productDetail = new ProductDetailDTO();
        productDetail.setId(product.getId());
        productDetail.setTitle(product.getTitle());
        productDetail.setBrand(product.getBrand());
        productDetail.setPrice(product.getPrice());
        productDetail.setDescription(product.getDescription());
        productDetail.setAmount(product.getAmount());
        productDetail.setCategoryName(categoryService.getCategoryNameById(product.getId_category()));
        List<String> imageUrls = product.getImages().stream()
                .map(ProductImage::getImage)
                .collect(Collectors.toList());
        productDetail.setImages(imageUrls);

        return productDetail;
    }

    @Override
    public Map<String, Object> getProductsByPage(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Product> productPage = productRepository.findAll(pageable);

        List<ProductDTO> products = productPage.getContent().stream().map(product -> {
            ProductDTO dto = new ProductDTO();
            dto.setId(product.getId());
            dto.setTitle(product.getTitle());
            dto.setPrice(product.getPrice());
            dto.setBrand(product.getBrand());
            dto.setAmount(product.getAmount());
            dto.setDescription(product.getDescription());
            dto.setId_category(product.getId_category());
            if (product.getImages() != null) {
                dto.setImages(product.getImages().stream()
                        .map(ProductImage::getImage)
                        .collect(Collectors.toList()));
            }
            return dto;
        }).collect(Collectors.toList());

        Map<String, Object> response = new HashMap<>();
        response.put("products", products);
        response.put("currentPage", productPage.getNumber() + 1); // +1 vì mặc định là 0-based
        response.put("totalItems", productPage.getTotalElements());
        response.put("totalPages", productPage.getTotalPages());
        response.put("pageSize", productPage.getSize());

        return response;
    }
    @Override
    public Map<String, Object> getProductsByPageFilter(int page, int size, int category, int animal) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Product> productPage = productRepository.findByIdCategoryAndIdAnimal(category, animal, pageable);

        List<ProductDTO> products = productPage.getContent().stream().map(product -> {
            ProductDTO dto = new ProductDTO();
            dto.setId(product.getId());
            dto.setTitle(product.getTitle());
            dto.setPrice(product.getPrice());
            dto.setBrand(product.getBrand());
            dto.setAmount(product.getAmount());
            dto.setDescription(product.getDescription());
            dto.setId_category(product.getId_category());
            dto.setId_animal(product.getId_animal());
            if (product.getImages() != null) {
                dto.setImages(product.getImages().stream()
                        .map(ProductImage::getImage)
                        .collect(Collectors.toList()));
            }
            return dto;
        }).collect(Collectors.toList());

        Map<String, Object> response = new HashMap<>();
        response.put("products", products);
        response.put("currentPage", productPage.getNumber() + 1); // +1 vì mặc định là 0-based
        response.put("totalItems", productPage.getTotalElements());
        response.put("totalPages", productPage.getTotalPages());
        response.put("pageSize", productPage.getSize());

        return response;
    }
}
