package com.socialnetwork.socialnetworkapi.service;

import com.socialnetwork.socialnetworkapi.dao.EmailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
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
                + "http://localhost:9000/confirm?token=" + confirmationToken;
        sendSimpleMessage(to, subject, body);
    }
}

