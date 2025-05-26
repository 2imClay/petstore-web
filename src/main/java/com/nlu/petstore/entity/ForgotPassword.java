    package com.nlu.petstore.entity;

    import jakarta.persistence.*;
    import lombok.AllArgsConstructor;
    import lombok.Builder;
    import lombok.Data;
    import lombok.NoArgsConstructor;

    import java.util.Date;

    @Entity
    @NoArgsConstructor
    @AllArgsConstructor
    @Data
    @Builder
    public class ForgotPassword {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Integer fpId;

        @Column(nullable = false)
        private Integer otp;

        @Column(nullable = false)
        private Date  expirationTime;

        @ManyToOne
        @JoinColumn(name = "user_id", nullable = false)
        private User user;

    }
