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

    @PostMapping("/send-email")
    public ResponseEntity<String> sendEmail(@RequestBody EmailRequest emailRequest) {
        try {
            emailService.sendSimpleMessage(emailRequest.getTo(), emailRequest.getSubject(), emailRequest.getMessage());
            return ResponseEntity.ok("Email sent successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to send email: " + e.getMessage());
        }
    }

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
//Мне нужно отправлять сообщение с подтвержденеим
// аккаунта через рест контроллер почты,
// или сразу в классе аутентификации, после регистрации?

//Отправка сразу после регистрации: Выбрал этот способ
//
//Преимущества:
//Может уменьшить задержки между регистрацией и получением пользователем подтверждения, что может быть важно для пользовательского опыта.
//Может упростить код, связанный с отправкой электронной почты, и обеспечить более прямое взаимодействие с процессом регистрации.
//Недостатки:
//Может усложнить код класса аутентификации и регистрации, делая его более связанным с различными аспектами приложения.
//Может вызвать дублирование кода, если процесс регистрации используется в нескольких частях приложения.

//Отправка через рест контроллер почты:
//
//Преимущества:
//Легко добавить дополнительную логику обработки и отправки электронной почты в отдельном месте, что упрощает поддержку и разделение обязанностей.
//Может быть удобно для масштабирования или повторного использования кода в других частях приложения.
//Недостатки:
//Может вызвать дополнительные задержки, особенно если отправка электронной почты происходит асинхронно или через внешний сервис.
//Может увеличить сложность кода и управления зависимостями.