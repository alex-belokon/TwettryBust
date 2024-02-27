package com.socialnetwork.socialnetworkapi.dto.chat;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class ChatDto {
    @Schema(description = "Ідентифікатор чату")
    private UUID id;
    @Schema(description = "Останнє повідомлення в чаті")
    private String lastMessage;
}