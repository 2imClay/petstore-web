package com.nlu.petstore.service;

import com.paypal.api.payments.Payment;
import com.paypal.base.rest.APIContext;
import com.paypal.base.rest.PayPalRESTException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public interface PaypalService {
        Payment createPayment(double total, String currency, String method, String intent, String description, String cancelUrl, String successUrl) throws PayPalRESTException;
        Payment executePayment(String paymentId, String payerId) throws PayPalRESTException;

}
