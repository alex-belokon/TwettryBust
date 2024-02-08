package com.socialnetwork.socialnetworkapi.dto.chat;

import com.socialnetwork.socialnetworkapi.model.User;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@Schema(name = "Chats By User Request")
public class ChatsByUserRequest {
    @Schema(description = "The user for whom to retrieve chats")
    private User user;
}
