package com.socialnetwork.socialnetworkapi.service;

import com.socialnetwork.socialnetworkapi.dao.repository.ChatRepository;
import com.socialnetwork.socialnetworkapi.dao.service.MessageService;
import com.socialnetwork.socialnetworkapi.model.User;
import com.socialnetwork.socialnetworkapi.model.chat.Chat;
import com.socialnetwork.socialnetworkapi.model.chat.Message;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;


@Service
public class DefaultChatService implements MessageService {
    private final ChatRepository chatRepository;
    @Autowired
    public DefaultChatService(ChatRepository chatRepository) {
        this.chatRepository = chatRepository;
    }

    @Override
    public Chat createChat(User creator, String chatTitle) {
        Chat chat = new Chat();
        chat.setCreator(creator);
        chat.setTitle(chatTitle);
//        chat.getParticipants().add(creator);
        return chatRepository.save(chat);
    }
    @Override
    public void addUserToChat(User user, Chat chat) {
        if (chat.getParticipants() == null) {
            chat.setParticipants(new HashSet<>());
        }

        chat.getParticipants().add(user); // Вот причина проблемы uuid == null
        chatRepository.save(chat);
    }

    @Override
    public Set<Chat> getChatsByUser(User user) {
        return chatRepository.findByParticipantsContaining(user);
    }

    @Override
    public Set<User> getParticipantsOfChat(Chat chat) {
        return new HashSet<>(chat.getParticipants());
    }

    @Override
    public Set<Message> getMessagesFromChat(Chat chat) {
        return chatRepository.findById(chat.getId()).orElseThrow().getMessages();
    }

    @Override
    public void sendMessage(User sender, Chat chat, String messageContent) {
        Message message = new Message();
        message.setSender(sender);
        message.setContent(messageContent);
        message.setTimestamp(new Date()); // Устанавливаем временную метку сообщения

        chat.getMessages().add(message);
        chatRepository.save(chat);
    }

    @Override
    public void removeUserFromChat(User user, Chat chat) {
        chat.getParticipants().remove(user);
        chatRepository.save(chat);
    }

}
