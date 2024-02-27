package com.socialnetwork.socialnetworkapi.dto.chat;

import com.socialnetwork.socialnetworkapi.model.User;
import com.socialnetwork.socialnetworkapi.model.chat.Chat;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(name = "User Chat Request")
public class UserChatRequest {
    @Schema(description = "The user to add or remove from the chat")
    private User user;

    @Schema(description = "The chat to which the user will be added or removed")
    private Chat chat;
}