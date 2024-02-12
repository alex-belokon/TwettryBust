package com.socialnetwork.socialnetworkapi.dto.post;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PostResponseFull {
    UUID id;
    UUID userId;
    String content;
    LocalDateTime createdAt;
    String attachment;
    String type;
    UUID originalPostId;
}
