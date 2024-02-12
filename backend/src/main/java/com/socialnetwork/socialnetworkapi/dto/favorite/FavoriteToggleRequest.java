package com.socialnetwork.socialnetworkapi.dto.favorite;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Slf4j
@Getter
@Setter
public class FavoriteToggleRequest {
    private UUID userId;
    private UUID postId;
}
