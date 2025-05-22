package com.nlu.petstore.service;

import com.nlu.petstore.entity.User;
import com.nlu.petstore.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements  UserService {

    @Autowired
    private UserRepository userRepository;
    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public User findByUserName(String username) {
        return userRepository.findByUsername(username).orElseThrow(
                ()-> new EntityNotFoundException("Không tìm thấy người dùng có tên đăng nhâp :"+username));
    }

    @Override
    public void deleteUser(int id) {
        User user = getUserById(id);
        userRepository.delete(user);
    }

    private User getUserById(int id) {
        return userRepository.findById(id).orElseThrow(
                ()-> new EntityNotFoundException("Không tìm thấy người dùng có ID"+id)
        );
    }
}
