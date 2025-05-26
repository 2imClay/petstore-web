package com.nlu.petstore.exception;

import com.nlu.petstore.security.JwtService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class CustomOAuth2SuccessHandler implements AuthenticationSuccessHandler {
    private final JwtService  jwtService;

    public CustomOAuth2SuccessHandler(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response
            , Authentication authentication) throws IOException {
        OAuth2User  oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email =  oAuth2User.getAttribute("email");
        String token = jwtService.generateTokenFromEmail(email);

        response.sendRedirect("http:localhost:3000/oauth2/redirect?token=" + token);


    }
}
