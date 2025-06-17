package com.nlu.petstore.response;

import com.nlu.petstore.DTO.OrderItemDTO;
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
public class OrderResponse {
    private int orderId;
    private String transactionId;
    private String shippingMethod;
    private float shippingFee;
    private float totalProductMoney;
    private float discount;
    private float finalTotal;
    private String paymentMethod;
    private String paymentStatus;
    private LocalDateTime orderDate;
    private List<OrderItemDTO> items;
}
