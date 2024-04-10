package com.socialnetwork.socialnetworkapi.restcontrollers;

import com.socialnetwork.socialnetworkapi.dao.repository.UserRepository;
import com.socialnetwork.socialnetworkapi.dto.chat.MessageDTO;
import com.socialnetwork.socialnetworkapi.dto.chat.MessageDTOWithUser;
import com.socialnetwork.socialnetworkapi.model.User;
import com.socialnetwork.socialnetworkapi.model.chat.Message;
import com.socialnetwork.socialnetworkapi.service.DefaultMessagesTableService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/messages")
@MessageMapping
public class MessagesTableController {

    private final DefaultMessagesTableService messagesTableService;
    private final UserRepository userRepository;

    @Autowired
    public MessagesTableController(DefaultMessagesTableService messagesTableService, UserRepository userRepository) {
        this.messagesTableService = messagesTableService;
        this.userRepository = userRepository;
    }

    @Operation(summary = "Получение сообщения по идентификатору")
    @GetMapping("/{id}")
    public ResponseEntity<MessageDTO> getMessageById(@PathVariable UUID id) {
        Message message = messagesTableService.getMessageById(id);
        List<MessageDTO> messageDTOList = convertToDTO(Collections.singletonList(message));
        return new ResponseEntity<>(messageDTOList.get(0), HttpStatus.OK);
    }

    @Operation(summary = "Создание сообщения")
    @PostMapping //200
    public ResponseEntity<MessageDTO> createMessage(@RequestBody MessageDTO messageDTO) {
        Message message = convertToEntity(Collections.singletonList(messageDTO)).get(0);
        Message createdMessage = messagesTableService.saveMessage(message);
        MessageDTO createdMessageDTO = convertToDTO(Collections.singletonList(createdMessage)).get(0);
        createdMessageDTO.setSender(createdMessage.getSender());
        return new ResponseEntity<>(createdMessageDTO, HttpStatus.CREATED);
    }

    @Operation(summary = "Обновление сообщения по идентификатору")
    @PutMapping("/{id}") //201
    public ResponseEntity<MessageDTO> updateMessage(@PathVariable UUID id, @RequestBody MessageDTO updatedMessageDTO) {
        Message updatedMessage = convertToEntity(Collections.singletonList(updatedMessageDTO)).get(0);
        Message message = messagesTableService.updateMessage(id, updatedMessage);
        MessageDTO messageDTO = convertToDTO(Collections.singletonList(message)).get(0);
        return new ResponseEntity<>(messageDTO, HttpStatus.OK);
    }
    @Operation(summary = "Удаление сообщения по идентификатору")
    @DeleteMapping("/{id}") //200
    public ResponseEntity<Void> deleteMessage(@PathVariable UUID id) {
        messagesTableService.deleteMessage(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @Operation(summary = "Получение всех сообщений по идентификатору чата")
    @GetMapping("/byChatId/{chatId}") //200
    public ResponseEntity<List<MessageDTO>> getAllMessagesByChatId(@AuthenticationPrincipal UserDetails userDetails,@PathVariable UUID chatId) {
        List<Message> messages = messagesTableService.getAllMessagesByChatId(chatId);
        String userName = userDetails.getUsername();
        Optional<User> currentUser = userRepository.findByUserName(userName);
        if (currentUser.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        messagesTableService.markAllMessagesInChatAsReadByUser(chatId, currentUser.get().getId());
        List<MessageDTO> messageDTOList = convertToDTO(messages);
        return new ResponseEntity<>(messageDTOList, HttpStatus.OK);
    }

    @Operation(summary = "Получение всех сообщений по идентификатору отправителя")
    @GetMapping("/bySenderId/{senderId}") //200
    public ResponseEntity<List<MessageDTO>> getAllMessagesBySenderId(@PathVariable UUID senderId) {
        List<Message> messages = messagesTableService.getAllMessagesBySenderId(senderId);
        List<MessageDTO> messageDTOList = convertToDTO(messages);
        return new ResponseEntity<>(messageDTOList, HttpStatus.OK);
    }

    @Operation(summary = "Получение всех сообщений, содержащих ключевое слово")
    @GetMapping("/containingKeyword/{keyword}") //200
    public ResponseEntity<MessageDTOWithUser> getAllMessagesContainingKeyword(@AuthenticationPrincipal UserDetails userDetails, @PathVariable String keyword) {
        String username = userDetails.getUsername();
        Optional<User> currentUser = userRepository.findByUserName(username);
        if (currentUser.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        List<Message> messages = messagesTableService.getAllMessagesContainingKeyword(keyword);
        List<MessageDTO> messageDTOList = convertToDTO(messages);

        MessageDTOWithUser messageDTOWithUser = new MessageDTOWithUser();
        messageDTOWithUser.setMessageDTO(messageDTOList);
        messageDTOWithUser.setCurrentUser(currentUser.get());

        return new ResponseEntity<>(messageDTOWithUser, HttpStatus.OK);
    }

    //22
    @Operation(summary = "Получение количества сообщений по идентификатору чата")
    @GetMapping("/count/byChatId/countMessagesByChatId/{chatId}") //200
    public ResponseEntity<Long> countMessagesByChatId(@PathVariable UUID chatId) {
        long count = messagesTableService.countMessagesByChatId(chatId);
        return new ResponseEntity<>(count, HttpStatus.OK);
    }

    @Operation(summary = "Удаление всех сообщений по идентификатору чата")
    @DeleteMapping("/delete/byChatId/{chatId}") //200
    public ResponseEntity<Void> deleteMessagesByChatId(@PathVariable UUID chatId) {
        messagesTableService.deleteMessagesByChatId(chatId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // Преобразование между DTO и сущностью
    private List<MessageDTO> convertToDTO(List<Message> messages) {
        return messages.stream()
                .map(this::convertMessageToDTO)
                .collect(Collectors.toList());
    }

    private List<Message> convertToEntity(List<MessageDTO> messageDTOList) {
        return messageDTOList.stream()
                .map(this::convertMessageToEntity)
                .collect(Collectors.toList());
    }

    private MessageDTO convertMessageToDTO(Message message) {
        MessageDTO messageDTO = new MessageDTO();
        messageDTO.setId(message.getId());
        messageDTO.setSender(message.getSender());
        messageDTO.setContent(message.getContent());
        messageDTO.setDate(message.getDate());
        messageDTO.setChatId(message.getChatId());
        messageDTO.setImageURL(message.getImageURL());
        messageDTO.setAvatar(message.getAvatarUrl());
        messageDTO.setRead(message.getRead());
        return messageDTO;
    }

    private Message convertMessageToEntity(MessageDTO messageDTO) {
        Message message = new Message();
        message.setSender(messageDTO.getSender());
        message.setContent(messageDTO.getContent());
        message.setDate(messageDTO.getDate());
        message.setChatId(messageDTO.getChatId());
        message.setImageURL(messageDTO.getImageURL());
        message.setAvatarUrl(messageDTO.getAvatar());
        message.setRead(messageDTO.isRead());
        return message;
    }

}
