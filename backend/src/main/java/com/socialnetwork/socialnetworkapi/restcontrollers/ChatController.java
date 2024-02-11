package com.socialnetwork.socialnetworkapi.restcontrollers;

import com.socialnetwork.socialnetworkapi.dto.chat.*;
import com.socialnetwork.socialnetworkapi.model.User;
import com.socialnetwork.socialnetworkapi.model.chat.Chat;
import com.socialnetwork.socialnetworkapi.model.chat.Message;
import com.socialnetwork.socialnetworkapi.service.DefaultChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<?> createChat(@RequestBody ChatCreationRequest request) {
        chatService.createChat(request);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/getChatsByUser")
    public ResponseEntity<Set<Chat>> getChatsByUser(@RequestBody ChatsByUserRequest request) {
        Set<Chat> chats = chatService.getChatsByUser(request.getUser());
        return ResponseEntity.ok().body(chats);
    }
    @GetMapping("/getLastMessagesInEachChats")
    public ResponseEntity<List<Message>> getLastMessagesInEachChat(User user, Pageable pageable) {
        List<Message> messages = chatService.getLastMessagesInEachChat(user, pageable);
        return ResponseEntity.ok().body(messages);

    }

}
