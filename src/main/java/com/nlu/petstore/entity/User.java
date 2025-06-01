package com.nlu.petstore.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "user")
@NoArgsConstructor
@Data
@AllArgsConstructor
@Builder
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")  // Ánh xạ cột id trong bảng
    private Integer id;

    @Column(name = "fullname")  // Ánh xạ cột fullname trong bảng
    private String fullname;

    @Column(name = "email")  // Ánh xạ cột email trong bảng
    private String email;

    @Column(name = "phoneNumber")  // Ánh xạ cột phoneNumber trong bảng
    private String phoneNumber;

    @Column(name="username")
    private String username;

    @Column(name = "address")  // Ánh xạ cột address trong bảng
    private String address;

    @Column(name = "password")  // Ánh xạ cột password trong bảng
    private String password;

    @ManyToOne
    @JoinColumn(name = "roleId")
    private Role role;

    @JsonIgnore
    @OneToOne(mappedBy = "user")
    private RefreshToken refreshToken;

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<ForgotPassword> forgotPassword;
}
