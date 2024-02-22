package com.socialnetwork.socialnetworkapi.dto.chat;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@Schema(name = "Chat Id")
public class ChatIdDto {
    @Schema(description = "The id of the chat")
    private UUID chatId;
}
