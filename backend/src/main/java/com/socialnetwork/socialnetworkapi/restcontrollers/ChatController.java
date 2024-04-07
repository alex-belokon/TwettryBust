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
    public ResponseEntity<?> createChat(@RequestBody ChatCreationRequest request) {
        // Проверяем, что чат между указанными пользователями уже не существует, если чат есть то возвращает id
        Chat exsistingChat = chatService.chatExistsBetweenUsers(request.getUserRequest(), request.getCreator());
        if (exsistingChat != null || (exsistingChat = chatService.chatExistsBetweenUsers(request.getCreator(), request.getUserRequest())) != null) {
            ChatDto chatDto = new ChatDto();
            chatDto.setId(exsistingChat.getId());
            chatDto.setLastMessage(null);
            chatDto.setUser(exsistingChat.getUser());
            chatDto.setCreator(exsistingChat.getCreator());
            chatDto.setTimestamp(exsistingChat.getCreatedAt());

            return ResponseEntity.status(HttpStatus.CONFLICT).body(chatDto);
        }

        // Если чат не существует ни в одном из направлений, создаем новый
        Chat chat = chatService.createChat(request);
        ChatDto chatDto = new ChatDto();
        chatDto.setId(chat.getId());
        chatDto.setLastMessage(null);
        chatDto.setUser(chat.getUser());
        chatDto.setCreator(chat.getCreator());
        chatDto.setTimestamp(chat.getCreatedAt());

        return ResponseEntity.status(HttpStatus.CREATED).body(chatDto);
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


//            List<Message> lastMessage = chatService.getLastMessages(chatDto.getId(),  pageable);
//
//            if (!lastMessage.isEmpty()) {
//                chatDto.setLastMessage(lastMessage.get(lastMessage.size() - 1).getContent());
//            }
            List<Message> lastMessageOptional = chatService.findTopByChatIdOrderByDateDesc(chat.getId(), pageable);
            if (!lastMessageOptional.isEmpty()) {
                chatDto.setLastMessage(lastMessageOptional.get(0).getContent());
            }

            chatDto.setUser(chat.getUser());
            chatDto.setCreator(chat.getCreator());
            chatDto.setTimestamp(chat.getCreatedAt());

            chatDtos.add(chatDto);
        }
        return ResponseEntity.ok().body(chatDtos);
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
