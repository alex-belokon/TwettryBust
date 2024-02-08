package com.socialnetwork.socialnetworkapi.dao.service;

import com.socialnetwork.socialnetworkapi.model.User;
import com.socialnetwork.socialnetworkapi.model.chat.Chat;
import com.socialnetwork.socialnetworkapi.model.chat.Message;

import java.util.List;
import java.util.Set;

public interface MessageService {
    Chat createChat(User creator, String chatTitle);
    void addUserToChat(User user, Chat chat);
    Set<Chat> getChatsByUser(User user);
    Set<User> getParticipantsOfChat(Chat chat);
    void sendMessage(User sender, Chat chat, String messageContent);
    Set<Message> getMessagesFromChat(Chat chat);
    void removeUserFromChat(User user, Chat chat);
}
