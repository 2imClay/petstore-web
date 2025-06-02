package com.nlu.petstore.controller;

import com.nlu.petstore.DTO.LoginDTO;
import com.nlu.petstore.DTO.RefreshTokenDTO;
import com.nlu.petstore.DTO.RegisterDTO;
import com.nlu.petstore.entity.RefreshToken;
import com.nlu.petstore.entity.User;
import com.nlu.petstore.repository.RefreshTokenRepository;
import com.nlu.petstore.response.AuthResponse;
import com.nlu.petstore.security.JwtService;
import com.nlu.petstore.security.RefreshTokenService;
import com.nlu.petstore.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping ("api/auth")
public class AuthController {
    @Autowired
    private AuthService authService;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private RefreshTokenService refreshTokenService;
    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterDTO registerDTO, BindingResult result) {
        if (result.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            result.getFieldErrors().forEach(err -> {
                errors.put(err.getField(), err.getDefaultMessage());
            });
            return ResponseEntity.badRequest().body(errors);
        }
        AuthResponse response = authService.register(registerDTO);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO  loginDTO) {
        try {
            AuthResponse response = authService.login(loginDTO);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(@RequestBody RefreshTokenDTO refreshTokenDTO) {
        try {
            RefreshToken refreshToken = refreshTokenService.verifyRefreshToken(refreshTokenDTO.getRefreshToken());
            User user = refreshToken.getUser();

            // Xoá refresh token cũ
            refreshTokenRepository.delete(refreshToken);

            // Tạo refresh token mới
            RefreshToken newRefreshToken = refreshTokenService.createRefreshToken(user.getUsername());

            // Tạo access token mới
            String newToken = jwtService.generateToken(user);

            return ResponseEntity.ok(Map.of(
                    "newToken", newToken,
                    "refreshToken", newRefreshToken.getRefreshToken(),
                    "message", "Token mới đã được cấp thành công."
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", e.getMessage()));
        }


    }
}
