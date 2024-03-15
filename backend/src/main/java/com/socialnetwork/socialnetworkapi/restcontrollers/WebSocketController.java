package com.socialnetwork.socialnetworkapi.restcontrollers;

import com.socialnetwork.socialnetworkapi.Greeting;
import com.socialnetwork.socialnetworkapi.dto.chat.MessageDTO;
import com.socialnetwork.socialnetworkapi.model.chat.Message;
import com.socialnetwork.socialnetworkapi.service.DefaultMessagesTableService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.util.UUID;

@Controller
@AllArgsConstructor
@Slf4j
public class WebSocketController {


    private final DefaultMessagesTableService messagesTableService;
    @MessageMapping("/chat/{chatId}")
    @SendTo("/topic/messages")
    public MessageDTO processMessage(@DestinationVariable UUID chatId, MessageDTO messageDTO) {
        Message message = convertToEntity(messageDTO);

        if (!chatId.equals(messageDTO.getChatId())) {
            // Выводим ошибку в лог, если id чата не соответствует id чата из сообщения
            log.error("UUID chatId != messageDTO chatId");
        }

        Message savedMessage = messagesTableService.saveMessage(message);
        log.info("chatId for webSocket: " + chatId);
        return convertToDTO(savedMessage);
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
        return message;
    }
}