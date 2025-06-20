package com.nlu.petstore.controller;

import com.nlu.petstore.DTO.ContactDTO;
import com.nlu.petstore.DTO.MailBody;
import com.nlu.petstore.service.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    @Autowired
    private MailService emailService;

    @PostMapping
    public ResponseEntity<String> sendContact(@RequestBody ContactDTO contact) {
        String subject = "[Liên hệ] " + contact.getSubject();
        String body = "Tên: " + contact.getName() + "\n"
                + "Email: " + contact.getEmail() + "\n"
                + "Nội dung:\n" + contact.getMessage();

        MailBody mailBody = new MailBody("taitanvo16@gmail.com",subject, body);

        // Gửi mail về shop
        emailService.sendSimpleMessage(mailBody);

        return ResponseEntity.ok("OK");
    }
}
