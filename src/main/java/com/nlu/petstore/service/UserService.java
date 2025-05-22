package com.nlu.petstore.service;

import com.nlu.petstore.entity.User;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public interface UserService {
     List<User> findAll();
     User findByUserName(String username);
     void deleteUser(int id);
}
