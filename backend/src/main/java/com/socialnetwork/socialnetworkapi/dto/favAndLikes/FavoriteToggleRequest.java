package com.socialnetwork.socialnetworkapi.dto.favAndLikes;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

import java.util.UUID;

@NoArgsConstructor
@Slf4j
@Getter
@Setter
public class FavoriteToggleRequest {
    private UUID userId;
    private UUID postId;

    public FavoriteToggleRequest(UUID userId, UUID postId) {
        this.userId = userId;
        this.postId = postId;
    }
}
