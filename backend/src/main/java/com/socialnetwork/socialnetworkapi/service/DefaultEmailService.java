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
    public void sendSimpleMessage(String toAdress, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(mailLogin);
//        message.setFrom("noreply@baeldung.com"); // "Некоторые smtp сервера могуть откланить запрос, поєтому указываем не существующую почту"
        message.setTo(toAdress);
        message.setSubject(subject);
        message.setText(text);
        message.getSentDate();
        emailSender.send(message);
    }
    @Override // Отправка с конкретным сюжетом
    public void sendMessageWithAttachment(String to, String subject, String text, String pathToAttachment) throws MessagingException {
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setFrom("noreply@baeldung.com");
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(text);

        FileSystemResource file = new FileSystemResource(new File(pathToAttachment));
        helper.addAttachment("Invoice", file);

        emailSender.send(message);
    }

}

