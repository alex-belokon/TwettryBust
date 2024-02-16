package com.socialnetwork.socialnetworkapi.dao.service;

import com.socialnetwork.socialnetworkapi.model.chat.Message;

import java.util.List;
import java.util.UUID;

public interface MessagesTableService {
    List<Message> getAllMessages();

    Message getMessageById(UUID id);

    Message updateMessage(UUID id, Message updatedMessage);

    void deleteMessage(UUID id);

    // Дополнительные методы
    List<Message> getAllMessagesByChatId(UUID chatId);

    List<Message> getAllMessagesBySenderId(UUID senderId);

    List<Message> getAllMessagesContainingKeyword(String keyword);

    long countMessagesByChatId(UUID chatId);

    void deleteMessagesByChatId(UUID chatId);

    Message saveMessage(Message message);
}