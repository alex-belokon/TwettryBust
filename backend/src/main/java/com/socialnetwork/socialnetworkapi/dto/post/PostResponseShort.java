package com.socialnetwork.socialnetworkapi.dto.post;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Setter @Getter
public class PostResponseShort {
    private UUID id;
    private AuthorDTO author;
    private String attachment;
    private String content;
    private Integer likes = 0;
    private LocalDateTime createdAt;
    private Integer reposts = 0;
    private Boolean isInBookmarks = false;
    private Boolean isLiked = false;
    private UUID communityId;
    private Integer commentsCount;
}
