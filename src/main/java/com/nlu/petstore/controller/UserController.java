package com.nlu.petstore.controller;

import com.nlu.petstore.DTO.ChangePasswordDTO;
import com.nlu.petstore.DTO.UserProfileDTO;
import com.nlu.petstore.entity.User;
import com.nlu.petstore.repository.UserRepository;
import com.nlu.petstore.security.JwtService;
import com.nlu.petstore.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;

    @GetMapping
    public List<User> getAllUser() {return userService.getAllUser();}

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Integer id) {
        userService.deleteUser(id);
        return ResponseEntity.ok().body("Xóa người dùng thành công.");
    }

//    @GetMapping("/info")
//    public ResponseEntity<?> getUserInfo(@RequestHeader("Authorization") String authHeader) {
//        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
//            return ResponseEntity.status(401).body(Map.of("error", "Token không hợp lệ hoặc thiếu."));
//        }
//
//        try {
//            String token = authHeader.substring(7); // Cắt "Bearer "
//            String email = jwtService.extractUserName(token); // JWT chứa email ở phần `sub`
//
//            return userService.findByEmail(email)
//                    .<ResponseEntity<?>>map(user -> ResponseEntity.ok().body(user)) // nếu tìm thấy
//                    .orElse(ResponseEntity.status(404).body(Map.of("error", "Không tìm thấy người dùng.")));
//
//        } catch (Exception e) {
//            return ResponseEntity.status(401).body(Map.of("error", "Token không hợp lệ."));
//        }
//    }
    // Lấy thông tin user theo id
    @GetMapping("/profile/{id}")
    public UserProfileDTO getProfile(@PathVariable Integer id) {
        return userService.getUserProfileByID(id);
    }

    // Cập nhật thông tin user
    @PutMapping("/update/{id}")
    public UserProfileDTO updateProfile(@PathVariable Integer id, @RequestBody UserProfileDTO dto) {
        return userService.updateUserProfile(id, dto);
    }

    @PostMapping("/{id}/upload-img-avatar")
    public ResponseEntity<?> uploadAvatar(@PathVariable("id") Integer userId,
                                          @RequestParam("file") MultipartFile file) {
        try {
            String url = userService.uploadAvatar(userId, file);
            return ResponseEntity.ok().body(url);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Upload thất bại: " + e.getMessage());
        }
    }
    @PutMapping("/change-password")
    public ResponseEntity<String> changePassword(@RequestBody ChangePasswordDTO request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();

        String username;
        if (principal instanceof com.nlu.petstore.entity.User) {
            username = ((com.nlu.petstore.entity.User) principal).getUsername();
        } else {
            username = authentication.getName(); // fallback
        }
        boolean success = userService.changePassword(username, request);
        if (success) {
            return ResponseEntity.ok("Đổi mật khẩu thành công.");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Mật khẩu hiện tại không đúng.");
        }
    }
    @GetMapping("/{userId}/name")
    public Map<String, String> getUserName(@PathVariable int userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Map<String, String> response = new HashMap<>();
        response.put("name", user.getFullname());
        return response;
    }
}
