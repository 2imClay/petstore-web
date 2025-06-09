package com.nlu.petstore.DTO;

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;
import jakarta.validation.constraints.NotBlank;

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
    @Pattern(regexp = "\\d{10,11}", message = "Số điện thoại không hợp lệ")
    private String phoneNumber;

    @NotBlank(message = "Username không được để trống.")
    @Size(min = 4, max = 20, message = "Username phải từ 4 đến 20 ký tự")
    private String username;

    @NotBlank(message = "Password không được để trống.")
    @Size(min = 8, message = "Mật khẩu phải có ít nhất 8 ký tự")
    private String password;

    private String confirmPassword;
}
