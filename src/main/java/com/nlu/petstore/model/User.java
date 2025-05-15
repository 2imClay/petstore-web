package com.nlu.petstore.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "user")
@Getter
@Setter
@NoArgsConstructor
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

    @Column(name = "role_id")  // Ánh xạ cột role_id trong bảng
    private int role_id;

}
