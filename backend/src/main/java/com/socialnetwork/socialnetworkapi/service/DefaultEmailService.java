package com.socialnetwork.socialnetworkapi.service;

import com.socialnetwork.socialnetworkapi.dao.service.EmailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.File;

@Service
public class DefaultEmailService implements EmailService {
    @Value("${mail.signing.login}")
    private String mailLogin;

    public final JavaMailSender emailSender;

    public DefaultEmailService(JavaMailSender emailSender) {
        this.emailSender = emailSender;
    }

    @Override // Отправка с простым сообщением
    public void sendSimpleMessage(String toAddress, String subject, String text) {
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        try {
            helper.setFrom(mailLogin);
            helper.setTo(toAddress);
            helper.setSubject(subject);
            helper.setText(text);

            emailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace(); // Обработайте ошибку отправки почты
        }
    }

    @Override // Отправка с конкретным сюжетом
    public void sendMessageWithAttachment(String to, String subject, String text, String pathToAttachment) throws MessagingException {
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setFrom(mailLogin);
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(text);

        // Добавление вложения
        File attachment = new File(pathToAttachment);
        helper.addAttachment(attachment.getName(), attachment);

        emailSender.send(message);
    }

    public void sendAccountConfirmationEmail(String to, String confirmationToken) {
        String subject = "Account Confirmation";
        String body = "Thank you for registering with us!\n"
                + "Please click on the following link to confirm your account:\n"
                + "http://localhost:9000/api/email/confirm-account?token=" + confirmationToken
                + "&email=" + to;
        sendSimpleMessage(to, subject, body);
    }

    public void sendResetTokenEmail(String userEmail, String tokenValue) {
        String subject = "Password Reset";
        String body = "Dear User,\n\n"
                + "You have requested a password reset. Please click on the following link to reset your password:\n"

                + "http://localhost:5173/reset-password?token=" + tokenValue

                + "\n\nIf you didn't request a password reset, please ignore this email.\n\nBest regards,\nThe Social Network Team";

        sendSimpleMessage(userEmail, subject, body);
    }


}

