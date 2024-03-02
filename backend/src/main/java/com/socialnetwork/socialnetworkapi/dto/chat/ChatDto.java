package com.socialnetwork.socialnetworkapi.dto.chat;

import com.socialnetwork.socialnetworkapi.model.User;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
public class ChatDto {
    @Schema(description = "Ідентифікатор чату")
    private UUID id;
    @Schema(description = "Останнє повідомлення в чаті")
    private String lastMessage;

    @Schema(name = "user_id")
    private User user; //request

    @Schema(name = "creator_id")
    private User creator; //sender

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "timestamp")
    private LocalDateTime timestamp; // Временная метка сообщения
}