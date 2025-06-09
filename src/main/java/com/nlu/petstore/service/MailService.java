package com.nlu.petstore.service;

import com.nlu.petstore.DTO.MailBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.handler.BeanNameUrlHandlerMapping;

@Service
public class MailService {

    @Autowired
    private final JavaMailSender mailSender;
    private final BeanNameUrlHandlerMapping beanNameUrlHandlerMapping;

    public MailService(JavaMailSender mailSender, BeanNameUrlHandlerMapping beanNameUrlHandlerMapping) {
        this.mailSender = mailSender;
        this.beanNameUrlHandlerMapping = beanNameUrlHandlerMapping;
    }
    
    public void sendSimpleMessage(MailBody mailBody){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(mailBody.to());
        message.setSubject(mailBody.subject());
        message.setText(mailBody.text());

        mailSender.send(message);

    }
}
