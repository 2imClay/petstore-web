package com.nlu.petstore.service;

import com.nlu.petstore.DTO.ChangePasswordDTO;
import com.nlu.petstore.DTO.UserProfileDTO;
import com.nlu.petstore.entity.User;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

public interface UserService {
     List<User> getAllUser();
     User findByUserName(String username);
     void deleteUser(int id);
     Optional<User> findByEmail(String email);
     UserProfileDTO getUserProfileByID (Integer userID);
     UserProfileDTO updateUserProfile(Integer userID, UserProfileDTO userProfileDTO);
     String uploadAvatar(Integer userID, MultipartFile file) throws IOException;
     boolean changePassword(String username, ChangePasswordDTO req);


}
