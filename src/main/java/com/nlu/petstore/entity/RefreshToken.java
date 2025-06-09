package com.nlu.petstore.entity;

import jakarta.persistence.*;
import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

@Table(name= "refresh_token")
public class RefreshToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false,length = 500)
    private String refreshToken;

    @Column(nullable = false)
    private Instant expirationTime;

   @OneToOne
   @JoinColumn(name = "user_id", referencedColumnName = "id", unique = true)
    private User user;

}
