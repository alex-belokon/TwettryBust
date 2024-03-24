package com.socialnetwork.socialnetworkapi.service;

import com.socialnetwork.socialnetworkapi.dao.repository.MessagesTableRepository;
import com.socialnetwork.socialnetworkapi.dao.service.MessagesTableService;
import com.socialnetwork.socialnetworkapi.model.chat.Message;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class DefaultMessagesTableService implements MessagesTableService {

    private final MessagesTableRepository messagesTableRepository;

    @Override
    public List<Message> getAllMessages() {
        return messagesTableRepository.findAll();
    }

    @Override
    public Message getMessageById(UUID id) {
        return messagesTableRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Message not found with id: " + id));
    }

    @Override
    public Message updateMessage(UUID id, Message updatedMessage) {
        Message existingMessage = messagesTableRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Message not found with id: " + id));

        // Обновляем данные существующего сообщения
        existingMessage.setContent(updatedMessage.getContent());
        existingMessage.setDate(updatedMessage.getDate());
        existingMessage.setSender(updatedMessage.getSender());

        // Сохраняем обновленное сообщение и возвращаем его
        return messagesTableRepository.save(existingMessage);
    }

    @Override
    public void deleteMessage(UUID id) {
        messagesTableRepository.deleteById(id);
    }

    @Override
    public List<Message> getAllMessagesByChatId(UUID chatId) {
        return messagesTableRepository.findByChatId(chatId);
    }

    @Override
    public List<Message> getAllMessagesBySenderId(UUID senderId) {
        return messagesTableRepository.findBySenderId(senderId);
    }

    @Override
    public List<Message> getAllMessagesContainingKeyword(String keyword) {
        return messagesTableRepository.findByContentContaining(keyword);
    }
    @Transactional
    @Override
    public void markAllMessagesInChatAsReadByUser(UUID chatId, UUID userId) {
        try {
            messagesTableRepository.markAllMessagesInChatAsReadByUser(chatId, userId);
        } catch (Exception e) {
            log.warn("Could not mark all messages");
        }
    }

    @Override
    public long countMessagesByChatId(UUID chatId) {
        return messagesTableRepository.countByChatId(chatId);
    }

    @Override
    public void deleteMessagesByChatId(UUID chatId) {
        messagesTableRepository.deleteById(chatId);
    }

    @Override
    public Message saveMessage(Message message) {
        return messagesTableRepository.save(message);
    }
}
