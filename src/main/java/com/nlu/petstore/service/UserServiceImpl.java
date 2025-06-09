package com.nlu.petstore.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.nlu.petstore.DTO.UserProfileDTO;
import com.nlu.petstore.entity.User;
import com.nlu.petstore.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class UserServiceImpl implements  UserService {
    @Autowired
    private Cloudinary cloudinary;

    @Autowired
    private UserRepository userRepository;

    @Value("${cloudinary.folder.avatar}")
    private String avatarFolder;

    @Override
    public List<User> getAllUser() {
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
    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public UserProfileDTO getUserProfileByID(Integer userID) {
        Optional<User> optionalUser = userRepository.findById(userID);
        if(optionalUser.isEmpty()){
            throw  new RuntimeException("Không tìm thấy người dùng với ID"+userID);
        }
        User user = optionalUser.get();
        UserProfileDTO userProfileDTO = new UserProfileDTO();
        userProfileDTO.setId(user.getId());
        userProfileDTO.setAvatar(user.getAvatar());
        userProfileDTO.setFullname(user.getFullname());
        userProfileDTO.setEmail(user.getEmail());
        userProfileDTO.setBirthDate(user.getBirthDate());
        userProfileDTO.setPhoneNumber(user.getPhoneNumber());
        userProfileDTO.setAddress(user.getAddress());

        return userProfileDTO;
    }

    @Override
    public UserProfileDTO updateUserProfile(Integer userID, UserProfileDTO userProfileDTO) {
        Optional<User> optionalUser = userRepository.findById(userID);
        if(optionalUser.isEmpty()){
            throw  new RuntimeException("Không tìm thấy người dùng với ID"+userID);
        }
        User user = optionalUser.get();
        user.setFullname(userProfileDTO.getFullname());
        user.setEmail(userProfileDTO.getEmail());
        user.setPhoneNumber(userProfileDTO.getPhoneNumber());
        user.setAddress(userProfileDTO.getAddress());
        user.setBirthDate(userProfileDTO.getBirthDate());
        userRepository.save(user);
        return userProfileDTO;
    }

    @Override
    public String uploadAvatar(Integer userID, MultipartFile file) throws IOException {
        //Upload lên cloudinary
        Map uploadResult = cloudinary.uploader().upload(file.getBytes(),
                ObjectUtils.asMap("folder", avatarFolder,
                "overwrite", true));
        // Lấy URL của ảnh đã upload
        String imageUrl = uploadResult.get("secure_url").toString();

        // Lưu vào DB
        User user = userRepository.findById(userID)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setAvatar(imageUrl);
        userRepository.save(user);

        return imageUrl;
    }
}
