package com.nlu.petstore.service;

import com.nlu.petstore.entity.User;
import org.springframework.stereotype.Service;

import java.util.*;

public interface UserService {
     List<User> getAllUser();
     User findByUserName(String username);
     void deleteUser(int id);
}
