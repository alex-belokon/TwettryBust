package com.socialnetwork.socialnetworkapi.dto.post;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
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
    private Integer likes;
    private LocalDateTime createdAt;
    private Integer reposts;
    private Boolean isInBookmarks;
}
