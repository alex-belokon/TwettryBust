package com.socialnetwork.socialnetworkapi.restcontrollers;

import com.socialnetwork.socialnetworkapi.dao.repository.UserRepository;
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

import java.security.Principal;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
@RestController
@RequestMapping("/api/chat")
public class ChatController {
    private final DefaultChatService chatService;
    private final UserRepository userRepository;

    @Autowired
    public ChatController(DefaultChatService chatService, UserRepository userRepository) {
        this.chatService = chatService;
        this.userRepository = userRepository;
    }

    @PostMapping("/create") //201
    public ResponseEntity<Void> createChat(@RequestBody ChatCreationRequest request) {
        chatService.createChat(request);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }


    @GetMapping("/getChatsByCurrentUser")
    public ResponseEntity<Set<Chat>> getChatsByCurrentUser(Principal principal) {
        Optional<User> emailUser = userRepository.findByEmail(principal.getName());
        if (emailUser.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Set<Chat> chats = chatService.getChatsByUser(emailUser);
        return ResponseEntity.ok().body(chats);
    }

    @GetMapping("/getLastMessagesInEachChats")
    public ResponseEntity<List<Message>> getLastMessagesInEachChat(Principal principal, Pageable pageable) {
        Optional<User> user = userRepository.findByEmail(principal.getName());
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        List<Message> messages = chatService.getLastMessagesInEachChat(user.get(), pageable);
        return ResponseEntity.ok().body(messages);
    }

    @DeleteMapping("/{id}") //200
    public ResponseEntity<Void> deleteChatById(@PathVariable("id") UUID id) {
        chatService.deleteChatById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}") //200
    public ResponseEntity<Chat> findChatByIdAndUser(Principal principal) {
        Optional<User> user = userRepository.findByEmail(principal.getName());
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        ChatIdAndUserDTO chatIdAndUserDTO = new ChatIdAndUserDTO();
        chatIdAndUserDTO.setChatId(user.get().getId());
        chatIdAndUserDTO.setUser(user.get());
        Optional<Chat> chatOptional = chatService.findChatByIdAndUser(chatIdAndUserDTO);
        return chatOptional.map(chat -> ResponseEntity.ok().body(chat))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
