package com.socialnetwork.socialnetworkapi.dto.chat;

import com.socialnetwork.socialnetworkapi.model.chat.Chat;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(name = "Messages From Chat Request")
public class MessagesFromChatRequest {
    @Schema(description = "The chat from which to retrieve messages")
    private Chat chat;
}