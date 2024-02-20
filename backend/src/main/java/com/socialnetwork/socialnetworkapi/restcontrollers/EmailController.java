package com.socialnetwork.socialnetworkapi.restcontrollers;

import com.socialnetwork.socialnetworkapi.dto.email.EmailRequest;
import com.socialnetwork.socialnetworkapi.service.AccountConfirmationService;
import com.socialnetwork.socialnetworkapi.service.DefaultEmailService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;


@RestController
@RequestMapping("/api/email")
public class EmailController {

    private final DefaultEmailService emailService;
    private final AccountConfirmationService accountConfirmationService;

    @Autowired
    public EmailController(DefaultEmailService emailService, AccountConfirmationService accountConfirmationService) {
        this.emailService = emailService;
        this.accountConfirmationService = accountConfirmationService;
    }

    // Отправка электронного сообщения с подтверждением аккаунта
    // сразу после регистрации пользователя
    @PostMapping("/send-email")
    public ResponseEntity<String> sendEmail(@RequestBody EmailRequest emailRequest) {
        try {
            emailService.sendSimpleMessage(emailRequest.getTo(), emailRequest.getSubject(), emailRequest.getMessage());
            return ResponseEntity.ok("Email sent successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to send email: " + e.getMessage());
        }
    }

    // Подтверждение аккаунта через ссылку, отправляемую по электронной почте

    @GetMapping("/confirm-account")
    public ResponseEntity<String> confirmAccount(HttpServletResponse response, @RequestParam("token") String token, @RequestParam("email") String email) throws IOException {
        // Проверка валидности токена и email
        if (accountConfirmationService.isValidToken(token, email)) {
            // Установка confirmed в true для пользователя с данным email
            accountConfirmationService.confirmAccount(email);
            response.sendRedirect("/api/auth/sign-in"); // TODO: скорейтируй ссылку
            return ResponseEntity.ok("Account confirmed successfully!"); // Редирект на страницу логина
        } else {
            return ResponseEntity.badRequest().body("Invalid token or email.");
        }
    }
}