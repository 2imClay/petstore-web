package com.nlu.petstore.service;

import com.nlu.petstore.DTO.LoginDTO;
import com.nlu.petstore.DTO.RegisterDTO;
import com.nlu.petstore.response.AuthResponse;

public interface AuthService {
    AuthResponse  login(LoginDTO loginDTO);
    AuthResponse  register(RegisterDTO registerDTO);

}
