package com.socialnetwork.socialnetworkapi.service;

import com.socialnetwork.socialnetworkapi.dao.repository.ChatRepository;
import com.socialnetwork.socialnetworkapi.dao.service.MessageService;
import com.socialnetwork.socialnetworkapi.dto.chat.ChatCreationRequest;
import com.socialnetwork.socialnetworkapi.dto.chat.ChatIdAndUserDTO;
import com.socialnetwork.socialnetworkapi.model.User;
import com.socialnetwork.socialnetworkapi.model.chat.Chat;
import com.socialnetwork.socialnetworkapi.model.chat.Message;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Transactional
@RequiredArgsConstructor
public class DefaultChatService implements MessageService {
    private final ChatRepository chatRepository;

    @Override
    public Chat createChat(ChatCreationRequest request) {
        Chat chat = new Chat();
        chat.setUser(request.getUserRequest());
        chat.setCreator(request.getCreator());
        chat = chatRepository.save(chat);
        return chat;
    }

    @Override
    public Set<Chat> getChatsByUser(Optional<User> user) {
        return new HashSet<>(chatRepository.findChatsByUser(user));
    }

    @Override
    public void deleteChatById(@Param("id") UUID id){
        chatRepository.deleteChatById(id);
    }

    @Override
    public List<Message> findTopByChatIdOrderByDateDesc(UUID chatId, Pageable pageable) {
        return chatRepository.findTopByChatIdOrderByDateDesc(chatId, pageable);
    }

    @Override
    public Optional<Chat> findChatByIdAndUser(ChatIdAndUserDTO request) {
        return chatRepository.findChatByIdAndUser(request.getChatId(), request.getUser());
    }

    public Set<Chat> getChatsByCreator(Optional<User> user) {
        return new HashSet<>(chatRepository.findChatsByCreator(user));
    }


    @Override
    public Chat chatExistsBetweenUsers(User user1, User user2) {
        Optional<Chat> chatOptional = chatRepository.findChatByUserAndCreator(user1, user2);
        return chatOptional.orElse(null);
    }

}
