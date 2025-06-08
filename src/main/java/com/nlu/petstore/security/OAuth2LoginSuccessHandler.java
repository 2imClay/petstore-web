package com.nlu.petstore.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nlu.petstore.entity.RefreshToken;
import com.nlu.petstore.entity.Role;
import com.nlu.petstore.entity.User;
import com.nlu.petstore.repository.RoleRepository;
import com.nlu.petstore.repository.UserRepository;
import com.nlu.petstore.response.AuthProviderConstants;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private RefreshTokenService  refreshTokenService;
    private final ObjectMapper objectMapper;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;
        OAuth2User oauth2User = oauthToken.getPrincipal();

        String registrationId = oauthToken.getAuthorizedClientRegistrationId();

        String email = oauth2User.getAttribute("email");
        String name =  oauth2User.getAttribute("name");

        if (email == null) {
            throw new RuntimeException("Không lấy được email từ OAuth2 provider.");
        }

        Optional<User> opUser =  userRepository.findByEmail(email);
        User user;

        if(opUser.isEmpty()){
            Role defaultRole = roleRepository.findByRoleName("USER")
                    .orElseThrow(()->new RuntimeException("ROLE không tồn tại"));
            user = User.builder()
                    .email(email)
                    .fullname(name)
                    .provider(registrationId.equalsIgnoreCase("google")
                            ? AuthProviderConstants.GOOGLE
                            : AuthProviderConstants.FACEBOOK)
                    .role(defaultRole)
                    .build();
            userRepository.save(user);
        }else{
            user =  opUser.get();
        }
        String accessToken = jwtService.generateToken(user);
        RefreshToken refreshToken = refreshTokenService.createRefreshTokenWithOAuth2(user);

        //  Redirect về frontend với accessToken + refreshToken
        String redirectUri = "http://localhost:3000/oauth2/redirect"
                + "?accessToken=" + accessToken
                + "&refreshToken=" + refreshToken.getRefreshToken();

        response.sendRedirect(redirectUri);

    }
}
