package com.nlu.petstore.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderDetailResponse {
    private int orderId;
    private String transactionId;
    private String address;
    private String note;
    private String statusName;
    private float totalMoney;
    private String phone;
    private float discount;
    private String shippingMethod;
    private String paymentMethod;
    private String paymentStatus;
    private LocalDateTime orderDate;
    private List<OrderItemResponse> items;
}