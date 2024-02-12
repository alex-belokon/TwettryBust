package com.socialnetwork.socialnetworkapi.restcontrollers;

import com.socialnetwork.socialnetworkapi.dto.chat.MessageDTO;
import com.socialnetwork.socialnetworkapi.model.chat.Message;
import com.socialnetwork.socialnetworkapi.service.DefaultMessagesTableService;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/messages")
public class MessagesTableController {

    private final DefaultMessagesTableService messagesTableService;
    private final ModelMapper modelMapper;

    @Autowired
    public MessagesTableController(DefaultMessagesTableService messagesTableService, ModelMapper modelMapper) {
        this.messagesTableService = messagesTableService;
        this.modelMapper = modelMapper;

        modelMapper.addMappings(new PropertyMap<MessageDTO, Message>() {
            @Override
            protected void configure() {
                map().setId(source.getChatId());
            }
        });
    }

    @GetMapping
    public ResponseEntity<List<MessageDTO>> getAllMessages() {
        List<Message> messages = messagesTableService.getAllMessages();
        List<MessageDTO> messageDTOs = messages.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return new ResponseEntity<>(messageDTOs, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MessageDTO> getMessageById(@PathVariable UUID id) {
        Message message = messagesTableService.getMessageById(id);
        MessageDTO messageDTO = convertToDTO(message);
        return new ResponseEntity<>(messageDTO, HttpStatus.OK);
    }

    @PostMapping //200
    public ResponseEntity<MessageDTO> createMessage(@RequestBody MessageDTO messageDTO) {
        Message message = convertToEntity(messageDTO);
        Message createdMessage = messagesTableService.saveMessage(message);
        MessageDTO createdMessageDTO = convertToDTO(createdMessage);
        createdMessageDTO.setSenderId(message.getSenderId().getId());
        return new ResponseEntity<>(createdMessageDTO, HttpStatus.CREATED);
    }

    @PutMapping("/{id}") //201
    public ResponseEntity<MessageDTO> updateMessage(@PathVariable UUID id, @RequestBody MessageDTO updatedMessageDTO) {
        Message updatedMessage = convertToEntity(updatedMessageDTO);
        Message message = messagesTableService.updateMessage(id, updatedMessage);
        MessageDTO messageDTO = convertToDTO(message);
        return new ResponseEntity<>(messageDTO, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMessage(@PathVariable UUID id) {
        messagesTableService.deleteMessage(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/byChatId/{chatId}")
    public ResponseEntity<List<Message>> getAllMessagesByChatId(@PathVariable UUID chatId) {
        List<Message> messages = messagesTableService.getAllMessagesByChatId(chatId);
        return new ResponseEntity<>(messages, HttpStatus.OK);
    }

    @GetMapping("/bySenderId/{senderId}")
    public ResponseEntity<List<Message>> getAllMessagesBySenderId(@PathVariable UUID senderId) {
        List<Message> messages = messagesTableService.getAllMessagesBySenderId(senderId);
        return new ResponseEntity<>(messages, HttpStatus.OK);
    }

    @GetMapping("/containingKeyword/{keyword}")
    public ResponseEntity<List<Message>> getAllMessagesContainingKeyword(@PathVariable String keyword) {
        List<Message> messages = messagesTableService.getAllMessagesContainingKeyword(keyword);
        return new ResponseEntity<>(messages, HttpStatus.OK);
    }

    @GetMapping("/count/byChatId/{chatId}") //200
    public ResponseEntity<Long> countMessagesByChatId(@PathVariable UUID chatId) {
        long count = messagesTableService.countMessagesByChatId(chatId);
        return new ResponseEntity<>(count, HttpStatus.OK);
    }

    @DeleteMapping("/delete/byChatId/{chatId}") //200
    public ResponseEntity<Void> deleteMessagesByChatId(@PathVariable UUID chatId) {
        messagesTableService.deleteMessagesByChatId(chatId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // Преобразование между DTO и сущностью
    private MessageDTO convertToDTO(Message message) {
        return modelMapper.map(message, MessageDTO.class);
    }

    private Message convertToEntity(MessageDTO messageDTO) {
        return modelMapper.map(messageDTO, Message.class);
    }
}
//ModelMapper руками сделать