package com.socialnetwork.socialnetworkapi.dto.chat;

import com.socialnetwork.socialnetworkapi.model.User;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Setter
@Getter
@Schema(name = "Chat Creation Request")
public class ChatCreationRequest {
    @Schema(description = "The User who request to the chat")
    private User userRequest;

    @Schema(description = "The user who creates the chat")
    private User creator;
}