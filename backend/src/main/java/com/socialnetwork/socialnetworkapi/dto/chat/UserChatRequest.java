package com.socialnetwork.socialnetworkapi.dto.chat;

import com.socialnetwork.socialnetworkapi.model.User;
import com.socialnetwork.socialnetworkapi.model.chat.Chat;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserChatRequest {
    private User user;
    private Chat chat;
}
