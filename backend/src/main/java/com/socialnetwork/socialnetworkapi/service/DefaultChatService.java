package com.socialnetwork.socialnetworkapi.service;

import com.socialnetwork.socialnetworkapi.dao.repository.ChatRepository;
import com.socialnetwork.socialnetworkapi.dao.service.MessageService;
import com.socialnetwork.socialnetworkapi.dto.chat.ChatCreationRequest;
import com.socialnetwork.socialnetworkapi.model.User;
import com.socialnetwork.socialnetworkapi.model.chat.Chat;
import com.socialnetwork.socialnetworkapi.model.chat.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
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
    public void createChat(ChatCreationRequest request) {
//        Chat chat = new Chat();
//        chat.setUser(request.getCreatorId());
//        chat.setUser(request.getUserRequestId());
//        return chatRepository.save(chat);
        chatRepository.createChat(request.getUserRequestId(),request.getCreatorId());
    }

    @Override
    public Set<Chat> getChatsByUser(User user) {
        return new HashSet<>(chatRepository.findChatsByUser(user));
    }
    @Override
    public List<Message> getLastMessagesInEachChat(User user, Pageable pageable) {
        return chatRepository.getLastMessagesInEachChat(user, pageable);
    }

    @Override
    public Chat deleteChatById(@Param("id") UUID id){
        return chatRepository.deleteChatById(id);
    }

    @Override
    public Optional<Chat> findChatByIdAndUser(@Param("id") UUID id, @Param("user") User user){
        return chatRepository.findChatByIdAndUser(id, user);
    }
}
