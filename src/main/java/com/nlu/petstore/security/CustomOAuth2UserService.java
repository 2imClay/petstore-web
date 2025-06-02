package com.nlu.petstore.security;

import com.nlu.petstore.entity.Role;
import com.nlu.petstore.entity.User;
import com.nlu.petstore.repository.RoleRepository;
import com.nlu.petstore.repository.UserRepository;
import com.nlu.petstore.response.AuthProviderConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Map;
import java.util.Optional;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;

    public OAuth2User  loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        String email =  oAuth2User.getAttribute("email");
        String name =  oAuth2User.getAttribute("name");

        if (email == null) {
            throw new OAuth2AuthenticationException("Email không tồn tại trong thông tin tài khoản Google");
        }
        Optional<User> userOptional = userRepository.findByEmail(email);
        User user;
        if(userOptional.isPresent()) {
            user = userOptional.get();//Đã có user
            if (user.getProvider() == null) {
                user.setProvider(AuthProviderConstants.GOOGLE);
                userRepository.save(user);
            }
        }else{
            //Chưa có thì tạo mới
            Role userRole = roleRepository.findByRoleName("USER")
                    .orElseThrow(()-> new RuntimeException("Không tìm thấy Role name là USER"));

            user = User.builder()
                    .email(email)
                    .fullname(name)
                    .username(email)
                    .password("")
                    .provider(AuthProviderConstants.GOOGLE)
                    .role(userRole)
                    .build();
            userRepository.save(user);
        }
        return new CustomerOAuth2User(
                new DefaultOAuth2User(
                        Collections.singleton(new SimpleGrantedAuthority("ROLE_" + user.getRole().getRoleName())),
                        oAuth2User.getAttributes(),
                        "email"
                )
        );
    }
}
