package com.nlu.petstore.response;

import com.nlu.petstore.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthResponse {
    private Integer userId;
    private String fullname;
    private String username;
    private String email;
    private String role;
    private String token;
    private String refreshToken;
    private String message;

}
