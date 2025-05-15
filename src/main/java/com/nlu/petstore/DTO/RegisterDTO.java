package com.nlu.petstore.DTO;

import jakarta.validation.constraints.Pattern;
import lombok.*;
import jakarta.validation.constraints.NotBlank;

@Getter
@Setter
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterDTO {
    @NotBlank(message = "Họ tên không được để trống.")
    private String fullname;
    @NotBlank(message="Email không được để trống.")
    @Pattern(
            regexp = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$",
            message = "Email không đúng định dạng"
    )
    private String email;
    @NotBlank(message = "Số điện thoại không được để trống.")
    private String phoneNumber;
    @NotBlank(message = "Username không được để trống.")
    private String username;
    @NotBlank(message = "Password không được để trống.")
    private String password;
}
