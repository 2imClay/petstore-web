package com.nlu.petstore.controller;

import com.nlu.petstore.entity.User;
import com.nlu.petstore.security.JwtService;
import com.nlu.petstore.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtService jwtService;

    @GetMapping
    public List<User> getAllUser() {return userService.getAllUser();}

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Integer id) {
        userService.deleteUser(id);
        return ResponseEntity.ok().body("Xóa người dùng thành công.");
    }

    @GetMapping("/info")
    public ResponseEntity<?> getUserInfo(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body(Map.of("error", "Token không hợp lệ hoặc thiếu."));
        }

        try {
            String token = authHeader.substring(7); // Cắt "Bearer "
            String email = jwtService.extractUserName(token); // JWT chứa email ở phần `sub`

            return userService.findByEmail(email)
                    .<ResponseEntity<?>>map(user -> ResponseEntity.ok().body(user)) // nếu tìm thấy
                    .orElse(ResponseEntity.status(404).body(Map.of("error", "Không tìm thấy người dùng.")));

        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of("error", "Token không hợp lệ."));
        }
    }
}
