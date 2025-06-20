package com.nlu.petstore.controller;


import com.nlu.petstore.DTO.OrderRequestDTO;
import com.nlu.petstore.service.OrderService;
import com.nlu.petstore.service.PaypalService;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/paypal")
public class PaypalController {

    @Autowired
    private PaypalService paypalService;
    @Autowired
    private OrderService orderService;

    // Các phương thức xử lý yêu cầu liên quan đến thanh toán PayPal sẽ được định nghĩa ở đây

    @PostMapping("/create-payment")
    public String createPayment(@RequestBody OrderRequestDTO orderRequestDTO) {
        try {
            Payment payment = paypalService.createPayment(
                    orderRequestDTO.getTotalMoney(),
                    "USD",
                    "paypal",
                    "sale",
                    "Thanh toán đơn hàng PetStore",
                    "http://localhost:3000/payment?paypalStatus=cancel",
                    "http://localhost:3000/payment?paypalStatus=success"
            );

            orderService.createOrder(orderRequestDTO);


            // Trả về URL để redirect
            for (com.paypal.api.payments.Links link : payment.getLinks()) {
                if (link.getRel().equals("approval_url")) {
                    System.out.println("Approval URL: " + link.getHref());
                    return link.getHref();
                }
            }

        } catch (PayPalRESTException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
            return "Error: " + e.getMessage();
        }
        return "Error: Không tìm thấy approval_url";
    }

    @PostMapping("/execute-payment")
    public Payment executePayment(@RequestParam("paymentId") String paymentId, @RequestParam("PayerID") String payerId) {
        try {
            return paypalService.executePayment(paymentId, payerId);
        } catch (PayPalRESTException e) {
            e.printStackTrace();
            return null;
        }
    }
}
