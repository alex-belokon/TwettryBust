package com.socialnetwork.socialnetworkapi.dto.chat;

import com.socialnetwork.socialnetworkapi.model.chat.Chat;
import com.socialnetwork.socialnetworkapi.model.chat.Message;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@Getter
@Setter
public class UserChatDtoSockets {
    @Schema(name = "MessageDTO - Это отправка обычных сообщений")
    private MessageDTO messageDTO;
    @Schema(name = "UserName поточного пользователя")
    private UUID userId;
    @Schema(name = "Коллекция чатов, Где чат ключ к сообщению, чат = сообщения")
    Map<Chat, List<Message>> chatMessageMap;
}
