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
    @Schema(description = "The user who creates the chat")
    private User creator;

    @Schema(description = "The title of the chat")
    private String title;
}