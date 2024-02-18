package com.socialnetwork.socialnetworkapi.restcontrollers;

import com.socialnetwork.socialnetworkapi.dao.UserRepository;
import com.socialnetwork.socialnetworkapi.dto.email.EmailRequest;
import com.socialnetwork.socialnetworkapi.service.AccountConfirmationService;
import com.socialnetwork.socialnetworkapi.service.DefaultEmailService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/email")
public class EmailController {

    private final DefaultEmailService emailService;
    private final AccountConfirmationService accountConfirmationService;
    private static final Logger log = LoggerFactory.getLogger(EmailController.class);

    @Autowired
    public EmailController(DefaultEmailService emailService, AccountConfirmationService accountConfirmationService) {
        this.emailService = emailService;
        this.accountConfirmationService = accountConfirmationService;
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
    public ResponseEntity<String> confirmAccount(@RequestParam("token") String token, @RequestParam("email") String email) {
        // Проверка валидности токена и email
        if (accountConfirmationService.isValidToken(token, email)) {
            // Установка confirmed в true для пользователя с данным email
            accountConfirmationService.confirmAccount(email);
            return ResponseEntity.ok("Account confirmed successfully!");
        } else {
            return ResponseEntity.badRequest().body("Invalid token or email.");
        }
    }
}
