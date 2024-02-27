package com.socialnetwork.socialnetworkapi.service;

import com.socialnetwork.socialnetworkapi.dao.repository.ChatRepository;
import com.socialnetwork.socialnetworkapi.dao.service.MessageService;
import com.socialnetwork.socialnetworkapi.dto.chat.ChatCreationRequest;
import com.socialnetwork.socialnetworkapi.dto.chat.ChatIdAndUserDTO;
import com.socialnetwork.socialnetworkapi.model.User;
import com.socialnetwork.socialnetworkapi.model.chat.Chat;
import com.socialnetwork.socialnetworkapi.model.chat.Message;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Transactional
public class DefaultChatService implements MessageService {
    private final ChatRepository chatRepository;
    @Autowired
    public DefaultChatService(ChatRepository chatRepository) {
        this.chatRepository = chatRepository;
    }

    @Override
    public Chat createChat(ChatCreationRequest request) {
        Chat chat = new Chat();
        chat.setUser(request.getUserRequest());
        chat.setCreator(request.getCreator());
        chat = chatRepository.save(chat);
//         chatRepository.createChat(request.getUserRequest().getId(), request.getCreator().getId());
        return chat;
    }

    @Override
    public Set<Chat> getChatsByUser(Optional<User> user) {
        return new HashSet<>(chatRepository.findChatsByUser(user));
    }
    @Override
    public List<Message> getLastMessagesInEachChat(Optional<User> user, Pageable pageable) {
        return chatRepository.getLastMessagesInEachChat(user, pageable);
    }

    @Override
    public void deleteChatById(@Param("id") UUID id){
        chatRepository.deleteChatById(id);
    }

    @Override
    public Optional<Chat> findChatByIdAndUser(ChatIdAndUserDTO request) {
        return chatRepository.findChatByIdAndUser(request.getChatId(), request.getUser());
    }

    public Set<Chat> getChatsByCreator(Optional<User> user) {
        return new HashSet<>(chatRepository.findChatsByCreator(user));
    }

    public boolean chatExistsBetweenUsers(User user1, User user2) {
        return chatRepository.existsByUserAndCreator(user1, user2) || chatRepository.existsByUserAndCreator(user2, user1);
    }
}
