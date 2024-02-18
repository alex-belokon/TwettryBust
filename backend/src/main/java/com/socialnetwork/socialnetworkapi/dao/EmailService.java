package com.socialnetwork.socialnetworkapi.dao;

import jakarta.mail.MessagingException;

public interface EmailService {

    void sendSimpleMessage(String toAdress, String subject, String text);

    void sendMessageWithAttachment(String to, String subject, String text, String pathToAttachment) throws MessagingException;
}