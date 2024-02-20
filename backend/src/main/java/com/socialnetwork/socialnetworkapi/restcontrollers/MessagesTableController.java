package com.socialnetwork.socialnetworkapi.restcontrollers;

import com.socialnetwork.socialnetworkapi.dto.chat.MessageDTO;
import com.socialnetwork.socialnetworkapi.model.User;
import com.socialnetwork.socialnetworkapi.model.chat.Message;
import com.socialnetwork.socialnetworkapi.service.DefaultMessagesTableService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/messages")
public class MessagesTableController {

    private final DefaultMessagesTableService messagesTableService;

    @Autowired
    public MessagesTableController(DefaultMessagesTableService messagesTableService) {
        this.messagesTableService = messagesTableService;
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
    public ResponseEntity<List<Message>> getAllMessagesByChatId(@PathVariable UUID chatId) {
        List<Message> messages = messagesTableService.getAllMessagesByChatId(chatId);
        return new ResponseEntity<>(messages, HttpStatus.OK);
    }

    @Operation(summary = "Получение всех сообщений по идентификатору отправителя")
    @GetMapping("/bySenderId/{senderId}")
    public ResponseEntity<List<Message>> getAllMessagesBySenderId(@PathVariable UUID senderId) {
        List<Message> messages = messagesTableService.getAllMessagesBySenderId(senderId);
        return new ResponseEntity<>(messages, HttpStatus.OK);
    }

    @Operation(summary = "Получение всех сообщений, содержащих ключевое слово")
    @GetMapping("/containingKeyword/{keyword}")
    public ResponseEntity<List<Message>> getAllMessagesContainingKeyword(@PathVariable String keyword) {
        List<Message> messages = messagesTableService.getAllMessagesContainingKeyword(keyword);
        return new ResponseEntity<>(messages, HttpStatus.OK);
    }

    @Operation(summary = "Получение количества сообщений по идентификатору чата")
    @GetMapping("/count/byChatId/{chatId}") //200
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
        messageDTO.setSenderId(message.getSenderId().getId());
        messageDTO.setContent(message.getContent());
        messageDTO.setDate(message.getDate());
        messageDTO.setChatId(message.getChatId());
        messageDTO.setImageURL(message.getImageURL());
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
        return message;
    }
}