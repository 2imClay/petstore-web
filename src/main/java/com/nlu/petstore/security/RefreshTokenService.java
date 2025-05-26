package com.nlu.petstore.security;

import com.nlu.petstore.entity.RefreshToken;
import com.nlu.petstore.entity.User;
import com.nlu.petstore.repository.RefreshTokenRepository;
import com.nlu.petstore.repository.UserRepository;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;

@Service
public class RefreshTokenService {

    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;

    public RefreshTokenService(UserRepository userRepository, RefreshTokenRepository refreshTokenRepository) {
        this.userRepository = userRepository;
        this.refreshTokenRepository = refreshTokenRepository;
    }

    public RefreshToken createRefreshToken(String username){
        long refeshTokenValidty = 5*10000;
        User user = userRepository.findByUsername(username)
                .orElseThrow(()->new
                UsernameNotFoundException("Không tìm thấy người dùng với email"+username));
        RefreshToken refreshToken = user.getRefreshToken();
        if(refreshToken ==null){
            refreshToken = RefreshToken.builder()
                    .refreshToken(UUID.randomUUID().toString())
                    .expirationTime(Instant.now().plusMillis(refeshTokenValidty))
                    .user(user)
                    .build();
            refreshTokenRepository.save(refreshToken);
        }
        return refreshToken;
    }

    public RefreshToken verifyRefreshToken(String refreshToken){
       RefreshToken refToken = refreshTokenRepository.findByRefreshToken(refreshToken)
               .orElseThrow(()-> new RuntimeException("Không tìm thấy refresh token."));
       if(refToken.getExpirationTime().compareTo(Instant.now())<0){
           refreshTokenRepository.delete(refToken);
           throw new RuntimeException("Refresh token đã hết hạn.");
       }
       return refToken;
    }

}
