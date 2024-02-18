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
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
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

//    @GetMapping("/getChatsByUser")
//    public ResponseEntity<Set<Chat>> getChatsByUser(@AuthenticationPrincipal UserDetails userDetails) {
//        Optional<User> user = userRepository.findByUserName(userDetails.getUsername());
//        if (user.isEmpty()) {
//            return ResponseEntity.notFound().build();
//        }
//        Set<Chat> chats = chatService.getChatsByUser(user);
//        return ResponseEntity.ok().body(chats);
//    }
    @GetMapping("/getChatsByCurrentUser")
    public ResponseEntity<Set<Chat>> getChatsByCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<User> user = userRepository.findByUserName(username);
        if (user.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Set<Chat> chats = chatService.getChatsByUser(user);
        return ResponseEntity.ok().body(chats);
    }

    @GetMapping("/getChatsByCurrentUser2")
    public ResponseEntity<Set<Chat>> getChatsByCurrentUser2(Principal principal) {
        Optional<User> emailUser = userRepository.findByEmail(principal.getName());
        if (emailUser.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Set<Chat> chats = chatService.getChatsByUser(emailUser);
        return ResponseEntity.ok().body(chats);
    }

    @GetMapping("/getLastMessagesInEachChats")
    public ResponseEntity<List<Message>> getLastMessagesInEachChat(@AuthenticationPrincipal UserDetails userDetails, Pageable pageable) {
        Optional<User> user = userRepository.findByUserName(userDetails.getUsername());
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        List<Message> messages = chatService.getLastMessagesInEachChat(user.get(), pageable);
        return ResponseEntity.ok().body(messages);
    }
//    @GetMapping("/getLastMessagesInEachChats")
//    public ResponseEntity<List<Message>> getLastMessagesInEachChat(User user, Pageable pageable) {
//        List<Message> messages = chatService.getLastMessagesInEachChat(user, pageable);
//        return ResponseEntity.ok().body(messages);
//
//    }
//
    @DeleteMapping("/{id}") //200
    public ResponseEntity<Void> deleteChatById(@PathVariable("id") UUID id) {
        chatService.deleteChatById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}") //200
    public ResponseEntity<Chat> findChatByIdAndUser(@RequestParam UUID id, @AuthenticationPrincipal UserDetails userDetails) {
        Optional<User> user = userRepository.findByUserName(userDetails.getUsername());
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        ChatIdAndUserDTO chatIdAndUserDTO = new ChatIdAndUserDTO();
        chatIdAndUserDTO.setChatId(id);
        chatIdAndUserDTO.setUser(user.get());
        Optional<Chat> chatOptional = chatService.findChatByIdAndUser(chatIdAndUserDTO);
        return chatOptional.map(chat -> ResponseEntity.ok().body(chat))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
