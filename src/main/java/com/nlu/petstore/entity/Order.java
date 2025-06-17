package com.nlu.petstore.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "orders")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
@Getter
@Setter

public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "user_id")
    private Integer user_id;
    @Column(name = "transaction_id", length = 100)
    private String transaction_id;
    @Column(name = "address", length = 200)
    private String address;
    @Column(name = "note", length = 350)
    private String note;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "status_id", nullable = false)
    private Status status_id;

    @Column(name = "total_money", nullable = false)
    private float total_money;

    @Column(name = "phone", length = 20)
    private String phone;

    @Column(name = "discount", nullable = false)
    private float  discount;

    @Column(name = "shipping_method", length = 20)
    private String shippingMethod;

    @Column(name = "payment_method", length = 20)
    private String payment_method;

    @Column(name = "payment_status", length = 20)
    private String payment_status;

    @Column(name = "order_date", nullable = false)
    private LocalDateTime order_date;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updated_at;

}
