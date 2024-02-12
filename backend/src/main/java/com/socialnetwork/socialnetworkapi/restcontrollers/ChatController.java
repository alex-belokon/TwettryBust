package com.socialnetwork.socialnetworkapi.restcontrollers;

import com.socialnetwork.socialnetworkapi.dto.chat.*;
import com.socialnetwork.socialnetworkapi.model.User;
import com.socialnetwork.socialnetworkapi.model.chat.Chat;
import com.socialnetwork.socialnetworkapi.model.chat.Message;
import com.socialnetwork.socialnetworkapi.service.DefaultChatService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
@RestController
@RequestMapping("/api/chat")
public class ChatController {
    private final DefaultChatService chatService;

    @Autowired
    public ChatController(DefaultChatService chatService) {
        this.chatService = chatService;
    }

    @PostMapping("/create")
    public ResponseEntity<Void> createChat(@RequestBody ChatCreationRequest request) {
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
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteChatById(@PathVariable("id") UUID id) {
        chatService.deleteChatById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Chat> findChatByIdAndUser(@PathVariable("id") UUID id, @RequestParam("user") User user) {
        Optional<Chat> chatOptional = chatService.findChatByIdAndUser(id, user);
        return chatOptional.map(chat -> ResponseEntity.ok().body(chat))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
