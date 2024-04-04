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
    @Schema(name = "id, уникальный идентификатор поста")
    private UUID postId;
    @Schema(name = "id, уникальный идентификатор уведомления")
    private UUID notificationId;
    @Schema(name = "receiver, пользователь, который получил уведомление")
    private UUID receiver;
    @Schema(name = "sender, пользователь, который отправил уведомление")
    private UUID sender;
    @Schema(name = "notificationType, тип уведомления")
    private NotificationType notificationType;
}
