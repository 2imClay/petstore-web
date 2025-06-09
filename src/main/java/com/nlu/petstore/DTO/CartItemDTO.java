package com.nlu.petstore.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CartItemDTO {
    private int productId;
    private String productName;
    private String image;
    private double price;
    private int quantity;
}
