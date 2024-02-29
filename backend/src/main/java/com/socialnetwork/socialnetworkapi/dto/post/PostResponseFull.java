package com.socialnetwork.socialnetworkapi.dto.post;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class PostResponseFull extends PostResponseShort {
    private PostResponseShort originalPost;
    public void setOriginalPostIsLiked(boolean originalPostIsLiked) {
        originalPost.setIsLiked(originalPostIsLiked);
    }
    public void setOriginalPostIsInBookmarks(boolean originalPostIsInBookmarks) {
        originalPost.setIsInBookmarks(originalPostIsInBookmarks);
    }
}
