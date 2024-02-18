package com.socialnetwork.socialnetworkapi.dto.favAndLikes;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Setter @Getter
public class LikeRequest {
    private UUID userId;
    private UUID postId;
}
