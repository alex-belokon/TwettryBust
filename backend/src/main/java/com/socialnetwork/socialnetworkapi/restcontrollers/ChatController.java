package com.socialnetwork.socialnetworkapi.restcontrollers;

import com.socialnetwork.socialnetworkapi.dto.chat.*;
import com.socialnetwork.socialnetworkapi.model.User;
import com.socialnetwork.socialnetworkapi.model.chat.Chat;
import com.socialnetwork.socialnetworkapi.model.chat.Message;
import com.socialnetwork.socialnetworkapi.service.DefaultChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/chat")
public class ChatController {
    private final DefaultChatService chatService;

    @Autowired
    public ChatController(DefaultChatService chatService) {
        this.chatService = chatService;
    }

    @PostMapping("/create")
    public Chat createChat(@RequestBody ChatCreationRequest request) {
        return chatService.createChat(request.getCreator(),request.getTitle());
    }

    @PostMapping("/addUser")
    public void addUserToChat(@RequestBody UserChatRequest request) {
        chatService.addUserToChat(request.getUser(), request.getChat());
    }

    @GetMapping("/getChatsByUser")
    public Set<Chat> getChatsByUser(@RequestBody ChatsByUserRequest request) {
        return chatService.getChatsByUser(request.getUser());
    }

    @GetMapping("/getMessagesFromChat")
    public Set<Message> getMessagesFromChat(@RequestBody MessagesFromChatRequest request) {
        return chatService.getMessagesFromChat(request.getChat());
    }
    @GetMapping("/sendMessage")
    public void sendMessage(@RequestBody MessageRequest request){
        chatService.sendMessage(request.getSender(),request.getChat(),request.getMessageContent());
    }
    @GetMapping("/removeUserFromChat")
    public void removeUserFromChat(@RequestBody UserChatRequest request){
        chatService.removeUserFromChat(request.getUser(), request.getChat());
    }
    @GetMapping("/ParticipantsOfChat")
    public Set<User> getParticipantsOfChat(@RequestBody Chat chat) {
        return chat.getParticipants();
    }
}