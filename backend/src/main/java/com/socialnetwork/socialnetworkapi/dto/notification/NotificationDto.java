package com.socialnetwork.socialnetworkapi.dto.notification;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;


@Getter
@Setter
@Schema(name = "NotificationDto")
public class NotificationDto {
    @Schema(name = "Message")
    private String message;
    @Schema(name = "recipientId, пользователь, для которого предназначено уведомление")
    private UUID recipientId;
}
