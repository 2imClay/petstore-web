package com.nlu.petstore.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "user")
@NoArgsConstructor
@Data
@AllArgsConstructor
public class User {
    @Id
    @Column(name = "id")  // Ánh xạ cột id trong bảng
    private int id;

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

}
