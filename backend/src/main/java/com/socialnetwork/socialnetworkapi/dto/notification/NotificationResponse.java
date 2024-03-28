package com.socialnetwork.socialnetworkapi.dto.notification;

import com.socialnetwork.socialnetworkapi.enums.NotificationType;
import com.socialnetwork.socialnetworkapi.model.Notification;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;
@Getter
@Setter
@Schema(name = "NotificationDto")
public class NotificationResponse {
    @Schema(name = "id, уникальный идентификатор поста")
    private UUID postId;
    @Schema(name = "id, уникальный идентификатор уведомления")
    private UUID notificationId;
    @Schema(name = "receiver, пользователь, который получил уведомление")
    private UUID recipientId;
    @Schema(name = "sender, пользователь, который отправил уведомление")
    private UUID senderId;
    @Schema(name = "notificationType, тип уведомления")
    private NotificationType notificationType;
    @Schema(name = "isRead, чи продивлене сповіщення")
    private Boolean isRead;
    public NotificationResponse(Notification notification){
        this.postId = notification.getPostId();
        this.notificationId = notification.getId();
        this.recipientId = notification.getRecipient().getId();
        this.senderId = notification.getSender().getId();
        this.notificationType = notification.getNotificationType();
        this.isRead = notification.isRead();
    }
}