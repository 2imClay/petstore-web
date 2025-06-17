package com.nlu.petstore.service;

import com.nlu.petstore.DTO.OrderItemDTO;
import com.nlu.petstore.DTO.OrderRequestDTO;
import com.nlu.petstore.entity.Order;
import com.nlu.petstore.entity.OrderDetail;
import com.nlu.petstore.entity.Status;
import com.nlu.petstore.repository.OrderDetailRepository;
import com.nlu.petstore.repository.OrderRepository;
import com.nlu.petstore.repository.StatusRepository;
import com.nlu.petstore.response.OrderResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class OrderServiceImpl implements OrderService{
    @Autowired
    private StatusRepository statusRepository;
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private OrderDetailRepository orderDetailRepository;
    @Autowired
    private CartItemService cartItemService;

    @Override
    public OrderResponse createOrder(OrderRequestDTO orderRequestDTO) {
        Status defaultStatus = statusRepository.findById(1)
                .orElseThrow(() -> new RuntimeException("Status not found"));


        // Tính tiền sản phẩm
        float totalProductMoney = 0f;
        for (OrderItemDTO item : orderRequestDTO.getItems()) {
            totalProductMoney += item.getPrice() * item.getQuantity();
        }

        // Phí ship
        float shippingFee = 0f;
        if ("fast".equalsIgnoreCase(orderRequestDTO.getShippingMethod())) {
            shippingFee = 50000f;
        } else {
            shippingFee = 20000f;
        }

        // Tổng tiền
        float finalTotal = totalProductMoney - orderRequestDTO.getDiscount() + shippingFee;

        // Tạo Order
        Order order = Order.builder()
                .user_id(orderRequestDTO.getUserId())
                .transaction_id(UUID.randomUUID().toString())
                .address(orderRequestDTO.getAddress())
                .note(orderRequestDTO.getNote())
                .status_id(defaultStatus)
                .total_money(finalTotal)
                .phone(orderRequestDTO.getPhone())
                .discount(orderRequestDTO.getDiscount())
                .payment_method(orderRequestDTO.getPaymentMethod())
                .payment_status(orderRequestDTO.getPaymentStatus())
                .order_date(LocalDateTime.now())
                .updated_at(LocalDateTime.now())
                .build();

        // Lưu order
        order = orderRepository.save(order);
        // Lưu từng OrderDetail
        for (OrderItemDTO item : orderRequestDTO.getItems()) {
            OrderDetail detail = OrderDetail.builder()
                    .order_id(order.getId())
                    .product_id(item.getProductId())
                    .price(item.getPrice())
                    .quantity(item.getQuantity())
                    .total_money(item.getPrice() * item.getQuantity())
                    .build();
            orderDetailRepository.save(detail);
        }

        cartItemService.clearCart(orderRequestDTO.getUserId());

        // Trả về cho FE
        OrderResponse response = new OrderResponse();
        response.setOrderId(order.getId());
        response.setTransactionId(order.getTransaction_id());
        response.setShippingMethod(orderRequestDTO.getShippingMethod());
        response.setShippingFee(shippingFee);
        response.setTotalProductMoney(totalProductMoney);
        response.setDiscount(orderRequestDTO.getDiscount());
        response.setFinalTotal(finalTotal);
        response.setPaymentMethod(orderRequestDTO.getPaymentMethod());
        response.setPaymentStatus(orderRequestDTO.getPaymentStatus());
        response.setOrderDate(order.getOrder_date());
        response.setItems(orderRequestDTO.getItems());

        return response;
    }
}
