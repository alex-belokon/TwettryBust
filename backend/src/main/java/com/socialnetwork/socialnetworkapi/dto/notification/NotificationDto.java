package com.socialnetwork.socialnetworkapi.dto.notification;

import com.socialnetwork.socialnetworkapi.enums.NotificationType;
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
    @Schema(name = "sender, пользователь, который отправил уведомление")
    private UUID sender;
    @Schema(name = "notificationType, тип уведомления")
    private NotificationType notificationType;
}
