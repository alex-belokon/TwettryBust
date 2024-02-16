package com.socialnetwork.socialnetworkapi.dao.service;

import com.socialnetwork.socialnetworkapi.dto.chat.ChatCreationRequest;
import com.socialnetwork.socialnetworkapi.dto.chat.ChatIdAndUserDTO;
import com.socialnetwork.socialnetworkapi.model.User;
import com.socialnetwork.socialnetworkapi.model.chat.Chat;
import com.socialnetwork.socialnetworkapi.model.chat.Message;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

public interface MessageService {
//    Chat createChat(User creator, User creator2);

    void createChat(ChatCreationRequest request);

    Set<Chat> getChatsByUser(User user);

    List<Message> getLastMessagesInEachChat(User user, Pageable pageable);

    void deleteChatById(@Param("id") UUID id);

    Optional<Chat> findChatByIdAndUser(@RequestBody ChatIdAndUserDTO request);
}