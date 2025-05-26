package com.nlu.petstore.controller;

import com.nlu.petstore.DTO.MailBody;
import com.nlu.petstore.entity.ForgotPassword;
import com.nlu.petstore.entity.User;
import com.nlu.petstore.repository.ForgotPasswordRepository;
import com.nlu.petstore.repository.UserRepository;
import com.nlu.petstore.response.ChangePassword;
import com.nlu.petstore.service.MailService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.Date;
import java.util.Objects;
import java.util.Random;

@RestController
@RequestMapping("/forgotPassword")
public class ForgotPasswordController {

    private final UserRepository userRepository;
    private final MailService mailService;
    private final ForgotPasswordRepository forgotPasswordRepository;
    private final PasswordEncoder  passwordEncoder;

    public ForgotPasswordController(UserRepository userRepository,
                                    MailService mailService,
                                       ForgotPasswordRepository forgotPasswordRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.mailService = mailService;
        this.forgotPasswordRepository = forgotPasswordRepository;
        this.passwordEncoder = passwordEncoder;
    }
    @PostMapping("/verifyMail/{email}")
    public ResponseEntity<?> verifyMail(@PathVariable String email){
        User user = userRepository.findByEmail(email)
                .orElseThrow(()->new UsernameNotFoundException("Làm ơn nhập email để xác thực"));
        forgotPasswordRepository.deleteAllByUser(user);
        int otp = otpGenerator();
        MailBody mailBody = MailBody.builder()
                .to(email)
                .text("Đây là mã Otp của bạn khi yêu cầu Quên mật khẩu:"+otp)
                .subject("Mã OTP của yêu cầu Quên Mật Khẩu")
                .build();
        ForgotPassword forgotPassword = ForgotPassword.builder()
                .otp(otp)
                .expirationTime(new Date(System.currentTimeMillis()+5*60*1000))
                .user(user)
                .build();
        forgotPasswordRepository.save(forgotPassword);
        mailService.sendSimpleMessage(mailBody);

        return ResponseEntity.ok("Sended");

    }
    @PostMapping("verifyOtp/{otp}/{email}")
    public ResponseEntity<String> verifyOtp(@PathVariable Integer otp, @PathVariable String email){
        User user = userRepository.findByEmail(email)
                .orElseThrow(()->new UsernameNotFoundException("Làm ơn cung cấp email để xác thực"));
        ForgotPassword fp = forgotPasswordRepository.findByOtpAndUser(otp,user)
                .orElseThrow(()-> new RuntimeException("Không hợp lệ"+ email));

        if(fp.getExpirationTime().before(Date.from(Instant.now()))){
                forgotPasswordRepository.deleteById(fp.getFpId());
                return new ResponseEntity<>("OTP đã hết hạn.", HttpStatus.EXPECTATION_FAILED);
        }

        return ResponseEntity.ok("Email sent for verification");

    }

    @PostMapping("/changePassword/{email}")
    public ResponseEntity<String> changPasswordHandler(@RequestBody ChangePassword changePassword
                                                ,@PathVariable String email){
        System.out.println("Password: " + changePassword.newPassword());
        System.out.println("RepeatPassword: " + changePassword.repeatPassword());

        if(!Objects.equals(changePassword.newPassword(),changePassword.repeatPassword())){
            return new  ResponseEntity<>("Vui lòng nhập laij mật khẩu", HttpStatus.EXPECTATION_FAILED);
        }
        String encodePassword = passwordEncoder.encode(changePassword.newPassword());
        userRepository.updatePassword(email,encodePassword);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Không tìm thấy user"));
        forgotPasswordRepository.deleteAllByUser(user);

        return ResponseEntity.ok("Mật khẩu đã đổi thành công!!!");
    }

    private Integer otpGenerator(){
        Random random = new Random();
        return random.nextInt(100_000,999_999);
    }
}
