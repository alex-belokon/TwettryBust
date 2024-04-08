package com.socialnetwork.socialnetworkapi.dto.chat;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.socialnetwork.socialnetworkapi.model.User;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Schema(name = "Message Request, like a sendMessage ")
public class MessageDTO {
    @Schema(description = "Идентификатор сообщения")
    private UUID id;

    @Schema(description = "Идентификатор отправителя", example = "123e4567-e89b-12d3-a456-426655440001")
    @JsonProperty("senderId")
    private User sender;

    @Schema(description = "Содержание сообщения", example = "Привет, как дела?")
    private String content;

    @Schema(description = "Дата сообщения", example = "2023-02-10")
    private LocalDateTime date;

    @Schema(description = "Идентификатор чата", example = "123e4567-e89b-12d3-a456-426655440002")
    @JsonProperty("chatId")
    private UUID chatId;

    @Schema(description = "URL изображения", example = "https://example.com/image.jpg")
    private String imageURL;

    @Schema(description = "Аватарка пользователя", example = "https://example.com/image.jpg")
    private String avatar;

    @Schema(description = "is_Read")
    private boolean isRead;
}
