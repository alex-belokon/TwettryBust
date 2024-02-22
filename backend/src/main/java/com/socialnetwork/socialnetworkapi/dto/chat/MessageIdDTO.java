package com.socialnetwork.socialnetworkapi.dto.chat;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class MessageIdDTO {
    @Schema(name = "The id message")
    private UUID id;
}
