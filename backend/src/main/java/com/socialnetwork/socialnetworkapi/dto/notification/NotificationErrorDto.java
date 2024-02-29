package com.socialnetwork.socialnetworkapi.dto.notification;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class NotificationErrorDto {
    @Schema(name = "NotificationError")
    private String errorMessage;

    @Schema(name = "NotificationType")
    private String errorType;
}
