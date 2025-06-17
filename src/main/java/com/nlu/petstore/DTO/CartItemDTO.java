package com.nlu.petstore.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartItemDTO {
    private int productId;
    private String productName;
    private String image;
    private double price;
    private int quantity;
}
