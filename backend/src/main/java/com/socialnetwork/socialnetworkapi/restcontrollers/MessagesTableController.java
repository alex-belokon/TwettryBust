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
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/messages")
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
        MessageDTO messageDTO = convertToDTO(message);
        return new ResponseEntity<>(messageDTO, HttpStatus.OK);
    }

    @Operation(summary = "Создание сообщения")
    @PostMapping //200
    public ResponseEntity<MessageDTO> createMessage(@RequestBody MessageDTO messageDTO) {
        Message message = convertToEntity(messageDTO);
        Message createdMessage = messagesTableService.saveMessage(message);
        MessageDTO createdMessageDTO = convertToDTO(createdMessage);
        createdMessageDTO.setSenderId(message.getSenderId().getId());
        return new ResponseEntity<>(createdMessageDTO, HttpStatus.CREATED);
    }

    @Operation(summary = "Обновление сообщения по идентификатору")
    @PutMapping("/{id}") //201
    public ResponseEntity<MessageDTO> updateMessage(@PathVariable UUID id, @RequestBody MessageDTO updatedMessageDTO) {
        Message updatedMessage = convertToEntity(updatedMessageDTO);
        Message message = messagesTableService.updateMessage(id, updatedMessage);
        MessageDTO messageDTO = convertToDTO(message);
        return new ResponseEntity<>(messageDTO, HttpStatus.OK);
    }
    @Operation(summary = "Удаление сообщения по идентификатору")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMessage(@PathVariable UUID id) {
        messagesTableService.deleteMessage(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @Operation(summary = "Получение всех сообщений по идентификатору чата")
    @GetMapping("/byChatId/{chatId}")
    public ResponseEntity<List<MessageDTO>> getAllMessagesByChatId(@PathVariable UUID chatId) {
        List<Message> messages = messagesTableService.getAllMessagesByChatId(chatId);
        List<MessageDTO> messageDTO = new ArrayList<>();
        for (Message message : messages) {
            messageDTO.add(convertToDTO(message));
        }
        return new ResponseEntity<>(messageDTO, HttpStatus.OK);
    }

    @Operation(summary = "Получение всех сообщений по идентификатору отправителя")
    @GetMapping("/bySenderId/{senderId}")
    public ResponseEntity<List<MessageDTO>> getAllMessagesBySenderId(@PathVariable UUID senderId) {
        List<Message> messages = messagesTableService.getAllMessagesBySenderId(senderId);
        List<MessageDTO> messageDTO = new ArrayList<>();
        for (Message message : messages) {
            messageDTO.add(convertToDTO(message));
        }
        return new ResponseEntity<>(messageDTO, HttpStatus.OK);
    }

    @Operation(summary = "Получение всех сообщений, содержащих ключевое слово")
    @GetMapping("/containingKeyword/{keyword}")
    public ResponseEntity<MessageDTOWithUser> getAllMessagesContainingKeyword(@AuthenticationPrincipal UserDetails userDetails, @PathVariable String keyword) {
        List<Message> messages = messagesTableService.getAllMessagesContainingKeyword(keyword);
        List<MessageDTO> messageDTO = new ArrayList<>();
        for (Message message : messages) {
            messageDTO.add(convertToDTO(message));
        }
        String username = userDetails.getUsername();
        Optional<User> currentUser = userRepository.findByUserName(username);
        if (currentUser.isPresent()){
            return ResponseEntity.notFound().build();
        }
        MessageDTOWithUser messageDTOWithUser = new MessageDTOWithUser();
        messageDTOWithUser.setMessageDTO(messageDTO);
        messageDTOWithUser.setUser(currentUser.get());

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
    private MessageDTO convertToDTO(Message message) {
        MessageDTO messageDTO = new MessageDTO();
        messageDTO.setMessageId(message.getId());
        messageDTO.setSenderId(message.getSenderId().getId());
        messageDTO.setContent(message.getContent());
        messageDTO.setDate(message.getDate());
        messageDTO.setChatId(message.getChatId());
        messageDTO.setImageURL(message.getImageURL());
        messageDTO.setAvatarURL(message.getAvatarUrl());
        return messageDTO;
    }

    private Message convertToEntity(MessageDTO messageDTO) {
        Message message = new Message();
        User sender = new User();
        sender.setId(messageDTO.getSenderId());

        message.setSenderId(sender);
        message.setContent(messageDTO.getContent());
        message.setDate(messageDTO.getDate());
        message.setChatId(messageDTO.getChatId());
        message.setImageURL(messageDTO.getImageURL());
        message.setAvatarUrl(messageDTO.getAvatarURL());
        return message;
    }
}