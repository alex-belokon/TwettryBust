package com.socialnetwork.socialnetworkapi.dto.notification;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class NotificationIdAndUserId {
    @Schema(name = "notification id")
    private UUID notificationId;
    @Schema(name = "user id")
    private UUID userId;
}
