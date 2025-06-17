package com.nlu.petstore.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

class OrderItemResponse {
    private int productId;
    private String productName;  // lấy từ product repo
    private String productImage; // link ảnh sản phẩm
    private float price;
    private int quantity;
    private float totalMoney;
}
