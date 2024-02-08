package com.socialnetwork.socialnetworkapi.dto.chat;

import com.socialnetwork.socialnetworkapi.model.User;
import com.socialnetwork.socialnetworkapi.model.chat.Chat;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(name = "Message Request")
public class MessageRequest {
    @Schema(description = "The user sending the message")
    private User sender;

    @Schema(description = "The chat to which the message is sent")
    private Chat chat;

    @Schema(description = "The content of the message")
    private String messageContent;
}