package com.nlu.petstore.service;

import com.nlu.petstore.DTO.OrderItemDTO;
import com.nlu.petstore.DTO.OrderRequestDTO;
import com.nlu.petstore.entity.Order;
import com.nlu.petstore.entity.OrderDetail;
import com.nlu.petstore.entity.Product;
import com.nlu.petstore.entity.Status;
import com.nlu.petstore.repository.OrderDetailRepository;
import com.nlu.petstore.repository.OrderRepository;
import com.nlu.petstore.repository.StatusRepository;
import com.nlu.petstore.response.OrderDetailResponse;
import com.nlu.petstore.response.OrderResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

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
                .shippingMethod(orderRequestDTO.getShippingMethod())
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
                    .productName(item.getProductName())
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
        response.setStatusName(defaultStatus.getName());

        return response;
    }

    @Override
    public List<OrderResponse> getOrdersByUserId(Integer userId) {
        List<Order> orders = orderRepository.findAllOrdersByUser_id(userId);

        List<OrderResponse> responses = new ArrayList<>();

        for (Order order : orders) {
            List<OrderDetail> details = orderDetailRepository.findByOrder_id(order.getId());

            List<OrderItemDTO> items = details.stream()
                    .map(d -> OrderItemDTO.builder()
                            .productId(d.getProduct_id())
                            .productName(d != null ? d.getProductName() : "Không tìm thấy")
                            .price(d.getPrice())
                            .quantity(d.getQuantity())
                            .build())
                    .toList();

            String statusName = order.getStatus_id() != null ? order.getStatus_id().getName() : "Không xác định";
            OrderResponse resp = OrderResponse.builder()
                    .orderId(order.getId())
                    .transactionId(order.getTransaction_id())
                    .shippingMethod(order.getShippingMethod())
                    .paymentMethod(order.getPayment_method())
                    .paymentStatus(order.getPayment_status())
                    .orderDate(order.getOrder_date())
                    .items(items)
                    .statusName(statusName)
                    .build();

            responses.add(resp);
        }

        return responses;
    }

    @Override
    public void updateOrderStatus(int orderId, String statusName) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn hàng"));

        Status status = statusRepository.findByName(statusName)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy trạng thái"));

        order.setStatus_id(status);
        order.setUpdated_at(LocalDateTime.now());

        orderRepository.save(order);
    }


}
