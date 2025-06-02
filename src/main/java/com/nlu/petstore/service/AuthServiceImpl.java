package com.nlu.petstore.service;

import com.nlu.petstore.DTO.LoginDTO;
import com.nlu.petstore.DTO.RegisterDTO;
import com.nlu.petstore.entity.Role;
import com.nlu.petstore.entity.User;
import com.nlu.petstore.repository.RoleRepository;
import com.nlu.petstore.repository.UserRepository;
import com.nlu.petstore.response.AuthResponse;
import com.nlu.petstore.security.JwtService;
import com.nlu.petstore.security.RefreshTokenService;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements  AuthService {

    private final UserRepository userRepository;
    private final RoleRepository   roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final RefreshTokenService refreshTokenService;

    @Override
    public AuthResponse login(LoginDTO loginDTO) {
        //Tìm kiếm username
        User user = userRepository.findByUsername(loginDTO.getUsername())
                .orElseThrow(() -> new EntityNotFoundException("Tên đăng nhập không tồn tại."));
        //Kiểm tra password
        if(!passwordEncoder.matches(loginDTO.getPassword(), user.getPassword())){
            throw new BadCredentialsException("Mật khẩu không chính xác");
        }
        String token = jwtService.generateToken(user);
        var refreshToken = refreshTokenService.createRefreshToken(loginDTO.getUsername());
        return AuthResponse.builder()
                .userId(user.getId())
                .fullname(user.getFullname())
                .username(user.getUsername())
                .email(user.getEmail())
                .role(user.getRole().getRoleName())
                .token(token)
                .refreshToken(refreshToken.getRefreshToken())
                .message("Đăng nhập thành công.").build();
    }

    @Override
    public AuthResponse register(RegisterDTO registerDTO) {
        //Kiểm tra tên đăng nhập đã tồn tại chưa
        if(userRepository.existsByUsername(registerDTO.getUsername())){
            throw new EntityExistsException("Tên đăng nhập đã tồn tại");
        }
        // Kiểm tra email
        if(userRepository.existsByEmail(registerDTO.getEmail())){
            throw new EntityExistsException("Email đã tồn tại");
        }
        User user = new  User();
        user.setFullname(registerDTO.getFullname());
        user.setUsername(registerDTO.getUsername());
        user.setEmail(registerDTO.getEmail());
        user.setPassword(passwordEncoder.encode(registerDTO.getPassword()));
        user.setPhoneNumber(registerDTO.getPhoneNumber());
        Role userRole = roleRepository.findByRoleName("USER")
                        .orElseThrow(()->new EntityNotFoundException("Role User không tồn tại"));
        user.setRole(userRole);
        User savedUser = userRepository.save(user);

        //Tạo JWT
        String token =  jwtService.generateToken(savedUser);
        var refreshToken =  refreshTokenService.createRefreshToken(savedUser.getUsername());
        return AuthResponse.builder()
//                .userId(savedUser.getId())
//                .username(savedUser.getUsername())
//                .email(savedUser.getEmail())
//                .role(savedUser.getRole().getRoleName())
//                .token(token)
//                .refreshToken(refreshToken.getRefreshToken())
                .message("Đăng ký thành công")
                .build();
    }
}
