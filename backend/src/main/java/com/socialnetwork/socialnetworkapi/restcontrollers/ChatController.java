package com.socialnetwork.socialnetworkapi.restcontrollers;

import com.socialnetwork.socialnetworkapi.dao.repository.UserRepository;
import com.socialnetwork.socialnetworkapi.dto.chat.*;
import com.socialnetwork.socialnetworkapi.model.User;
import com.socialnetwork.socialnetworkapi.model.chat.Chat;
import com.socialnetwork.socialnetworkapi.model.chat.Message;
import com.socialnetwork.socialnetworkapi.service.DefaultChatService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.*;

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

    @Operation(summary = "Создание чата")
    @PostMapping("/create") //201
    public ResponseEntity<ChatIdDto> createChat(@RequestBody ChatCreationRequest request) {
        User userRequestId = request.getUserRequest();
        User creatorId = request.getCreator();

        // Проверяем, что чат между указанными пользователями уже не существует
        if (chatService.chatExistsBetweenUsers(userRequestId, creatorId)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }

        Chat chat = chatService.createChat(request);
        ChatIdDto chatIdDto = new ChatIdDto();
        chatIdDto.setChatId(chat.getId());
        return ResponseEntity.status(HttpStatus.CREATED).body(chatIdDto);
    }
    @Operation(summary = "Получение чатов текущего пользователя")
    @GetMapping("/getChatsByCurrentUser") //201
    public ResponseEntity<Set<ChatDto>> getChatsByCurrentUser(@AuthenticationPrincipal UserDetails userDetails, Pageable pageable) {
        String username = userDetails.getUsername();
        Optional<User> user = userRepository.findByUserName(username);
        if (user.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Set<Chat> chats = chatService.getChatsByUser(user);
        Set<Chat> creatorChats = chatService.getChatsByCreator(user);
        chats.addAll(creatorChats);

        Set<ChatDto> chatDtos = new HashSet<>();
        for (Chat chat : chats) {
            ChatDto chatDto = new ChatDto();
            chatDto.setId(chat.getId());

            // Здесь получаем последнее сообщение для каждого чата
            List<Message> lastMessage = chatService.getLastMessagesInEachChat(user, pageable);
            if (!lastMessage.isEmpty()) {
                chatDto.setLastMessage(lastMessage.get(0).getContent());
            }
            chatDtos.add(chatDto);
        }

        return ResponseEntity.ok().body(chatDtos);
    }
    @Operation(summary = "Получение последних сообщений в каждом чате")
    @GetMapping("/getLastMessagesInEachChats")
    public ResponseEntity<List<Message>> getLastMessagesInEachChat(@AuthenticationPrincipal UserDetails userDetails, Pageable pageable) {
        String username = userDetails.getUsername();
        Optional<User> user = userRepository.findByUserName(username);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        List<Message> messages = chatService.getLastMessagesInEachChat(user, pageable);
        return ResponseEntity.ok().body(messages);
    }
    @Operation(summary = "Удаление чата по идентификатору")
    @DeleteMapping("/{id}") //200
    public ResponseEntity<Void> deleteChatById(@PathVariable("id") UUID id) {
        chatService.deleteChatById(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Поиск чата по идентификатору и пользователю")
    @GetMapping("/{id}") //200
    public ResponseEntity<Chat> findChatByIdAndUser(@AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();
        Optional<User> user = userRepository.findByUserName(username);
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
