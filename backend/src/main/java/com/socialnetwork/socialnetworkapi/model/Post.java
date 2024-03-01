package com.socialnetwork.socialnetworkapi.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

import java.util.UUID;

@Entity
@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "posts")
public class Post extends AbstractEntity{
    @Column(name = "userId")
    private UUID userId;
    @Column(name = "content")
    private String content;
    @Column(name = "attachment")
    private String attachment;
    @Column(name = "type")
    private String type;
    @Column(name = "originalPostId")
    private UUID originalPostId;
    @Column(name = "communityId")
    private UUID communityId;
    @Override 
    public String toString() {
        return String.format("Post ID %s, created at %s, original postId %s", this.getId(), this.getCreatedAt(), this.getOriginalPostId());
    }

}
