package com.socialnetwork.socialnetworkapi.dto.chat;

import com.socialnetwork.socialnetworkapi.model.chat.Chat;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MessagesFromChatRequest {
    private Chat chat;
}
