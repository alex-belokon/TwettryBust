package com.socialnetwork.socialnetworkapi.service;

import com.socialnetwork.socialnetworkapi.dao.repository.MessagesTableRepository;
import com.socialnetwork.socialnetworkapi.dao.service.MessagesTableService;
import com.socialnetwork.socialnetworkapi.model.chat.Message;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class DefaultMessagesTableService implements MessagesTableService {

    private final MessagesTableRepository messagesTableRepository;

    public DefaultMessagesTableService(MessagesTableRepository messagesTableRepository) {
        this.messagesTableRepository = messagesTableRepository;
    }

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
        existingMessage.setSenderId(updatedMessage.getSenderId());

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
    @Override

    public long countMessagesByChatId(UUID chatId) {
        return messagesTableRepository.countByChatId(chatId);
    }
    @Override
    public void deleteMessagesByChatId(UUID chatId) {
        messagesTableRepository.deleteByChatId(chatId);
    }
    @Override

    public Message saveMessage(Message message) {
        return messagesTableRepository.save(message);
    }
}
