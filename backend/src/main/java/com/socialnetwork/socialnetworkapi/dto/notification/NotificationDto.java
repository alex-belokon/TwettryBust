package com.socialnetwork.socialnetworkapi.dto.notification;

import com.socialnetwork.socialnetworkapi.model.User;
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
    @Schema(name = "recipientId")
    private UUID recipient;
}
