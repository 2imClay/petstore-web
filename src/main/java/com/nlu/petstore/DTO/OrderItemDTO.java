package com.nlu.petstore.DTO;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class OrderItemDTO {
    private int productId;
    private String productName;
    private float price;
    private int quantity;


}
