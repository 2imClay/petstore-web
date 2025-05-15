package com.nlu.petstore.service;

import com.nlu.petstore.DTO.RegisterDTO;
import com.nlu.petstore.model.User;
import com.nlu.petstore.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements  UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public User registerUser(RegisterDTO registerDTO) {
        if(userRepository.existsByEmail(registerDTO.getEmail())) {
            throw new RuntimeException("Email đã sử dụng");
        }
        if(userRepository.existsByUsername(registerDTO.getUsername())){
            throw new RuntimeException("Username đã sử dụng");
        }
        User user = new User();
        user.setFullname(registerDTO.getFullname());
        user.setEmail(registerDTO.getEmail());
        user.setUsername(registerDTO.getUsername());
        user.setPhoneNumber(registerDTO.getPhoneNumber());
        String bPassword = passwordEncoder.encode(registerDTO.getPassword());
        user.setPassword(bPassword);
        return userRepository.save(user);
    }
}
