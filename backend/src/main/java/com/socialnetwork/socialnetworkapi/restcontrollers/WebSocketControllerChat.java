package com.socialnetwork.socialnetworkapi.restcontrollers;

import com.socialnetwork.socialnetworkapi.dao.repository.UserRepository;
import com.socialnetwork.socialnetworkapi.dto.chat.MessageDTO;
import com.socialnetwork.socialnetworkapi.dto.chat.UserChatDtoSockets;
import com.socialnetwork.socialnetworkapi.model.User;
import com.socialnetwork.socialnetworkapi.model.chat.Chat;
import com.socialnetwork.socialnetworkapi.model.chat.Message;
import com.socialnetwork.socialnetworkapi.service.DefaultChatService;
import com.socialnetwork.socialnetworkapi.service.DefaultMessagesTableService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;

import java.util.*;

@Controller
@AllArgsConstructor
@Slf4j
public class WebSocketControllerChat {
    private final DefaultMessagesTableService messagesTableService;
    private final UserRepository userRepository;
    private final DefaultChatService defaultChatService;

    @MessageMapping("/chat/{userId}")
    @SendTo("/topic/messages")
    public ResponseEntity<UserChatDtoSockets> processMessage(@AuthenticationPrincipal UserDetails userDetails, @DestinationVariable UUID userId, MessageDTO messageDTO) {
        Message message = convertToEntity(messageDTO); // Отправка сообщений через сокеты

        //Получаем поточного пользователя. По просьбе фронта выводим данные
        Optional<User> currentUser = userRepository.findByUserName(userDetails.getUsername());
        if (currentUser.isEmpty()){
            return ResponseEntity.notFound().build();
        }
        //Получаем чаты поточного пользователя/ Получение сообщений из чата
        Map<Chat, List<Message>> chatMessageMap = new HashMap<>();
        Set<Chat> chatsByUser = defaultChatService.getChatsByUser(currentUser);

        for (Chat chatForMessage : chatsByUser){
            List<Message> messages = messagesTableService.getAllMessagesByChatId(chatForMessage.getId());
            chatMessageMap.put(chatForMessage, messages);
        }
        //Сохранение сообщения в БД
        Message savedMessage = messagesTableService.saveMessage(message);

        //Конвертация сообщения в ДТО
        MessageDTO messageDtoResponse = convertToDTO(savedMessage);
        UserChatDtoSockets userChatDtoSockets = new UserChatDtoSockets();
        userChatDtoSockets.setUserId(currentUser.get().getId());
        userChatDtoSockets.setChatMessageMap(chatMessageMap);
        userChatDtoSockets.setMessageDTO(messageDtoResponse);

        log.info("userId for webSocket: " + userId);
        return ResponseEntity.status(HttpStatus.CREATED).body(userChatDtoSockets);
    }

    private MessageDTO convertToDTO(Message message) {
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

    private Message convertToEntity(MessageDTO messageDTO) {
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