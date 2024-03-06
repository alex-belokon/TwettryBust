package com.socialnetwork.socialnetworkapi.dto.chat;

import com.socialnetwork.socialnetworkapi.model.User;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class MessageDTOWithUser {
    @Schema(name = "messageDto")
    private List<MessageDTO> messageDTO;
    @Schema(description = "Пользователь в сессии")
    private User currentUser;
}
