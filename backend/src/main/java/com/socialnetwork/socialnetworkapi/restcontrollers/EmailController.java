package com.socialnetwork.socialnetworkapi.restcontrollers;

import com.socialnetwork.socialnetworkapi.dto.email.AccountConfirmationRequest;
import com.socialnetwork.socialnetworkapi.dto.email.EmailRequest;
import com.socialnetwork.socialnetworkapi.service.DefaultEmailService;
import org.apache.juli.logging.Log;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/email")
public class EmailController {

    private final DefaultEmailService emailService;
    private static final Logger log = LoggerFactory.getLogger(EmailController.class);

    @Autowired
    public EmailController(DefaultEmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping("/send-email")
    public ResponseEntity<String> sendEmail(@RequestBody EmailRequest emailRequest) {
        try {
            emailService.sendSimpleMessage(emailRequest.getTo(), emailRequest.getSubject(), emailRequest.getMessage());
            return ResponseEntity.ok("Email sent successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to send email: " + e.getMessage());
        }
    }

    @PostMapping("/confirm-account")
    public ResponseEntity<String> sendConfirmationEmail(@RequestBody AccountConfirmationRequest confirmationRequest) {
        try {
            String confirmationLink = generateConfirmationLink(confirmationRequest.getEmail());
            String message = "Для подтверждения аккаунта перейдите по ссылке: " + confirmationLink;
            emailService.sendSimpleMessage(confirmationRequest.getEmail(), "Подтверждение аккаунта", message);
            return ResponseEntity.ok("Email sent successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to send email: " + e.getMessage());
        }
    }
    private String generateConfirmationLink(String email) {
        // Генерация UUID
        UUID uuid = UUID.randomUUID();
        // Формирование ссылки с UUID и адресом электронной почты
        return "http://localhost/confirm?token=" + uuid + "&email=" + email;
    }

}
