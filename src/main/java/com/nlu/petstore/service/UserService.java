package com.nlu.petstore.service;

import com.nlu.petstore.DTO.RegisterDTO;
import com.nlu.petstore.model.User;
import org.springframework.stereotype.Service;

@Service
public interface UserService {
     User registerUser(RegisterDTO registerDTO);
}
