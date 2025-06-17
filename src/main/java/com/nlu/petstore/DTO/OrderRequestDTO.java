package com.nlu.petstore.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class OrderRequestDTO {
    private Integer userId;
    private String transactionId;
    private String address;
    private String note;
    private Integer statusId;
    private float totalMoney;
    private String phone;
    private float discount;
    private String shippingMethod;
    private String paymentMethod;
    private String paymentStatus;
    private List<OrderItemDTO> items;
}
